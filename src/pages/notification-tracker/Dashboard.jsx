import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Briefcase, MapPin, Calendar, ExternalLink, Bookmark, CheckCircle, Info } from 'lucide-react';
import { MOCK_60_JOBS } from '../../lib/jobData';
import { calculateMatchScore, getScoreColor } from '../../lib/matchEngine';

export default function NotificationDashboard() {
    const navigate = useNavigate();
    const [prefs, setPrefs] = useState(() => {
        const saved = localStorage.getItem('jobTrackerPreferences');
        return saved ? JSON.parse(saved) : null;
    });

    const [statusMap, setStatusMap] = useState(() => {
        const saved = localStorage.getItem('jobTrackerStatus');
        return saved ? JSON.parse(saved) : {};
    });

    const [savedJobs, setSavedJobs] = useState(() => {
        const saved = localStorage.getItem('saved_job_ids');
        return saved ? JSON.parse(saved) : [];
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [filterOnlyMatches, setFilterOnlyMatches] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    // Filters
    const [locFilter, setLocFilter] = useState('All');
    const [modeFilter, setModeFilter] = useState('All');
    const [expFilter, setExpFilter] = useState('All');

    useEffect(() => {
        localStorage.setItem('jobTrackerStatus', JSON.stringify(statusMap));
    }, [statusMap]);

    useEffect(() => {
        localStorage.setItem('saved_job_ids', JSON.stringify(savedJobs));
    }, [savedJobs]);

    const jobsWithScores = useMemo(() => {
        return MOCK_60_JOBS.map(job => ({
            ...job,
            matchScore: calculateMatchScore(job, prefs),
            status: statusMap[job.id] || 'Not Applied'
        }));
    }, [prefs, statusMap]);

    const filteredJobs = useMemo(() => {
        return jobsWithScores.filter(job => {
            const matchesSearch = job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                job.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesThreshold = !filterOnlyMatches || (prefs && job.matchScore >= prefs.minMatchScore);
            const matchesLoc = locFilter === 'All' || job.location === locFilter;
            const matchesMode = modeFilter === 'All' || job.mode === modeFilter;
            const matchesExp = expFilter === 'All' || job.experience === expFilter;

            return matchesSearch && matchesThreshold && matchesLoc && matchesMode && matchesExp;
        })
            .sort((a, b) => b.matchScore - a.matchScore);
    }, [jobsWithScores, searchTerm, filterOnlyMatches, prefs, locFilter, modeFilter, expFilter]);

    const updateStatus = (jobId, newStatus) => {
        setStatusMap(prev => ({ ...prev, [jobId]: newStatus }));
    };

    const toggleSave = (jobId) => {
        setSavedJobs(prev => prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]);
    };

    return (
        <div>
            {!prefs && (
                <div className="mb-12 bg-primary text-white p-8 border-l-4 border-accent flex items-center justify-between">
                    <div>
                        <h3 className="text-xl font-black mb-1">Matching Inactive</h3>
                        <p className="text-sm opacity-80 font-medium">Set your preferences to activate intelligent scoring and precise discovery.</p>
                    </div>
                    <button onClick={() => navigate('/jt/settings')} className="bg-white text-primary px-6 py-3 text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-colors">Setup Preferences</button>
                </div>
            )}

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
                <div>
                    <h1 className="text-5xl font-bold mb-2 tracking-tight">Opportunity <span className="text-accent">Feed</span></h1>
                    <p className="text-slate-500 font-medium max-w-md leading-relaxed">High-fidelity job discovery filtered by your personal trajectory.</p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <button
                        onClick={() => setFilterOnlyMatches(!filterOnlyMatches)}
                        className={`px-6 py-3 border text-[10px] font-black uppercase tracking-[0.2em] transition-all ${filterOnlyMatches ? 'bg-primary text-white border-primary' : 'bg-white text-slate-400 border-slate-200'
                            }`}
                    >
                        {filterOnlyMatches ? 'Matches Only' : 'Showing All'}
                    </button>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <input
                            type="text"
                            placeholder="Search keywords..."
                            className="bg-white border border-slate-200 pl-12 pr-6 py-3 text-sm outline-none focus:border-primary w-64 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap gap-4 mb-12 py-6 border-y border-slate-100/50">
                <select onChange={(e) => setLocFilter(e.target.value)} className="bg-transparent text-[10px] font-black uppercase tracking-widest text-slate-400 outline-none border-none cursor-pointer hover:text-primary">
                    <option value="All">All Locations</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Pune">Pune</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                </select>
                <select onChange={(e) => setModeFilter(e.target.value)} className="bg-transparent text-[10px] font-black uppercase tracking-widest text-slate-400 outline-none border-none cursor-pointer hover:text-primary">
                    <option value="All">All Modes</option>
                    <option value="Onsite">Onsite</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                </select>
                <select onChange={(e) => setExpFilter(e.target.value)} className="bg-transparent text-[10px] font-black uppercase tracking-widest text-slate-400 outline-none border-none cursor-pointer hover:text-primary">
                    <option value="All">All Levels</option>
                    <option value="Fresher">Fresher</option>
                    <option value="0-1">Junior (0-1y)</option>
                    <option value="1-3">Mid (1-3y)</option>
                </select>
            </div>

            {/* Job Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
                {filteredJobs.length > 0 ? filteredJobs.map(job => (
                    <article key={job.id} className="group border-b border-slate-100 pb-12 hover:border-accent/20 transition-all duration-300">
                        <div className="flex justify-between items-start mb-6">
                            <div className="space-y-1">
                                <h3 className="text-2xl font-bold text-[#111111] group-hover:text-primary transition-colors leading-tight">{job.title}</h3>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{job.company}</p>
                            </div>
                            <div className={`px-3 py-1 border text-[9px] font-black uppercase tracking-widest ${getScoreColor(job.matchScore)}`}>
                                {job.matchScore}% Match
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-x-6 gap-y-3 mb-8 text-[11px] font-bold text-slate-500">
                            <span className="flex items-center gap-1.5"><MapPin size={12} className="text-accent" /> {job.location} ({job.mode})</span>
                            <span className="flex items-center gap-1.5"><Briefcase size={12} className="text-accent" /> {job.experience}</span>
                            <span className="flex items-center gap-1.5"><Calendar size={12} className="text-slate-300" /> {job.postedDaysAgo}d ago</span>
                        </div>

                        <div className="mb-10 min-h-[60px]">
                            <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 font-medium">
                                {job.description}
                            </p>
                        </div>

                        <div className="flex items-center justify-between pt-6 border-t border-slate-100/30">
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setSelectedJob(job)}
                                    className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-accent hover:underline transition-colors"
                                >
                                    Details
                                </button>
                                <button
                                    onClick={() => toggleSave(job.id)}
                                    className={`text-[10px] font-black uppercase tracking-widest transition-colors ${savedJobs.includes(job.id) ? 'text-blue-500' : 'text-slate-300 hover:text-slate-900'
                                        }`}
                                >
                                    {savedJobs.includes(job.id) ? 'Saved' : 'Save'}
                                </button>
                            </div>

                            <div className="flex gap-2">
                                {['Applied', 'Rejected', 'Selected'].filter(s => s !== job.status).slice(0, 1).map(s => (
                                    <button
                                        key={s}
                                        onClick={() => updateStatus(job.id, s)}
                                        className="px-3 py-1.5 bg-slate-50 border border-slate-100 text-[8px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-900 hover:text-white transition-all"
                                    >
                                        Mark as {s}
                                    </button>
                                ))}
                                {job.status !== 'Not Applied' && (
                                    <div className={`px-3 py-1.5 border text-[8px] font-black uppercase tracking-widest ${job.status === 'Applied' ? 'bg-blue-50 border-blue-100 text-blue-600' :
                                        job.status === 'Rejected' ? 'bg-rose-50 border-rose-100 text-rose-600' :
                                            'bg-emerald-50 border-emerald-100 text-emerald-600'
                                        }`}>
                                        {job.status}
                                    </div>
                                )}
                            </div>
                        </div>
                    </article>
                )) : (
                    <div className="col-span-full py-32 text-center border-2 border-dashed border-slate-100">
                        <Info size={48} className="mx-auto mb-4 text-slate-100" />
                        <h4 className="text-xl font-bold text-slate-300">No roles match your criteria.</h4>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-2">Adjust filters or lower threshold.</p>
                    </div>
                )}
            </div>

            {/* Job Detail Modal */}
            {selectedJob && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6">
                    <div className="bg-white max-w-2xl w-full p-12 border border-slate-200 animate-in fade-in zoom-in duration-200 shadow-2xl">
                        <header className="mb-12 flex justify-between items-start">
                            <div>
                                <h2 className="text-4xl font-bold mb-2 leading-tight">{selectedJob.title}</h2>
                                <p className="text-[12px] font-black uppercase tracking-[0.2em] text-accent">{selectedJob.company}</p>
                            </div>
                            <button onClick={() => setSelectedJob(null)} className="text-slate-300 hover:text-slate-900 transition-colors">
                                <XCircle size={24} />
                            </button>
                        </header>

                        <div className="space-y-10 mb-12">
                            <section>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 mb-4 border-b border-slate-50 pb-2">Description</label>
                                <p className="text-slate-600 leading-relaxed font-medium">{selectedJob.description}</p>
                            </section>

                            <section>
                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 mb-4 border-b border-slate-50 pb-2">Technical Alignment</label>
                                <div className="flex flex-wrap gap-2">
                                    {selectedJob.skills.map(s => (
                                        <span key={s} className="px-4 py-2 bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-100">{s}</span>
                                    ))}
                                </div>
                            </section>

                            <section className="grid grid-cols-2 gap-8">
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 mb-2">Compensation</label>
                                    <p className="font-bold text-xl">{selectedJob.salaryRange}</p>
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black uppercase tracking-widest text-slate-300 mb-2">Source</label>
                                    <p className="font-bold text-xl">{selectedJob.source}</p>
                                </div>
                            </section>
                        </div>

                        <button
                            onClick={() => window.open(selectedJob.applyUrl, '_blank')}
                            className="w-full bg-primary text-white py-6 font-black text-sm uppercase tracking-[.4em] hover:bg-slate-800 transition-all shadow-xl shadow-primary/10 flex items-center justify-center gap-4"
                        >
                            Execute Application <ExternalLink size={18} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function XCircle({ size, className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" />
        </svg>
    );
}

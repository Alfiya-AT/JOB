import { useState, useEffect, useMemo } from 'react';
import { MOCK_60_JOBS } from '../../lib/jobData';
import { calculateMatchScore, getScoreColor } from '../../lib/matchEngine';
import { MapPin, Briefcase, Calendar, Info, BookmarkX } from 'lucide-react';

export default function NotificationSaved() {
    const [savedIds, setSavedIds] = useState(() => {
        const saved = localStorage.getItem('saved_job_ids');
        return saved ? JSON.parse(saved) : [];
    });

    const [prefs] = useState(() => {
        const saved = localStorage.getItem('jobTrackerPreferences');
        return saved ? JSON.parse(saved) : null;
    });

    const savedJobs = useMemo(() => {
        return MOCK_60_JOBS
            .filter(job => savedIds.includes(job.id))
            .map(job => ({
                ...job,
                matchScore: calculateMatchScore(job, prefs)
            }));
    }, [savedIds, prefs]);

    const removeSave = (id) => {
        const updated = savedIds.filter(savedId => savedId !== id);
        setSavedIds(updated);
        localStorage.setItem('saved_job_ids', JSON.stringify(updated));
    };

    return (
        <div>
            <header className="mb-20">
                <h1 className="text-5xl font-bold mb-4 tracking-tight text-primary">Saved <span className="text-accent">Opportunities</span></h1>
                <p className="text-slate-500 font-medium">Your curated shortlist of high-potential roles.</p>
            </header>

            {savedJobs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                    {savedJobs.map(job => (
                        <article key={job.id} className="border-b border-slate-100 pb-12 group hover:border-accent/20 transition-all">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">{job.title}</h3>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{job.company}</p>
                                </div>
                                <div className={`px-3 py-1 border text-[9px] font-black uppercase tracking-widest ${getScoreColor(job.matchScore)}`}>
                                    {job.matchScore}% Match
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8 text-[11px] font-bold text-slate-500">
                                <span className="flex items-center gap-1.5"><MapPin size={12} className="text-accent" /> {job.location}</span>
                                <span className="flex items-center gap-1.5"><Briefcase size={12} className="text-accent" /> {job.experience}</span>
                                <span className="flex items-center gap-1.5"><Calendar size={12} className="text-slate-300" /> {job.postedDaysAgo}d ago</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    onClick={() => window.open(job.applyUrl, '_blank')}
                                    className="text-[10px] font-black uppercase tracking-[.4em] text-primary hover:text-accent hover:underline transition-all"
                                >
                                    Apply Now &rarr;
                                </button>
                                <button
                                    onClick={() => removeSave(job.id)}
                                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-300 hover:text-rose-500 transition-colors"
                                >
                                    <BookmarkX size={14} /> Remove
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="py-40 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                    <Info size={48} className="mx-auto mb-6 text-slate-100" />
                    <h3 className="text-2xl font-bold text-slate-300">No saved jobs yet.</h3>
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mt-2">Browse the dashboard to shortlist opportunities.</p>
                </div>
            )}
        </div>
    );
}

import { useNavigate, Link } from 'react-router-dom';
import {
    Activity,
    Briefcase,
    Zap,
    CheckCircle2,
    Clock,
    ChevronRight,
    TrendingUp,
    Target,
    Layout,
    FileText,
    ArrowRight,
    Cpu,
    Filter,
    MoreHorizontal,
    Star,
    ExternalLink
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useResumeStore } from '../lib/resumeStore';
import { getLatestAnalysis } from '../lib/analysisEngine';
import { MOCK_60_JOBS } from '../lib/jobData';

const Card = ({ title, children, className = "", action = null }) => (
    <div className={`premium-card overflow-hidden group ${className}`}>
        {title && (
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-white">
                <h3 className="font-bold text-primary tracking-tight text-xs uppercase tracking-widest">{title}</h3>
                {action}
            </div>
        )}
        <div className="p-6">{children}</div>
    </div>
);

export default function Dashboard() {
    const navigate = useNavigate();
    const { ats } = useResumeStore();
    const latestAnalysis = getLatestAnalysis();
    const [jobs, setJobs] = useState([]);
    const [activeCount, setActiveCount] = useState(0);

    useEffect(() => {
        const statusSaved = localStorage.getItem('jobTrackerStatus');
        const statusMap = statusSaved ? JSON.parse(statusSaved) : {};
        const active = Object.values(statusMap).filter(s => s !== 'Not Applied').length;
        setActiveCount(active);

        const jobsWithStatus = MOCK_60_JOBS.map(job => ({
            ...job,
            stage: statusMap[job.id] || 'Direct'
        })).sort((a, b) => a.postedDaysAgo - b.postedDaysAgo); // Lowest days ago (latest) first

        setJobs(jobsWithStatus);
    }, []);

    const stats = [
        { label: 'Active Jobs', value: activeCount, icon: Briefcase, color: 'text-accent', bg: 'bg-accent/5' },
        { label: 'Resume Quality', value: `${ats.score}%`, icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Competency Rating', value: latestAnalysis ? `${latestAnalysis.finalScore}%` : '0%', icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    ];

    return (
        <div className="space-y-10 animate-fade-in">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-2">
                <div>
                    <h1 className="text-3xl font-bold text-primary tracking-tight">Professional Overview</h1>
                    <p className="text-xs text-text-muted mt-2 font-bold uppercase tracking-widest">Performance tracking and career development summary.</p>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {stats.map((stat, i) => (
                    <div key={i} className="premium-card p-6 flex items-center justify-between border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
                            <p className="text-3xl md:text-4xl font-bold text-primary tracking-tighter">{stat.value}</p>
                        </div>
                        <div className={`w-12 h-12 shrink-0 ${stat.bg} ${stat.color} rounded flex items-center justify-center`}>
                            <stat.icon size={22} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Visual Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Pipeline Preview */}
                <Card
                    title="Active Applications"
                    className="lg:col-span-2 shadow-sm"
                    action={<Link to="/jt/dashboard" className="text-[10px] font-bold text-accent hover:underline uppercase tracking-widest flex items-center gap-2">View All Jobs &rarr;</Link>}
                >
                    <div className="space-y-4 md:space-y-5">
                        {jobs.length > 0 ? (
                            jobs.slice(0, 5).map((job, i) => (
                                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-slate-50 bg-slate-50/30 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all group gap-4">
                                    <div className="flex items-center gap-4 md:gap-5">
                                        <div className="w-10 h-10 md:w-11 md:h-11 bg-white rounded border border-slate-100 flex items-center justify-center shadow-sm shrink-0">
                                            <Briefcase size={18} className="text-slate-300 group-hover:text-primary transition-colors" />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="font-bold text-primary text-sm leading-none mb-2 truncate">{job.company}</h4>
                                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{job.title}</span>
                                                <span className="hidden xs:block w-1 h-1 rounded-full bg-slate-200"></span>
                                                <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{job.postedDaysAgo}d ago</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between sm:justify-end gap-5">
                                        <div className={`text-[9px] font-bold px-3 py-1.5 rounded border uppercase tracking-[0.15em] whitespace-nowrap ${job.stage === 'Applied' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                                            job.stage === 'Interview' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                'bg-white text-slate-500 border-slate-200'
                                            }`}>
                                            {job.stage}
                                        </div>
                                        <button className="text-slate-200 hover:text-primary transition-colors">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-16 rounded-xl border border-dashed border-slate-200 bg-slate-50/50">
                                <Star size={24} className="mx-auto text-slate-200 mb-3" />
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">No active tracking data available</p>
                            </div>
                        )}
                    </div>
                </Card>

                {/* AI Resume Builder */}
                <Card
                    title="AI Resume Builder"
                    action={<Link to="/resume-engine" className="text-[10px] font-bold text-accent hover:underline uppercase tracking-widest">Start Building &rarr;</Link>}
                >
                    <div className="flex flex-col items-center">
                        <div className="relative w-40 h-40 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="80" cy="80" r="70" stroke="#f1f5f9" strokeWidth="6" fill="transparent" />
                                <circle
                                    cx="80" cy="80" r="70" stroke="#0F172A" strokeWidth="8" fill="transparent"
                                    strokeDasharray={439}
                                    strokeDashoffset={439 - (ats.score / 100) * 439}
                                    strokeLinecap="round"
                                    className="transition-all duration-1000"
                                />
                            </svg>
                            <div className="absolute flex flex-col items-center">
                                <span className="text-4xl font-bold text-primary tracking-tighter">{ats.score}%</span>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">Verification Score</span>
                            </div>
                        </div>

                        <div className="w-full mt-10 space-y-4">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3 border-b border-slate-50 pb-2">Recommended Improvements</p>
                            {ats.suggestions.slice(0, 2).map((s, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="w-2 h-2 rounded-full bg-accent mt-1.5 shrink-0"></div>
                                    <p className="text-[11px] font-bold text-slate-600 leading-snug">{s.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Card>

                {/* Strategic Insights */}
                <Card
                    title="Strategic Insights"
                    className="lg:col-span-3"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                        <div className="lg:col-span-3 space-y-8">
                            <div className="flex items-center gap-3">
                                <TrendingUp size={16} className="text-accent" />
                                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Latest Professional Assessment</span>
                            </div>

                            {latestAnalysis ? (
                                <div className="bg-primary p-12 rounded-[20px] text-white relative overflow-hidden shadow-2xl">
                                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                                        <Briefcase size={160} />
                                    </div>
                                    <div className="relative z-10 font-sans">
                                        <div className="flex justify-between items-start mb-12 border-b border-white/10 pb-8">
                                            <div>
                                                <h5 className="font-bold text-4xl tracking-tight mb-2 uppercase">{latestAnalysis.company}</h5>
                                                <p className="text-[11px] text-accent font-bold uppercase tracking-[0.3em]">{latestAnalysis.role}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-6xl font-bold text-white tracking-tighter tabular-nums leading-none mb-2">{latestAnalysis.finalScore}</div>
                                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Assessment Index</div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                                            <div className="space-y-5">
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em] mb-2">Identified Competencies</p>
                                                <div className="flex flex-wrap gap-2.5">
                                                    {Object.entries(latestAnalysis.extractedSkills).flatMap(([_, s]) => s).slice(0, 6).map((skill, i) => (
                                                        <span key={i} className="text-[10px] font-bold uppercase tracking-widest bg-white/5 px-4 py-2 rounded border border-white/10">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-4 bg-white/5 p-6 rounded border border-white/10">
                                                <p className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">Strategy Overview</p>
                                                <p className="text-[13px] font-medium text-slate-300 leading-relaxed italic line-clamp-3">
                                                    Enhance your profile orientation towards senior-level architectural responsibilities and strategic oversight.
                                                </p>
                                            </div>
                                        </div>

                                        <Link to={`/results/${latestAnalysis.id}`} className="premium-btn-primary bg-white text-primary border-none hover:bg-slate-50 py-5 text-[11px] font-bold w-full uppercase tracking-[0.2em] rounded-none">
                                            View Detailed Report
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-slate-50 p-16 rounded-[20px] border border-slate-200 text-center space-y-6">
                                    <div className="w-20 h-20 bg-white rounded border border-slate-100 flex items-center justify-center mx-auto shadow-sm">
                                        <FileText size={36} className="text-slate-200" />
                                    </div>
                                    <div className="max-w-xs mx-auto">
                                        <p className="text-sm font-bold text-primary mb-2 uppercase tracking-widest">No Recent Assessments</p>
                                        <p className="text-xs font-bold text-slate-400 leading-relaxed uppercase tracking-widest">Analyze a target role to generate strategic insights.</p>
                                    </div>
                                    <button onClick={() => navigate('/assessments')} className="premium-btn-primary px-10 h-11 text-[11px] uppercase tracking-widest rounded-none">
                                        Start Analysis
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="lg:col-span-2 space-y-8">
                            <div className="flex items-center gap-3">
                                <Clock size={16} className="text-accent" />
                                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Development Roadmap</span>
                            </div>
                            <div className="space-y-4">
                                {latestAnalysis ? latestAnalysis.plan7Days.slice(0, 5).map((p, i) => (
                                    <div key={i} className="p-5 rounded border border-slate-100 bg-white group hover:border-accent/40 transition-all cursor-default relative pl-8 overflow-hidden">
                                        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-slate-100 group-hover:bg-accent transition-colors"></div>
                                        <p className="text-[10px] font-bold text-accent uppercase tracking-[0.25em] mb-2">{p.day}</p>
                                        <p className="text-xs font-bold text-primary leading-tight uppercase tracking-widest">{p.focus}</p>
                                    </div>
                                )) : [1, 2, 3, 4].map(i => (
                                    <div key={i} className="h-20 rounded border border-slate-100 bg-slate-50/50 animate-pulse"></div>
                                ))}
                                {latestAnalysis && (
                                    <button onClick={() => navigate('/resources')} className="text-[10px] font-bold text-slate-400 hover:text-primary transition-all flex items-center gap-3 pt-3 uppercase tracking-[0.2em] group">
                                        Professional syllabus <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}



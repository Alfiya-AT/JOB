import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAnalysisById, getLatestAnalysis, updateHistoryEntry } from '../lib/analysisEngine';
import {
    CheckCircle2,
    ChevronRight,
    Calendar,
    HelpCircle,
    AlertCircle,
    Clock,
    ArrowLeft,
    Copy,
    Download,
    Zap,
    Building2,
    Layers,
    Target,
    Briefcase,
    ExternalLink,
    Search,
    Target as TargetIcon
} from 'lucide-react';

export default function Results() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [analysis, setAnalysis] = useState(null);
    const [activeTab, setActiveTab] = useState('roadmap');

    useEffect(() => {
        const data = id ? getAnalysisById(id) : getLatestAnalysis();
        if (data) {
            setAnalysis(data);
        }
    }, [id]);

    const toggleSkill = (skill) => {
        if (!analysis.skillConfidenceMap) return;
        const currentStatus = analysis.skillConfidenceMap[skill];
        const newStatus = currentStatus === 'know' ? 'practice' : 'know';

        const newConfidenceMap = {
            ...analysis.skillConfidenceMap,
            [skill]: newStatus
        };

        let delta = 0;
        Object.values(newConfidenceMap).forEach(status => {
            if (status === 'know') delta += 2;
            if (status === 'practice') delta -= 2;
        });

        const newFinalScore = Math.min(Math.max(analysis.baseScore + delta, 0), 100);

        const updated = {
            ...analysis,
            skillConfidenceMap: newConfidenceMap,
            finalScore: newFinalScore
        };

        setAnalysis(updated);
        updateHistoryEntry(analysis.id, {
            skillConfidenceMap: newConfidenceMap,
            finalScore: newFinalScore
        });
    };

    const copyToClipboard = (text, message) => {
        navigator.clipboard.writeText(text).then(() => alert(message));
    };

    const downloadAsTxt = () => {
        const content = `Placement Readiness Analysis: ${analysis.company} - ${analysis.role} \nScore: ${analysis.finalScore}/100\n\n--- 7-DAY PLAN ---\n${analysis.plan7Days.map(p => `${p.day}: ${p.focus}\nTasks: ${p.tasks.join(', ')}`).join('\n\n')}\n\n-- - ROUND MAPPING-- -\n${analysis.roundMapping.map(r => `${r.roundTitle} (${r.focusAreas.join(', ')}): ${r.whyItMatters}`).join('\n')} `;
        const element = document.createElement("a");
        const file = new Blob([content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `readiness_${analysis.company.toLowerCase() || 'analysis'}.txt`;
        document.body.appendChild(element);
        element.click();
    };

    if (!analysis) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200">
                <AlertCircle size={64} className="text-slate-200 mb-4" />
                <h2 className="text-xl font-bold text-slate-800">No analysis found</h2>
                <Link to="/assessments" className="mt-4 text-primary font-bold hover:underline">Start new analysis</Link>
            </div>
        );
    }

    const renderReport = () => {
        const { roleReport } = analysis;
        if (!roleReport) return (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
                <Zap size={48} className="text-slate-200 mb-4" />
                <h3 className="text-lg font-bold text-slate-400">Deep Analysis Not Available</h3>
                <p className="text-sm text-slate-400 max-w-xs text-center mt-2">Run a new analysis to see the full strategic report.</p>
            </div>
        );

        return (
            <div className="space-y-12 animate-fade-in pb-20">
                <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-10">
                        <div className="flex-1 space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                                    <Building2 size={24} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Strategic Overview</h3>
                            </div>
                            <p className="text-lg text-slate-600 leading-relaxed font-medium italic">"{roleReport.overview.summary}"</p>
                            <div className="flex flex-wrap gap-4">
                                {Object.entries(roleReport.overview).filter(([k]) => k !== 'summary').map(([key, val]) => (
                                    <div key={key} className="bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{key}</p>
                                        <p className="font-bold text-slate-900">{val}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <section className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-200/50">
                        <h4 className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] mb-8">Core Responsibilities</h4>
                        <div className="space-y-6">
                            {roleReport.responsibilities.map((resp, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-black flex-shrink-0 mt-1">{i + 1}</div>
                                    <p className="text-slate-700 font-bold leading-snug">{resp}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-slate-900 p-10 rounded-[2.5rem] text-white shadow-2xl">
                        <h4 className="text-xs font-black text-indigo-300 uppercase tracking-[0.3em] mb-8">Complexity Analysis</h4>
                        <div className="space-y-8">
                            {Object.entries(roleReport.complexity).filter(([k]) => typeof roleReport.complexity[k] === 'number').map(([key, val]) => (
                                <div key={key} className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{key}</p>
                                        <p className="text-xl font-black text-white">{val}<span className="text-[10px] text-slate-500">/10</span></p>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: `${val * 10}% ` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <section className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-10">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6">Execution Stack & Experience</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="space-y-4">
                                <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2 underline underline-offset-4">Technical Core</p>
                                <div className="flex flex-wrap gap-2">
                                    {roleReport.skills.hard.map(s => <span key={s} className="px-4 py-2 bg-slate-50 text-slate-700 rounded-xl text-[10px] font-black uppercase border border-slate-100">{s}</span>)}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-2 underline underline-offset-4">Strategic Soft</p>
                                <div className="flex flex-wrap gap-2">
                                    {roleReport.skills.soft.map(s => <span key={s} className="px-4 py-2 bg-slate-50 text-slate-700 rounded-xl text-[10px] font-black uppercase border border-slate-100">{s}</span>)}
                                </div>
                            </div>
                        </div>
                        <div className="pt-10 border-t border-slate-50 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-slate-50 p-6 rounded-[1.5rem] border border-slate-100">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Experience</p>
                                <p className="text-sm font-black text-slate-900">{roleReport.experience.years}</p>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-[1.5rem] border border-slate-100">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Education</p>
                                <p className="text-sm font-black text-slate-900 leading-tight">University Degree</p>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-[1.5rem] border border-slate-100">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Must Have</p>
                                <p className="text-sm font-black text-indigo-600 line-clamp-2 leading-tight">{roleReport.skills.mustHave}</p>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white border-2 border-slate-900 p-10 rounded-[2.5rem] shadow-[12px_12px_0_0_rgba(15,23,42,1)] space-y-10">
                        <h4 className="text-lg font-black text-slate-900 uppercase italic">Execution Insights</h4>
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <p className="text-xs font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2">Ideal Profile</p>
                                <p className="text-sm font-bold text-slate-600 leading-relaxed">{roleReport.insights.idealCandidate}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-xs font-black text-red-500 uppercase tracking-widest flex items-center gap-2">Red Flags</p>
                                <p className="text-sm font-bold text-slate-600 leading-relaxed">{roleReport.insights.redFlags}</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    };

    const renderRoadmap = () => {
        const { roadmap } = analysis;
        if (!roadmap) return (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
                <Zap size={48} className="text-slate-200 mb-4" />
                <h3 className="text-lg font-bold text-slate-400">Strategic Roadmap Not Available</h3>
                <p className="text-sm text-slate-400 max-w-xs text-center mt-2">Run a new analysis to generate your trajectory.</p>
            </div>
        );

        return (
            <div className="space-y-16 pb-32 animate-fade-in">
                {/* 1. Gap Analysis Section */}
                <section className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8 text-left">
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                        <div className="w-12 h-12 bg-rose-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-rose-200">
                            <AlertCircle size={24} />
                        </div>
                        Strategic Gap Analysis
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <p className="text-lg text-slate-600 font-medium leading-relaxed">
                                {roadmap.gapAnalysis.positionSummary}
                            </p>
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Identified Skill Gaps</h4>
                                {roadmap.gapAnalysis.criticalGaps.map((gap, i) => (
                                    <div key={i} className="flex items-start gap-4 p-4 bg-rose-50/50 rounded-2xl border border-rose-100">
                                        <div className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0" />
                                        <p className="text-sm font-bold text-slate-700">{gap}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-slate-900 p-8 rounded-[2rem] text-white">
                            <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-6">Expert Qualification Filter</h4>
                            <div className="space-y-8">
                                <div>
                                    <p className="text-xs font-black text-slate-500 uppercase mb-4">Must-Haves</p>
                                    <div className="space-y-3">
                                        {roadmap.gapAnalysis.qualifications.mustHave.map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 text-sm font-bold">
                                                <CheckCircle2 size={16} className="text-emerald-400" /> {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-black text-slate-500 uppercase mb-4">Strategic Advantages</p>
                                    <div className="space-y-3">
                                        {roadmap.gapAnalysis.qualifications.niceToHave.map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 text-sm font-bold opacity-80">
                                                <div className="w-4 h-4 rounded-full border border-indigo-500" /> {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. Execution Pathways */}
                <section className="space-y-10 text-left">
                    <header className="flex items-end justify-between">
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                                <Zap size={24} />
                            </div>
                            Execution Pathway
                        </h2>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Planned Phase Trajectory</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {roadmap.learningPathways.map((phase, i) => (
                            <div key={i} className="group bg-white p-8 rounded-[2.2rem] border border-slate-100 hover:border-indigo-200 transition-all shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                                    <span className="text-8xl font-black italic">0{i + 1}</span>
                                </div>
                                <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">{phase.phase}</h4>
                                <h3 className="text-xl font-black text-slate-900 mb-6">{phase.focus}</h3>
                                <div className="space-y-6">
                                    <ul className="space-y-3">
                                        {phase.topics.map((topic, ti) => (
                                            <li key={ti} className="text-sm font-bold text-slate-500 flex items-center gap-2">
                                                <div className="w-1 h-1 rounded-full bg-slate-300" /> {topic}
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="pt-6 border-t border-slate-50">
                                        <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Proof Project</p>
                                        <p className="text-sm font-bold text-slate-900 leading-relaxed">{phase.projects}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3 & 4. Action Steps & Portfolio */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-left">
                    <section className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-200 space-y-8">
                        <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tight">Practical Action Steps</h3>
                        <div className="space-y-6">
                            {roadmap.actionSteps.map((step, i) => (
                                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                                    <div className="flex justify-between items-start mb-4">
                                        <h5 className="font-black text-indigo-600 uppercase text-xs tracking-widest">{step.area}</h5>
                                        <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-3 py-1 rounded-full">{step.timeInvestment}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {step.resources.map((res, ri) => (
                                            <span key={ri} className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black rounded-xl">{res}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white border-2 border-slate-900 p-10 rounded-[2.5rem] shadow-[12px_12px_0_0_rgba(15,23,42,0.05)] space-y-8">
                        <h3 className="text-xl font-black text-slate-900 uppercase italic tracking-tight">Portfolio & Proof of Work</h3>
                        <div className="space-y-6">
                            <div className="space-y-4">
                                {roadmap.portfolio.suggestedProjects.map((p, i) => (
                                    <div key={i} className="flex gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors cursor-default">
                                        <Briefcase size={20} className="text-indigo-600 shrink-0" />
                                        <p className="text-sm font-bold text-slate-700">{p}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="pt-6 border-t border-slate-100 flex flex-wrap gap-4">
                                {roadmap.portfolio.demonstrators.map((d, i) => (
                                    <span key={i} className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> {d}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

                {/* 5. Application Readiness */}
                <section className="bg-indigo-900 p-12 rounded-[2.5rem] text-white relative overflow-hidden text-left">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-indigo-500/10 skew-x-12 translate-x-1/2" />
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div className="space-y-10">
                            <div>
                                <h3 className="text-3xl font-black italic mb-6">Application Readiness</h3>
                                <div className="space-y-4">
                                    <p className="text-xs font-black text-indigo-400 uppercase tracking-widest">Resume Optimization</p>
                                    {roadmap.readiness.resumeTips.map((tip, i) => (
                                        <div key={i} className="flex items-start gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                                            <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                                            <p className="text-sm font-bold">{tip}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <p className="text-xs font-black text-indigo-400 uppercase tracking-widest">Interview Focus Areas</p>
                                <div className="flex flex-wrap gap-3">
                                    {roadmap.readiness.interviewFocus.map((f, i) => (
                                        <span key={i} className="px-5 py-2.5 bg-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest">{f}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-[2rem] text-slate-900 shadow-2xl">
                            <h4 className="text-xl font-black mb-8 underline decoration-4 decoration-indigo-500 underline-offset-8">Critical Intelligence</h4>
                            <div className="space-y-8 text-left">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Questions to Ask During Interviews</p>
                                <div className="space-y-6">
                                    {roadmap.readiness.questionsToAsk.map((q, i) => (
                                        <div key={i} className="group flex items-start gap-4">
                                            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 font-black text-xs">
                                                ?
                                            </div>
                                            <p className="text-sm font-bold italic text-slate-600 leading-relaxed">{q}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    };

    return (
        <div className="flex flex-col space-y-8 max-w-6xl mx-auto py-12 px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <Link to="/assessments" className="p-3 bg-white border border-slate-100 rounded-full text-slate-400 hover:text-slate-900 transition-all shadow-sm">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Placement Lab.</h1>
                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">{analysis.role || 'Career Analysis'} @ {analysis.company || 'Deep Intelligence'}</p>
                    </div>
                </div>

                <div className="flex bg-slate-100 p-1.5 rounded-[1.5rem] border border-slate-200">
                    <button
                        onClick={() => setActiveTab('roadmap')}
                        className={`px - 8 py - 3 rounded - 2xl text - [10px] font - black uppercase tracking - [0.2em] transition - all ${activeTab === 'roadmap' ? 'bg-white text-indigo-600 shadow-lg shadow-indigo-100' : 'text-slate-400 hover:text-slate-600'} `}
                    >
                        Roadmap
                    </button>
                    <button
                        onClick={() => setActiveTab('report')}
                        className={`px - 8 py - 3 rounded - 2xl text - [10px] font - black uppercase tracking - [0.2em] transition - all ${activeTab === 'report' ? 'bg-white text-indigo-600 shadow-lg shadow-indigo-100' : 'text-slate-400 hover:text-slate-600'} `}
                    >
                        Role Report
                    </button>
                </div>

                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Current Readiness</p>
                        <p className="text-5xl font-black text-slate-900 tabular-nums tracking-tighter">{analysis.finalScore}<span className="text-lg text-slate-300">/100</span></p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3">
                    {activeTab === 'roadmap' ? renderRoadmap() : renderReport()}
                </div>

                <div className="space-y-6">
                    <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white space-y-6 shadow-2xl shadow-slate-900/20">
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Asset Manager</p>
                        <button onClick={() => downloadAsTxt()} className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                            <span className="text-xs font-black uppercase tracking-widest">Strategy.txt</span>
                            <Download size={16} className="text-indigo-400 group-hover:scale-110 transition-transform" />
                        </button>
                        <button onClick={() => navigate(`/ assessment / ${analysis.id} `)} className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                            <span className="text-xs font-black uppercase tracking-widest">Take Assessment</span>
                            <TargetIcon size={16} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                        </button>
                        <button onClick={() => copyToClipboard(analysis.questions.join('\n'), 'Questions Copied!')} className="w-full flex items-center justify-between p-4 bg-indigo-600 rounded-2xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-900/40 group">
                            <span className="text-xs font-black uppercase tracking-widest">Copy Prep Qs</span>
                            <Copy size={16} className="text-white group-hover:scale-110 transition-transform" />
                        </button>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Execution Pulse</p>
                        <div className="space-y-4">
                            <div className="flex justify-between items-end">
                                <span className="text-[10px] font-black text-slate-400 uppercase">Preparation Day 1/7</span>
                                <span className="text-sm font-black text-slate-900">14%</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-600 rounded-full w-[14%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <p className="text-center text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] pt-12">Heuristic Build v2.1 — Advanced Career Intelligence Engine</p>
        </div>
    );
}

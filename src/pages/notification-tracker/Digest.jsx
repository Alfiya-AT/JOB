import { useState, useEffect, useMemo } from 'react';
import { MOCK_60_JOBS } from '../../lib/jobData';
import { calculateMatchScore, getScoreColor } from '../../lib/matchEngine';
import { Zap, Mail, Copy, CheckCircle2, AlertCircle } from 'lucide-react';

export default function NotificationDigest() {
    const today = new Date().toISOString().split('T')[0];
    const [prefs] = useState(() => {
        const saved = localStorage.getItem('jobTrackerPreferences');
        return saved ? JSON.parse(saved) : null;
    });

    const [digest, setDigest] = useState(() => {
        const saved = localStorage.getItem(`jobTrackerDigest_${today}`);
        return saved ? JSON.parse(saved) : null;
    });

    const [statusHistory] = useState(() => {
        const saved = localStorage.getItem('jobTrackerStatus');
        const statusMap = saved ? JSON.parse(saved) : {};
        return Object.entries(statusMap).map(([id, status]) => {
            const job = MOCK_60_JOBS.find(j => j.id === id);
            return job ? { ...job, status } : null;
        }).filter(Boolean);
    });

    const generateDigest = () => {
        if (!prefs) return;

        const scoredJobs = MOCK_60_JOBS.map(job => ({
            ...job,
            matchScore: calculateMatchScore(job, prefs)
        }))
            .sort((a, b) => b.matchScore - a.matchScore || a.postedDaysAgo - b.postedDaysAgo)
            .slice(0, 10);

        setDigest(scoredJobs);
        localStorage.setItem(`jobTrackerDigest_${today}`, JSON.stringify(scoredJobs));
    };

    const copyToClipboard = () => {
        if (!digest) return;
        const text = digest.map((j, i) => `${i + 1}. ${j.title} @ ${j.company} [${j.matchScore}% Match]`).join('\n');
        navigator.clipboard.writeText(`9AM Job Digest - ${today}\n\n${text}`);
        alert('Digest copied to clipboard.');
    };

    const createEmailDraft = () => {
        if (!digest) return;
        const body = digest.map((j, i) => `${j.title} at ${j.company}\nScore: ${j.matchScore}%\nApply: ${j.applyUrl}`).join('\n\n');
        window.location.href = `mailto:?subject=My 9AM Job Digest - ${today}&body=${encodeURIComponent(body)}`;
    };

    return (
        <div className="py-20 px-6 max-w-4xl mx-auto">
            <header className="mb-20">
                <h1 className="text-5xl font-serif font-black mb-4 tracking-tight">Daily <span className="text-[#8B0000]">Digest</span></h1>
                <p className="text-slate-500 font-medium">Your absolute best matches, delivered fresh at 9:00 AM.</p>
            </header>

            {!prefs ? (
                <div className="py-24 text-center border-2 border-dashed border-slate-100">
                    <AlertCircle size={48} className="mx-auto mb-6 text-[#8B0000]/20" />
                    <h3 className="text-2xl font-serif font-black text-slate-300">Matching Deactivated.</h3>
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mt-2">Initialize preferences to generate a personalized digest.</p>
                </div>
            ) : (
                <div className="space-y-32">
                    <section>
                        {!digest ? (
                            <div className="bg-white border border-slate-200 p-16 text-center shadow-2xl shadow-slate-200/50">
                                <Zap size={48} className="mx-auto mb-8 text-[#8B0000]" />
                                <h2 className="text-3xl font-serif font-black mb-4">Generate Today's Packet</h2>
                                <p className="text-slate-500 mb-12 max-w-md mx-auto leading-relaxed">The algorithm will select the top 10 opportunities based on your current tracking protocol.</p>
                                <button
                                    onClick={generateDigest}
                                    className="bg-[#8B0000] text-white px-12 py-6 font-black text-sm uppercase tracking-[0.4em] hover:opacity-90 transition-all"
                                >
                                    Generate 9AM Digest
                                </button>
                                <p className="mt-8 text-[9px] font-black uppercase tracking-widest text-slate-300">Simulation Mode: Manual generation enabled for demo.</p>
                            </div>
                        ) : (
                            <div className="bg-white border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden">
                                <header className="bg-slate-50 p-12 border-b border-slate-100 flex flex-col md:flex-row justify-between items-center gap-8">
                                    <div className="text-center md:text-left">
                                        <h2 className="text-3xl font-serif font-black text-slate-900 mb-2">9AM Intelligence Packet</h2>
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">{today}</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <button onClick={copyToClipboard} className="p-4 border border-slate-200 text-slate-400 hover:text-[#8B0000] hover:border-[#8B0000] transition-all"><Copy size={18} /></button>
                                        <button onClick={createEmailDraft} className="p-4 border border-slate-200 text-slate-400 hover:text-[#8B0000] hover:border-[#8B0000] transition-all"><Mail size={18} /></button>
                                    </div>
                                </header>
                                <div className="p-12 space-y-12">
                                    {digest.map((job, i) => (
                                        <div key={job.id} className="flex items-start gap-8 group">
                                            <span className="text-4xl font-serif font-black text-slate-100 group-hover:text-[#8B0000]/10 transition-colors">0{i + 1}</span>
                                            <div className="flex-1 border-b border-slate-50 pb-8 last:border-0 last:pb-0">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h4 className="text-xl font-serif font-black text-slate-900 leading-tight mb-1">{job.title}</h4>
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{job.company} — {job.location}</p>
                                                    </div>
                                                    <span className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-widest border ${getScoreColor(job.matchScore)}`}>{job.matchScore}%</span>
                                                </div>
                                                <button onClick={() => window.open(job.applyUrl, '_blank')} className="text-[10px] font-black uppercase tracking-[0.2em] text-[#8B0000] hover:underline">Apply Now &rarr;</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <footer className="bg-slate-50 p-8 text-center border-t border-slate-100">
                                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">Compiled for your unique career footprint.</p>
                                </footer>
                            </div>
                        )}
                    </section>

                    <section>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-300 mb-12 flex items-center gap-4">
                            Recent Status Updates <div className="flex-1 h-px bg-slate-100"></div>
                        </h3>
                        <div className="space-y-6">
                            {statusHistory.length > 0 ? statusHistory.slice(-5).reverse().map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-6 border border-slate-100 bg-white/50">
                                    <div>
                                        <p className="font-serif font-black text-slate-900 leading-none mb-2">{item.title}</p>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{item.company}</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest border ${item.status === 'Applied' ? 'bg-blue-50 border-blue-100 text-blue-600' :
                                                item.status === 'Rejected' ? 'bg-rose-50 border-rose-100 text-rose-600' :
                                                    'bg-emerald-50 border-emerald-100 text-emerald-600'
                                            }`}>
                                            {item.status}
                                        </span>
                                        <CheckCircle2 size={14} className="text-slate-200" />
                                    </div>
                                </div>
                            )) : (
                                <p className="text-center py-12 text-[10px] font-black uppercase tracking-widest text-slate-300">No recent activity logged.</p>
                            )}
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
}

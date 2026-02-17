import { useState, useEffect } from 'react';
import { CheckCircle2, AlertCircle, Rocket, ShieldCheck, ExternalLink, Copy, FileCheck } from 'lucide-react';

export default function NotificationProof() {
    const [checklist, setChecklist] = useState(() => {
        const saved = localStorage.getItem('jt_test_checklist');
        return saved ? JSON.parse(saved) : {
            prefs: false,
            score: false,
            toggle: false,
            save: false,
            apply: false,
            status: false,
            filter: false,
            digest: false,
            persist: false,
            console: false
        };
    });

    const [links, setLinks] = useState(() => {
        const saved = localStorage.getItem('jt_final_links');
        return saved ? JSON.parse(saved) : { lovable: "", github: "", deploy: "" };
    });

    useEffect(() => {
        localStorage.setItem('jt_test_checklist', JSON.stringify(checklist));
    }, [checklist]);

    useEffect(() => {
        localStorage.setItem('jt_final_links', JSON.stringify(links));
    }, [links]);

    const tests = [
        { id: 'prefs', label: 'Preferences persist after refresh', hint: 'Change settings, refresh page, verify data remains.' },
        { id: 'score', label: 'Match score calculates correctly', hint: 'Check if score reflects exact rules (+25 title, etc).' },
        { id: 'toggle', label: '"Show only matches" toggle works', hint: 'Enable toggle on dashboard and check count.' },
        { id: 'save', label: 'Save job persists after refresh', hint: 'Shortlist a job, refresh, check /saved page.' },
        { id: 'apply', label: 'Apply opens in new tab', hint: 'Click Execute Application and verify browser behavior.' },
        { id: 'status', label: 'Status update persists after refresh', hint: 'Change a job to Applied, refresh, verify badge.' },
        { id: 'filter', label: 'Status filter works correctly', hint: 'Filter by Applied or Selected on dashboard.' },
        { id: 'digest', label: 'Digest generates top 10 by score', hint: 'Check /digest and verify order/count.' },
        { id: 'persist', label: 'Digest persists for the day', hint: 'Generate digest, refresh, verify it doesn\'t disappear.' },
        { id: 'console', label: 'No console errors on main pages', hint: 'Open DevTools and browse through all routes.' }
    ];

    const passedCount = Object.values(checklist).filter(v => v).length;
    const isChecksComplete = passedCount === 10;
    const isLinksValid = links.lovable && links.github && links.deploy;
    const isShipped = isChecksComplete && isLinksValid;

    const copyFinalSubmission = () => {
        const text = `
Job Notification Tracker — Final Submission

Lovable Project: ${links.lovable}
GitHub Repository: ${links.github}
Live Deployment: ${links.deploy}

Core Features:
- Intelligent match scoring (deterministic)
- Daily digest simulation (9AM)
- Status tracking pipeline
- Premium KodNest Design System
        `;
        navigator.clipboard.writeText(text.trim());
        alert('Final submission copied to clipboard.');
    };

    return (
        <div className="py-20 px-6 max-w-4xl mx-auto">
            <header className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8">
                <div>
                    <h1 className="text-5xl font-serif font-black mb-4 tracking-tight">Final <span className="text-[#8B0000]">Proof</span></h1>
                    <p className="text-slate-500 font-medium">Verification and deployment portal for Project 1.</p>
                </div>
                <div className={`px-6 py-3 border-2 flex items-center gap-3 transition-all ${isShipped ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-400'
                    }`}>
                    <div className={`w-2 h-2 rounded-full ${isShipped ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">{isShipped ? 'Shipped' : 'In Progress'}</span>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Checklist Section */}
                <section>
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                        <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-900 flex items-center gap-3">
                            <ShieldCheck size={16} /> Quality Audit
                        </h3>
                        <span className="text-[10px] font-black text-slate-400">{passedCount}/10 PASSED</span>
                    </div>

                    <div className="space-y-4">
                        {tests.map(test => (
                            <label key={test.id} className="flex items-start gap-4 p-5 bg-white border border-slate-100 cursor-pointer hover:border-[#8B0000]/20 transition-all group">
                                <div className="pt-1">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 accent-[#8B0000]"
                                        checked={checklist[test.id]}
                                        onChange={() => setChecklist({ ...checklist, [test.id]: !checklist[test.id] })}
                                    />
                                </div>
                                <div>
                                    <p className={`font-bold text-sm ${checklist[test.id] ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{test.label}</p>
                                    <p className="text-[10px] font-medium text-slate-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{test.hint}</p>
                                </div>
                            </label>
                        ))}
                    </div>

                    {!isChecksComplete && (
                        <div className="mt-8 flex items-center gap-3 text-[#B45309] bg-amber-50 p-4 border border-amber-100">
                            <AlertCircle size={16} />
                            <p className="text-[10px] font-black uppercase tracking-widest">Resolve all issues before shipping.</p>
                        </div>
                    )}
                </section>

                {/* links and submission */}
                <section className="space-y-12">
                    <div>
                        <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-900 mb-8 pb-4 border-b border-slate-100 flex items-center gap-3">
                            <Rocket size={16} /> Artifact Collection
                        </h3>
                        <div className="space-y-8">
                            {['Lovable Project', 'GitHub Repository', 'Live Deployment'].map(label => {
                                const key = label.split(' ')[0].toLowerCase();
                                return (
                                    <div key={label} className="space-y-3">
                                        <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</label>
                                        <input
                                            type="url"
                                            placeholder="https://..."
                                            className="w-full bg-slate-50 border border-slate-100 p-4 text-sm font-medium outline-none focus:bg-white focus:border-[#8B0000] transition-all"
                                            value={links[key]}
                                            onChange={(e) => setLinks({ ...links, [key]: e.target.value })}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-50">
                        <button
                            disabled={!isShipped}
                            onClick={copyFinalSubmission}
                            className={`w-full py-6 font-black text-sm uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 ${isShipped ? 'bg-[#8B0000] text-white hover:opacity-90' : 'bg-white border-2 border-slate-100 text-slate-200 cursor-not-allowed'
                                }`}
                        >
                            Copy Final Submission <Copy size={18} />
                        </button>
                    </div>

                    {isShipped && (
                        <div className="p-8 bg-emerald-50 border border-emerald-100 text-center animate-in fade-in slide-in-from-bottom-4">
                            <FileCheck size={32} className="text-emerald-500 mx-auto mb-4" />
                            <h4 className="text-xl font-serif font-black text-emerald-900 mb-2">Project 1 Shipped</h4>
                            <p className="text-xs font-medium text-emerald-700 leading-relaxed uppercase tracking-widest">Everything is verified and registered.</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

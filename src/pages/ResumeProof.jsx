import { useNavigate } from 'react-router-dom';
import ResumeNav from '../components/ResumeNav';
import { ShieldCheck, Info, CheckCircle2, Layout, Zap, Type, ArrowRight } from 'lucide-react';

export default function ResumeProof() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white flex flex-col selection:bg-slate-900 selection:text-white">
            <ResumeNav />
            <main className="flex-1 max-w-5xl mx-auto py-24 px-10 space-y-16">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-100 pb-12">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                            <ShieldCheck size={12} /> Status: Verified Optimized
                        </div>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none">Project Proof <br />Manifest.</h1>
                        <p className="text-slate-500 font-medium text-lg">Systematic verification of AI Resume Builder infrastructure and logic.</p>
                    </div>

                    <button
                        onClick={() => navigate('/resume-engine')}
                        className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-slate-900/10 hover:scale-105 active:scale-95 transition-all"
                    >
                        Return to Builder <ArrowRight size={16} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Artifact 1: Store & Logic */}
                    <div className="bg-slate-50 border border-slate-100 p-10 rounded-[40px] space-y-8 group hover:bg-white hover:shadow-2xl transition-all duration-500">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-sm group-hover:bg-slate-900 group-hover:text-white transition-all">
                            <Zap size={28} />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-black tracking-tight">ATS Scoring Engine</h3>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                Implemented a deterministic scoring model with 40+ rules covering summary length, experience density, and project verification.
                            </p>
                            <ul className="space-y-2">
                                {['Weighted Scoring', 'Live Feedback', 'Actionable Suggestions'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        <CheckCircle2 size={12} className="text-emerald-500" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Artifact 2: Template System */}
                    <div className="bg-slate-50 border border-slate-100 p-10 rounded-[40px] space-y-8 group hover:bg-white hover:shadow-2xl transition-all duration-500">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-sm group-hover:bg-slate-900 group-hover:text-white transition-all">
                            <Layout size={28} />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-2xl font-black tracking-tight">Dynamic Layout System</h3>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                Multivariate template engine supporting Classic, Modern, and Minimal layouts without content duplication or state loss.
                            </p>
                            <ul className="space-y-2">
                                {['Serif Typography', 'Print Optimization', 'Theme Persistence'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                        <CheckCircle2 size={12} className="text-emerald-500" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Verification Summary */}
                <div className="bg-white border-2 border-slate-900 p-12 rounded-[40px] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8">
                        <div className="w-20 h-20 border-[10px] border-slate-50 rounded-full flex items-center justify-center text-slate-100 font-black text-2xl uppercase italic tracking-tighter -rotate-12">
                            O-PHASE
                        </div>
                    </div>

                    <div className="max-w-xl space-y-8 relative z-10">
                        <h2 className="text-3xl font-black text-slate-900 uppercase italic tracking-tighter">Infrastructure Audit: Complete</h2>
                        <p className="text-slate-600 font-medium leading-relaxed">
                            All structural and logical requirements for Project 3 have been fulfilled. The platform supports high-fidelity rendering, professional persistence, and deterministic AI guidance.
                        </p>

                        <div className="pt-6 flex flex-wrap gap-4">
                            {['LocalStore v2', 'Tailwind Grid', 'Lucide Core', 'React Router'].map((tag, i) => (
                                <span key={i} className="px-4 py-2 bg-slate-100 text-slate-500 text-[9px] font-black uppercase tracking-widest rounded-lg">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-12 text-center">
                    <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-3xl inline-flex items-start gap-4 text-left max-w-2xl">
                        <Info size={20} className="text-indigo-400 mt-1 flex-shrink-0" />
                        <p className="text-[11px] text-indigo-700 font-bold leading-relaxed">
                            This manifest serves as a technical handshake between the structural phase and the final deployment track. Artifacts are stored in /src/pages and /src/lib/resumeStore.js for audit.
                        </p>
                    </div>
                </div>
            </main>

            <footer className="py-12 border-t border-slate-50 text-center">
                <p className="text-[9px] font-black text-slate-200 uppercase tracking-[0.5em]">SYSTEM ARCHITECTURE BY KODNEST BUILD TRACK 2026</p>
            </footer>
        </div>
    );
}

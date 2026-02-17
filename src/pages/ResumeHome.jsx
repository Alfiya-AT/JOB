import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Shield, Rocket, FileText, CheckCircle2, Zap } from 'lucide-react';

export default function ResumeHome() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white selection:bg-slate-900 selection:text-white">
            {/* Nav (Simple) */}
            <nav className="h-20 flex items-center justify-between px-10 border-b border-slate-50 sticky top-0 bg-white/80 backdrop-blur-xl z-50">
                <div className="flex items-center gap-2 font-black text-xl tracking-tighter">
                    <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center">
                        <Sparkles size={18} />
                    </div>
                    RESUMECRAFT
                </div>
                <div className="flex items-center gap-8">
                    <button onClick={() => navigate('/resume-engine')} className="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Builder</button>
                    <button onClick={() => navigate('/preview')} className="text-sm font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">Templates</button>
                    <button onClick={() => navigate('/resume-engine')} className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-slate-900/10 hover:scale-105 active:scale-95 transition-all">
                        Get Started
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-32 px-6 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl pointer-events-none">
                    <div className="absolute top-1/4 left-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl opacity-50"></div>
                    <div className="absolute top-1/2 right-0 w-96 h-96 bg-indigo-50/50 rounded-full blur-3xl opacity-30"></div>
                </div>

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="flex justify-center mb-10">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-slate-900 text-[10px] font-black uppercase tracking-[0.2em] animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <Zap size={12} className="text-amber-500" /> New: ATS Deterministic Scoring Engine
                        </div>
                    </div>

                    <h1 className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter leading-[0.85] mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                        Craft a Resume <br />
                        <span className="text-slate-300 italic">That Commands.</span>
                    </h1>

                    <p className="text-2xl text-slate-400 font-medium max-w-3xl mx-auto mb-16 leading-relaxed animate-in fade-in slide-in-from-bottom-10 duration-1000">
                        Stop vanishing into ATS black holes. Use our high-context, professional builder designed for elite recruitment standards.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                        <button
                            onClick={() => navigate('/resume-engine')}
                            className="px-12 py-6 bg-slate-900 text-white rounded-2xl font-black text-xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center gap-4"
                        >
                            Open Builder <ArrowRight size={24} />
                        </button>
                        <div className="flex items-center gap-8 px-8 py-6 border border-slate-100 rounded-2xl bg-slate-50/50 backdrop-blur-sm">
                            <div className="text-center">
                                <div className="text-xl font-black">1.2k+</div>
                                <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">Builds Today</div>
                            </div>
                            <div className="w-px h-8 bg-slate-200"></div>
                            <div className="text-center">
                                <div className="text-xl font-black">98%</div>
                                <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">Pass Rate</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Template Preview Section */}
            <section className="py-32 px-10 bg-slate-50 border-y border-slate-100">
                <div className="max-w-6xl mx-auto space-y-20">
                    <div className="text-center space-y-4">
                        <h2 className="text-4xl font-black tracking-tight">Three Elite Layouts.</h2>
                        <p className="text-slate-500 font-medium">One content base. Switch instantly between Classic, Modern, and Minimal.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { name: 'Classic', desc: 'The gold standard for conservative industries.' },
                            { name: 'Modern', desc: 'Striking, asymmetric layout for tech & design.' },
                            { name: 'Minimal', desc: 'Whitespace-driven aesthetic for senior leaders.' }
                        ].map((t, i) => (
                            <div key={i} className="group relative bg-white p-2 rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer overflow-hidden">
                                <div className="aspect-[3/4] bg-slate-50 rounded-2xl mb-6 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-200/50 to-transparent"></div>
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white shadow-xl rounded-sm p-4 space-y-2 opacity-80 group-hover:scale-110 transition-transform duration-700">
                                        <div className={`h-4 w-1/2 bg-slate-100 mb-4 ${i === 0 ? 'mx-auto' : ''}`}></div>
                                        <div className="h-1 w-full bg-slate-50"></div>
                                        <div className="h-1 w-full bg-slate-50"></div>
                                        <div className="h-1 w-2/3 bg-slate-50"></div>
                                    </div>
                                </div>
                                <div className="p-6 pt-0">
                                    <h3 className="text-xl font-black tracking-tight mb-2">{t.name} Layout</h3>
                                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{t.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Engine Section */}
            <section className="py-32 px-10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-24">
                    <div className="flex-1 space-y-10">
                        <div className="space-y-4">
                            <h2 className="text-5xl font-black tracking-tighter leading-none text-slate-900">
                                The High-Context <br />
                                <span className="text-slate-300">ATS Engine.</span>
                            </h2>
                            <p className="text-lg text-slate-500 font-medium leading-relaxed">
                                Our builder doesn't just collect data. It evaluates it against 40+ deterministic rules including bullet discipline, action verb density, and numeric impact.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {[
                                { title: 'Deterministic Scoring', desc: 'Real-time feedback on your resumes "Recruiter Readiness".' },
                                { title: 'Bullet Discipline', desc: 'Inline AI guidance for verb-first, impact-heavy descriptions.' },
                                { title: 'One-Click Hydration', desc: 'Load elite sample data to use as a structural baseline.' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="mt-1">
                                        <CheckCircle2 size={18} className="text-slate-900" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-800 tracking-tight">{item.title}</h4>
                                        <p className="text-sm text-slate-500 font-medium">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex-1 w-full aspect-square bg-slate-900 rounded-[60px] relative overflow-hidden shadow-2xl p-12 flex items-center justify-center">
                        <div className="text-center space-y-4 animate-pulse">
                            <div className="text-4xl font-black text-white italic">82 / 100</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Engine Status: Active</div>
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full border-[20px] border-white/5 rounded-[60px] pointer-events-none"></div>
                    </div>
                </div>
            </section>

            <footer className="py-20 border-t border-slate-100 text-center space-y-6">
                <div className="flex justify-center gap-12 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <button className="hover:text-slate-900 transition-colors">Twitter</button>
                    <button className="hover:text-slate-900 transition-colors">GitHub</button>
                    <button className="hover:text-slate-900 transition-colors">Privacy</button>
                </div>
                <p className="text-[10px] font-black text-slate-200 uppercase tracking-[1em]">
                    Build Track 2026 — KodNest Ecosystem
                </p>
            </footer>
        </div>
    );
}

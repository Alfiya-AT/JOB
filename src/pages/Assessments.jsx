import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeJD, saveToHistory } from '../lib/analysisEngine';
import { Search, Building, UserCircle, AlertCircle, Zap, ChevronRight, Target } from 'lucide-react';

export default function Assessments() {
    const [company, setCompany] = useState(() => localStorage.getItem('jd_draft_company') || '');
    const [role, setRole] = useState(() => localStorage.getItem('jd_draft_role') || '');
    const [jdText, setJdText] = useState(() => localStorage.getItem('jd_draft_text') || '');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);

    // Auto-save drafts as user types
    useEffect(() => {
        localStorage.setItem('jd_draft_company', company || '');
        localStorage.setItem('jd_draft_role', role || '');
        localStorage.setItem('jd_draft_text', jdText || '');
    }, [company, role, jdText]);

    const handleAnalyze = (e) => {
        e.preventDefault();
        try {
            if (!jdText || !jdText.trim()) {
                setError('Job Description is required.');
                return;
            }

            const analysis = analyzeJD(company || '', role || '', jdText);
            if (!analysis) {
                setError('Analysis failed. Please try with a longer Job Description.');
                return;
            }

            saveToHistory(analysis);
            setAnalysisResult(analysis);
            setShowModal(true);

            // Clear drafts ONLY on successful state update
            localStorage.removeItem('jd_draft_company');
            localStorage.removeItem('jd_draft_role');
            localStorage.removeItem('jd_draft_text');
        } catch (err) {
            console.error("Analysis Error:", err);
            setError('An unexpected error occurred during analysis.');
        }
    };

    const isShortJD = jdText.trim().length > 0 && jdText.trim().length < 200;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex flex-col space-y-2 mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Job Description Analyzer</h1>
            </div>

            <form onSubmit={handleAnalyze} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <Building size={16} /> Company Name
                            </label>
                            <input
                                type="text"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                placeholder="e.g. Google, Amazon, Startup"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <UserCircle size={16} /> Job Role
                            </label>
                            <input
                                type="text"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                placeholder="e.g. SDE-1, Frontend Engineer"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Job Description</label>
                            <textarea
                                value={jdText}
                                onChange={(e) => {
                                    setJdText(e.target.value);
                                    if (error) setError('');
                                }}
                                rows={12}
                                required
                                placeholder="Paste the full job description here..."
                                className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-500' : 'border-slate-200'} focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none`}
                            ></textarea>
                            {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
                        </div>

                        {isShortJD && (
                            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-start gap-3">
                                <AlertCircle size={20} className="text-amber-500 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-amber-800 font-medium">
                                    This JD is too short to analyze deeply. Paste full JD for better output.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-4">
                        <button
                            type="submit"
                            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-slate-800 hover:shadow-2xl hover:shadow-slate-900/20 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-lg"
                        >
                            <Search size={24} /> Save & Analyze Readiness
                        </button>
                    </div>
                </div>
            </form>

            {/* Analysis Result Modal */}
            {showModal && analysisResult && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
                    <div className="bg-slate-50 w-full max-w-5xl h-full max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-white/20 animate-in zoom-in-95 duration-300">
                        {/* Modal Header */}
                        <header className="p-8 bg-white border-b border-slate-100 flex items-center justify-between shrink-0">
                            <div>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                                    <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center">
                                        <Zap size={20} />
                                    </div>
                                    Strategic Intelligence Report
                                </h2>
                                <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest mt-1">
                                    {analysisResult.role} @ {analysisResult.company || 'Confidential'}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
                            </button>
                        </header>

                        {/* Modal Content - Scrollable */}
                        <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-12">
                            {/* 1. Overview */}
                            {analysisResult.roleReport?.overview && (
                                <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                                    <p className="text-lg text-slate-600 leading-relaxed font-medium italic">
                                        "{analysisResult.roleReport.overview.summary}"
                                    </p>
                                    <div className="flex flex-wrap gap-4">
                                        {Object.entries(analysisResult.roleReport.overview).filter(([k]) => k !== 'summary').map(([key, val]) => (
                                            <div key={key} className="bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100 min-w-[120px]">
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{key}</p>
                                                <p className="font-bold text-slate-900 text-sm">{val}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* 2. Complexity */}
                                {analysisResult.roleReport?.complexity && (
                                    <section className="bg-slate-900 p-8 rounded-[2rem] text-white space-y-8">
                                        <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Complexity Matrix</h4>
                                        <div className="space-y-6">
                                            {Object.entries(analysisResult.roleReport.complexity).filter(([k]) => typeof k === 'string' && k !== 'performanceMetric').map(([key, val]) => (
                                                <div key={key} className="space-y-2">
                                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                                                        <span>{key}</span>
                                                        <span className="text-white">{val}/10</span>
                                                    </div>
                                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                        <div className="h-full bg-indigo-500 transition-all duration-1000" style={{ width: `${(val || 0) * 10}%` }}></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* 3. Compensation & Growth */}
                                <section className="space-y-6">
                                    {analysisResult.roleReport?.compensation && (
                                        <div className="bg-emerald-50 p-8 rounded-[2rem] border border-emerald-100">
                                            <h4 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.3em] mb-4">Compensation Benchmarks</h4>
                                            <p className="text-3xl font-black text-emerald-900 mb-2">{analysisResult.roleReport.compensation.range}</p>
                                            <p className="text-sm font-bold text-emerald-700/70">{analysisResult.roleReport.compensation.marketFit}</p>
                                        </div>
                                    )}
                                    {analysisResult.roleReport?.growth && (
                                        <div className="bg-indigo-50 p-8 rounded-[2rem] border border-indigo-100">
                                            <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] mb-4">Trajectory Path</h4>
                                            <p className="text-md font-black text-indigo-900 mb-1">{analysisResult.roleReport.growth.pathway}</p>
                                            <p className="text-xs font-bold text-indigo-600/70 leading-relaxed">{analysisResult.roleReport.growth.mentorship}</p>
                                        </div>
                                    )}
                                </section>
                            </div>

                            {/* 4. Skills Grid */}
                            {analysisResult.roleReport?.skills && (
                                <section className="bg-white p-8 rounded-3xl border border-slate-100">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8">Role Competencies</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                        <div className="space-y-4">
                                            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Hard Skills</p>
                                            <div className="flex flex-wrap gap-2">
                                                {analysisResult.roleReport.skills.hard?.map(s => <span key={s} className="px-3 py-1.5 bg-slate-50 border border-slate-100 text-[10px] font-black text-slate-700 rounded-lg">{s}</span>)}
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Soft/Strategic</p>
                                            <div className="flex flex-wrap gap-2">
                                                {analysisResult.roleReport.skills.soft?.map(s => <span key={s} className="px-3 py-1.5 bg-slate-50 border border-slate-100 text-[10px] font-black text-slate-700 rounded-lg">{s}</span>)}
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* 5. Insights */}
                            {analysisResult.roleReport?.insights && (
                                <section className="bg-white border-2 border-slate-900 p-8 rounded-3xl shadow-[8px_8px_0_0_rgba(15,23,42,1)]">
                                    <h4 className="text-lg font-black text-slate-900 uppercase italic mb-6">Execution Insights</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-2 underline underline-offset-4">Ideal Profile</p>
                                            <p className="text-sm font-bold text-slate-600 leading-relaxed">{analysisResult.roleReport.insights.idealCandidate}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest flex items-center gap-2 underline underline-offset-4">Red Flags</p>
                                            <p className="text-sm font-bold text-slate-600 leading-relaxed">{analysisResult.roleReport.insights.redFlags}</p>
                                        </div>
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <footer className="p-8 bg-white border-t border-slate-100 flex items-center justify-between shrink-0">
                            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Full Readiness Score: {analysisResult.finalScore}/100</p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => navigate(`/assessment/${analysisResult.id}`)}
                                    className="bg-white text-slate-900 border-2 border-slate-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-50 transition-all flex items-center gap-3 active:scale-95"
                                >
                                    Take Assessment <Target size={14} />
                                </button>
                                <button
                                    onClick={() => navigate(`/results/${analysisResult.id}`)}
                                    className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 flex items-center gap-3 active:scale-95"
                                >
                                    View Detailed Roadmap <ChevronRight size={14} />
                                </button>
                            </div>
                        </footer>
                    </div>
                </div>
            )}
        </div>
    );
}

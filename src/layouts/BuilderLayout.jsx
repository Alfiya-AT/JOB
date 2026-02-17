import { Outlet, useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ShieldCheck, Rocket, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';

export default function BuilderLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;

    // Extract step number from path like "/rb/01-problem"
    const stepMatch = path.match(/\/rb\/(\d+)-/);
    const currentStepNum = stepMatch ? parseInt(stepMatch[1]) : (path.includes('proof') ? 9 : 0);

    // Gating logic: Check if previous steps are completed
    useEffect(() => {
        if (currentStepNum > 1 && currentStepNum <= 8) {
            for (let i = 1; i < currentStepNum; i++) {
                const artifact = localStorage.getItem(`rb_step_0${i}_artifact`);
                if (!artifact) {
                    // If a previous step is missing, redirect to the first unfinished step
                    navigate(`/rb/0${i}-${getStepSlug(i)}`);
                    break;
                }
            }
        }
        if (currentStepNum === 9) {
            // Proof check
            for (let i = 1; i <= 8; i++) {
                if (!localStorage.getItem(`rb_step_0${i}_artifact`)) {
                    navigate(`/rb/0${i}-${getStepSlug(i)}`);
                    break;
                }
            }
        }
    }, [currentStepNum, navigate]);

    const getStepSlug = (num) => {
        const slugs = ["", "problem", "market", "architecture", "hld", "lld", "build", "test", "ship"];
        return slugs[num];
    };

    const getStatus = () => {
        let completed = 0;
        for (let i = 1; i <= 8; i++) {
            if (localStorage.getItem(`rb_step_0${i}_artifact`)) completed++;
        }
        return completed === 8 ? "Shipped" : "In Progress";
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            {/* Top Bar */}
            <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <Link to="/dashboard" className="text-xl font-bold text-primary tracking-tight">AI Resume Builder</Link>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest hidden md:block">Project 3 — </span>
                    <span className="text-[11px] font-bold text-slate-700">Step {currentStepNum === 9 ? 'Final' : currentStepNum} of 8</span>
                </div>

                <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatus() === 'Shipped'
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-600'
                            : 'bg-indigo-50 border-indigo-100 text-indigo-600'
                        }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${getStatus() === 'Shipped' ? 'bg-emerald-500 animate-pulse' : 'bg-indigo-500'}`}></div>
                        <span className="text-[10px] font-black uppercase tracking-widest">{getStatus()}</span>
                    </div>
                </div>
            </header>

            {/* Main Container */}
            <main className="flex-1 flex overflow-hidden">
                {/* Workspace (70%) */}
                <div className="w-[70%] overflow-auto p-12 bg-white">
                    <Outlet />
                </div>

                {/* Secondary Build Panel (30%) */}
                <aside className="w-[30%] border-l border-slate-200 bg-slate-50 overflow-auto p-8">
                    <BuildPanel stepNum={currentStepNum} />
                </aside>
            </main>

            {/* Proof Footer */}
            <footer className="h-12 bg-white border-t border-slate-200 flex items-center justify-between px-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span>AI Resume Builder — Build Track 2026</span>
                <div className="flex items-center gap-4">
                    <Link to="/rb/proof" className="hover:text-primary transition-colors flex items-center gap-1">
                        <ShieldCheck size={12} /> View Proof Manifest
                    </Link>
                </div>
            </footer>
        </div>
    );
}

function BuildPanel({ stepNum }) {
    const [artifact, setArtifact] = useState("");
    const [feedback, setFeedback] = useState(null); // 'worked', 'error', 'screenshot'
    const key = `rb_step_0${stepNum}_artifact`;

    useEffect(() => {
        const saved = localStorage.getItem(key);
        if (saved) setArtifact(saved);
        else setArtifact("");
        setFeedback(null);
    }, [stepNum, key]);

    const handleCopy = () => {
        navigator.clipboard.writeText(artifact).then(() => alert("Copied to clipboard!"));
    };

    const handleSave = () => {
        if (!artifact.trim()) return;
        localStorage.setItem(key, artifact);
        window.dispatchEvent(new Event('storage')); // Trigger re-render in other components if needed
        alert("Artifact Saved. Next step unlocked.");
    };

    if (stepNum > 8 || stepNum === 0) return (
        <div className="text-center py-20">
            <Rocket size={48} className="text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Certification Phase</p>
        </div>
    );

    return (
        <div className="space-y-8">
            <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <ChevronRight size={14} className="text-primary" /> Copy This Into Lovable
                </label>
                <textarea
                    value={artifact}
                    onChange={(e) => setArtifact(e.target.value)}
                    rows={12}
                    className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-sm font-mono focus:ring-2 focus:ring-primary/10 outline-none transition-all resize-none"
                    placeholder="Paste the step artifact here..."
                />
                <div className="flex gap-2">
                    <button
                        onClick={handleCopy}
                        className="flex-1 bg-white border border-slate-200 py-3 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                    >
                        <Copy size={14} /> Copy Code
                    </button>
                    <button
                        onClick={() => window.open('https://lovable.dev', '_blank')}
                        className="flex-1 bg-primary text-white py-3 rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-primary/20 transition-all"
                    >
                        Build in Lovable
                    </button>
                </div>
            </div>

            <div className="space-y-4 pt-8 border-t border-slate-200">
                <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest">Verification Status</label>
                <div className="grid grid-cols-1 gap-2">
                    {[
                        { id: 'worked', label: 'It Worked', color: 'peer-checked:bg-emerald-50 peer-checked:border-emerald-200 peer-checked:text-emerald-700' },
                        { id: 'error', label: 'Error (Need Fix)', color: 'peer-checked:bg-red-50 peer-checked:border-red-200 peer-checked:text-red-700' },
                        { id: 'screenshot', label: 'Add Screenshot', color: 'peer-checked:bg-blue-50 peer-checked:border-blue-200 peer-checked:text-blue-700' }
                    ].map((opt) => (
                        <label key={opt.id} className="relative cursor-pointer">
                            <input
                                type="radio"
                                name="feedback"
                                className="sr-only peer"
                                checked={feedback === opt.id}
                                onChange={() => setFeedback(opt.id)}
                            />
                            <div className={`p-4 rounded-xl border border-slate-200 bg-white text-xs font-bold transition-all text-slate-500 ${opt.color}`}>
                                {opt.label}
                            </div>
                        </label>
                    ))}
                </div>
            </div>

            <button
                disabled={!artifact.trim()}
                onClick={handleSave}
                className={`w-full py-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all ${artifact.trim()
                        ? 'bg-slate-900 text-white hover:bg-black'
                        : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                    }`}
            >
                <CheckCircle2 size={18} /> Save & Unlock Next
            </button>
        </div>
    );
}

function Copy({ size }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>;
}

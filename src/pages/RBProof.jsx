import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    CheckCircle2,
    Link as LinkIcon,
    Github,
    Globe,
    Copy,
    Zap,
    Info,
    ShieldCheck,
    Rocket,
    AlertCircle,
    Check
} from 'lucide-react';

const steps = [
    "01: Problem Statement",
    "02: Market Analysis",
    "03: Architecture",
    "04: High Level Design",
    "05: Low Level Design",
    "06: Build Phase",
    "07: Test Checklist",
    "08: Deployment"
];

const checklistItems = [
    "All form sections save to localStorage",
    "Live preview updates in real-time",
    "Template switching preserves data",
    "Color theme persists after refresh",
    "ATS score calculates correctly",
    "Score updates live on edit",
    "Export buttons work (copy/download)",
    "Empty states handled gracefully",
    "Mobile responsive layout works",
    "No console errors on any page"
];

export default function RBProof() {
    const [links, setLinks] = useState({ lovable: '', github: '', deployed: '' });
    const [stepStatus, setStepStatus] = useState(new Array(8).fill(false));
    const [checklist, setChecklist] = useState(new Array(10).fill(false));
    const [copying, setCopying] = useState(false);

    useEffect(() => {
        // Load links
        const savedLinks = JSON.parse(localStorage.getItem('rb_final_submission') || '{"lovable":"","github":"","deployed":""}');
        setLinks(savedLinks);

        // Load step status
        const statuses = steps.map((_, i) => {
            return !!localStorage.getItem(`rb_step_0${i + 1}_artifact`);
        });
        setStepStatus(statuses);

        // Load checklist status
        const savedChecklist = JSON.parse(localStorage.getItem('rb_checklist_status') || '[]');
        if (savedChecklist.length === 10) {
            setChecklist(savedChecklist);
        }
    }, []);

    const handleLinkChange = (e) => {
        const { name, value } = e.target;
        const updatedLinks = { ...links, [name]: value };
        setLinks(updatedLinks);
        localStorage.setItem('rb_final_submission', JSON.stringify(updatedLinks));
    };

    const toggleChecklist = (index) => {
        const updated = [...checklist];
        updated[index] = !updated[index];
        setChecklist(updated);
        localStorage.setItem('rb_checklist_status', JSON.stringify(updated));
    };

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    };

    const allStepsDone = stepStatus.every(Boolean);
    const allTestsPassed = checklist.every(Boolean);
    const linksProvided = links.lovable && links.github && links.deployed &&
        isValidUrl(links.lovable) && isValidUrl(links.github) && isValidUrl(links.deployed);

    const isShipped = allStepsDone && allTestsPassed && linksProvided;

    const copyFinalSubmission = () => {
        const text = `------------------------------------------
AI Resume Builder — Final Submission

Lovable Project: ${links.lovable}
GitHub Repository: ${links.github}
Live Deployment: ${links.deployed}

Core Capabilities:
- Structured resume builder
- Deterministic ATS scoring
- Template switching
- PDF export with clean formatting
- Persistence + validation checklist
------------------------------------------`;

        setCopying(true);
        navigator.clipboard.writeText(text).then(() => {
            setTimeout(() => setCopying(false), 2000);
        });
    };

    return (
        <div className="max-w-5xl mx-auto space-y-12 pb-32 mt-12 px-6">
            {/* Header with Shipped Badge */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8">
                <div className="space-y-1">
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight">Project Proof & Submission</h1>
                    <p className="text-slate-500 font-medium">Verify structural integrity and finalize Project 3.</p>
                </div>
                <div className="flex items-center gap-3">
                    {isShipped ? (
                        <div className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 text-white rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-emerald-500/20 animate-in zoom-in duration-500">
                            <Rocket size={16} /> Shipped
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 px-6 py-2.5 bg-slate-100 text-slate-400 rounded-full text-xs font-black uppercase tracking-[0.2em]">
                            <Zap size={16} /> In Progress
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Status Overview */}
                <div className="lg:col-span-1 space-y-8">
                    {/* 8 Steps Overview */}
                    <section className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Zap size={14} className="text-indigo-500" /> Build Steps (8/8)
                        </h3>
                        <div className="space-y-2">
                            {steps.map((step, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 border border-slate-50">
                                    <span className="text-[11px] font-bold text-slate-600 truncate mr-2">{step}</span>
                                    {stepStatus[i] ? (
                                        <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                                    ) : (
                                        <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-200 shrink-0" />
                                    )}
                                </div>
                            ))}
                        </div>
                        {!allStepsDone && (
                            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                                <p className="text-[10px] font-bold text-amber-700 leading-tight">
                                    All 8 build steps must be marked completed in the Build Track.
                                </p>
                            </div>
                        )}
                    </section>
                </div>

                {/* Middle Column: Checklist */}
                <div className="lg:col-span-1">
                    <section className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-6 h-full">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <ShieldCheck size={14} className="text-indigo-500" /> Quality Checklist (10 Items)
                        </h3>
                        <div className="space-y-3">
                            {checklistItems.map((item, i) => (
                                <button
                                    key={i}
                                    onClick={() => toggleChecklist(i)}
                                    className="w-full flex items-start gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-all text-left group"
                                >
                                    <div className={`mt-0.5 w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all shrink-0 ${checklist[i] ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-200 bg-white group-hover:border-slate-400'}`}>
                                        {checklist[i] && <Check size={12} strokeWidth={4} />}
                                    </div>
                                    <span className={`text-[12px] font-bold leading-tight ${checklist[i] ? 'text-slate-900' : 'text-slate-500'}`}>
                                        {item}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column: Artifacts & Export */}
                <div className="lg:col-span-1 space-y-8">
                    <section className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm space-y-8">
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <LinkIcon size={14} className="text-indigo-500" /> Artifact Verification
                        </h3>

                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lovable Project</label>
                                <input
                                    type="url"
                                    name="lovable"
                                    value={links.lovable}
                                    onChange={handleLinkChange}
                                    placeholder="https://lovable.dev/..."
                                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50 text-xs font-bold outline-none transition-all ${links.lovable && !isValidUrl(links.lovable) ? 'border-red-200' : 'border-slate-100 focus:border-slate-900'}`}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">GitHub Repository</label>
                                <input
                                    type="url"
                                    name="github"
                                    value={links.github}
                                    onChange={handleLinkChange}
                                    placeholder="https://github.com/..."
                                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50 text-xs font-bold outline-none transition-all ${links.github && !isValidUrl(links.github) ? 'border-red-200' : 'border-slate-100 focus:border-slate-900'}`}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Deployment</label>
                                <input
                                    type="url"
                                    name="deployed"
                                    value={links.deployed}
                                    onChange={handleLinkChange}
                                    placeholder="https://..."
                                    className={`w-full px-4 py-3 rounded-xl border bg-slate-50 text-xs font-bold outline-none transition-all ${links.deployed && !isValidUrl(links.deployed) ? 'border-red-200' : 'border-slate-100 focus:border-slate-900'}`}
                                />
                            </div>
                        </div>

                        <button
                            onClick={copyFinalSubmission}
                            disabled={!linksProvided}
                            className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all ${linksProvided ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/10 hover:scale-[1.02] active:scale-98' : 'bg-slate-50 text-slate-300 cursor-not-allowed border border-slate-100'}`}
                        >
                            {copying ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Copy size={16} />}
                            {copying ? 'Submission Copied' : 'Copy Final Submission'}
                        </button>
                    </section>

                    {/* Shipped Confirmation */}
                    {isShipped && (
                        <div className="p-8 bg-emerald-50 rounded-[32px] border border-emerald-100 text-center space-y-4 animate-in slide-in-from-bottom-4 duration-1000">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto text-emerald-500 shadow-sm">
                                <Check size={24} strokeWidth={4} />
                            </div>
                            <p className="text-xl font-black text-emerald-900 tracking-tight leading-none">Project 3 Shipped Successfully.</p>
                            <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest opacity-60">Handshake complete. Verified Build.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Error/Warning Tray if not Shipped */}
            {!isShipped && (
                <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-8 duration-500">
                    <div className="px-8 py-4 bg-slate-900 text-white rounded-2xl shadow-2xl flex items-center gap-6 border border-white/10 backdrop-blur-xl">
                        <div className="flex items-center gap-2">
                            <AlertCircle size={16} className="text-amber-400" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Shipment Locked</span>
                        </div>
                        <div className="h-4 w-[1px] bg-white/20" />
                        <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest flex gap-4">
                            {!allStepsDone && <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Build Steps</span>}
                            {!allTestsPassed && <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Quality Tests</span>}
                            {!linksProvided && <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Valid Links</span>}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

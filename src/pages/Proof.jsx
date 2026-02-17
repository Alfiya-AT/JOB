import { useState, useEffect } from 'react';
import { getSubmissionData, saveSubmissionData, getPlatformStatus, getTestChecklist } from '../lib/analysisEngine';
import { CheckCircle2, Link as LinkIcon, Github, Globe, Copy, Zap, Info, ShieldCheck } from 'lucide-react';

const steps = [
    "Setup React + Vite",
    "Design Premium UI System",
    "Build Dashboard Components",
    "Implement Skill Extraction",
    "Create Strategy Generator",
    "Interactive Results System",
    "Persistent History Module",
    "Quality Assurance Testing"
];

export default function Proof() {
    const [links, setLinks] = useState({ lovable: '', github: '', deployed: '' });
    const [status, setStatus] = useState("In Progress");
    const [passedCount, setPassedCount] = useState(0);

    useEffect(() => {
        setLinks(getSubmissionData());
        setPassedCount(Object.values(getTestChecklist()).filter(Boolean).length);
        setStatus(getPlatformStatus());
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedLinks = { ...links, [name]: value };
        setLinks(updatedLinks);
        saveSubmissionData(updatedLinks);
        setStatus(getPlatformStatus());
    };

    const copySubmission = () => {
        const urlPattern = /^https?:\/\/.+/;
        if (!urlPattern.test(links.lovable) || !urlPattern.test(links.github) || !urlPattern.test(links.deployed)) {
            alert("Please provide all 3 valid artifact URLs (starting with http:// or https://) before exporting.");
            return;
        }
        const text = `------------------------------------------
Placement Readiness Platform — Final Submission

Lovable Project: ${links.lovable}
GitHub Repository: ${links.github}
Live Deployment: ${links.deployed}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence
------------------------------------------`;
        navigator.clipboard.writeText(text).then(() => alert("Final submission text copied to clipboard!"));
    };

    const isShipped = status === "Shipped";

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20">
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Project Certification & Proof</h1>
                <p className="text-slate-500 font-medium">Document your work and finalize the submission.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Step Completion Overview */}
                <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <CheckCircle2 size={20} className="text-primary" /> Step Completion Summary
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                        {steps.map((step, i) => (
                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                                <span className="text-sm font-bold text-slate-700">{step}</span>
                                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-full">Completed</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Artifact Inputs */}
                <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                        <ShieldCheck size={20} className="text-primary" /> Artifact Collection
                    </h3>
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <LinkIcon size={14} /> Lovable Project Link
                            </label>
                            <input
                                type="url"
                                name="lovable"
                                value={links.lovable}
                                onChange={handleChange}
                                placeholder="https://lovable.dev/projects/..."
                                className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 focus:ring-2 focus:ring-primary/10 outline-none text-sm font-medium"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Github size={14} /> GitHub Repository Link
                            </label>
                            <input
                                type="url"
                                name="github"
                                value={links.github}
                                onChange={handleChange}
                                placeholder="https://github.com/your-username/..."
                                className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 focus:ring-2 focus:ring-primary/10 outline-none text-sm font-medium"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                <Globe size={14} /> Live Deployment URL
                            </label>
                            <input
                                type="url"
                                name="deployed"
                                value={links.deployed}
                                onChange={handleChange}
                                placeholder="https://your-app.vercel.app"
                                className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 focus:ring-2 focus:ring-primary/10 outline-none text-sm font-medium"
                            />
                        </div>
                    </div>
                    <button
                        onClick={copySubmission}
                        className={`w-full py-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 transition-all ${links.lovable && links.github && links.deployed
                            ? 'bg-slate-900 text-white hover:bg-black'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            }`}
                    >
                        <Copy size={18} /> Copy Final Submission
                    </button>
                </section>
            </div>

            {/* Completion Message Logic */}
            {isShipped ? (
                <div className="bg-emerald-50 border-2 border-emerald-100 p-10 rounded-[40px] text-center space-y-6 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                    <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto text-white shadow-xl shadow-emerald-500/20">
                        <Zap size={32} />
                    </div>
                    <p className="text-2xl font-black text-emerald-900 leading-tight max-w-lg mx-auto italic">
                        "You built a real product. <br />
                        Not a tutorial. Not a clone. <br />
                        A structured tool that solves a real problem.<br /><br />
                        This is your proof of work."
                    </p>
                    <div className="flex items-center justify-center gap-2 text-emerald-600 font-bold uppercase tracking-widest text-xs">
                        <CheckCircle2 size={16} /> Project 1 Shipped Successfully
                    </div>
                </div>
            ) : (
                <div className="bg-amber-50 border border-amber-100 p-8 rounded-3xl flex items-center gap-6">
                    <div className="p-3 bg-amber-100 rounded-2xl text-amber-600">
                        <Info size={24} />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-amber-900">Ship Conditions Remaining</h4>
                        <p className="text-sm text-amber-700 font-medium">
                            {!isShipped && passedCount < 10 && "• Pass all 10 checklist items in QA. "}
                            {!isShipped && (!links.lovable || !links.github || !links.deployed) && "• Provide all 3 artifact links."}
                        </p>
                    </div>
                </div>
            )}

            <p className="text-center text-[10px] font-black text-slate-300 uppercase tracking-widest">
                Placement Readiness Platform — Certification Dashboard
            </p>
        </div>
    );
}

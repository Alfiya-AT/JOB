import { useResumeStore } from '../lib/resumeStore';
import ResumeNav from '../components/ResumeNav';
import { Mail, Phone, MapPin, Printer, Copy, AlertCircle, CheckCircle2, Github, ExternalLink, Smartphone, Layout, Zap, TrendingUp } from 'lucide-react';
import { useState } from 'react';

export default function ResumePreview() {
    const { resumeData, config, ats } = useResumeStore();
    const { personal, summary, education, experience, projects, skills } = resumeData;
    const { template, color } = config;
    const [copying, setCopying] = useState(false);

    const handlePrint = () => {
        window.print();
    };

    const copyAsText = () => {
        setCopying(true);
        const text = `
${personal.name || 'NAME'}
${personal.email} | ${personal.phone} | ${personal.location}
${personal.github ? `GitHub: ${personal.github}` : ''}
${personal.linkedin ? `LinkedIn: ${personal.linkedin}` : ''}

SUMMARY
${summary}

EXPERIENCE
${experience.map(exp => `${exp.role} @ ${exp.company} (${exp.duration})\n${exp.desc}`).join('\n\n')}

PROJECTS
${projects.map(proj => `${proj.title}\n${proj.desc}\nTech: ${proj.techStack.join(', ')}${proj.liveUrl ? `\nLive: ${proj.liveUrl}` : ''}`).join('\n\n')}

EDUCATION
${education.map(edu => `${edu.degree}, ${edu.school} (${edu.year})`).join('\n')}

SKILLS
Technical: ${skills.technical.join(', ')}
Soft Skills: ${skills.soft.join(', ')}
Tools: ${skills.tools.join(', ')}
        `.trim();

        navigator.clipboard.writeText(text).then(() => {
            setTimeout(() => setCopying(false), 2000);
        });
    };

    const getScoreLabel = (score) => {
        if (score <= 40) return { text: "Needs Work", color: "text-red-500", bg: "bg-red-50", border: "border-red-100", stroke: "#ef4444" };
        if (score <= 70) return { text: "Getting There", color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-100", stroke: "#f59e0b" };
        return { text: "Strong Resume", color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-100", stroke: "#10b981" };
    };

    const label = getScoreLabel(ats.score);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col print:bg-white overflow-x-hidden">
            <ResumeNav />

            {/* ATS Score & Suggestions Sidebar (Preview Only) */}
            <div className="fixed top-24 left-8 w-72 space-y-6 print:hidden">
                <div className={`p-6 rounded-3xl bg-white border border-slate-200 shadow-xl overflow-hidden relative`}>
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <TrendingUp size={80} />
                    </div>

                    <div className="flex flex-col items-center text-center space-y-4">
                        <div className="relative w-24 h-24">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="48" cy="48" r="40" stroke="#f1f5f9" strokeWidth="8" fill="transparent" />
                                <circle
                                    cx="48" cy="48" r="40" stroke={label.stroke} strokeWidth="8" fill="transparent"
                                    strokeDasharray={251.2}
                                    strokeDashoffset={251.2 - (ats.score / 100) * 251.2}
                                    strokeLinecap="round"
                                    className="transition-all duration-1000"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className={`text-2xl font-black ${label.color}`}>{ats.score}</span>
                                <span className="text-[8px] font-black uppercase opacity-30 text-slate-900 tracking-widest mt-0.5">points</span>
                            </div>
                        </div>

                        <div>
                            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${label.bg} ${label.color} ${label.border} border`}>
                                {label.text}
                            </span>
                        </div>
                    </div>

                    <div className="mt-8 space-y-4">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            Improvement Suggestions
                        </h4>
                        <div className="space-y-2">
                            {ats.suggestions.length > 0 ? (
                                ats.suggestions.map((s, i) => (
                                    <div key={i} className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 group hover:border-slate-200 transition-all">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-1.5 flex-shrink-0 group-hover:bg-slate-900" />
                                        <span className="text-[11px] font-bold text-slate-600 leading-tight">
                                            {s.text} <span className="text-slate-900 opacity-40 ml-1">(+{s.points})</span>
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-2 text-emerald-700">
                                    <CheckCircle2 size={14} />
                                    <span className="text-[11px] font-bold">Document Fully Optimized!</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between shadow-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                            <Zap size={14} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-50">Current Theme</p>
                            <p className="text-[11px] font-bold">{template} – {config.color.split(',')[0].replace('hsl(', '')}H</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4 print:hidden">
                <button
                    onClick={copyAsText}
                    className="flex items-center justify-center gap-2 px-6 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-slate-50 transition-all active:scale-95"
                >
                    {copying ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Copy size={16} />}
                    {copying ? 'Copied as Text' : 'Copy Text'}
                </button>
                <button
                    onClick={handlePrint}
                    className="flex items-center justify-center gap-2 px-8 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl hover:scale-105 transition-all active:scale-95"
                >
                    <Printer size={18} /> Print / Export PDF
                </button>
            </div>

            <main className="flex-1 py-12 px-6 flex justify-center overflow-auto print:p-0 print:overflow-visible">
                {/* Resume Canvas */}
                <div className="w-full max-w-[210mm] min-h-[297mm] bg-white text-black shadow-2xl print:shadow-none transition-all duration-500 relative overflow-hidden">

                    {template === 'Modern' ? (
                        <div className="flex min-h-[297mm] text-black bg-white">
                            {/* Left Sidebar */}
                            <aside className="w-[32%] text-white p-10 space-y-10" style={{ backgroundColor: color }}>
                                <div className="space-y-6">
                                    <h1 className="text-4xl font-black uppercase tracking-tighter leading-none">{personal.name || 'NAME'}</h1>
                                    <div className="space-y-3 opacity-90 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                                        <div className="flex items-center gap-2"><Mail size={12} /> {personal.email}</div>
                                        <div className="flex items-center gap-2"><Smartphone size={12} /> {personal.phone}</div>
                                        <div className="flex items-center gap-2"><Layout size={12} /> {personal.location}</div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] pb-1 border-b border-white/20">Technical Core</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {skills.technical.map((s, i) => (
                                            <span key={i} className="bg-white/10 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">{s}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] pb-1 border-b border-white/20">Education</h4>
                                    <div className="space-y-6">
                                        {education.map((edu, i) => (
                                            <div key={i} className="space-y-1">
                                                <div className="text-[11px] font-black uppercase">{edu.degree}</div>
                                                <div className="text-[10px] opacity-70 font-bold italic">{edu.school}</div>
                                                <div className="text-[9px] opacity-40 uppercase tracking-widest">{edu.year}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </aside>

                            {/* Main Content */}
                            <main className="flex-1 p-12 space-y-12">
                                <section className="space-y-4">
                                    <h2 className="text-[11px] font-black uppercase tracking-[0.4em]" style={{ color }}>Professional Summary</h2>
                                    <p className="text-[13px] leading-relaxed opacity-80 text-justify">{summary}</p>
                                </section>

                                <section className="space-y-6">
                                    <h2 className="text-[11px] font-black uppercase tracking-[0.4em]" style={{ color }}>Work Experience</h2>
                                    <div className="space-y-8">
                                        {experience.map((e, i) => (
                                            <div key={i} className="space-y-2 break-inside-avoid">
                                                <div className="flex justify-between font-black text-sm">
                                                    <span className="uppercase tracking-tight">{e.role} @ {e.company}</span>
                                                    <span className="opacity-40 text-[10px] mt-1">{e.duration}</span>
                                                </div>
                                                <p className="opacity-70 text-[12px] italic leading-relaxed">{e.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section className="space-y-6">
                                    <h2 className="text-[11px] font-black uppercase tracking-[0.4em]" style={{ color }}>Selected Projects</h2>
                                    <div className="grid grid-cols-1 gap-6">
                                        {projects.map((p, idx) => (
                                            <div key={idx} className="space-y-2 group border-l-4 pl-6 break-inside-avoid" style={{ borderColor: `${color}20` }}>
                                                <div className="flex items-center justify-between">
                                                    <div className="font-black uppercase text-sm tracking-tight">{p.title}</div>
                                                    <div className="flex gap-2">
                                                        {p.githubUrl && <Github size={12} className="opacity-30" />}
                                                        {p.liveUrl && <ExternalLink size={12} className="opacity-30" />}
                                                    </div>
                                                </div>
                                                <p className="opacity-70 text-[11px] leading-relaxed">{p.desc}</p>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {p.techStack.map((tech, ti) => (
                                                        <span key={ti} className="bg-slate-50 text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider text-slate-400">{tech}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </main>
                        </div>
                    ) : template === 'Minimal' ? (
                        <div className="p-20 space-y-20 text-black font-sans bg-white min-h-[297mm]">
                            <header className="space-y-6 border-b border-slate-100 pb-12">
                                <h1 className="text-6xl font-light tracking-tighter text-slate-900">{personal.name || 'NAME'}</h1>
                                <div className="flex flex-wrap gap-8 text-[10px] font-bold opacity-30 uppercase tracking-[0.3em]">
                                    {personal.email && <span>{personal.email}</span>}
                                    {personal.phone && <span>{personal.phone}</span>}
                                    {personal.location && <span>{personal.location}</span>}
                                </div>
                            </header>

                            <div className="space-y-20">
                                <div className="grid grid-cols-[160px_1fr] gap-12">
                                    <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-20 mt-1">Focus</p>
                                    <p className="text-lg leading-relaxed font-light text-slate-600 italic">"{summary}"</p>
                                </div>

                                <div className="grid grid-cols-[160px_1fr] gap-12">
                                    <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-20 mt-1">Experience</p>
                                    <div className="space-y-12">
                                        {experience.map((e, i) => (
                                            <div key={i} className="space-y-3 break-inside-avoid">
                                                <div className="text-xl font-medium tracking-tight text-slate-800">{e.role} — {e.company}</div>
                                                <div className="text-[10px] font-black opacity-30 uppercase tracking-widest">{e.duration}</div>
                                                <p className="text-sm opacity-60 font-light leading-relaxed max-w-xl">{e.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-[160px_1fr] gap-12">
                                    <p className="text-[10px] font-black uppercase tracking-[0.5em] opacity-20 mt-1">Abilities</p>
                                    <div className="flex flex-wrap gap-x-10 gap-y-4">
                                        {skills.technical.map((s, i) => (
                                            <span key={i} className="text-sm font-bold tracking-tight text-slate-800" style={{ color }}>{s}</span>
                                        ))}
                                        {[...skills.soft, ...skills.tools].map((s, i) => (
                                            <span key={i} className="text-sm opacity-30 font-medium">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        /* Classic Template */
                        <div className="p-16 text-black leading-tight font-serif min-h-[297mm] bg-white">
                            <header className="text-center space-y-4 mb-12">
                                <h1 className="text-5xl font-black uppercase italic tracking-tighter" style={{ color }}>{personal.name || 'YOUR NAME'}</h1>
                                <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 opacity-60 font-black uppercase tracking-[0.2em] text-[10px]">
                                    {personal.email && <span>{personal.email}</span>}
                                    {personal.phone && <span>• {personal.phone}</span>}
                                    {personal.location && <span>• {personal.location}</span>}
                                </div>
                                <div className="h-1 w-full bg-slate-900 mt-6" style={{ backgroundColor: color }} />
                            </header>

                            <div className="space-y-12">
                                <section className="space-y-4">
                                    <h2 className="font-black uppercase tracking-[0.5em] text-[11px] border-b border-slate-100 pb-2" style={{ color }}>Professional Summary</h2>
                                    <p className="text-[13px] text-justify leading-relaxed opacity-80">{summary}</p>
                                </section>

                                <section className="space-y-8">
                                    <h2 className="font-black uppercase tracking-[0.5em] text-[11px] border-b border-slate-100 pb-2" style={{ color }}>History & Experience</h2>
                                    <div className="space-y-10">
                                        {experience.map((e, idx) => (
                                            <div key={idx} className="space-y-3 break-inside-avoid">
                                                <div className="flex justify-between font-black text-lg">
                                                    <span className="uppercase tracking-tight">{e.role} @ {e.company}</span>
                                                    <span className="opacity-40 text-xs mt-1">{e.duration}</span>
                                                </div>
                                                <p className="opacity-80 leading-relaxed text-[13px]">{e.desc}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section className="space-y-6">
                                    <h2 className="font-black uppercase tracking-[0.5em] text-[11px] border-b border-slate-100 pb-2" style={{ color }}>Technical Competencies</h2>
                                    <div className="flex flex-wrap gap-3">
                                        {skills.technical.map((s, i) => (
                                            <span key={i} className="text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg" style={{ backgroundColor: color }}>{s}</span>
                                        ))}
                                        {[...skills.soft, ...skills.tools].map((s, i) => (
                                            <span key={i} className="text-slate-400 font-bold uppercase tracking-widest text-[10px] flex items-center">
                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-200 mx-3" />
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </section>

                                <section className="space-y-6">
                                    <h2 className="font-black uppercase tracking-[0.5em] text-[11px] border-b border-slate-100 pb-2" style={{ color }}>Higher Education</h2>
                                    <div className="space-y-6">
                                        {education.map((edu, idx) => (
                                            <div key={idx} className="flex justify-between items-baseline text-sm break-inside-avoid">
                                                <div className="font-black uppercase tracking-tight">{edu.degree} <span className="opacity-40 ml-2 font-bold">• {edu.school}</span></div>
                                                <span className="font-black opacity-20 text-[10px] uppercase tracking-widest">{edu.year}</span>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    @page { margin: 15mm; size: A4; }
                    body { background: white !important; }
                    nav, .print\\:hidden, .fixed { display: none !important; }
                    .shadow-2xl { box-shadow: none !important; }
                    * { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    .break-inside-avoid { break-inside: avoid; }
                }
            `}} />
        </div>
    );
}

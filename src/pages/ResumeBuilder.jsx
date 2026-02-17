import { useState, useMemo, useEffect } from 'react';
import { useResumeStore } from '../lib/resumeStore';
import ResumeNav from '../components/ResumeNav';
import {
    User,
    FileText,
    Briefcase,
    GraduationCap,
    Code,
    Link as LinkIcon,
    Plus,
    Trash2,
    Database,
    Eye,
    Zap,
    AlertCircle,
    CheckCircle2,
    Smartphone,
    Layout,
    Type,
    ChevronDown,
    ChevronUp,
    Github,
    ExternalLink,
    X,
    Sparkles,
    Check,
    Download,
    Mail,
    Target,
    Activity,
    Search
} from 'lucide-react';

const ACTION_VERBS = [
    'Achieved', 'Surpassed', 'Exceeded', 'Delivered', 'Generated', 'Increased',
    'Engineered', 'Architected', 'Developed', 'Implemented', 'Automated', 'Optimized'
];

const COLORS = [
    { name: 'Charcoal', value: 'hsl(0, 0%, 15%)' },
    { name: 'Navy', value: 'hsl(220, 60%, 25%)' },
    { name: 'Slate', value: 'hsl(215, 30%, 30%)' }
];

const TEMPLATES = [
    { id: 'Classic', icon: Layout, desc: 'ATS-standard, high parsing accuracy' },
    { id: 'Minimal', icon: Type, desc: 'Maximum legibility for recruiters' }
];

export default function ResumeBuilder() {
    const { resumeData, setResumeData, loadSample, ats, config, setTemplate, setColor } = useResumeStore();
    const [suggesting, setSuggesting] = useState(false);
    const [toast, setToast] = useState(null);

    const updateField = (path, value) => {
        const keys = path.split('.');
        const updated = { ...resumeData };
        let current = updated;
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        setResumeData(updated);
    };

    const addItem = (category, templateObj) => {
        const updated = { ...resumeData };
        updated[category] = [...updated[category], templateObj];
        setResumeData(updated);
    };

    const removeItem = (category, index) => {
        const updated = { ...resumeData };
        updated[category] = updated[category].filter((_, i) => i !== index);
        setResumeData(updated);
    };

    const suggestSkills = () => {
        setSuggesting(true);
        setTimeout(() => {
            const updated = { ...resumeData };
            // Simple logic: if JD exists, suggest from JD
            const jdKeywords = updated.jdText ? updated.jdText.match(/\b(React|Node|AWS|Docker|Kubernetes|TypeScript|Python|SQL|CI\/CD)\b/gi) : [];
            const newSkills = jdKeywords || ["TypeScript", "React", "Node.js", "System Design"];
            updated.skills.technical = [...new Set([...updated.skills.technical, ...newSkills])];
            setResumeData(updated);
            setSuggesting(false);
        }, 1000);
    };

    const handleDownload = () => {
        setToast("Resume export optimized for ATS reading!");
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <ResumeNav />

            {toast && (
                <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="bg-slate-900 text-white border border-white/10 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3">
                        <CheckCircle2 size={18} className="text-emerald-400" />
                        <span className="text-sm font-bold tracking-tight">{toast}</span>
                    </div>
                </div>
            )}

            <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                {/* Left: Input Console */}
                <div className="w-full lg:w-[60%] overflow-y-auto p-6 md:p-12 bg-white border-b lg:border-b-0 lg:border-r border-slate-200/60 lg:h-[calc(100vh-64px)] scrollbar-hide">
                    <div className="max-w-2xl mx-auto space-y-16 pb-32">
                        <header className="flex flex-col md:flex-row items-center justify-between border-b border-slate-50 pb-8 gap-6">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Resume Rebuild.</h1>
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">ATS Optimization & Content Engineering</p>
                            </div>
                            <button
                                onClick={loadSample}
                                className="w-full md:w-auto bg-slate-50 border border-slate-200 text-slate-900 px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all rounded-xl"
                            >
                                Load High-Impact Sample
                            </button>
                        </header>

                        {/* Target Strategy */}
                        <Section title="Target Intelligence" icon={Target}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input label="Target Position" value={resumeData.targetRole} onChange={(v) => updateField('targetRole', v)} placeholder="e.g. Senior Software Engineer" />
                                <Input label="Target Company" value={resumeData.targetCompany} onChange={(v) => updateField('targetCompany', v)} placeholder="e.g. Microsoft/Workday" />
                            </div>
                            <div className="mt-6">
                                <Textarea
                                    label="Target Job Description (Paste JD for Keyword Mapping)"
                                    value={resumeData.jdText}
                                    onChange={(v) => updateField('jdText', v)}
                                    rows={5}
                                    placeholder="Paste the full JD text here to calculate match score..."
                                />
                            </div>
                        </Section>

                        <Section title="Contact Information" icon={User}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input label="Full Name" value={resumeData.personal.name} onChange={(v) => updateField('personal.name', v)} />
                                <Input label="Email Address" value={resumeData.personal.email} onChange={(v) => updateField('personal.email', v)} />
                                <Input label="Phone Number" value={resumeData.personal.phone} onChange={(v) => updateField('personal.phone', v)} />
                                <Input label="City, State" value={resumeData.personal.location} onChange={(v) => updateField('personal.location', v)} />
                            </div>
                        </Section>

                        <Section title="Professional Summary" icon={FileText}>
                            <Textarea
                                placeholder="ATS-Optimized Summary: [Role Title] with [Years] exp. specializing in [Top 3 JD Keywords]. Proven history of [Quantified Achievement]."
                                value={resumeData.summary}
                                onChange={(v) => updateField('summary', v)}
                            />
                        </Section>

                        <Section title="Professional Experience" icon={Briefcase} onAdd={() => addItem('experience', { company: '', role: '', duration: '', desc: '' })}>
                            {resumeData.experience.map((item, i) => (
                                <Entry key={i} onRemove={() => removeItem('experience', i)}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                        <Input label="Organization" value={item.company} onChange={(v) => {
                                            const updated = [...resumeData.experience];
                                            updated[i].company = v;
                                            setResumeData({ ...resumeData, experience: updated });
                                        }} />
                                        <Input label="Position Title" value={item.role} onChange={(v) => {
                                            const updated = [...resumeData.experience];
                                            updated[i].role = v;
                                            setResumeData({ ...resumeData, experience: updated });
                                        }} />
                                    </div>
                                    <Input label="MM/YYYY - Present" value={item.duration} onChange={(v) => {
                                        const updated = [...resumeData.experience];
                                        updated[i].duration = v;
                                        setResumeData({ ...resumeData, experience: updated });
                                    }} />
                                    <div className="mt-4">
                                        <Textarea
                                            label="Achievements (STAR Method)"
                                            value={item.desc}
                                            showGuidance
                                            onChange={(v) => {
                                                const updated = [...resumeData.experience];
                                                updated[i].desc = v;
                                                setResumeData({ ...resumeData, experience: updated });
                                            }}
                                        />
                                    </div>
                                </Entry>
                            ))}
                        </Section>

                        <Section title="Education" icon={GraduationCap} onAdd={() => addItem('education', { school: '', degree: '', year: '' })}>
                            {resumeData.education.map((item, i) => (
                                <Entry key={i} onRemove={() => removeItem('education', i)}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Input label="Institution Name" value={item.school} onChange={(v) => {
                                            const updated = [...resumeData.education];
                                            updated[i].school = v;
                                            setResumeData({ ...resumeData, education: updated });
                                        }} />
                                        <Input label="Degree & Major" value={item.degree} onChange={(v) => {
                                            const updated = [...resumeData.education];
                                            updated[i].degree = v;
                                            setResumeData({ ...resumeData, education: updated });
                                        }} />
                                    </div>
                                    <div className="mt-4">
                                        <Input label="Graduation Date" value={item.year} onChange={(v) => {
                                            const updated = [...resumeData.education];
                                            updated[i].year = v;
                                            setResumeData({ ...resumeData, education: updated });
                                        }} />
                                    </div>
                                </Entry>
                            ))}
                        </Section>

                        <Section title="Technical Core & Skills" icon={Zap}>
                            <div className="space-y-8">
                                <div className="flex justify-end">
                                    <button
                                        onClick={suggestSkills}
                                        disabled={suggesting}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 disabled:opacity-50"
                                    >
                                        <Sparkles size={14} className={suggesting ? 'animate-spin' : ''} />
                                        {suggesting ? 'Mapping JD Keywords...' : 'Sync JD Keywords'}
                                    </button>
                                </div>

                                <TagInput
                                    label="Hard Skills (Exactly as per JD)"
                                    tags={resumeData.skills.technical}
                                    setTags={(tags) => updateField('skills.technical', tags)}
                                    placeholder="Add core technologies..."
                                />
                                <TagInput
                                    label="Methodologies & Tools"
                                    tags={resumeData.skills.tools}
                                    setTags={(tags) => updateField('skills.tools', tags)}
                                    placeholder="Add agile, scrum, git..."
                                />
                            </div>
                        </Section>

                        <Section title="Online Presence" icon={LinkIcon}>
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="GitHub Profile" value={resumeData.personal.github} onChange={(v) => updateField('personal.github', v)} />
                                <Input label="LinkedIn Profile" value={resumeData.personal.linkedin} onChange={(v) => updateField('personal.linkedin', v)} />
                            </div>
                        </Section>
                    </div>
                </div>

                {/* Right: Optimization Engine */}
                <div className="w-full lg:w-[40%] bg-slate-50 flex flex-col h-full lg:h-[calc(100vh-64px)] border-l border-slate-200">
                    <div className="p-8 space-y-8 overflow-y-auto scrollbar-hide">
                        {/* Score Panel */}
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white space-y-8 shadow-2xl">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">ATS Match Score</p>
                                    <h2 className="text-6xl font-black tabular-nums tracking-tighter">{ats.score}%</h2>
                                </div>
                                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                                    <Activity size={32} className="text-indigo-400" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-end text-[10px] font-black uppercase tracking-widest">
                                    <span>Keyword Density</span>
                                    <span className="text-indigo-400">{ats.score > 80 ? 'EXPERT' : 'OPTIMIZING'}</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 rounded-full transition-all duration-1000" style={{ width: `${ats.score}%` }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Recommendations */}
                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                            <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
                                <Zap size={14} className="text-amber-500" /> Optimization Report
                            </h3>
                            <div className="space-y-4">
                                {ats.report.map((item, i) => (
                                    <div key={i} className="flex gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                                        {item.type === 'critical' ? <AlertCircle size={18} className="text-rose-500 shrink-0 mt-0.5" /> : <Zap size={18} className="text-amber-500 shrink-0 mt-0.5" />}
                                        <p className="text-xs font-bold text-slate-700 leading-relaxed">{item.text}</p>
                                    </div>
                                ))}
                                {ats.missingKeywords.length > 0 && (
                                    <div className="mt-6 space-y-4">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Missing Critical Keywords</p>
                                        <div className="flex flex-wrap gap-2">
                                            {ats.missingKeywords.map(k => (
                                                <span key={k} className="px-3 py-1.5 bg-rose-50 text-rose-600 rounded-lg text-[10px] font-black uppercase border border-rose-100">{k}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {ats.report.length === 0 && (
                                    <div className="flex flex-col items-center py-8 text-center space-y-3">
                                        <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center">
                                            <CheckCircle2 size={24} />
                                        </div>
                                        <p className="text-xs font-bold text-slate-500">Resume is highly optimized for parsed reading.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={handleDownload}
                                className="flex-1 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 shadow-xl hover:-translate-y-1 transition-all"
                            >
                                <Download size={16} /> Export ATS-DOCX
                            </button>
                            <div className="w-full flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                                {TEMPLATES.map(t => (
                                    <button
                                        key={t.id}
                                        onClick={() => setTemplate(t.id)}
                                        className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${config.template === t.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 opacity-60'}`}
                                    >
                                        {t.id}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Real-time Preview */}
                        <div className="relative pt-4 overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white">
                            <div className="absolute top-4 right-8 z-10">
                                <span className="px-3 py-1 bg-slate-900 text-white text-[8px] font-black uppercase rounded-full">Live Preview</span>
                            </div>
                            <div className="p-8 bg-slate-50/30 overflow-hidden">
                                <div className="w-full shadow-lg origin-top scale-95 hover:scale-100 transition-transform">
                                    <CondensedPreview data={resumeData} config={config} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function Section({ title, icon: Icon, children, onAdd }) {
    return (
        <section className="space-y-6 animate-fade-in text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg shadow-slate-200">
                        <Icon size={20} />
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight italic">{title}</h3>
                    </div>
                </div>
                {onAdd && (
                    <button onClick={onAdd} className="p-3 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all border border-slate-100">
                        <Plus size={20} />
                    </button>
                )}
            </div>
            <div className="space-y-8">
                {children}
            </div>
        </section>
    );
}

function Entry({ children, onRemove }) {
    return (
        <div className="relative p-8 bg-slate-50/50 rounded-[2rem] border border-slate-200/50 group transition-all hover:border-indigo-100 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5">
            <button
                onClick={onRemove}
                className="absolute top-6 right-6 p-2.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all opacity-0 group-hover:opacity-100 shadow-sm bg-white"
            >
                <Trash2 size={16} />
            </button>
            {children}
        </div>
    );
}

function CondensedPreview({ data, config }) {
    const { personal, summary, experience, projects, education, skills } = data;
    const { template, color } = config;

    // Classic/ATS-Standard Preview
    return (
        <div className="p-12 text-black text-left leading-tight font-sans h-full bg-white select-none">
            <header className="text-center space-y-2 mb-8 border-b-2 pb-6" style={{ borderColor: color }}>
                <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">{personal.name || 'YOUR NAME'}</h1>
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 font-bold uppercase tracking-widest text-[7px] text-slate-500">
                    {personal.email && <span>{personal.email}</span>}
                    {personal.phone && <span>• {personal.phone}</span>}
                    {personal.location && <span>• {personal.location}</span>}
                    {personal.linkedin && <span>• {personal.linkedin}</span>}
                </div>
            </header>

            <div className="space-y-8">
                <section className="space-y-2">
                    <h4 className="font-black uppercase tracking-[0.2em] text-[8px] text-slate-400">Professional Summary</h4>
                    <p className="text-[9px] leading-relaxed text-slate-700">{summary}</p>
                </section>

                <section className="space-y-4">
                    <h4 className="font-black uppercase tracking-[0.2em] text-[8px] text-slate-400">Professional Experience</h4>
                    <div className="space-y-6">
                        {experience.map((e, idx) => (
                            <div key={idx} className="space-y-1.5">
                                <div className="flex justify-between font-black text-[10px] text-slate-900">
                                    <span className="uppercase tracking-tight">{e.role} | {e.company}</span>
                                    <span className="text-[8px] font-bold text-slate-400">{e.duration}</span>
                                </div>
                                <p className="text-[9px] leading-relaxed text-slate-600">• {e.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="space-y-4">
                    <h4 className="font-black uppercase tracking-[0.2em] text-[8px] text-slate-400">Technical Core</h4>
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                        {skills.technical.map((s, i) => (
                            <span key={i} className="text-[9px] font-black uppercase text-slate-800 tracking-tight">{s}</span>
                        ))}
                        {skills.tools.map((s, i) => (
                            <span key={i} className="text-[9px] font-bold text-slate-400 tracking-tight">• {s}</span>
                        ))}
                    </div>
                </section>

                <section className="space-y-4">
                    <h4 className="font-black uppercase tracking-[0.2em] text-[8px] text-slate-400">Education</h4>
                    {education.map((edu, idx) => (
                        <div key={idx} className="flex justify-between items-baseline text-[9px]">
                            <div className="font-black text-slate-900 uppercase">{edu.degree} | {edu.school}</div>
                            <span className="font-bold text-slate-400 text-[8px]">{edu.year}</span>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}

function TagInput({ label, tags, setTags, placeholder = "Add..." }) {
    const [input, setInput] = useState('');
    const addTag = () => { if (input.trim() && !tags.includes(input.trim())) { setTags([...tags, input.trim()]); setInput(''); } };
    const removeTag = (tag) => { setTags(tags.filter(t => t !== tag)); };
    return (
        <div className="space-y-3">
            {label && <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{label}</label>}
            <div className="flex flex-wrap gap-3 p-4 bg-white border border-slate-200 rounded-2xl focus-within:ring-4 focus-within:ring-indigo-500/5 focus-within:border-indigo-600 transition-all shadow-sm">
                {tags.map((tag, i) => (
                    <span key={i} className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase animate-in zoom-in-95 duration-200">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-rose-400 transition-colors"><X size={12} /></button>
                    </span>
                ))}
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    placeholder={placeholder}
                    className="flex-1 min-w-[140px] bg-transparent outline-none text-xs font-bold text-slate-900 placeholder:text-slate-300"
                />
            </div>
        </div>
    );
}

function Input({ label, value, onChange, placeholder, icon: Icon }) {
    return (
        <div className="space-y-2.5 flex-1">
            {label && <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{label}</label>}
            <div className="relative">
                {Icon && <Icon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />}
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                    className={`w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-900 focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 outline-none transition-all placeholder:text-slate-300 shadow-sm ${Icon ? 'pl-12' : ''}`}
                />
            </div>
        </div>
    );
}

function Textarea({ label, value, onChange, placeholder, rows = 3, showGuidance }) {
    const guidance = useMemo(() => {
        if (!showGuidance || !value) return null;
        const results = [];
        const firstWord = value.trim().split(/\s+/)[0];
        const hasVerb = ACTION_VERBS.some(v => v.toLowerCase() === firstWord?.toLowerCase());
        if (!hasVerb) results.push({ id: 'verb', text: 'Action Verb Required' });
        const hasNumber = /\d+/.test(value);
        if (!hasNumber) results.push({ id: 'metric', text: 'Needs Quantification (%)' });
        return results;
    }, [value, showGuidance]);

    return (
        <div className="space-y-3 w-full">
            <div className="flex items-center justify-between px-1">
                {label && <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</label>}
                {guidance && guidance.length > 0 && (
                    <div className="flex gap-2">
                        {guidance.map(g => (
                            <span key={g.id} className="text-[8px] font-black text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100 uppercase tracking-widest">
                                {g.text}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={rows}
                className="w-full px-5 py-5 bg-white border border-slate-200 rounded-[2rem] text-xs font-bold text-slate-900 focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-600 outline-none transition-all placeholder:text-slate-300 resize-none shadow-sm"
            />
        </div>
    );
}

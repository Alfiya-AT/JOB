import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotificationSettings() {
    const navigate = useNavigate();
    const [prefs, setPrefs] = useState(() => {
        const saved = localStorage.getItem('jobTrackerPreferences');
        return saved ? JSON.parse(saved) : {
            roleKeywords: "",
            preferredLocations: [],
            preferredMode: [],
            experienceLevel: "Fresher",
            skills: "",
            minMatchScore: 40
        };
    });

    useEffect(() => {
        localStorage.setItem('jobTrackerPreferences', JSON.stringify(prefs));
    }, [prefs]);

    const locations = ["Bangalore", "Chennai", "Hyderabad", "Pune", "Remote", "Delhi", "Mumbai"];
    const modes = ["Onsite", "Remote", "Hybrid"];

    const toggleMode = (mode) => {
        setPrefs(prev => ({
            ...prev,
            preferredMode: prev.preferredMode.includes(mode)
                ? prev.preferredMode.filter(m => m !== mode)
                : [...prev.preferredMode, mode]
        }));
    };

    const toggleLocation = (loc) => {
        setPrefs(prev => ({
            ...prev,
            preferredLocations: prev.preferredLocations.includes(loc)
                ? prev.preferredLocations.filter(l => l !== loc)
                : [...prev.preferredLocations, loc]
        }));
    };

    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        localStorage.setItem('jobTrackerPreferences', JSON.stringify(prefs));
        setTimeout(() => {
            setIsSaving(false);
            navigate('/jt/dashboard');
        }, 1500);
    };

    return (
        <div className="max-w-4xl animate-fade-in">
            <div className="mb-12">
                <h1 className="text-3xl md:text-4xl font-black mb-3 tracking-tight text-slate-900 uppercase">Tracking Protocol</h1>
                <p className="text-slate-500 font-medium text-sm">Fine-tune the matching engine to your specific career trajectory.</p>
            </div>

            <div className="space-y-10">
                <section className="space-y-4">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-accent">Role Target</label>
                    <input
                        type="text"
                        placeholder="e.g. SDE, Frontend, React, Junior"
                        className="w-full bg-white border border-slate-200 p-4 md:p-5 text-base md:text-lg font-bold text-slate-900 shadow-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-slate-200"
                        value={prefs.roleKeywords}
                        onChange={(e) => setPrefs({ ...prefs, roleKeywords: e.target.value })}
                    />
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Comma-separated keywords. Used for headline and description matching.</p>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <section className="space-y-4">
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-accent">Locations</label>
                        <div className="flex flex-wrap gap-2">
                            {locations.map(loc => (
                                <button
                                    key={loc}
                                    onClick={() => toggleLocation(loc)}
                                    className={`px-4 py-2.5 border text-[10px] font-black uppercase tracking-widest transition-all rounded shadow-sm ${prefs.preferredLocations.includes(loc)
                                        ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/10'
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                        }`}
                                >
                                    {loc}
                                </button>
                            ))}
                        </div>
                    </section>

                    <section className="space-y-4">
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-accent">Work Mode</label>
                        <div className="flex flex-wrap gap-2">
                            {modes.map(mode => (
                                <button
                                    key={mode}
                                    onClick={() => toggleMode(mode)}
                                    className={`px-4 py-2.5 border text-[10px] font-black uppercase tracking-widest transition-all rounded shadow-sm ${prefs.preferredMode.includes(mode)
                                        ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-slate-900/10'
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                                        }`}
                                >
                                    {mode}
                                </button>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <section className="space-y-4">
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-accent">Experience Level</label>
                        <div className="relative">
                            <select
                                className="w-full bg-white border border-slate-200 p-4 md:p-5 text-xs font-black outline-none appearance-none tracking-[0.2em] uppercase text-slate-900 cursor-pointer focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all shadow-sm"
                                value={prefs.experienceLevel}
                                onChange={(e) => setPrefs({ ...prefs, experienceLevel: e.target.value })}
                            >
                                <option>Fresher</option>
                                <option>0-1</option>
                                <option>1-3</option>
                                <option>3-5</option>
                            </select>
                            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300">
                                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-4">
                        <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-accent">Match Threshold ({prefs.minMatchScore}%)</label>
                        <div className="pt-4">
                            <input
                                type="range"
                                min="0" max="100"
                                className="w-full accent-slate-900 bg-slate-100 rounded-lg appearance-none h-1.5 cursor-pointer"
                                value={prefs.minMatchScore}
                                onChange={(e) => setPrefs({ ...prefs, minMatchScore: parseInt(e.target.value) })}
                            />
                            <div className="flex justify-between text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mt-3">
                                <span>Broad (40%)</span>
                                <span>Precise (90%)</span>
                            </div>
                        </div>
                    </section>
                </div>

                <section className="space-y-4">
                    <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-accent">Technical Skills</label>
                    <input
                        type="text"
                        placeholder="e.g. React, Java, Python, Node.js"
                        className="w-full bg-white border border-slate-200 p-4 md:p-5 text-base md:text-lg font-bold text-slate-900 shadow-sm outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all placeholder:text-slate-200"
                        value={prefs.skills}
                        onChange={(e) => setPrefs({ ...prefs, skills: e.target.value })}
                    />
                </section>

                <div className="pt-10 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Changes are saved locally</p>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`px-8 py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center gap-3 shadow-lg ${isSaving
                            ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                            : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/20 active:scale-95'
                            }`}
                    >
                        {isSaving ? (
                            <>
                                <svg className="animate-spin h-3 w-3 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Configuration Locked
                            </>
                        ) : 'Save Configuration'}
                    </button>
                </div>
            </div>
        </div>
    );
}

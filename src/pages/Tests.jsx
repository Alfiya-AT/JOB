import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTestChecklist, saveTestChecklist, resetTestChecklist } from '../lib/analysisEngine';
import { CheckCircle2, AlertTriangle, RefreshCcw, Info } from 'lucide-react';

const testItems = [
    { id: 1, label: "JD required validation works", hint: "Try to analyze without pasting any JD text." },
    { id: 2, label: "Short JD warning shows for <200 chars", hint: "Paste a single sentence and check for the amber warning box." },
    { id: 3, label: "Skills extraction groups correctly", hint: "Verify skills like React appear under 'Web' and Java under 'Languages'." },
    { id: 4, label: "Round mapping changes based on company + skills", hint: "Compare 'Amazon' results vs a general startup result." },
    { id: 5, label: "Score calculation is deterministic", hint: "Check if the same JD always yields the same base score." },
    { id: 6, label: "Skill toggles update score live", hint: "Toggle a skill and watch the /100 score change immediately." },
    { id: 7, label: "Changes persist after refresh", hint: "Modify a skill confidence and refresh the browser tab." },
    { id: 8, label: "History saves and loads correctly", hint: "Check the Resources page after performing an analysis." },
    { id: 9, label: "Export buttons copy the correct content", hint: "Click 'Copy Plan' and paste it into a notepad to verify." },
    { id: 10, label: "No console errors on core pages", hint: "Open DevTools (F12) and browse primary platform routes." }
];

export default function Tests() {
    const [checkedItems, setCheckedItems] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        setCheckedItems(getTestChecklist());
    }, []);

    const handleToggle = (id) => {
        const updated = { ...checkedItems, [id]: !checkedItems[id] };
        setCheckedItems(updated);
        saveTestChecklist(updated);
    };

    const handleReset = () => {
        if (confirm("Reset all test progress?")) {
            resetTestChecklist();
            setCheckedItems({});
        }
    };

    const passedCount = Object.values(checkedItems).filter(Boolean).length;
    const isComplete = passedCount === 10;

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Platform Quality Assurance</h1>
                <p className="text-slate-500 font-medium">Verify all core features before final deployment.</p>
            </div>

            <div className={`p-6 rounded-3xl border-2 transition-all flex items-center justify-between ${isComplete ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'}`}>
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${isComplete ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
                        <CheckCircle2 size={24} />
                    </div>
                    <div>
                        <p className="text-2xl font-black text-slate-900 leading-none mb-1">Tests Passed: {passedCount} / 10</p>
                        {!isComplete && <p className="text-sm font-bold text-amber-700">Fix issues before shipping.</p>}
                        {isComplete && <p className="text-sm font-bold text-emerald-700">All systems verified. Ready for ship.</p>}
                    </div>
                </div>
                {!isComplete && <AlertTriangle size={32} className="text-amber-400 animate-pulse" />}
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="divide-y divide-slate-100">
                    {testItems.map((item) => (
                        <div key={item.id} className="p-6 flex items-start gap-4 hover:bg-slate-50 transition-colors group">
                            <button
                                onClick={() => handleToggle(item.id)}
                                className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${checkedItems[item.id]
                                        ? 'bg-primary border-primary text-white'
                                        : 'border-slate-200 bg-white group-hover:border-primary'
                                    }`}
                            >
                                {checkedItems[item.id] && <CheckCircle2 size={16} />}
                            </button>
                            <div className="flex-1">
                                <p className={`font-bold transition-colors ${checkedItems[item.id] ? 'text-slate-900' : 'text-slate-600'}`}>
                                    {item.label}
                                </p>
                                <div className="flex items-center gap-2 mt-1 text-slate-400">
                                    <Info size={14} />
                                    <p className="text-xs font-medium">{item.hint}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-between pt-4">
                <button
                    onClick={handleReset}
                    className="flex items-center gap-2 text-slate-400 font-bold hover:text-red-500 transition-colors"
                >
                    <RefreshCcw size={18} /> Reset checklist
                </button>
                <button
                    onClick={() => isComplete ? navigate('/prp/08-ship') : alert('Tests incompleted. Resolve all issues before shipping.')}
                    className={`px-10 py-4 rounded-2xl font-black text-sm transition-all ${isComplete
                            ? 'bg-primary text-white shadow-lg shadow-primary/30 hover:scale-105 active:scale-95'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                        }`}
                >
                    Proceed to Ship
                </button>
            </div>
        </div>
    );
}

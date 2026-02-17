import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getHistory } from '../lib/analysisEngine';
import { History, LayoutGrid, Calendar, ArrowRight, Building, UserCircle } from 'lucide-react';

export default function Resources() {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        setHistory(getHistory());
    }, []);

    return (
        <div className="max-w-6xl mx-auto space-y-10">
            <div>
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Analysis History</h2>
                        <p className="text-slate-500 font-medium">Revisit your previous readiness reports.</p>
                    </div>
                    <Link to="/assessments" className="bg-primary text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
                        New Analysis <ArrowRight size={18} />
                    </Link>
                </div>

                {history.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-20 text-center flex flex-col items-center">
                        <History size={48} className="text-slate-200 mb-4" />
                        <h3 className="text-xl font-bold text-slate-800 mb-2">No history yet</h3>
                        <p className="text-slate-500 mb-8">Analyze your first Job Description to populate this list.</p>
                        <Link to="/assessments" className="text-primary font-bold hover:underline">Get started now</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {history.map((item) => (
                            <Link
                                key={item.id}
                                to={`/results/${item.id}`}
                                className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all group"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                        <Building size={24} />
                                    </div>
                                    <div className="text-right">
                                        <span className="text-2xl font-black text-primary group-hover:scale-110 transition-transform block">
                                            {item.finalScore}%
                                        </span>
                                        <span className={`text-[8px] font-black uppercase tracking-tight px-1.5 py-0.5 rounded border inline-block mt-1 ${item.isDraft ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                                            {item.isDraft ? 'DRAFT' : 'ANALYZED'}
                                        </span>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-primary transition-colors">
                                    {item.company || 'Unnamed Company'}
                                </h3>
                                <p className="text-sm font-semibold text-slate-500 flex items-center gap-1 mb-6">
                                    <UserCircle size={14} /> {item.role || 'General Role'}
                                </p>
                                <div className="flex items-center justify-between pt-4 border-t border-slate-50 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                    <span className="flex items-center gap-1">
                                        <Calendar size={12} /> {new Date(item.createdAt).toLocaleDateString()}
                                    </span>
                                    <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                                        View Results →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

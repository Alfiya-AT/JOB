import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getTestChecklist } from '../lib/analysisEngine';
import { Rocket, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';

export default function Ship() {
    const [isVerified, setIsVerified] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checklist = getTestChecklist();
        const passedCount = Object.values(checklist).filter(Boolean).length;
        if (passedCount < 10) {
            navigate('/prp/07-test');
        } else {
            setIsVerified(true);
        }
    }, [navigate]);

    if (!isVerified) return null;

    return (
        <div className="max-w-4xl mx-auto text-center py-20 animate-in fade-in zoom-in duration-700">
            <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/20">
                <Rocket size={48} className="text-white" />
            </div>

            <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-4">Platform Shipped</h1>
            <p className="text-xl text-slate-500 font-medium mb-12 max-w-2xl mx-auto">
                Congratulations. All 10 verification tests have passed. The Placement Readiness Platform is now certified for production deployment.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 px-4">
                {[
                    { label: "Security Verified", icon: ShieldCheck },
                    { label: "Core Logic Validated", icon: CheckCircle2 },
                    { label: "Design Consistent", icon: Heart },
                    { label: "Ready for Scale", icon: Rocket }
                ].map((item, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4 text-left">
                        <div className="p-3 bg-slate-50 rounded-2xl text-primary">
                            <item.icon size={24} />
                        </div>
                        <p className="font-bold text-slate-800">{item.label}</p>
                    </div>
                ))}
            </div>

            <div className="flex flex-col items-center gap-6">
                <Link
                    to="/dashboard"
                    className="bg-primary text-white px-12 py-5 rounded-3xl font-black text-lg shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-transform"
                >
                    Return to Dashboard
                </Link>
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">
                    Certification ID: PRP-${Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
            </div>
        </div>
    );
}

import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function NotificationLanding() {
    const navigate = useNavigate();

    return (
        <div className="pt-32 pb-40 px-6 max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-8xl font-serif font-black text-[#111111] leading-[0.9] mb-8 tracking-tight">
                Stop Missing <br />
                The <span className="text-[#8B0000]">Right Jobs.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-medium mb-12 max-w-lg mx-auto leading-relaxed">
                Precision-matched job discovery delivered daily at 9AM. Consistent. Calm. Reliable.
            </p>
            <button
                onClick={() => navigate('/jt/settings')}
                className="inline-flex items-center gap-4 bg-[#8B0000] text-white px-12 py-6 font-black text-xl hover:opacity-90 transition-all shadow-2xl shadow-[#8B0000]/20 active:scale-95"
            >
                Start Tracking <ArrowRight size={24} />
            </button>
            <p className="mt-20 text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">A Professional Career Tool by KodNest</p>
        </div>
    );
}

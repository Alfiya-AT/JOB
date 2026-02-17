import { Link, useLocation } from 'react-router-dom';
import { Layout, Eye, ShieldCheck, Sparkles, ArrowLeft, FileText } from 'lucide-react';

export default function ResumeNav() {
    const location = useLocation();
    const path = location.pathname;

    const navItems = [
        { name: 'Builder', path: '/resume-engine', icon: FileText },
        { name: 'Review', path: '/preview', icon: Eye },
        { name: 'Verification', path: '/proof', icon: ShieldCheck },
    ];

    return (
        <header className="h-16 bg-white border-b border-slate-200/60 flex items-center justify-between px-8 sticky top-0 z-50">
            <div className="flex items-center gap-6">
                <Link to="/dashboard" className="text-slate-400 hover:text-primary transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]">
                    <ArrowLeft size={14} /> Back to Hub
                </Link>
                <div className="w-px h-6 bg-slate-100"></div>
                <div className="flex items-center gap-2 text-sm font-bold text-primary tracking-tight uppercase tracking-[0.1em]">
                    Resume Specialist
                </div>
            </div>

            <nav className="flex items-center gap-4">
                {navItems.map((item) => {
                    const isActive = path === item.path;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center gap-2 px-5 py-2 rounded transition-all text-[10px] font-bold uppercase tracking-[0.15em] ${isActive
                                ? 'bg-primary text-white shadow-xl shadow-primary/10'
                                : 'text-slate-400 hover:text-primary'
                                }`}
                        >
                            <Icon size={14} />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
        </header>
    );
}



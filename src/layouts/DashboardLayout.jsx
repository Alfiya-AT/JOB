import { Outlet, Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    ClipboardCheck,
    BookOpen,
    Menu,
    Bell,
    CheckCircle2,
    Briefcase,
    Zap,
    Cpu,
    Search,
    ChevronDown,
    ShieldCheck,
    FileText,
    ArrowLeft,
    Settings,
    Bookmark
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { getPlatformStatus } from '../lib/analysisEngine';

const navItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Role Analysis', path: '/assessments', icon: ClipboardCheck },
    { name: 'Knowledge Base', path: '/resources', icon: BookOpen },
    { name: 'Jobs', path: '/jt/dashboard', icon: Briefcase },
    { name: 'Saved Jobs', path: '/jt/saved', icon: Bookmark },
    { name: 'Job Settings', path: '/jt/settings', icon: Settings },
    { name: 'Resume Engine', path: '/resume-engine', icon: Zap },
];

export default function DashboardLayout() {
    const location = useLocation();
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [status, setStatus] = useState("Active");

    useEffect(() => {
        setStatus(getPlatformStatus() === "In Progress" ? "In Progress" : "Active");
    }, [location.pathname]);

    const activeNav = navItems.find(item =>
        location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path))
    );

    return (
        <div className="min-h-screen bg-slate-50 flex selection:bg-accent/10 selection:text-primary">
            {/* Sidebar Overlay for Mobile */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[45] lg:hidden transition-opacity duration-300"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`bg-white border-r border-slate-200/60 w-72 flex-shrink-0 transition-all duration-300 ease-in-out z-50 fixed lg:static inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:opacity-0 lg:overflow-hidden'}`}>
                <div className="h-16 flex items-center px-8 border-b border-slate-100 gap-3">
                    <div className="w-8 h-8 bg-primary text-white rounded flex items-center justify-center">
                        <Cpu size={18} />
                    </div>
                    <span className="text-lg font-bold text-primary tracking-tight uppercase tracking-wider">JOBSPHERE</span>
                </div>

                <nav className="p-6 space-y-2 mt-4 h-[calc(100vh-64px)] overflow-y-auto scrollbar-hide">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeNav?.path === item.path;

                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/10'
                                    : 'text-slate-500 hover:bg-slate-100/50 hover:text-slate-900'
                                    }`}
                            >
                                <Icon size={18} className={`shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-900'}`} />
                                <span className={`text-[11px] font-bold tracking-widest uppercase truncate ${isActive ? 'text-white' : ''}`}>
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}

                    <div className="pt-10 mt-10 border-t border-slate-100">
                        <button className="flex items-center gap-3 w-full p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-all border border-slate-100">
                            <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-primary flex items-center justify-center font-bold text-xs uppercase shadow-sm">
                                JD
                            </div>
                            <div className="text-left">
                                <p className="text-xs font-bold text-primary leading-none">John Doe</p>
                                <p className="text-[9px] text-slate-400 font-bold uppercase mt-1 tracking-widest">Premium Partner</p>
                            </div>
                            <ChevronDown size={14} className="ml-auto text-slate-400" />
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
                <header className="h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/50 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
                    <div className="flex items-center gap-4 md:gap-6">
                        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-slate-400 hover:text-primary transition-colors">
                            <Menu size={20} />
                        </button>

                        <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-px h-6 bg-slate-200 hidden md:block"></div>
                            <h2 className="text-[10px] md:text-[11px] font-black text-primary uppercase tracking-[0.2em] truncate max-w-[120px] md:max-w-none">
                                {activeNav?.name || 'Dashboard'}
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 md:space-x-6">
                        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-500">
                            <div className={`w-1.5 h-1.5 rounded-full bg-slate-400`}></div>
                            <span className="text-[10px] font-bold uppercase tracking-widest">Operational Status: <span className="text-primary">{status}</span></span>
                        </div>

                        <button className="text-slate-400 hover:text-primary relative p-1 transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full border-2 border-white shadow-sm"></span>
                        </button>

                        <div className="w-px h-6 bg-slate-200 mx-1 md:mx-2"></div>

                        <Link to="/profile" className="flex items-center space-x-2 md:space-x-3 group">
                            <div className="text-right hidden sm:block">
                                <p className="text-[10px] font-bold text-primary group-hover:text-accent transition-colors leading-none mb-1 uppercase tracking-widest">Global Portal</p>
                                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest italic">884-B</p>
                            </div>
                            <div className="w-8 h-8 md:w-9 md:h-9 rounded bg-primary text-white flex items-center justify-center font-bold text-[10px] md:text-xs shadow-lg shadow-primary/10 transition-transform group-hover:scale-110">
                                JD
                            </div>
                        </Link>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-12 scroll-smooth bg-white">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}



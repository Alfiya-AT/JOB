import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Bell } from 'lucide-react';

export default function NotificationLayout() {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard', path: '/jt/dashboard' },
        { name: 'Saved', path: '/jt/saved' },
        { name: 'Digest', path: '/jt/digest' },
        { name: 'Settings', path: '/jt/settings' },
        { name: 'Proof', path: '/jt/proof' }
    ];

    const currentPath = location.pathname;

    return (
        <div className="min-h-screen bg-[#F7F6F3] text-[#111111] font-sans selection:bg-[#8B0000] selection:text-white">
            {/* Top Bar */}
            <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-[60] flex items-center justify-between px-6 md:px-12">
                <div className="flex items-center gap-4">
                    <Link to="/" className="text-sm font-black tracking-[0.2em] uppercase text-[#111111]">JobSphere / JT</Link>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-10">
                    {navItems.map(item => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all relative py-5 ${currentPath === item.path ? 'text-[#8B0000]' : 'text-slate-400 hover:text-[#111111]'
                                }`}
                        >
                            {item.name}
                            {currentPath === item.path && (
                                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8B0000]"></div>
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <button className="text-slate-300 hover:text-[#8B0000] transition-colors">
                        <Bell size={18} />
                    </button>
                    <button
                        className="md:hidden text-slate-900"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Mobile Nav Overlay */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-white z-[55] pt-24 px-8 flex flex-col gap-8 md:hidden text-center">
                    {navItems.map(item => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-2xl font-serif font-black text-[#111111]"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}

            <main className="max-w-[1440px] mx-auto min-h-[calc(100vh-64px)]">
                <Outlet />
            </main>

            {/* Proof Footer */}
            <footer className="bg-white border-t border-slate-200 py-12 px-12 mt-32">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Professional Career Infrastructure</p>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-200">KodNest Premium System</p>
                </div>
            </footer>
        </div>
    );
}

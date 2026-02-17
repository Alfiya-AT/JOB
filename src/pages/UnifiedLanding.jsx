import { useNavigate } from 'react-router-dom';
import {
    ArrowRight,
    MapPin,
    Phone,
    Mail,
    Facebook,
    Twitter,
    Linkedin,
    Target,
    Globe,
    FileText,
    Cpu,
    CheckCircle2
} from 'lucide-react';

export default function UnifiedLanding() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white selection:bg-accent/20 selection:text-primary overflow-x-hidden">

            {/* Header Nav */}
            <nav className="h-20 flex items-center justify-between px-6 md:px-12 sticky top-0 bg-white/95 backdrop-blur-xl z-50 border-b border-slate-200/50 shadow-sm">
                <div className="flex items-center gap-3 font-bold text-xl tracking-tight text-primary">
                    <div className="w-9 h-9 bg-primary text-white rounded flex items-center justify-center">
                        <Cpu size={20} />
                    </div>
                    JOBSPHERE
                </div>
                <div className="hidden md:flex items-center gap-10">
                    <button onClick={() => document.getElementById('about-us').scrollIntoView({ behavior: 'smooth' })} className="text-xs font-bold text-slate-600 hover:text-primary transition-colors uppercase tracking-widest">About Us</button>
                    <button onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })} className="text-xs font-bold text-slate-600 hover:text-primary transition-colors uppercase tracking-widest">Services</button>
                    <button onClick={() => navigate('/dashboard')} className="premium-btn-primary px-6 py-2.5 text-[11px] uppercase tracking-[0.15em] rounded-none">
                        ENTER HUB
                    </button>
                </div>

            </nav>


            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center group overflow-hidden">
                {/* Background Image Emulation */}
                <div className="absolute inset-0 bg-primary overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2070"
                        alt="Corporate Building"
                        className="w-full h-full object-cover opacity-40 scale-105 group-hover:scale-100 transition-transform duration-[10s]"
                    />
                    <div className="absolute inset-0 hero-gradient"></div>
                </div>

                <div className="max-w-7xl mx-auto px-12 relative z-10 w-full animate-fade-in">
                    <div className="max-w-3xl">
                        <div className="text-accent font-bold text-xs uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                            <div className="w-12 h-px bg-accent"></div> Professional Career Solutions
                        </div>

                        <h1 className="text-white text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8">
                            Over 10 Years of <br />
                            Professional <span className="text-accent underline decoration-accent/30 underline-offset-8">Excellence</span>
                        </h1>

                        <p className="text-lg text-slate-300 max-w-xl mb-10 leading-relaxed font-medium">
                            Providing comprehensive career consulting, professional tracking, and expert-level resume development for industry leaders.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-5">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="premium-btn-primary bg-accent hover:bg-blue-600 text-white px-10 py-5 text-sm uppercase tracking-widest rounded-none border-none shadow-xl shadow-accent/20"
                            >
                                Read More
                            </button>
                            <button
                                onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                                className="premium-btn-secondary bg-white text-primary px-10 py-5 text-sm uppercase tracking-widest rounded-none border-none hover:bg-slate-50 shadow-xl shadow-black/5"
                            >
                                Our Services
                            </button>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-10 left-12 flex items-center gap-4 text-white/40 text-[10px] font-bold uppercase tracking-[0.2em]">
                    <div className="w-8 h-px bg-white/20"></div> Explore Solutions
                </div>
            </section>

            {/* Service Pillars */}
            <section id="services" className="py-32 px-6 bg-white relative">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                        <div className="max-w-2xl">
                            <div className="text-accent font-bold text-xs uppercase tracking-[0.2em] mb-4">The JobSphere Ecosystem</div>
                            <h3 className="text-4xl font-bold text-primary tracking-tight">Three Integrated Models for Career Success</h3>
                        </div>
                        <p className="text-text-muted text-sm max-w-xs pb-1 border-b-2 border-slate-100 italic">
                            Delivering measurable impact across global industry standards.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Pillar 1 */}
                        <div className="group cursor-default">
                            <div className="w-16 h-16 bg-slate-50 text-primary border border-slate-100 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                <Globe size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-primary">Job Notification Tracker</h3>
                            <p className="text-text-muted text-sm leading-relaxed mb-8">
                                Centralize and optimize your application pipeline with our industry-leading notification and status engine.
                            </p>
                            <button onClick={() => navigate('/jt/dashboard')} className="text-[11px] font-bold text-accent flex items-center gap-3 uppercase tracking-widest hover:gap-5 transition-all">
                                Launch Tracker <ArrowRight size={14} />
                            </button>
                        </div>

                        {/* Pillar 2 */}
                        <div className="group cursor-default">
                            <div className="w-16 h-16 bg-slate-50 text-primary border border-slate-100 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                <Target size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-primary">Placement Readiness Platform</h3>
                            <p className="text-text-muted text-sm leading-relaxed mb-8">
                                Navigate the complexity of professional growth with data-driven career strategies and personalized planning.
                            </p>
                            <button onClick={() => navigate('/assessments')} className="text-[11px] font-bold text-accent flex items-center gap-3 uppercase tracking-widest hover:gap-5 transition-all">
                                Analyze Readiness <ArrowRight size={14} />
                            </button>
                        </div>

                        {/* Pillar 3 */}
                        <div className="group cursor-default">
                            <div className="w-16 h-16 bg-slate-50 text-primary border border-slate-100 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                                <FileText size={28} />
                            </div>
                            <h3 className="text-xl font-bold mb-4 text-primary">AI Resume Builder</h3>
                            <p className="text-text-muted text-sm leading-relaxed mb-8">
                                Crafting superior, compliant professional resumes that meet the highest international verification standards.
                            </p>
                            <button onClick={() => navigate('/resume-engine')} className="text-[11px] font-bold text-accent flex items-center gap-3 uppercase tracking-widest hover:gap-5 transition-all">
                                Start Building <ArrowRight size={14} />
                            </button>
                        </div>

                    </div>
                </div>
            </section>


            {/* Bottom Stats & Footer */}
            <div className="py-24 border-t border-slate-100 bg-slate-50/50">
                <div className="max-w-6xl mx-auto px-12 grid grid-cols-2 lg:grid-cols-4 gap-16 text-center">
                    <div>
                        <div className="text-5xl font-bold text-primary tracking-tighter">10+</div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mt-3">Years Record</div>
                    </div>
                    <div>
                        <div className="text-5xl font-bold text-primary tracking-tighter">98%</div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mt-3">Success Rate</div>
                    </div>
                    <div>
                        <div className="text-5xl font-bold text-primary tracking-tighter">24/7</div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mt-3">Monitoring</div>
                    </div>
                    <div>
                        <div className="text-5xl font-bold text-primary tracking-tighter">1500+</div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mt-3">Active Clients</div>
                    </div>
                </div>
            </div>

            <footer id="about-us" className="py-20 border-t border-slate-200/50 bg-white">
                <div className="max-w-7xl mx-auto px-12">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-16">
                        <div className="max-w-md">
                            <div className="flex items-center gap-3 font-bold text-primary tracking-tight mb-6">
                                <div className="w-8 h-8 bg-primary text-white rounded flex items-center justify-center">
                                    <Cpu size={18} />
                                </div>
                                APNA PROFESSIONAL
                            </div>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-loose mb-8">
                                Delivering elite career architecture and strategic placement solutions for global industry leaders since 2016.
                            </p>

                            <div className="space-y-4">
                                <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Follow us on social media</h4>
                                <div className="flex items-center gap-4 text-slate-400">
                                    <Facebook size={16} className="hover:text-primary cursor-pointer transition-colors" />
                                    <Twitter size={16} className="hover:text-primary cursor-pointer transition-colors" />
                                    <Linkedin size={16} className="hover:text-primary cursor-pointer transition-colors" />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-left">
                            <div className="space-y-6">
                                <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Contact Hub</h4>
                                <div className="space-y-4">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <MapPin size={12} className="text-primary/40" /> New York, NY
                                    </p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <Phone size={12} className="text-primary/40" /> +1 (555) 0123-4567
                                    </p>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <Mail size={12} className="text-primary/40" /> contact@jobsphere.io
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Policies</h4>
                                <ul className="space-y-3">
                                    <li className="text-[10px] font-bold text-slate-400 hover:text-primary cursor-pointer uppercase tracking-widest transition-colors">Privacy Policy</li>
                                    <li className="text-[10px] font-bold text-slate-400 hover:text-primary cursor-pointer uppercase tracking-widest transition-colors">Apna Advantage T&C</li>
                                </ul>
                            </div>
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">Compliance</h4>
                                <ul className="space-y-3">
                                    <li className="text-[10px] font-bold text-slate-400 hover:text-primary cursor-pointer uppercase tracking-widest transition-colors">Rewards T&C</li>
                                    <li className="text-[10px] font-bold text-slate-400 hover:text-primary cursor-pointer uppercase tracking-widest transition-colors">AI Prep T&C</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 border-t border-slate-100">
                        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
                            © 2026 Apna | All rights reserved
                        </p>
                    </div>
                </div>
            </footer>



        </div>
    );
}



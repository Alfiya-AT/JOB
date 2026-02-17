import { Link } from 'react-router-dom';
import { Code2, Video, BarChart3, ArrowRight } from 'lucide-react';

const features = [
    {
        title: "Practice Problems",
        description: "Curated collection of 500+ coding challenges to sharpen your skills.",
        icon: Code2,
        color: "bg-indigo-50 text-indigo-600"
    },
    {
        title: "Mock Interviews",
        description: "Real-time mock interviews with feedback from industry experts.",
        icon: Video,
        color: "bg-purple-50 text-purple-600"
    },
    {
        title: "Track Progress",
        description: "Comprehensive dashboard to monitor your skill growth and readiness.",
        icon: BarChart3,
        color: "bg-blue-50 text-blue-600"
    }
];

export default function LandingPage() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-white pt-20 pb-32 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                        Ace Your <span className="text-primary">Placement</span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Practice, assess, and prepare for your dream job with our comprehensive technical interview preparation ecosystem.
                    </p>
                    <div className="flex justify-center">
                        <Link
                            to="/dashboard"
                            className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center group"
                        >
                            Get Started
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="bg-slate-50 py-24 px-6 border-y border-slate-200">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {features.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <div key={feature.title} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:-translate-y-1 transition-transform">
                                    <div className={`w-14 h-14 ${feature.color} flex items-center justify-center rounded-xl mb-6`}>
                                        <Icon size={28} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-6 bg-white text-center border-t border-slate-100">
                <p className="text-slate-500 font-medium">
                    © {new Date().getFullYear()} Placement Prep Readiness Platform. All rights reserved.
                </p>
            </footer>
        </div>
    );
}

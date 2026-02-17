import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ChevronRight, Target, Users, Layout, Zap, Package, TestTube, Rocket } from 'lucide-react';

const stepData = {
    "01": {
        title: "The Problem Statement",
        icon: Target,
        desc: "Resumes are hard. AI-generated resumes are generic. We need a system that builds high-context, high-impact resumes that actually beat modern ATS systems.",
        instruction: "Analyze the current state of resumes and define why an AI-driven approach is necessary."
    },
    "02": {
        title: "Market Analysis",
        icon: Users,
        desc: "Every fresh grad and mid-career professional is the market. We are competing against Canva (design-first) and Teal (track-first).",
        instruction: "Identify the unique value proposition for our specific builder."
    },
    "03": {
        title: "Architecture Design",
        icon: Layout,
        desc: "Frontend: React. Backend: Node/Express. AI: OpenAI GPT-4o with custom prompt engineering for ATS optimization.",
        instruction: "Define the data flow between the user input, the GPT engine, and the final PDF generation."
    },
    "04": {
        title: "HLD (High Level Design)",
        icon: Zap,
        desc: "Micro-features: Profile Importer, Skill Scraper, Dynamic Layout Engine, Real-time Preview.",
        instruction: "Map out the core modules and their responsibilities."
    },
    "05": {
        title: "LLD (Low Level Design)",
        icon: Package,
        desc: "Define the database schema for user profiles, templates, and resume versions. Schema: {userId, sections: [], templateId, lastModified}.",
        instruction: "Create the specific object structures and function signatures."
    },
    "06": {
        title: "The Build Phase",
        icon: Layout,
        desc: "Writing the core logic. Implementing the OpenAI stream integration and the PDF export component.",
        instruction: "Assemble the frontend components and connect to the AI endpoint."
    },
    "07": {
        title: "Quality Testing",
        icon: TestTube,
        desc: "Validating ATS readability. Checking PDF layout consistency across different templates and data volumes.",
        instruction: "Run through the test checklist to ensure production stability."
    },
    "08": {
        title: "Production Ship",
        icon: Rocket,
        desc: "Deploying to Vercel/Netlify. Final health checks on the production environment.",
        instruction: "Prepare the environment variables and trigger the final deployment."
    }
};

export default function RBStep() {
    const { stepId } = useParams();
    const navigate = useNavigate();
    const stepNum = stepId.split('-')[0]; // "01", "02" etc.
    const data = stepData[stepNum];
    const Icon = data?.icon || Target;

    const [canGoNext, setCanGoNext] = useState(false);

    useEffect(() => {
        const checkArtifact = () => {
            const artifact = localStorage.getItem(`rb_step_${stepNum}_artifact`);
            setCanGoNext(!!artifact);
        };

        checkArtifact();
        // Re-check when storage changes (from BuildPanel)
        window.addEventListener('storage', checkArtifact);
        return () => window.removeEventListener('storage', checkArtifact);
    }, [stepNum]);

    const handleNext = () => {
        const nextNum = parseInt(stepNum) + 1;
        if (nextNum <= 8) {
            const nextSlug = getStepSlug(nextNum);
            navigate(`/rb/0${nextNum}-${nextSlug}`);
        } else {
            navigate('/rb/proof');
        }
    };

    const getStepSlug = (num) => {
        const slugs = ["", "problem", "market", "architecture", "hld", "lld", "build", "test", "ship"];
        return slugs[num];
    };

    if (!data) return <div>Step not found</div>;

    return (
        <div className="max-w-3xl space-y-12 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                    <Icon size={24} />
                </div>
                <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight leading-none uppercase italic">{data.title}</h2>
                <p className="text-lg text-slate-500 font-medium leading-relaxed">
                    {data.desc}
                </p>
            </div>

            <div className="bg-slate-50 border border-slate-100 p-8 rounded-[32px] space-y-4">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <ChevronRight size={14} /> Step Instructions
                </h4>
                <p className="text-slate-800 font-bold leading-relaxed">
                    {data.instruction}
                </p>
            </div>

            <div className="flex items-center justify-between pt-8">
                <div className="flex gap-4">
                    {parseInt(stepNum) > 1 && (
                        <button
                            onClick={() => navigate(`/rb/0${parseInt(stepNum) - 1}-${getStepSlug(parseInt(stepNum) - 1)}`)}
                            className="text-slate-400 font-bold text-sm hover:text-slate-900 transition-colors"
                        >
                            Previous
                        </button>
                    )}
                </div>
                <button
                    onClick={handleNext}
                    disabled={!canGoNext}
                    className={`px-12 py-5 rounded-2xl font-black text-sm transition-all flex items-center gap-2 ${canGoNext
                            ? 'bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.05] active:scale-[0.95]'
                            : 'bg-slate-100 text-slate-300 cursor-not-allowed border border-slate-200'
                        }`}
                >
                    {parseInt(stepNum) === 8 ? 'Finalize Project' : 'Move to Next Step'} <ChevronRight size={18} />
                </button>
            </div>

            {!canGoNext && (
                <p className="text-center text-[10px] font-black text-amber-500 uppercase tracking-widest animate-pulse">
                    Upload artifact in the build panel to unlock next step
                </p>
            )}
        </div>
    );
}

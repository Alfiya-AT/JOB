import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getAnalysisById, generateSkillSelection, generateMockTest } from '../lib/analysisEngine';
import {
    CheckCircle2,
    ChevronRight,
    Zap,
    Clock,
    ArrowLeft,
    AlertCircle,
    Target,
    BookOpen,
    Play,
    BarChart,
    Award,
    RefreshCcw
} from 'lucide-react';

export default function MockAssessment() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [analysis, setAnalysis] = useState(null);
    const [selectionData, setSelectionData] = useState(null);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [step, setStep] = useState('configure'); // configure | testing | report
    const [test, setTest] = useState(null);
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [answers, setAnswers] = useState({});
    const [results, setResults] = useState(null);
    const [config, setConfig] = useState({
        difficulty: 'Balanced',
        duration: '30 min'
    });

    useEffect(() => {
        const data = getAnalysisById(id);
        if (data) {
            setAnalysis(data);
            const selection = generateSkillSelection(data);
            setSelectionData(selection);
            // Default select first few skills
            const initial = selection.skill_categories.flatMap(c => c.skills).slice(0, 3).map(s => s.name);
            setSelectedSkills(initial);
        }
    }, [id]);

    const handleToggleSkill = (skillName) => {
        setSelectedSkills(prev =>
            prev.includes(skillName)
                ? prev.filter(s => s !== skillName)
                : [...prev, skillName]
        );
    };

    const handleStartTest = () => {
        if (selectedSkills.length < 1) {
            alert("Please select at least one skill.");
            return;
        }
        const generatedTest = generateMockTest(selectedSkills, config);
        setTest(generatedTest);
        setStep('testing');
    };

    const handleAnswer = (option) => {
        setAnswers({ ...answers, [currentQuestionIdx]: option });
    };

    const handleNext = () => {
        if (currentQuestionIdx < test.questions.length - 1) {
            setCurrentQuestionIdx(prev => prev + 1);
        } else {
            calculateResults();
        }
    };

    const calculateResults = () => {
        let score = 0;
        const total = test.questions.length;
        const breakdown = {};

        test.questions.forEach((q, idx) => {
            const isCorrect = answers[idx] === q.answer;
            if (isCorrect) score++;

            // Skill breakdown logic (simplified)
            const skill = selectedSkills[0]; // Assuming most questions map to first skill for now in mock
            if (!breakdown[skill]) breakdown[skill] = { correct: 0, total: 0 };
            breakdown[skill].total++;
            if (isCorrect) breakdown[skill].correct++;
        });

        const finalScore = Math.round((score / total) * 100);
        setResults({
            score: finalScore,
            total,
            correct: score,
            breakdown
        });
        setStep('report');
    };

    if (!analysis) return <div className="p-20 text-center">Loading Analysis...</div>;

    if (step === 'configure') {
        return (
            <div className="max-w-4xl mx-auto space-y-10 py-12 px-6">
                <header className="flex items-center gap-4">
                    <Link to={`/results/${id}`} className="p-3 bg-white border border-slate-100 rounded-full text-slate-400 hover:text-slate-900 shadow-sm transition-all">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">Skill Assessment</h1>
                        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{analysis.role} @ {analysis.company}</p>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-8">
                        <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                            <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                                <BookOpen className="text-indigo-600" size={24} />
                                Select Skills to Test
                            </h2>
                            <div className="space-y-6">
                                {selectionData?.skill_categories.map((cat, i) => (
                                    <div key={i} className="space-y-3">
                                        <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{cat.category}</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {cat.skills.map((skill, si) => (
                                                <button
                                                    key={si}
                                                    onClick={() => handleToggleSkill(skill.name)}
                                                    className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all group ${selectedSkills.includes(skill.name) ? 'border-indigo-600 bg-indigo-50/30' : 'border-slate-50 hover:border-slate-200 bg-slate-50/50'}`}
                                                >
                                                    <div className="text-left">
                                                        <p className={`font-black uppercase text-[10px] tracking-tight ${selectedSkills.includes(skill.name) ? 'text-indigo-600' : 'text-slate-900'}`}>{skill.name}</p>
                                                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{skill.proficiency}</p>
                                                    </div>
                                                    <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${selectedSkills.includes(skill.name) ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-200'}`}>
                                                        {selectedSkills.includes(skill.name) && <CheckCircle2 size={12} />}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="space-y-6">
                        <section className="bg-slate-900 p-8 rounded-[2.5rem] text-white space-y-8 shadow-2xl">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-indigo-400">Test Config</h3>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Difficulty</label>
                                    <select
                                        value={config.difficulty}
                                        onChange={(e) => setConfig({ ...config, difficulty: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm font-bold focus:outline-none focus:border-indigo-500"
                                    >
                                        <option className="text-slate-900">Beginner</option>
                                        <option className="text-slate-900">Balanced</option>
                                        <option className="text-slate-900">Advanced</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Duration</label>
                                    <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
                                        <Clock size={16} className="text-indigo-400" />
                                        <span className="text-sm font-bold">{config.duration}</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={handleStartTest}
                                className="w-full bg-indigo-600 p-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-900/40 flex items-center justify-center gap-3"
                            >
                                Generate Test <Play size={16} />
                            </button>
                        </section>
                        <div className="p-6 bg-emerald-50 rounded-[2rem] border border-emerald-100 flex gap-4">
                            <Zap size={24} className="text-emerald-500 shrink-0" />
                            <p className="text-xs font-bold text-emerald-700 leading-relaxed">Generated tests include MCQs, Scenario-based challenges, and code analysis questions.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (step === 'testing') {
        const q = test.questions[currentQuestionIdx];
        return (
            <div className="max-w-4xl mx-auto py-12 px-6 space-y-12">
                <header className="flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Live Assessment</p>
                        <h2 className="text-2xl font-black text-slate-900">{analysis.role} Prep</h2>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="text-right">
                            <p className="text-[10px] font-black text-slate-400 uppercase">Question</p>
                            <p className="text-xl font-black text-slate-900">{currentQuestionIdx + 1} / {test.total_questions}</p>
                        </div>
                        <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black">
                            <Clock size={20} />
                        </div>
                    </div>
                </header>

                <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="space-y-4">
                        <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${q.difficulty === 'Hard' ? 'bg-rose-50 text-rose-500' : 'bg-indigo-50 text-indigo-600'}`}>
                            {q.difficulty} • {q.type}
                        </span>
                        <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                            {q.question}
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {q.options.map((opt, i) => (
                            <button
                                key={i}
                                onClick={() => handleAnswer(opt)}
                                className={`w-full p-6 text-left rounded-3xl border-2 transition-all flex items-center justify-between group ${answers[currentQuestionIdx] === opt ? 'border-indigo-600 bg-indigo-50/50 shadow-md shadow-indigo-100' : 'border-slate-50 hover:border-slate-200 bg-slate-50/50'}`}
                            >
                                <span className={`text-base font-bold ${answers[currentQuestionIdx] === opt ? 'text-indigo-600' : 'text-slate-700'}`}>{opt}</span>
                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${answers[currentQuestionIdx] === opt ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-200'}`}>
                                    {answers[currentQuestionIdx] === opt && <CheckCircle2 size={12} />}
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                        <p className="text-[10px] font-black text-slate-300 uppercase italic">Select an option to proceed</p>
                        <button
                            disabled={!answers[currentQuestionIdx]}
                            onClick={handleNext}
                            className={`px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${answers[currentQuestionIdx] ? 'bg-slate-900 text-white shadow-xl hover:-translate-y-1' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
                        >
                            {currentQuestionIdx === test.total_questions - 1 ? 'Finish Test' : 'Next Question'}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (step === 'report') {
        return (
            <div className="max-w-4xl mx-auto py-12 px-6 space-y-12">
                <header className="text-center space-y-4">
                    <div className="inline-flex p-4 bg-emerald-50 rounded-3xl border border-emerald-100 text-emerald-500 mb-6">
                        <Award size={48} />
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Performance Analysis</h1>
                    <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Mock Assessment Completed Successfully</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-slate-900 p-10 rounded-[2.5rem] text-white flex flex-col items-center justify-center space-y-4 shadow-2xl">
                        <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Overall Score</p>
                        <div className="relative w-40 h-40 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={440} strokeDashoffset={440 - (440 * results.score) / 100} className="text-indigo-500 transition-all duration-1000" />
                            </svg>
                            <span className="absolute text-5xl font-black">{results.score}%</span>
                        </div>
                        <p className={`text-xs font-black uppercase ${results.score >= 70 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {results.score >= 70 ? 'PASS - STRONG' : 'RETRY RECOMMENDED'}
                        </p>
                    </div>

                    <div className="md:col-span-2 space-y-8">
                        <section className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                            <h3 className="text-xl font-black text-slate-900 flex items-center gap-3">
                                <BarChart className="text-indigo-600" size={24} />
                                Skill-wise Breakdown
                            </h3>
                            <div className="space-y-6">
                                {Object.entries(results.breakdown).map(([skill, data], i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between items-end">
                                            <p className="text-sm font-black text-slate-700 uppercase tracking-tight">{skill}</p>
                                            <p className="text-sm font-black text-slate-400">{data.correct} / {data.total}</p>
                                        </div>
                                        <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-1000 ${Math.round((data.correct / data.total) * 100) >= 70 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                                                style={{ width: `${(data.correct / data.total) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <div className="flex gap-4">
                            <button
                                onClick={() => setStep('configure')}
                                className="flex-1 p-6 bg-slate-100 rounded-3xl font-black text-xs uppercase tracking-widest text-slate-600 hover:bg-slate-200 transition-all flex items-center justify-center gap-3"
                            >
                                <RefreshCcw size={16} /> Retake Test
                            </button>
                            <button
                                onClick={() => navigate(`/results/${id}`)}
                                className="flex-1 p-6 bg-slate-900 rounded-3xl font-black text-xs uppercase tracking-widest text-white shadow-xl hover:-translate-y-1 transition-all flex items-center justify-center gap-3"
                            >
                                Explore Roadmap <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                <section className="bg-indigo-50 p-10 rounded-[2.5rem] border border-indigo-100 space-y-8">
                    <h3 className="text-xl font-black text-indigo-900 italic">Recommendations Engine</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-indigo-100 space-y-3 shadow-sm">
                            <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
                                <Target size={18} />
                            </div>
                            <h4 className="text-sm font-black text-slate-900">Priority Focus</h4>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                Your performance in <span className="text-indigo-600 font-bold">{Object.keys(results.breakdown)[0]}</span> shows great potential. We recommend focusing on advanced scenarios next.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-indigo-100 space-y-3 shadow-sm">
                            <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center">
                                <BookOpen size={18} />
                            </div>
                            <h4 className="text-sm font-black text-slate-900">Next Learning Action</h4>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">
                                Review the "Must-Have" section in your Roadmap. Your conceptual understanding is strong, but practical application needs more rigor.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

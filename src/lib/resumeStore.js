import { useState, useEffect } from 'react';

const INITIAL_DATA = {
    personal: {
        name: '',
        email: '',
        phone: '',
        location: '',
        github: '',
        linkedin: ''
    },
    summary: '',
    education: [],
    experience: [],
    projects: [],
    skills: {
        technical: [],
        soft: [],
        tools: []
    },
    targetRole: '',
    targetCompany: '',
    jdText: ''
};

const INITIAL_CONFIG = {
    template: 'Classic',
    color: 'hsl(0, 0%, 15%)' // Deep charcoal by default for ATS
};

const ACTION_VERBS = [
    'Achieved', 'Surpassed', 'Exceeded', 'Delivered', 'Generated', 'Increased',
    'Engineered', 'Architected', 'Developed', 'Implemented', 'Automated', 'Optimized',
    'Directed', 'Orchestrated', 'Spearheaded', 'Championed', 'Mentored', 'Guided',
    'Analyzed', 'Evaluated', 'Assessed', 'Diagnosed', 'Identified', 'Researched'
];

export const calculateATS = (data) => {
    let score = 0;
    const items = [];
    const missingKeywords = [];

    // 1. Structural Check (30 pts)
    if (data.personal.name && data.personal.email && data.personal.phone) score += 10;
    else items.push({ text: "Missing contact fundamentals (Name, Email, Phone)", type: 'critical' });

    if (data.summary.length > 100) score += 10;
    else items.push({ text: "Professional summary is too short or missing", type: 'warning' });

    if (data.experience.length > 0) score += 10;
    else items.push({ text: "No professional experience listed", type: 'critical' });

    // 2. Content Quality (40 pts)
    let metricCount = 0;
    let verbCount = 0;

    data.experience.forEach(exp => {
        if (/\d+%|\d+\s?hours|\$\d+|[0-9]+x/.test(exp.desc)) metricCount++;
        if (ACTION_VERBS.some(v => exp.desc.toLowerCase().includes(v.toLowerCase()))) verbCount++;
    });

    if (metricCount > 0) score += 15;
    else items.push({ text: "Quantify your achievements with numbers/metrics", type: 'improvement' });

    if (verbCount > 0) score += 15;
    else items.push({ text: "Start bullet points with strong action verbs", type: 'improvement' });

    if (data.skills.technical.length >= 8) score += 10;
    else items.push({ text: "List at least 8 key technical keywords", type: 'improvement' });

    // 3. Keyword Matching (30 pts) - if JD is provided
    if (data.jdText) {
        const jdKeywords = data.jdText.toLowerCase().match(/\b(react|node|aws|docker|kubernetes|javascript|typescript|python|java|sql|nosql|agile|scrum|system design|microservices|rest|graphql|ci\/cd|git|testing|unit test|integration test)\b/g);
        const resumeText = JSON.stringify(data).toLowerCase();

        if (jdKeywords) {
            const uniqueKeywords = [...new Set(jdKeywords)];
            const matched = uniqueKeywords.filter(k => resumeText.includes(k));
            const matchPercent = (matched.length / uniqueKeywords.length) * 30;
            score += Math.round(matchPercent);

            const missed = uniqueKeywords.filter(k => !resumeText.includes(k)).slice(0, 5);
            missed.forEach(m => missingKeywords.push(m));
        }
    } else {
        score += 15; // Pass points if no JD to compare
    }

    return {
        score: Math.min(score, 100),
        report: items,
        missingKeywords: [...new Set(missingKeywords)]
    };
};

export const SAMPLE_DATA = {
    personal: {
        name: 'Arjun Sharma',
        email: 'arjun.sharma@example.com',
        phone: '+91 98765 43210',
        location: 'Bangalore, India',
        github: 'github.com/arjun-s',
        linkedin: 'linkedin.com/in/arjunsharma'
    },
    summary: 'Senior Software Engineer with 5+ years of experience in architecting scalable distributed systems. Spearheaded the migration to microservices, delivering a 40% improvement in system throughput and reducing infrastructure costs by $12k/month.',
    education: [
        { school: 'IIT Delhi', degree: 'B.Tech in Computer Science', year: '2019 - 2023' }
    ],
    experience: [
        {
            company: 'TechNova Solutions',
            role: 'Senior Backend Engineer',
            duration: '06/2023 - Present',
            desc: 'Automated CI/CD pipelines using GitHub Actions, reducing deployment time by 60%. Engineered a real-time data streaming service using Node.js and Redis, handling 50k+ events per second.'
        }
    ],
    projects: [
        { title: 'AI Resume Engine', desc: 'Developed an ATS-optimization platform using React and NLP heuristics.', techStack: ['React', 'Node.js', 'Tailwind'], liveUrl: '', githubUrl: '' }
    ],
    skills: {
        technical: ['React', 'Node.js', 'AWS', 'Docker', 'Kubernetes', 'Redux', 'PostgreSQL', 'System Design'],
        soft: ['Technical Leadership', 'Stakeholder Management'],
        tools: ['Git', 'Jira', 'Figma']
    },
    targetRole: 'Senior Full Stack Developer',
    targetCompany: 'Google',
    jdText: 'Looking for a Senior Full Stack Developer. Must have experience with React, Node.js, AWS, and Kubernetes. Experience with system design and microservices is a plus.'
};

export const useResumeStore = () => {
    const [resumeData, setResumeData] = useState(() => {
        const saved = localStorage.getItem('resumeBuilderData_v2');
        if (!saved) return INITIAL_DATA;
        try { return JSON.parse(saved); } catch (e) { return INITIAL_DATA; }
    });

    const [config, setConfig] = useState(() => {
        const saved = localStorage.getItem('resumeBuilderConfig_v2');
        return saved ? JSON.parse(saved) : INITIAL_CONFIG;
    });

    useEffect(() => {
        localStorage.setItem('resumeBuilderData_v2', JSON.stringify(resumeData));
    }, [resumeData]);

    useEffect(() => {
        localStorage.setItem('resumeBuilderConfig_v2', JSON.stringify(config));
    }, [config]);

    const setTemplate = (t) => setConfig(p => ({ ...p, template: t }));
    const setColor = (c) => setConfig(p => ({ ...p, color: c }));
    const loadSample = () => setResumeData(SAMPLE_DATA);

    const ats = calculateATS(resumeData);

    return { resumeData, setResumeData, config, loadSample, ats, setTemplate, setColor };
};

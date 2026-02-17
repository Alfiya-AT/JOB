const SKILL_CATEGORIES = {
    coreCS: ["DSA", "OOP", "DBMS", "OS", "Networks"],
    languages: ["Java", "Python", "JavaScript", "TypeScript", "C", "C++", "C#", "Go"],
    web: ["React", "Next.js", "Node.js", "Express", "REST", "GraphQL"],
    data: ["SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis"],
    cloud: ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Linux"],
    testing: ["Selenium", "Cypress", "Playwright", "JUnit", "PyTest"]
};

const ENTERPRISE_COMPANIES = ["amazon", "infosys", "tcs", "google", "microsoft", "meta", "apple", "ibm", "oracle", "sap", "wipro", "accenture", "cognizant", "reliance", "hcl", "tata"];

const STUDY_RESOURCES = {
    DSA: [
        { title: "NeetCode 150", url: "https://neetcode.io/practice", type: "Practice" },
        { title: "Striver's SDE Sheet", url: "https://takeuforward.org/interviews/strivers-sde-sheet-top-coding-interview-problems/", type: "Curated List" }
    ],
    React: [
        { title: "Beta React Docs", url: "https://react.dev/learn", type: "Docs" },
        { title: "Epic React by Kent C. Dodds", url: "https://epicreact.dev/", type: "Course" }
    ],
    "Node.js": [
        { title: "Node.js Best Practices", url: "https://github.com/goldbergyoni/nodebestpractices", type: "Guide" },
        { title: "Node.js Design Patterns", url: "https://www.nodejsdesignpatterns.com/", type: "Advanced" }
    ],
    "Next.js": [
        { title: "Next.js Learn Course", url: "https://nextjs.org/learn", type: "Official" }
    ],
    JavaScript: [
        { title: "MDN JavaScript Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", type: "Docs" },
        { title: "Just JavaScript", url: "https://justjavascript.com/", type: "Mental Models" }
    ],
    Python: [
        { title: "Real Python Tutorials", url: "https://realpython.com/", type: "Tutorials" },
        { title: "Python Roadmap", url: "https://roadmap.sh/python", type: "Map" }
    ],
    Java: [
        { title: "Baeldung Java Tutorials", url: "https://www.baeldung.com/", type: "Tutorials" },
        { title: "Java Roadmap", url: "https://roadmap.sh/java", type: "Map" }
    ],
    SQL: [
        { title: "SQLBolt Interactive", url: "https://sqlbolt.com/", type: "Interactive" },
        { title: "Database Indexing Explain", url: "https://use-the-index-luke.com/", type: "Advanced" }
    ],
    AWS: [
        { title: "AWS Cloud Practitioner Path", url: "https://explore.skillbuilder.aws/learn", type: "Certification" }
    ],
    "Problem solving": [
        { title: "Cracking the Coding Interview", url: "https://www.careercup.com/book", type: "Book" }
    ]
};

const getUUID = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const generateRoleReport = (company, role, jdText) => {
    const lowerJD = jdText.toLowerCase();

    // Heuristics for analysis
    const isRemote = lowerJD.includes('remote') || lowerJD.includes('work from home');
    const isHybrid = lowerJD.includes('hybrid');
    const location = isRemote ? 'Remote' : (isHybrid ? 'Hybrid' : 'On-site');

    const seniority = lowerJD.includes('senior') || lowerJD.includes('lead') || lowerJD.includes('staff')
        ? 'Senior' : (lowerJD.includes('junior') || lowerJD.includes('intern') || lowerJD.includes('fresher') ? 'Entry' : 'Mid-Level');

    const category = lowerJD.includes('product') ? 'Product' : (lowerJD.includes('design') ? 'Design' : 'Engineering');

    return {
        overview: { // 1. Role Overview
            summary: `This is a ${seniority} ${category} role at ${company || 'the target company'} focusing on ${role || 'core technical contributions'}. It requires a blend of practical execution and strategic understanding.`,
            seniority,
            category,
            location
        },
        responsibilities: [ // 2. Responsibilities
            "Lead development of core features and systems using modern architectural patterns.",
            "Collaborate with cross-functional teams to define requirements and success metrics.",
            "Ensure high quality through automated testing, code reviews, and documentation.",
            "Optimize performance and scalability of existing products to handle increased load."
        ],
        skills: { // 3. Skills & Competencies
            hard: ["Technical Architecture", "Core Programming", "System Design", "Cloud Infrastructure", "API Security"],
            soft: ["Communication", "Problem Solving", "Stakeholder Management", "Leadership", "Critical Thinking"],
            mustHave: seniority === 'Senior' ? "Strong leadership and architectural background with proven delivery." : "Solid fundamental knowledge and rapid learning ability in production environments."
        },
        experience: { // 4. Experience Requirements
            years: seniority === 'Senior' ? "5-8 years" : (seniority === 'Entry' ? "0-2 years" : "3-5 years"),
            education: "Bachelor's or Master's degree in Computer Science or related field.",
            industry: "Technology or SaaS sector experience preferred with high-growth startup exposure."
        },
        context: { // 5. Company Context
            sector: "Technology / SaaS",
            size: "Enterprise / Growth Stage",
            environment: "Fast-paced, high-ownership, and innovation-driven culture.",
            intel: company ? `${company} is a key player in its segment, focusing on digital transformation and innovative user experiences.` : "The company operates in a competitive tech environment requiring high agility."
        },
        compensation: { // 6. Compensation Indicators
            range: seniority === 'Senior' ? "₹25L - ₹45L" : (seniority === 'Entry' ? "08L - 15L" : "15L - 25L"),
            marketFit: "Highly competitive with industry standards for this level of role.",
            perks: ["Equity/ESOPs", "Health Insurance", "Remote Setup Stipend", "Learning Credits"]
        },
        growth: { // 7. Career Growth Trajectory
            pathway: seniority === 'Senior' ? "Principal Engineer / CTO Office" : "Senior Developer / Tech Lead",
            mentorship: "High - direct exposure to senior leadership and complex system design.",
            scalability: "The role offers clear transitions into leadership or deep domain expertise."
        },
        complexity: { // 8. Role Complexity & Metrics
            technical: seniority === 'Senior' ? 8.5 : 6.5,
            responsibility: seniority === 'Senior' ? 9.0 : 5.0,
            experience: seniority === 'Senior' ? 8.0 : 4.0,
            diversity: 7.5,
            performanceMetric: "Code quality, deployment frequency, and architectural impact."
        },
        insights: { // 9. Candidate Matching Insights
            idealCandidate: "An ownership-driven professional who thrives in fast-paced environments and values clean code and architectural integrity.",
            challenges: "Navigating complex legacy systems while delivering new features on tight schedules.",
            redFlags: "Vague descriptions of tech stack or unclear success metrics in the JD."
        },
        market: { // 10. Market Competitiveness
            attractiveness: "High - the requirements align well with industry standards for current tech roles.",
            competitiveness: "Strong - expects high technical proficiency and cultural alignment.",
            demand: "Exceptional - this role is in the top 5% of in-demand technical trajectories."
        }
    };
};

const generateComprehensiveRoadmap = (company, role, jdText, allDetected) => {
    const lowerJD = jdText.toLowerCase();
    const seniority = lowerJD.includes('senior') || lowerJD.includes('lead') ? 'Senior' : (lowerJD.includes('junior') ? 'Entry' : 'Mid');

    // Foundation skills based on detected categories
    const mainSkills = allDetected.slice(0, 3);

    return {
        // 1. Role Overview & Gap Analysis
        gapAnalysis: {
            positionSummary: `Strategic ${role} position at ${company || 'the target firm'}, demanding a high-degree of ownership over technical delivery and architectural quality.`,
            criticalGaps: [
                `Transitioning from broad technical knowledge to ${mainSkills[0] || 'core engineering'} depth.`,
                "Bridging the gap between individual contribution and architectural thinking.",
                "Aligning technical decisions with business-critical success metrics."
            ],
            qualifications: {
                mustHave: ["Strong problem solving primitives", "Proven track record in technical delivery", "Cultural alignment with high-ownership teams"],
                niceToHave: ["Previous startup scaling experience", "Contributions to open-source", "Niche domain certifications"]
            }
        },

        // 2. Learning Pathways (Prioritized)
        learningPathways: [
            {
                phase: "Phase 1: Foundation (Month 1)",
                focus: `Solidifying ${mainSkills.join(' & ') || 'Fundamentals'}`,
                topics: ["Deep dive into core runtime environments", "Architectural patterns for scalability", "Automated testing strategies"],
                projects: `Build a production-ready micro-service focusing on ${mainSkills[0] || 'clean architecture'}.`
            },
            {
                phase: "Phase 2: Intermediate (Months 2-3)",
                focus: "System Design & Integration",
                topics: ["Distributed systems and messaging queues", "Cloud-native deployment patterns", "Performance profiling and optimization"],
                projects: "Implement a real-time data sync engine or a complex dashboard with high-concurrency."
            },
            {
                phase: "Phase 3: Mastery (Months 4-6)",
                focus: "Strategic Leadership & Depth",
                topics: ["Technical decision making and trade-offs", "Team mentorship and code review standards", "Service reliability engineering"],
                projects: "Contribute to a high-impact open source project or design a system from 0 to 1."
            }
        ],

        // 3. Practical Action Steps
        actionSteps: [
            {
                area: "Technical Depth",
                resources: ["System Design Primer (GitHub)", "Modern Operating Systems (Tanenbaum)"],
                timeInvestment: "10-12 hours/week"
            },
            {
                area: "Domain Knowledge",
                resources: ["Industry whitepapers", "Tech Blogs (Netflix/Uber/Airbnb)"],
                timeInvestment: "4-6 hours/week"
            }
        ],

        // 4. Portfolio & Proof of Work
        portfolio: {
            suggestedProjects: [
                "Full-stack Scalable System: Demonstrates end-to-end ownership.",
                "Technical Documentation: Showcases ability to communicate complex ideas.",
                "Open Source PRS: Signals collaboration and code quality."
            ],
            demonstrators: ["GitHub Organization profile", "Technical Blog on Medium/Hashnode", "Public portfolio site"]
        },

        // 5. Application Readiness
        readiness: {
            resumeTips: [
                "Quantify your impact using the X-Y-Z formula.",
                "Highlight relevant tech stack matching the JD keywords.",
                "Create a separate section for architectural contributions."
            ],
            interviewFocus: ["Core DSA Performance", "System Design Trade-offs", "Behavioral (STAR Method)"],
            questionsToAsk: ["What does success look like for this role in the first 90 days?", "How does the team handle technical debt?", "What is the biggest technical challenge the team is currently facing?"]
        },

        // 6. Timeline & Milestones
        timeline: [
            { period: "Month 1", milestone: "Complete core architecture certification & first project." },
            { period: "Month 2-3", milestone: "Submit 5 high-quality PRs and build a complex system." },
            { period: "Month 4-6", milestone: "Mock interviews completed & Resume optimized for target tier." }
        ]
    };
};

export const analyzeJD = (company, role, jdText) => {
    const extractedSkills = {
        coreCS: [],
        languages: [],
        web: [],
        data: [],
        cloud: [],
        testing: [],
        other: []
    };

    let categoryCount = 0;
    const lowerJD = jdText.toLowerCase();
    const lowerCompany = company.toLowerCase().trim();

    // 1. Skill Extraction
    const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const allDetected = [];
    Object.entries(SKILL_CATEGORIES).forEach(([category, skills]) => {
        const detected = skills.filter(skill => {
            let pattern;
            if (/[^a-zA-Z0-9]/.test(skill)) {
                pattern = `(?:^|\\s|[\\/\\(\\),;])${escapeRegExp(skill)}(?=$|\\s|[\\/\\(\\),;])`;
            } else {
                pattern = `\\b${skill}\\b`;
            }
            const regex = new RegExp(pattern, 'i');
            return regex.test(lowerJD);
        });
        if (detected.length > 0) {
            extractedSkills[category] = detected;
            allDetected.push(...detected);
            categoryCount++;
        }
    });

    if (allDetected.length === 0) {
        extractedSkills.other = ["Communication", "Problem solving"];
        allDetected.push("Communication", "Problem solving");
    }

    // Generate Tailored Resources
    const resources = [];
    allDetected.forEach(skill => {
        if (STUDY_RESOURCES[skill]) {
            resources.push(...STUDY_RESOURCES[skill].map(r => ({ ...r, skill })));
        }
    });
    if (resources.length < 3) {
        resources.push({ title: "Interviewing.io Guides", url: "https://interviewing.io/guides", type: "Interview Prep", skill: "General" });
        resources.push({ title: "GeeksforGeeks SDE Prep", url: "https://www.geeksforgeeks.org/software-development-engineer-sde-roadmap/", type: "Roadmap", skill: "General" });
    }

    // 2. Company Intel Heuristics
    const isEnterprise = ENTERPRISE_COMPANIES.some(c => lowerCompany.includes(c));

    // 3. Round Mapping Engine
    let roundMapping = [];
    if (isEnterprise) {
        roundMapping = [
            { roundTitle: "Online Test", focusAreas: ["DSA", "Aptitude"], whyItMatters: "Filters candidates based on core fundamentals and speed." },
            { roundTitle: "Technical Interview 1", focusAreas: ["DSA", "OS/DBMS"], whyItMatters: "Verifies technical depth and foundational CS knowledge." },
            { roundTitle: "Technical Interview 2", focusAreas: ["Projects", "Design"], whyItMatters: "Assesses how you apply skills to practical problems." },
            { roundTitle: "Managerial / HR", focusAreas: ["Behavioral", "Culture"], whyItMatters: "Ensures alignment with company values and team fit." }
        ];
    } else {
        roundMapping = [
            { roundTitle: "Practical Coding", focusAreas: ["Project Build", "Logic"], whyItMatters: "Focuses on your ability to deliver functional code quickly." },
            { roundTitle: "System Discussion", focusAreas: ["Architecture", "Stack"], whyItMatters: "Checks if you understand the end-to-end flow of applications." },
            { roundTitle: "Culture Fit", focusAreas: ["Communication", "Ownership"], whyItMatters: "Startups value fast learners and proactive owners." }
        ];
    }

    // 4. Checklist Generation
    const checklist = roundMapping.map(round => ({
        roundTitle: round.roundTitle,
        items: [
            ...round.focusAreas.map(f => `Revise concepts of ${f}`),
            "Practice common interview questions",
            "Be ready with project examples"
        ]
    }));

    // 5. 7-Day Plan
    const plan7Days = [
        { day: "Day 1-2", focus: "CS Fundamentals", tasks: ["Revise OOP/DBMS basics", "Practice basic strings and arrays"] },
        { day: "Day 3-4", focus: "Core Proficiency", tasks: [`Deep dive into ${allDetected.slice(0, 3).join(', ')}`, "Solve medium level DSA problems"] },
        { day: "Day 5", focus: "Project Review", tasks: ["Analyze your major projects", "Prepare architecture diagrams"] },
        { day: "Day 6", focus: "Soft Skills", tasks: ["Practice HR questions", "Mock technical interview with a friend"] },
        { day: "Day 7", focus: "Revision", tasks: ["Review weak areas", "Final look at previous interview experiences"] }
    ];

    // 6. Readiness Score Logic
    let baseScore = 35;
    baseScore += Math.min(categoryCount * 5, 30);
    if (company.trim()) baseScore += 10;
    if (role.trim()) baseScore += 10;
    if (jdText.length > 800) baseScore += 10;
    baseScore = Math.min(baseScore, 100);

    const skillConfidenceMap = {};
    allDetected.forEach(skill => {
        skillConfidenceMap[skill] = "practice";
    });

    const roleReport = generateRoleReport(company, role, jdText);
    const roadmap = generateComprehensiveRoadmap(company, role, jdText, allDetected);

    return {
        id: getUUID(),
        isDraft: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        company: company || "",
        role: role || "",
        jdText,
        extractedSkills,
        roundMapping,
        checklist,
        plan7Days,
        resources,
        roleReport,
        roadmap,
        questions: [
            "Tell me about your most challenging technical project.",
            "How do you stay updated with new technologies?",
            allDetected.includes("SQL") ? "Explain indexing and ACID properties." : "Explain how you handle state in your applications.",
            allDetected.includes("DSA") ? "What is the complexity of your most used algorithm?" : "How do you optimize your development workflow?",
            "How do you handle conflict in a team setting?",
            "Where do you see yourself in 2 years?",
            "What is your approach to learning a new language?",
            "Give an example of a time you handled a tight deadline.",
            "What do you look for in a team culture?",
            "Do you have any questions for us?"
        ],
        baseScore,
        skillConfidenceMap,
        finalScore: baseScore
    };
};

export const saveToHistory = (analysis) => {
    try {
        const history = JSON.parse(localStorage.getItem('prep_history') || '[]');
        history.unshift(analysis);
        localStorage.setItem('prep_history', JSON.stringify(history));
    } catch (e) {
        console.error("Failed to save to history", e);
    }
};

export const getHistory = () => {
    try {
        const raw = localStorage.getItem('prep_history');
        if (!raw) return [];
        const history = JSON.parse(raw);
        return history.filter(item => item && typeof item === 'object' && item.id && item.jdText);
    } catch (e) {
        return [];
    }
};

export const getLatestAnalysis = () => getHistory()[0] || null;
export const getAnalysisById = (id) => getHistory().find(a => a.id === id);

export const updateHistoryEntry = (id, updates) => {
    const history = getHistory();
    const index = history.findIndex(a => a.id === id);
    if (index !== -1) {
        history[index] = {
            ...history[index],
            ...updates,
            updatedAt: new Date().toISOString()
        };
        localStorage.setItem('prep_history', JSON.stringify(history));
    }
};

export const getTestChecklist = () => JSON.parse(localStorage.getItem('prp_test_checklist') || '{}');
export const saveTestChecklist = (checklist) => localStorage.setItem('prp_test_checklist', JSON.stringify(checklist));
export const resetTestChecklist = () => localStorage.removeItem('prp_test_checklist');

export const getSubmissionData = () => JSON.parse(localStorage.getItem('prp_final_submission') || '{"lovable":"","github":"","deployed":""}');
export const saveSubmissionData = (data) => localStorage.setItem('prp_final_submission', JSON.stringify(data));

export const getPlatformStatus = () => {
    const checklist = getTestChecklist();
    const passedCount = Object.values(checklist).filter(Boolean).length;
    const submission = getSubmissionData();
    const linksProvided = submission.lovable && submission.github && submission.deployed;

    const stepsCompleted = true;

    if (passedCount === 10 && linksProvided && stepsCompleted) {
        return "Shipped";
    }
    return "In Progress";
};

const MOCK_QUESTION_BANK = {
    JavaScript: [
        {
            id: "js_001",
            type: "MCQ",
            difficulty: "Medium",
            question: "What will be the output of: console.log(typeof null)?",
            options: ["object", "null", "undefined", "number"],
            answer: "object",
            explanation: "In JavaScript, typeof null is historicaly 'object'. This is considered a bug in the language but cannot be fixed due to backward compatibility."
        },
        {
            id: "js_002",
            type: "MCQ",
            difficulty: "Hard",
            question: "What is the result of [] == ![]?",
            options: ["true", "false", "TypeError", "undefined"],
            answer: "true",
            explanation: "The ! operator has higher precedence, so ![] becomes false. Then [] == false is evaluated. Both are converted to numbers: 0 == 0, which is true."
        }
    ],
    Python: [
        {
            id: "py_001",
            type: "MCQ",
            difficulty: "Easy",
            question: "Which of these is a mutable data type in Python?",
            options: ["List", "Tuple", "String", "Integer"],
            answer: "List",
            explanation: "Lists can be modified after creation, while tuples, strings, and integers are immutable."
        }
    ],
    React: [
        {
            id: "react_001",
            type: "Scenario",
            difficulty: "Medium",
            question: "A component is re-rendering too frequently. How do you optimize it?",
            options: ["useMemo/useCallback", "useState", "useEffect", "useRef"],
            answer: "useMemo/useCallback",
            explanation: "useMemo and useCallback are used to memoize values and functions respectively, preventing unnecessary re-calculations and re-renders of child components that depend on them."
        }
    ],
    "System Design": [
        {
            id: "sd_001",
            type: "Scenario",
            difficulty: "Hard",
            question: "You need to design a URL shortener that handles 1M requests/sec. What is your scaling strategy?",
            options: ["NoSQL + Caching", "Single SQL DB", "Client side hashing", "Load balancer only"],
            answer: "NoSQL + Caching",
            explanation: "For high-throughput read/write operations, a NoSQL database like MongoDB or Cassandra paired with a caching layer like Redis is the standard architecture."
        }
    ]
};

export const generateSkillSelection = (analysis) => {
    if (!analysis || !analysis.extractedSkills) return null;

    const categories = [];
    Object.entries(analysis.extractedSkills).forEach(([category, skills]) => {
        if (skills.length > 0) {
            categories.push({
                category,
                skills: skills.map(name => ({
                    id: `skill_${Math.random().toString(36).substr(2, 5)}`,
                    name,
                    proficiency: analysis.roleReport?.overview?.seniority === 'Senior' ? 'Advanced' : 'Intermediate',
                    is_mandatory: true,
                    suggested_question_count: 5
                }))
            });
        }
    });

    return {
        role: analysis.role,
        company: analysis.company,
        total_skills_identified: categories.reduce((acc, cat) => acc + cat.skills.length, 0),
        skill_categories: categories,
        recommended_test_duration: "45 minutes",
        recommended_total_questions: 20
    };
};

export const generateMockTest = (selectedSkills, config = {}) => {
    const { difficulty = 'Balanced', duration = '30 min', count = 10 } = config;
    const questions = [];

    // Pick questions based on selected skills
    selectedSkills.forEach(skillName => {
        const pool = MOCK_QUESTION_BANK[skillName] || MOCK_QUESTION_BANK["JavaScript"]; // Fallback
        if (pool) {
            const skillQuestions = pool.slice(0, 2);
            questions.push(...skillQuestions);
        }
    });

    return {
        test_id: `test_${Date.now()}`,
        skills_covered: selectedSkills,
        total_questions: questions.length,
        total_duration: duration,
        passing_score: 70,
        questions: questions.map((q, idx) => ({
            ...q,
            question_id: `Q${idx + 1}`,
            points: q.difficulty === 'Hard' ? 10 : 5
        }))
    };
};

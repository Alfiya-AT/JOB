export function calculateMatchScore(job, preferences) {
    if (!preferences) return 0;

    let score = 0;

    // 1) Role matching (+25 title, +15 description)
    const keywords = preferences.roleKeywords?.toLowerCase().split(',').map(k => k.trim()) || [];
    const titleMatch = keywords.some(k => k && job.title.toLowerCase().includes(k));
    const descMatch = keywords.some(k => k && job.description.toLowerCase().includes(k));

    if (titleMatch) score += 25;
    if (descMatch) score += 15;

    // 2) Location matching (+15)
    if (preferences.preferredLocations?.includes(job.location)) {
        score += 15;
    }

    // 3) Mode matching (+10)
    if (preferences.preferredMode?.includes(job.mode)) {
        score += 10;
    }

    // 4) Experience matching (+10)
    if (preferences.experienceLevel === job.experience) {
        score += 10;
    }

    // 5) Skills overlap (+15)
    const userSkills = preferences.skills?.toLowerCase().split(',').map(s => s.trim()) || [];
    const skillMatch = job.skills.some(s => userSkills.includes(s.toLowerCase()));
    if (skillMatch) score += 15;

    // 6) Freshness (+5)
    if (job.postedDaysAgo <= 2) {
        score += 5;
    }

    // 7) Source (+5)
    if (job.source === "LinkedIn") {
        score += 5;
    }

    return Math.min(100, score);
}

export function getScoreColor(score) {
    if (score >= 80) return "text-emerald-700 bg-emerald-50 border-emerald-100";
    if (score >= 60) return "text-amber-700 bg-amber-50 border-amber-100";
    if (score >= 40) return "text-slate-700 bg-slate-50 border-slate-100";
    return "text-slate-400 bg-slate-50 border-slate-100 opacity-60";
}

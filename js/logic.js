import { ABJAD_MAP, NAMES_OF_ALLAH, zodiacData } from './data.js';

export function calculateAbjadScore(name) {
    if (!name) return 0;
    // Remove diacritics and spaces
    const cleaned = name.replace(/[\u064B-\u065F\u0670\s]/g, '');
    const chars = cleaned.split('').filter(c => c.trim() !== '');
    return chars.reduce((acc, char) => acc + (ABJAD_MAP[char] || 0), 0);
}

export function findMatches(sum) {
    const c = NAMES_OF_ALLAH;
    const single = c.filter(item => item.sum === sum);
    let nearest = null;
    
    // Find nearest match if no exact match
    if(single.length === 0) {
         nearest = c.reduce((prev, curr) => Math.abs(curr.sum - sum) < Math.abs(prev.sum - sum) ? curr : prev);
    }
    return { single, nearest };
}

export function getZodiacSign(day, month) {
    // Check Capricorn edge case (Dec-Jan)
    if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) {
        return zodiacData.find(z => z.name === "Capricorn");
    }
    // Check others
    for (let z of zodiacData) {
        if (z.name === "Capricorn") continue;
        if ((month == z.start.m && day >= z.start.d) || (month == z.end.m && day <= z.end.d)) {
            return z;
        }
    }
    // Fallback
    return zodiacData[0];
}
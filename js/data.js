export const elements = {
    Fire: { 
        urdu: "آتشی (Agni)", color: '#ef4444', icon: '🔥', 
        qualities: "Leadership, Intense energy, Visionary, Brave, Competitive",
        challenges: "Impulsiveness, stubbornness, burnout risk, short temper",
        match: "Air" 
    },
    Air: { 
        urdu: "ہوائی (Hawa)", color: '#f59e0b', icon: '🌪️', 
        qualities: "Witty, Charming, Intellectual, Adaptable, Curious",
        challenges: "Inconsistency, lack of focus, easily bored, detached",
        match: "Fire" 
    },
    Water: { 
        urdu: "آبی (Pani)", color: '#3b82f6', icon: '💧', 
        qualities: "Intuitive, Romantic, Dreamer, Protective, Empathetic",
        challenges: "Over-sensitive, avoids conflict, mood swings, self-sacrifice",
        match: "Earth" 
    },
    Earth: { 
        urdu: "خاکی (Mitti)", color: '#10b981', icon: '🌿', 
        qualities: "Hardworking, Patient, Reliable, Practical, Grounded",
        challenges: "Rigid, overthinking, slow to change, stubborn",
        match: "Water" 
    }
};

export const zodiacData = [
    { name: "Aquarius", icon: "♒", start: {m:1, d:20}, end: {m:2, d:18}, p: "Creative, unique, independent", s: "Experimental, indie, futuristic sound 🎧" },
    { name: "Pisces", icon: "♓", start: {m:2, d:19}, end: {m:3, d:20}, p: "Dreamy, emotional, artistic", s: "Magical, emotional, soulful music 🌊" },
    { name: "Aries", icon: "♈", start: {m:3, d:21}, end: {m:4, d:19}, p: "Bold, energetic, confident, leader", s: "Powerful, loud, high-energy (rock / rap vibes)" },
    { name: "Taurus", icon: "♉", start: {m:4, d:20}, end: {m:5, d:20}, p: "Calm, loyal, patient, loves comfort", s: "Deep, smooth, romantic voice" },
    { name: "Gemini", icon: "♊", start: {m:5, d:21}, end: {m:6, d:20}, p: "Talkative, intelligent, adaptable", s: "Fun, fast, pop or playful vocals" },
    { name: "Cancer", icon: "♋", start: {m:6, d:21}, end: {m:7, d:22}, p: "Emotional, caring, sensitive", s: "Soft, soulful, emotional songs" },
    { name: "Leo", icon: "♌", start: {m:7, d:23}, end: {m:8, d:22}, p: "Confident, dramatic, loves attention", s: "Powerful stage presence, star-like vocals 🌟" },
    { name: "Virgo", icon: "♍", start: {m:8, d:23}, end: {m:9, d:22}, p: "Perfectionist, practical, calm", s: "Clean, soft, meaningful lyrics" },
    { name: "Libra", icon: "♎", start: {m:9, d:23}, end: {m:10, d:22}, p: "Charming, romantic, balanced", s: "Love songs, harmony, duet-style singing 💞" },
    { name: "Scorpio", icon: "♏", start: {m:10, d:23}, end: {m:11, d:21}, p: "Intense, mysterious, passionate", s: "Deep, emotional, dark-tone songs" },
    { name: "Sagittarius", icon: "♐", start: {m:11, d:22}, end: {m:12, d:21}, p: "Adventurous, optimistic, free-spirited", s: "Upbeat, party, travel-vibe songs 🎉" },
    { name: "Capricorn", icon: "♑", start: {m:12, d:22}, end: {m:1, d:19}, p: "Disciplined, serious, ambitious", s: "Classic, strong message, meaningful music" }
];

export const ABJAD_MAP = {'ا': 1, 'آ': 1, 'أ': 1, 'إ': 1, 'ء': 1, 'ب': 2, 'پ': 2, 'ج': 3, 'چ': 3, 'د': 4, 'ڈ': 4, 'ه': 5, 'ہ': 5, 'ة': 5, 'ھ': 5, 'و': 6, 'ؤ': 6, 'ز': 7, 'ژ': 7, 'ح': 8, 'ط': 9, 'ی': 10, 'ي': 10, 'ى': 10, 'ئ': 10, 'ے': 10, 'ک': 20, 'ك': 20, 'گ': 20, 'ل': 30, 'م': 40, 'ن': 50, 'ں': 50, 'س': 60, 'ع': 70, 'ف': 80, 'ص': 90, 'ق': 100, 'ر': 200, 'ڑ': 200, 'ش': 300, 'ت': 400, 'ٹ': 400, 'ث': 500, 'خ': 600, 'ذ': 700, 'ض': 800, 'ظ': 900, 'غ': 1000};

export const NAMES_OF_ALLAH = [
    { arabic: "الله", transliteration: "Allah", sum: 66, meaningUrdu: "خدا" },
    { arabic: "الرحمن", transliteration: "Ar-Rahman", sum: 298, meaningUrdu: "بہت مہربان" },
    { arabic: "الرحيم", transliteration: "Ar-Rahim", sum: 258, meaningUrdu: "نہایت رحم والا" },
    { arabic: "الملك", transliteration: "Al-Malik", sum: 90, meaningUrdu: "بادشاہ" },
    { arabic: "القدوس", transliteration: "Al-Quddus", sum: 170, meaningUrdu: "پاک ذات" },
    { arabic: "السلام", transliteration: "As-Salam", sum: 131, meaningUrdu: "سلامتی والا" },
    { arabic: "المؤمن", transliteration: "Al-Mu'min", sum: 136, meaningUrdu: "امن دینے والا" },
    { arabic: "المهيمن", transliteration: "Al-Muhaymin", sum: 145, meaningUrdu: "نگہبان" },
    { arabic: "العزيز", transliteration: "Al-Aziz", sum: 94, meaningUrdu: "غالب" },
    { arabic: "الجبار", transliteration: "Al-Jabbar", sum: 206, meaningUrdu: "زبردست" },
    { arabic: "المتكلم", transliteration: "Al-Mutakabbir", sum: 662, meaningUrdu: "بڑائی والا" },
    { arabic: "الخالق", transliteration: "Al-Khaliq", sum: 731, meaningUrdu: "پیدا کرنے والا" },
    { arabic: "البارئ", transliteration: "Al-Bari", sum: 213, meaningUrdu: "جان ڈالنے والا" },
    { arabic: "المصور", transliteration: "Al-Musawwir", sum: 336, meaningUrdu: "صورت بنانے والا" },
    { arabic: "الغفار", transliteration: "Al-Ghaffar", sum: 1281, meaningUrdu: "بہت بخشنے والا" },
    { arabic: "القهار", transliteration: "Al-Qahhar", sum: 306, meaningUrdu: "قہر نازل کرنے والا" },
    { arabic: "الوهاب", transliteration: "Al-Wahhab", sum: 14, meaningUrdu: "سب کچھ عطا کرنے والا" },
    { arabic: "الرزاق", transliteration: "Ar-Razzaq", sum: 308, meaningUrdu: "رزق دینے والا" },
    { arabic: "الفتاح", transliteration: "Al-Fattah", sum: 489, meaningUrdu: "کھولنے والا" },
    { arabic: "العليم", transliteration: "Al-Alim", sum: 150, meaningUrdu: "جاننے والا" },
    { arabic: "الودود", transliteration: "Al-Wadud", sum: 20, meaningUrdu: "محبت کرنے والا" },
    { arabic: "النور", transliteration: "An-Nur", sum: 256, meaningUrdu: "روشن کرنے والا" },
    { arabic: "الهادي", transliteration: "Al-Hadi", sum: 20, meaningUrdu: "ہدایت دینے والا" }
];

export const traitsList = [
    {en: "Highly Driven", type: "Fire", ur: "پرجوش"}, {en: "Risk Taker", type: "Fire", ur: "نڈر"},
    {en: "Leadership", type: "Fire", ur: "قیادت"}, {en: "Brave", type: "Fire", ur: "بہادر"},
    {en: "Competitive", type: "Fire", ur: "مقابلہ پسند"},
    {en: "Social", type: "Air", ur: "ملنسار"}, {en: "Creative", type: "Air", ur: "تخلیقی"},
    {en: "Talkative", type: "Air", ur: "باتونی"}, {en: "Witty", type: "Air", ur: "حاضر جواب"},
    {en: "Charming", type: "Air", ur: "دلکش"},
    {en: "Empathetic", type: "Water", ur: "ہمدرد"}, {en: "Intuitive", type: "Water", ur: "حساس"},
    {en: "Protective", type: "Water", ur: "محافظ"}, {en: "Romantic", type: "Water", ur: "رومانوی"},
    {en: "Dreamer", type: "Water", ur: "خواب دیکھنے والا"},
    {en: "Stable", type: "Earth", ur: "مستحکم"}, {en: "Practical", type: "Earth", ur: "عملی"},
    {en: "Reliable", type: "Earth", ur: "قابل اعتماد"}, {en: "Hardworking", type: "Earth", ur: "محنتی"},
    {en: "Patient", type: "Earth", ur: "صابر"}
];
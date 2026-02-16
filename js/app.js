import { elements } from './data.js';
import { calculateAbjadScore, findMatches, getZodiacSign } from './logic.js';

// --- VISUAL PSYCHOLOGICAL QUIZ DATA ---
const quizData = [
    {
        question: "The gateway to your soul appears before you. What is it made of?",
        options: [
            { text: "Eternal Flame", type: "Fire", img: "https://images.unsplash.com/photo-1520699049698-acd2fcc51056?auto=format&fit=crop&w=300&q=80" },
            { text: "Ethereal Mist", type: "Air", img: "https://images.unsplash.com/photo-1505672675380-4d6d6fe5a8e5?auto=format&fit=crop&w=300&q=80" },
            { text: "Deep Ocean", type: "Water", img: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=300&q=80" },
            { text: "Ancient Stone", type: "Earth", img: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=300&q=80" }
        ]
    },
    {
        question: "Which celestial event resonates with your vibration?",
        options: [
            { text: "Supernova", type: "Fire", img: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=300&q=80" },
            { text: "Solar Eclipse", type: "Earth", img: "https://images.unsplash.com/photo-1532978379173-5cf554a6965e?auto=format&fit=crop&w=300&q=80" },
            { text: "Aurora Borealis", type: "Air", img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=300&q=80" },
            { text: "Meteor Shower", type: "Water", img: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=300&q=80" }
        ]
    },
    {
        question: "You find a lost artifact in the sand. What is it?",
        options: [
            { text: "Golden Crown", type: "Fire", img: "https://images.unsplash.com/photo-1605218427306-022ba8c26a42?auto=format&fit=crop&w=300&q=80" },
            { text: "Antique Compass", type: "Air", img: "https://images.unsplash.com/photo-1623864467008-0125c1b6a378?auto=format&fit=crop&w=300&q=80" },
            { text: "Silver Mirror", type: "Water", img: "https://images.unsplash.com/photo-1563205764-6e9352d9a934?auto=format&fit=crop&w=300&q=80" },
            { text: "Bound Book", type: "Earth", img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80" }
        ]
    },
    {
        question: "A storm approaches. What is your instinct?",
        options: [
            { text: "Command it", type: "Fire", img: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=300&q=80" },
            { text: "Fly above it", type: "Air", img: "https://images.unsplash.com/photo-1487621167305-5d248087c724?auto=format&fit=crop&w=300&q=80" },
            { text: "Flow with it", type: "Water", img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=300&q=80" },
            { text: "Stand firm", type: "Earth", img: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?auto=format&fit=crop&w=300&q=80" }
        ]
    },
    {
        question: "Final Choice: Which color pulls you in?",
        options: [
            { text: "Crimson Red", type: "Fire", img: "https://images.unsplash.com/photo-1541414779316-956a5084c0d4?auto=format&fit=crop&w=300&q=80" },
            { text: "Azure Blue", type: "Air", img: "https://images.unsplash.com/photo-1536514498073-50e69d39c6cf?auto=format&fit=crop&w=300&q=80" },
            { text: "Deep Teal", type: "Water", img: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&w=300&q=80" },
            { text: "Forest Green", type: "Earth", img: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?auto=format&fit=crop&w=300&q=80" }
        ]
    }
];

let currentQuestionIndex = 0;
let userAnswers = [];
let chartInstance = null;
let userData = { name: '', email: '' };

// Initialize App
function init() {
    // No initial render needed until quiz starts
}

// --- NEW QUIZ ENGINE ---

function renderQuiz() {
    const grid = document.getElementById('trait-grid');
    const header = document.querySelector('#quiz-view h2');
    const subtext = document.querySelector('#quiz-view p');
    const footerBar = document.getElementById('quiz-footer');
    
    if(!grid) return;
    grid.innerHTML = '';

    // Check if quiz is finished
    if (currentQuestionIndex >= quizData.length) {
        finishQuiz(header, subtext, grid, footerBar);
        return;
    }

    // Get current question data
    const q = quizData[currentQuestionIndex];

    // Update UI Text
    header.innerText = `Ritual Step ${currentQuestionIndex + 1}`;
    subtext.innerText = q.question;
    
    // Render Image Options
    q.options.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'relative group overflow-hidden rounded-2xl aspect-[4/3] border-2 border-transparent hover:border-indigo-500 transition-all shadow-md';
        btn.innerHTML = `
            <img src="${opt.img}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="${opt.text}">
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-center pb-4">
                <span class="text-white font-bold text-sm tracking-widest uppercase">${opt.text}</span>
            </div>
        `;
        btn.onclick = () => handleAnswer(opt.type);
        grid.appendChild(btn);
    });

    // Update footer progress if exists
    const counter = document.getElementById('counter');
    if(counter) counter.innerText = `${Math.round((currentQuestionIndex / quizData.length) * 100)}%`;
}

function handleAnswer(type) {
    userAnswers.push(type);
    currentQuestionIndex++;
    renderQuiz();
}

function finishQuiz(header, subtext, grid, footerBar) {
    header.innerText = "Soul Matrix Locked";
    subtext.innerText = "Your elemental signature has been calculated. Proceed to Temporal Lock.";
    
    // Clear grid and show success state
    grid.className = "flex flex-col items-center justify-center py-10 fade-in";
    grid.innerHTML = `
        <div class="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-4 shadow-lg shadow-green-200">
            ✓
        </div>
        <p class="text-gray-500 font-bold mb-6">Profile Successfully Cached</p>
        <button onclick="goToDateView()" class="btn-fancy px-12 py-4 rounded-xl shadow-xl shadow-indigo-300 animate-pulse">
            Proceed to Phase 2 →
        </button>
    `;

    // Update progress text
    const counter = document.getElementById('counter');
    if(counter) counter.innerText = "100%";
    
    // Hide the default footer button to avoid confusion, forcing user to use the big main button
    if(footerBar) footerBar.classList.add('hidden');
}

// --- Navigation Functions ---

window.openApp = function(viewId) {
    switchView('home-view', viewId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.goHome = function() {
    ['intro-view', 'quiz-view', 'date-view', 'name-view', 'processing-view', 'result-view'].forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });
    document.getElementById('home-view').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.goToIntro = function() {
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    if(!name || !email) return alert("Please complete your identity verification.");
    userData = { name, email };
    
    // Reset Quiz State
    currentQuestionIndex = 0;
    userAnswers = [];
    
    // Reset footer visibility just in case
    const footerBar = document.getElementById('quiz-footer');
    if(footerBar) footerBar.classList.remove('hidden');
    
    const grid = document.getElementById('trait-grid');
    if(grid) grid.className = "grid grid-cols-2 gap-4 mb-24"; // Reset grid layout

    switchView('intro-view', 'quiz-view');
    renderQuiz(); // Start the quiz
};

window.goToDateView = function() {
    if (userAnswers.length < quizData.length) return alert("Please complete the visual ritual first.");
    switchView('quiz-view', 'date-view');
};

window.backToQuiz = function() { 
    // Show footer again when going back
    const footerBar = document.getElementById('quiz-footer');
    if(footerBar) footerBar.classList.remove('hidden');
    
    // If quiz was finished, show results state, otherwise show question
    if (userAnswers.length === quizData.length) {
         // It will re-render finish state
         renderQuiz();
    }
    
    switchView('date-view', 'quiz-view'); 
};

window.goToNameView = function() {
    const day = document.getElementById('birth-day').value;
    if(!day || day < 1 || day > 31) return alert("Enter a valid birth day.");
    switchView('date-view', 'name-view');
};

window.backToDate = function() { switchView('name-view', 'date-view'); };

// Processing & Results
window.updateLiveCalc = function(val) {
    const score = calculateAbjadScore(val);
    const preview = document.getElementById('live-calc-preview');
    document.getElementById('live-score').innerText = score;
    if(score > 0) preview.classList.remove('opacity-0');
    else preview.classList.add('opacity-0');
};

window.startProcessing = function() {
    const urduName = document.getElementById('user-name-urdu').value;
    if(!urduName) return alert("Please enter your name in Urdu.");

    switchView('name-view', 'processing-view');

    const textEl = document.getElementById('process-text');
    const messages = ["Aligning Stars...", "Calculating Abjad...", "Synthesizing Soul..."];
    let i = 0;

    const interval = setInterval(() => {
        i++;
        if (i < messages.length) textEl.innerText = messages[i];
    }, 800);

    setTimeout(() => {
        clearInterval(interval);
        switchView('processing-view', 'result-view');
        revealDestiny(urduName);
    }, 3000);
};

function revealDestiny(urduName) {
    const month = parseInt(document.getElementById('birth-month').value);
    const day = parseInt(document.getElementById('birth-day').value);

    let scores = { Fire: 0, Air: 0, Water: 0, Earth: 0 };
    userAnswers.forEach(type => {
        if(scores[type] !== undefined) scores[type]++;
    });

    const sorted = Object.entries(scores).sort((a,b) => b[1] - a[1]);
    const winnerKey = sorted[0][0];
    const elemData = elements[winnerKey];
    
    const zodiac = getZodiacSign(day, month);
    const abjadSum = calculateAbjadScore(urduName);
    const matches = findMatches(abjadSum);

    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('final-user-name').innerText = userData.name;
    document.getElementById('display-name').innerText = urduName;
    
    document.getElementById('winner-name').innerText = winnerKey;
    document.getElementById('winner-urdu').innerText = elemData.urdu;
    document.getElementById('winner-icon').innerText = elemData.icon;
    document.getElementById('qualities-text').innerText = elemData.qualities;
    document.getElementById('challenges-text').innerText = elemData.challenges;
    document.getElementById('element-glow').style.background = elemData.color;

    document.getElementById('zodiac-name').innerText = zodiac.name;
    document.getElementById('zodiac-icon').innerText = zodiac.icon;
    document.getElementById('zodiac-date').innerText = `${zodiac.name} Season`;
    document.getElementById('zodiac-personality').innerText = zodiac.p;
    document.getElementById('zodiac-singing').innerText = zodiac.s;

    document.getElementById('abjad-sum').innerText = abjadSum;
    
    renderMatches(matches);
    renderChart(scores);
}

function renderMatches(matches) {
    const container = document.getElementById('abjad-matches');
    container.innerHTML = '';
    
    if(matches.single.length > 0) {
        matches.single.forEach(m => {
            container.innerHTML += createMatchCard(m, true);
        });
    } else if (matches.nearest) {
        container.innerHTML += createMatchCard(matches.nearest, false);
    }
}

function createMatchCard(m, isExact) {
    return `
        <div class="p-4 bg-white rounded-xl shadow-sm border border-emerald-100 flex items-center justify-between">
            <div>
                ${!isExact ? `<p class="text-[8px] uppercase tracking-widest text-emerald-500 mb-1">Nearest</p>` : ''}
                <h5 class="text-xl font-bold text-gray-800">${m.arabic}</h5>
                <p class="text-[10px] text-emerald-500 uppercase tracking-widest font-bold">${m.transliteration} (${m.sum})</p>
            </div>
            <p class="text-xs text-gray-500 urdu text-right">${m.meaningUrdu}</p>
        </div>
    `;
}

function renderChart(scores) {
    const ctx = document.getElementById('elementChart').getContext('2d');
    if (chartInstance) chartInstance.destroy();
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.5)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0.0)');

    chartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: Object.keys(scores),
            datasets: [{
                label: 'Profile',
                data: Object.values(scores),
                backgroundColor: gradient,
                borderColor: '#6366f1',
                borderWidth: 2,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#6366f1',
                pointHoverBackgroundColor: '#6366f1',
                pointHoverBorderColor: '#fff'
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: { color: 'rgba(0,0,0,0.1)' },
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    pointLabels: { color: '#6B7280', font: { size: 10, family: 'Outfit' } },
                    ticks: { display: false, backdropColor: 'transparent' }
                }
            },
            plugins: { legend: { display: false } },
            animation: { duration: 2000, easing: 'easeOutQuart' },
            maintainAspectRatio: false
        }
    });
}

function switchView(hideId, showId) {
    document.getElementById(hideId).classList.add('hidden');
    document.getElementById(showId).classList.remove('hidden');
}

window.toggleMenu = function() {
    document.getElementById('side-menu').classList.toggle('open');
}

window.toggleAccordion = function(header) {
    const content = header.nextElementSibling;
    
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        document.querySelectorAll('.menu-content').forEach(c => c.style.maxHeight = null);
        content.style.maxHeight = content.scrollHeight + "px";
    }
}

window.resetApp = function() { location.reload(); }

init();
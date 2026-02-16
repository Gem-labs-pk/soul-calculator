import { elements } from './data.js';
import { calculateAbjadScore, findMatches, getZodiacSign } from './logic.js';

// --- PSYCHOLOGICAL QUIZ DATA ---
const quizData = [
    {
        question: "You are walking in an ancient forest. Suddenly, you see something shining. What is it?",
        options: [
            { text: "A burning sword embedded in stone", type: "Fire" },
            { text: "A floating crystal humming with energy", type: "Air" },
            { text: "A glowing pool of moon water", type: "Water" },
            { text: "A golden flower blooming from rock", type: "Earth" }
        ]
    },
    {
        question: "Look at this abstract shape 🌀. What do you feel?",
        options: [
            { text: "It's moving fast like a storm", type: "Air" },
            { text: "It's spiraling deep like an ocean", type: "Water" },
            { text: "It's spinning with heat/energy", type: "Fire" },
            { text: "It looks solid like a fossil", type: "Earth" }
        ]
    },
    {
        question: "A conflict arises. Your first instinct is to...",
        options: [
            { text: "Confront it head-on", type: "Fire" },
            { text: "Analyze the logic behind it", type: "Air" },
            { text: "Feel the emotions involved", type: "Water" },
            { text: "Wait for it to settle naturally", type: "Earth" }
        ]
    },
    {
        question: "You find a locked chest. How do you open it?",
        options: [
            { text: "Smash the lock", type: "Fire" },
            { text: "Pick the lock carefully", type: "Air" },
            { text: "Look for the key nearby", type: "Earth" },
            { text: "Ask someone for help", type: "Water" }
        ]
    },
    {
        question: "Which word calls to your soul?",
        options: [
            { text: "Power", type: "Fire" },
            { text: "Freedom", type: "Air" },
            { text: "Harmony", type: "Water" },
            { text: "Stability", type: "Earth" }
        ]
    }
];

let currentQuestionIndex = 0;
let userAnswers = []; // Stores the 'type' (Fire, Water, etc.)
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
    const counter = document.getElementById('counter');
    
    if(!grid) return;
    grid.innerHTML = '';

    // Check if quiz is finished
    if (currentQuestionIndex >= quizData.length) {
        finishQuiz(header, subtext, grid);
        return;
    }

    // Get current question data
    const q = quizData[currentQuestionIndex];

    // Update UI Text
    header.innerText = `Question ${currentQuestionIndex + 1}/${quizData.length}`;
    subtext.innerText = q.question;
    if(counter) counter.innerText = `${currentQuestionIndex * 20}%`; // Mock progress

    // Render Options
    q.options.forEach(opt => {
        const btn = document.createElement('button');
        // Styling for Option Cards
        btn.className = 'trait-card rounded-xl p-4 flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-indigo-50 transition-all';
        btn.innerHTML = `
            <span class="font-bold text-sm font-sans text-gray-800">${opt.text}</span>
        `;
        btn.onclick = () => handleAnswer(opt.type);
        grid.appendChild(btn);
    });
}

function handleAnswer(type) {
    userAnswers.push(type);
    currentQuestionIndex++;
    
    // Add a small delay for visual feedback if needed, or just render next
    renderQuiz();
}

function finishQuiz(header, subtext, grid) {
    header.innerText = "Analysis Complete";
    subtext.innerText = "Your psychological profile has been mapped.";
    
    // Show a big "Complete" button or visual
    const btn = document.createElement('div');
    btn.className = 'col-span-2 flex flex-col items-center justify-center p-6 bg-indigo-50 rounded-2xl border border-indigo-100';
    btn.innerHTML = `
        <div class="text-4xl mb-2">✨</div>
        <p class="font-bold text-indigo-600">Profile Cached</p>
    `;
    grid.appendChild(btn);

    // Update progress
    const counter = document.getElementById('counter');
    if(counter) counter.innerText = "100%";
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
    
    switchView('intro-view', 'quiz-view');
    renderQuiz(); // Start the quiz
};

window.goToDateView = function() {
    // Updated check: Ensure quiz is finished
    if (userAnswers.length < quizData.length) return alert("Please complete the quiz first.");
    switchView('quiz-view', 'date-view');
};

window.backToQuiz = function() { switchView('date-view', 'quiz-view'); };

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

    // Calculate Scores from Quiz Answers
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
    
    // Result Card
    document.getElementById('winner-name').innerText = winnerKey;
    document.getElementById('winner-urdu').innerText = elemData.urdu;
    document.getElementById('winner-icon').innerText = elemData.icon;
    document.getElementById('qualities-text').innerText = elemData.qualities;
    document.getElementById('challenges-text').innerText = elemData.challenges;
    // Set glow color based on element
    document.getElementById('element-glow').style.background = elemData.color;

    // Zodiac
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
    
    // Updated Chart Colors for Light Mode
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.5)'); // Indigo
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
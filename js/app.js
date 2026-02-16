import { elements, traitsList } from './data.js';
import { calculateAbjadScore, findMatches, getZodiacSign } from './logic.js';

let selectedTraits = new Set();
let chartInstance = null;
let userData = { name: '', email: '' };

// Initialize App
function init() {
    renderTraits();
    // Default is home view, no special init needed
}

function renderTraits() {
    const grid = document.getElementById('trait-grid');
    if(!grid) return;
    grid.innerHTML = '';
    
    // Randomize traits order
    [...traitsList].sort(() => Math.random() - 0.5).forEach(t => {
        const btn = document.createElement('button');
        btn.className = 'trait-card rounded-2xl p-3 h-24 flex flex-col items-center justify-center gap-1 text-center group cursor-pointer';
        btn.innerHTML = `
            <span class="text-white font-bold text-xs transition-colors font-sans">${t.en}</span>
            <span class="urdu text-white/50 text-[10px] transition-colors">${t.ur}</span>
        `;
        btn.onclick = () => toggleTrait(btn, t.en);
        grid.appendChild(btn);
    });
}

function toggleTrait(btn, trait) {
    btn.classList.remove('animate-pop');
    void btn.offsetWidth; 
    btn.classList.add('animate-pop');

    if (selectedTraits.has(trait)) {
        selectedTraits.delete(trait);
        btn.classList.remove('trait-selected');
    } else {
        selectedTraits.add(trait);
        btn.classList.add('trait-selected');
    }
    document.getElementById('counter').innerText = selectedTraits.size;
}

// --- Navigation Functions ---

// Open a specific "App" from the home screen
window.openApp = function(viewId) {
    switchView('home-view', viewId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Return to Dashboard
window.goHome = function() {
    // Hide all sub-views
    ['intro-view', 'quiz-view', 'date-view', 'name-view', 'processing-view', 'result-view'].forEach(id => {
        document.getElementById(id).classList.add('hidden');
    });
    // Show home
    document.getElementById('home-view').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Intro Flow
window.goToIntro = function() {
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    if(!name || !email) return alert("Please complete your identity verification.");
    userData = { name, email };
    switchView('intro-view', 'quiz-view');
};

window.goToDateView = function() {
    if (selectedTraits.size < 3) return alert("Select at least 3 traits to proceed.");
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

    let scores = { Fire: 0, Air: 0, Water: 0, Earth: 0 };
    selectedTraits.forEach(trait => {
        const type = traitsList.find(t => t.en === trait).type;
        scores[type]++;
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
        <div class="p-3 bg-white/5 rounded-lg border border-white/10 flex items-center justify-between">
            <div>
                ${!isExact ? `<p class="text-[8px] uppercase tracking-widest text-emerald-400 mb-1">Nearest</p>` : ''}
                <h5 class="text-xl font-bold text-white">${m.arabic}</h5>
                <p class="text-[10px] text-[#00f3ff] uppercase tracking-widest">${m.transliteration} (${m.sum})</p>
            </div>
            <p class="text-xs text-white/70 urdu text-right">${m.meaningUrdu}</p>
        </div>
    `;
}

function renderChart(scores) {
    const ctx = document.getElementById('elementChart').getContext('2d');
    if (chartInstance) chartInstance.destroy();
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(0, 243, 255, 0.5)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    chartInstance = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: Object.keys(scores),
            datasets: [{
                label: 'Profile',
                data: Object.values(scores),
                backgroundColor: gradient,
                borderColor: '#00f3ff',
                borderWidth: 2,
                pointBackgroundColor: '#fff',
                pointBorderColor: '#00f3ff'
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: { color: 'rgba(255,255,255,0.1)' },
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    pointLabels: { color: '#888', font: { size: 10, family: 'Outfit' } },
                    ticks: { display: false, backdropColor: 'transparent' }
                }
            },
            plugins: { legend: { display: false } },
            animation: { duration: 2000, easing: 'easeOutQuart' },
            maintainAspectRatio: false
        }
    });
}

// Helpers
function switchView(hideId, showId) {
    document.getElementById(hideId).classList.add('hidden');
    document.getElementById(showId).classList.remove('hidden');
}

window.toggleMenu = function() {
    document.getElementById('side-menu').classList.toggle('open');
}

window.toggleAccordion = function(header) {
    const content = header.nextElementSibling;
    header.classList.toggle('active');
    
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
        content.classList.remove('open');
    } else {
        document.querySelectorAll('.menu-content').forEach(c => {
            c.style.maxHeight = null;
            c.classList.remove('open');
            c.previousElementSibling.classList.remove('active');
        });
        content.style.maxHeight = content.scrollHeight + "px";
        content.classList.add('open');
    }
}

window.resetApp = function() { location.reload(); }

// Start
init();
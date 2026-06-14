const input = document.getElementById('search-input');
const list = document.getElementById('suggestions');
const form = document.querySelector('.search-form');
const engineSelector = document.getElementById('engine-selector');
const engineDropdown = document.getElementById('engine-dropdown');
const currentEngineLabel = document.getElementById('current-engine-label');

const engines = [
    { id: 'google', label: 'G', name: 'Google', action: 'https://www.google.com/search', param: 'q' },
    { id: 'duckduckgo', label: 'D', name: 'DuckDuckGo', action: 'https://duckduckgo.com/', param: 'q' },
    { id: 'bing', label: 'B', name: 'Bing', action: 'https://www.bing.com/search', param: 'q' },
    { id: 'startpage', label: 'S', name: 'Startpage', action: 'https://www.startpage.com/sp/search', param: 'query' },
    { id: 'yandex', label: 'Y', name: 'Yandex', action: 'https://yandex.com/search/', param: 'text' },
    { id: 'brave', label: 'BR', name: 'Brave', action: 'https://search.brave.com/search', param: 'q' },
    { id: 'ecosia', label: 'E', name: 'Ecosia', action: 'https://www.ecosia.org/search', param: 'q' },
    { id: 'kagi', label: 'K', name: 'Kagi', action: 'https://kagi.com/search', param: 'q' }
];

let currentEngine = engines.find(e => e.id === localStorage.getItem('searchEngine')) || engines[0];

function setEngine(engine) {
    currentEngine = engine;
    currentEngineLabel.innerHTML = `<img src="assets/icons/engine-${engine.id}.svg" class="selected-engine-icon" width="18" height="18" alt="${engine.label}">`;
    form.action = engine.action;
    input.name = engine.param;
    localStorage.setItem('searchEngine', engine.id);
}

// Initialize
setEngine(currentEngine);
engines.forEach(eng => {
    const opt = document.createElement('div');
    opt.className = 'engine-option';
    opt.innerHTML = `<img src="assets/icons/engine-${eng.id}.svg" class="engine-icon" width="16" height="16" alt="${eng.label}"><span>${eng.name}</span>`;
    opt.onclick = (e) => {
        e.stopPropagation();
        setEngine(eng);
        engineSelector.classList.remove('open');
        input.focus();
    };
    engineDropdown.appendChild(opt);
});

engineSelector.addEventListener('click', (e) => {
    e.stopPropagation();
    engineSelector.classList.toggle('open');
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        engineSelector.classList.remove('open');
        if (document.activeElement === input) {
            input.blur();
            clearSuggestions();
        } else {
            input.focus();
        }
    }
});

form.addEventListener('submit', (e) => {
    const val = input.value.trim();
    if (/^\d+$/.test(val)) {
        e.preventDefault();
        const numStr = val.padStart(2, '0');
        const cards = document.querySelectorAll('.link-card');
        for (const card of cards) {
            const indexSpan = card.querySelector('.card-index');
            if (indexSpan && indexSpan.textContent === numStr) {
                window.location.href = card.href;
                return;
            }
        }
    }
});

function clearSuggestions() {
    list.innerHTML = '';
    list.classList.remove('active');
}

function handleSuggestions(data) {
    const results = Array.isArray(data?.[1]) ? data[1] : [];
    if (!results.length) return clearSuggestions();
    
    list.innerHTML = results.slice(0, 6).map((s) => `<div class="suggestion-item">${s}</div>`).join('');
    list.classList.add('active');
}

input.addEventListener('input', () => {
    const query = input.value.trim();
    if (query.length < 2) return clearSuggestions();
    
    const script = document.createElement('script');
    script.src = `https://suggestqueries.google.com/complete/search?client=chrome&q=${encodeURIComponent(query)}&callback=handleSuggestions`;
    
    const oldScript = document.getElementById('jsonp-script');
    if (oldScript) oldScript.remove();
    
    script.id = 'jsonp-script';
    document.body.appendChild(script);
});

list.addEventListener('click', (event) => {
    const item = event.target.closest('.suggestion-item');
    if (!item) return;
    
    input.value = item.textContent;
    clearSuggestions();
    input.form.submit();
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrapper')) {
        clearSuggestions();
    }
    engineSelector.classList.remove('open');
});

window.addEventListener('load', () => input.focus());
window.handleSuggestions = handleSuggestions;

const input = document.getElementById('search-input');
const list = document.getElementById('suggestions');

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
});

window.addEventListener('load', () => input.focus());
window.handleSuggestions = handleSuggestions;

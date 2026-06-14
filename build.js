const fs = require('fs');
const path = require('path');

const ICONS_DIR = path.join(__dirname, 'node_modules/simple-icons/icons');
const LUCIDE_DIR = path.join(__dirname, 'node_modules/lucide-static/icons');

const links = [
    { name: 'ChatGPT', url: 'chat.openai.com', href: 'https://chat.openai.com/', icon: 'chatgpt.svg', isCustom: true },
    { name: 'Gemini', url: 'gemini.google.com', href: 'https://gemini.google.com/', icon: 'googlegemini.svg' },
    { name: 'Telegram', url: 'web.telegram.org', href: 'https://web.telegram.org/', icon: 'telegram.svg' },
    { name: 'Gmail', url: 'mail.google.com', href: 'https://mail.google.com/', icon: 'gmail.svg' },
    { name: 'Proton', url: 'mail.proton.me', href: 'https://mail.proton.me/', icon: 'proton.svg' },
    { name: 'Reddit', url: 'reddit.com', href: 'https://reddit.com/', icon: 'reddit.svg' },
    { name: 'Railway', url: 'railway.app', href: 'https://railway.app/', icon: 'railway.svg' },
    { name: 'GitHub', url: 'github.com', href: 'https://github.com/', icon: 'github.svg' },
    { name: 'Discord', url: 'discord.com/app', href: 'https://discord.com/app', icon: 'discord.svg' },
    { name: 'Monkeytype', url: 'monkeytype.com', href: 'https://monkeytype.com/', icon: 'monkeytype.svg' },
    { name: 'Google Docs', url: 'docs.google.com', href: 'https://docs.google.com/document/', icon: 'googledocs.svg' },
    { name: 'Google Slides', url: 'docs.google.com', href: 'https://docs.google.com/presentation/', icon: 'googleslides.svg' },
    { name: 'LinkedIn', url: 'linkedin.com', href: 'https://www.linkedin.com/', icon: 'linkedin.svg', isCustom: true },
    { name: 'Fiverr', url: 'fiverr.com', href: 'https://www.fiverr.com/', icon: 'fiverr.svg' },
    { name: 'YouTube', url: 'youtube.com', href: 'https://youtube.com/', icon: 'youtube.svg' }
];

let linksHTML = '';

links.forEach((link, idx) => {
    let iconPath;
    if (link.isCustom) {
        iconPath = path.join(__dirname, link.icon);
    } else {
        iconPath = link.useLucide ? path.join(LUCIDE_DIR, link.icon) : path.join(ICONS_DIR, link.icon);
    }
    let svgContent = '';
    try {
        svgContent = fs.readFileSync(iconPath, 'utf8');
        svgContent = svgContent.replace(/<svg[^>]*>/, '<svg class="site-icon" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">');
        if (link.isCustom) {
            svgContent = svgContent.replace(/fill="[^"]+"/g, ''); // strip hardcoded fills
            svgContent = svgContent.replace(/style="[^"]+"/g, ''); // strip styles
        }
        if (link.useLucide) {
             svgContent = svgContent.replace('fill="currentColor"', 'fill="none" stroke="currentColor"');
        }
    } catch (e) {
        console.error("Missing icon: " + link.icon);
    }

    const indexStr = (idx + 1).toString().padStart(2, '0');

    linksHTML += `
                    <a class="link-card" href="${link.href}" target="_blank" rel="noreferrer">
                        <div class="card-top">
                            ${svgContent}
                            <span class="card-index">${indexStr}</span>
                        </div>
                        <div class="card-content">
                            <p class="card-title">${link.name}</p>
                            <p class="card-url">${link.url}</p>
                        </div>
                    </a>
`;
});

const html = `<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Home</title>
    <!-- Miku Teal Home Favicon -->
    <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg fill='%2339c5bb' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'/%3E%3C/svg%3E">
    <style>
        :root {
            /* Tokyo Night x Miku Teal Colors (Digital Noir) */
            --bg: #1a1b26;
            --panel: #16161e;
            --line: rgba(57, 197, 187, 0.3);
            --line-soft: rgba(57, 197, 187, 0.15);
            --text: #c0caf5;
            --text-dim: #414868;
            --accent: #39c5bb;
            --mono: "FiraCode Nerd Font", "JetBrains Mono", "Cascadia Code", monospace;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: var(--bg);
            color: var(--text);
            font-family: var(--mono);
            min-height: 100vh;
            padding: 40px 20px;
            display: flex;
            justify-content: center;
        }

        .container {
            width: 100%;
            max-width: 900px;
            display: flex;
            flex-direction: column;
            gap: 32px;
        }

        /* Clean Flat Shell */
        .shell {
            background: var(--bg);
            border: 1px solid var(--line);
            border-radius: 12px;
            overflow: hidden;
            /* Zero box-shadow for pure flat Digital Noir aesthetic */
        }

        .shell-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            padding: 12px 16px;
            border-bottom: 1px solid var(--line);
        }

        .shell-dots {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .shell-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #f7768e;
            opacity: 0.8;
        }
        .shell-dot:nth-child(2) { background: #e0af68; }
        .shell-dot:nth-child(3) { background: #7dcfff; }

        .shell-time {
            color: var(--text);
            font-size: 0.85rem;
            letter-spacing: 0.1em;
            font-weight: bold;
        }

        .shell-body {
            padding: 32px;
            display: flex;
            flex-direction: column;
            gap: 32px;
        }

        h1 {
            font-size: 1.8rem;
            font-weight: normal;
            color: var(--text);
            letter-spacing: -0.02em;
        }

        .search-wrapper {
            position: relative;
            max-width: 760px;
            width: 100%;
        }

        .search-form {
            display: flex;
            align-items: center;
            gap: 12px;
            background: transparent;
            border: 1px solid var(--line);
            border-radius: 8px;
            padding: 14px 16px;
            transition: all 0.2s ease;
        }
        
        .search-form:focus-within {
            border-color: var(--accent);
        }

        .prompt {
            color: var(--accent);
            font-size: 1rem;
            font-weight: bold;
        }

        #search-input {
            flex: 1;
            background: transparent;
            border: none;
            color: var(--text);
            outline: none;
            font: inherit;
            font-size: 1rem;
        }

        #search-input::placeholder {
            color: var(--text-dim);
        }

        .search-submit {
            background: transparent;
            border: 1px solid var(--line);
            color: var(--accent);
            border-radius: 6px;
            padding: 6px 12px;
            font: inherit;
            font-size: 0.85rem;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .search-submit:hover,
        .search-submit:focus-visible {
            background: var(--accent);
            color: var(--bg);
            border-color: var(--accent);
        }

        /* Suggestions UI Fixed */
        #suggestions {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--bg);
            border: 1px solid var(--line);
            border-radius: 8px;
            margin-top: 8px;
            z-index: 1000;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }

        .suggestion-item {
            padding: 12px 16px;
            cursor: pointer;
            color: var(--text);
            font-size: 0.95rem;
            border-bottom: 1px solid var(--line-soft);
            transition: all 0.2s ease;
        }
        
        .suggestion-item:last-child {
            border-bottom: none;
        }

        .suggestion-item:hover {
            background: var(--accent);
            color: var(--bg);
        }

        .links {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 16px;
        }

        .link-card {
            text-decoration: none;
            color: var(--text);
            display: flex;
            flex-direction: column;
            gap: 16px;
            background: transparent;
            border: 1px solid var(--line-soft);
            border-radius: 8px;
            padding: 16px;
            transition: all 0.2s ease;
        }

        /* The Inversion Hover Rule */
        .link-card:hover,
        .link-card:focus-visible {
            background: var(--accent);
            color: var(--bg);
            border-color: var(--accent);
        }

        .card-top {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
        }

        .site-icon {
            width: 28px;
            height: 28px;
            transition: color 0.2s ease;
        }

        .card-index {
            color: var(--text-dim);
            font-size: 0.75rem;
            font-weight: bold;
            transition: color 0.2s ease;
        }
        
        .link-card:hover .card-index {
            color: var(--bg);
            opacity: 0.7;
        }

        .card-content {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        .card-title {
            font-size: 1rem;
            font-weight: bold;
        }

        .card-url {
            color: var(--text-dim);
            font-size: 0.8rem;
            transition: color 0.2s ease;
        }
        
        .link-card:hover .card-url {
            color: var(--bg);
            opacity: 0.7;
        }

        @media (max-width: 600px) {
            .shell-body { padding: 20px; }
            .links { grid-template-columns: 1fr 1fr; }
        }
    </style>
</head>

<body>
    <div class="container">
        <main class="shell">
            <div class="shell-bar">
                <div class="shell-dots">
                    <span class="shell-dot"></span>
                    <span class="shell-dot"></span>
                    <span class="shell-dot"></span>
                </div>
                <div class="shell-time" id="status-time">--:--:--</div>
            </div>

            <div class="shell-body">
                <h1>&gt; welcome dipak<span style="color: var(--accent); animation: blink 1s step-end infinite;">_</span></h1>
                <style>@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }</style>

                <div class="search-wrapper">
                    <form action="https://www.google.com/search" method="get" class="search-form">
                        <span class="prompt">$</span>
                        <input type="search" name="q" id="search-input" placeholder="search google..." autocomplete="off" autofocus required>
                        <button type="submit" class="search-submit">go</button>
                    </form>
                    <div id="suggestions"></div>
                </div>

                <section class="links">
${linksHTML}
                </section>
            </div>
        </main>
    </div>

    <script>
        const input = document.getElementById('search-input');
        const list = document.getElementById('suggestions');
        const timeNode = document.getElementById('status-time');

        function renderClock() {
            const formatter = new Intl.DateTimeFormat('en-US', {
                hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
            });
            timeNode.textContent = formatter.format(new Date());
        }

        function clearSuggestions() { list.innerHTML = ''; }

        function handleSuggestions(data) {
            const results = Array.isArray(data?.[1]) ? data[1] : [];
            if (!results.length) return clearSuggestions();
            list.innerHTML = results.slice(0, 6).map((s) => \`<div class="suggestion-item">\${s}</div>\`).join('');
        }

        input.addEventListener('input', () => {
            const query = input.value.trim();
            if (query.length < 2) return clearSuggestions();
            const script = document.createElement('script');
            script.src = \`https://suggestqueries.google.com/complete/search?client=chrome&q=\${encodeURIComponent(query)}&callback=handleSuggestions\`;
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
            if (!e.target.closest('.search-wrapper')) clearSuggestions();
        });

        renderClock();
        window.addEventListener('load', () => input.focus());
        window.setInterval(renderClock, 1000);
        window.handleSuggestions = handleSuggestions;
    </script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'index.html'), html);
console.log("Successfully built completely redesigned index.html!");

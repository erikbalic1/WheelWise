const translations = {
    en: {
        home: "Home",
        findCars: "Find Cars",
        sellCars: "Sell Cars",
        contactUs: "Contact Us",
        login: "Login/Sign Up",
        welcome: "Welcome to ",
        trusted: "Your trusted partner in finding the perfect car.",
        explore: "Explore Cars",
        copyright: "© 2025 WheelWise. All rights reserved.",
        footerDev: "Developed and designed by ",
        footerDevName: "Balic Erik",
        footerSource: "Source code of this webpage: ",
        footerGithub: "GitHub",
        card1Title: "Choose cars manually",
        card1Desc: "Browse our collection and find your perfect car at the best price.",
        card1Btn: "Go to Find Cars",
        card2Title: "Let AI choose your car",
        card2Desc: "Get personalized AI advice to help you choose the best car for your needs.",
        card2Btn: "Go to Car Advice",
        servicesTitle: "WE give you the chance to choose between our services."
    },
    hu: {
        home: "Kezdőlap",
        findCars: "Autók keresése",
        sellCars: "Autó eladása",
        contactUs: "Kapcsolat",
        login: "Bejelentkezés/Regisztráció",
        welcome: "Üdvözöljük a ",
        trusted: "Megbízható partnere a tökéletes autó megtalálásában.",
        explore: "Autók böngészése",
        copyright: "© 2025 WheelWise. Minden jog fenntartva.",
        footerDev: "Fejlesztette és tervezte: ",
        footerDevName: "Balic Erik",
        footerSource: "Az oldal forráskódja: ",
        footerGithub: "GitHub",
        card1Title: "Válassz autót kézzel",
        card1Desc: "Böngéssz kínálatunkban, és találd meg a tökéletes autót a legjobb áron.",
        card1Btn: "Ugrás az autókhoz",
        card2Title: "Hagyd, hogy az AI válasszon autót",
        card2Desc: "Kapj személyre szabott AI tanácsokat, hogy megtaláld a legjobb autót az igényeidhez.",
        card2Btn: "Ugrás az AI tanácshoz",
        servicesTitle: "Mi lehetőséget adunk, hogy szolgáltatásaink közül válassz."
    },
    ro: {
        home: "Acasă",
        findCars: "Caută Mașini",
        sellCars: "Vinde Mașini",
        contactUs: "Contact",
        login: "Autentificare/Înregistrare",
        welcome: "Bine ați venit la ",
        trusted: "Partenerul dvs. de încredere pentru a găsi mașina perfectă.",
        explore: "Caută Mașini",
        copyright: "© 2025 WheelWise. Toate drepturile rezervate.",
        footerDev: "Dezvoltat și proiectat de ",
        footerDevName: "Balic Erik",
        footerSource: "Codul sursă al acestei pagini: ",
        footerGithub: "GitHub",
        card1Title: "Alege mașina manual",
        card1Desc: "Răsfoiește colecția noastră și găsește mașina perfectă la cel mai bun preț.",
        card1Btn: "Mergi la mașini",
        card2Title: "Lasă AI să aleagă mașina",
        card2Desc: "Primește sfaturi personalizate de la AI pentru a alege cea mai bună mașină pentru tine.",
        card2Btn: "Mergi la sfatul AI",
        servicesTitle: "Vă oferim șansa de a alege între serviciile noastre."
    }
};

const currencyFormats = {
    USD: { symbol: '$', code: 'USD', rate: 1 },
    EUR: { symbol: '€', code: 'EUR', rate: 0.92 },
    HUF: { symbol: 'Ft', code: 'HUF', rate: 360 },
    RON: { symbol: 'lei', code: 'RON', rate: 4.6 }
};

function setLanguage(lang) {
    localStorage.setItem('wheelwise-lang', lang);
    const t = translations[lang] || translations.en;

    // Nav links
    const navMap = {
        home: 'home',
        findCars: 'findCars',
        sellCars: 'sellCars',
        contactUs: 'contactUs'
    };
    Object.keys(navMap).forEach(key => {
        // Try both with and without data-nav for compatibility
        let el = document.querySelector(`.nav-links a[data-nav="${key}"]`);
        if (!el) {
            // fallback: select by order if data-nav is missing
            const navLinks = document.querySelectorAll('.nav-links a');
            if (key === 'home') el = navLinks[0];
            if (key === 'findCars') el = navLinks[1];
            if (key === 'sellCars') el = navLinks[2];
            if (key === 'contactUs') el = navLinks[3];
        }
        if (el) {
            el.textContent = t[navMap[key]];
            const baseHref = el.getAttribute('href').split('?')[0];
            el.setAttribute('href', `${baseHref}?lang=${lang}`);
        }
    });

    // Login button
    let loginBtn = document.querySelector('.auth a[data-nav="login"]');
    if (!loginBtn) {
        loginBtn = document.querySelector('.auth a.login-btn');
    }
    if (loginBtn) {
        loginBtn.textContent = t.login;
        const baseHref = loginBtn.getAttribute('href').split('?')[0];
        loginBtn.setAttribute('href', `${baseHref}?lang=${lang}`);
    }

    // Main
    const h2 = document.querySelector('.main h2');
    if (h2) {
        h2.childNodes[0].nodeValue = t.welcome;
    }
    const p = document.querySelector('.main p');
    if (p) {
        p.textContent = t.trusted;
    }
    const exploreBtn = document.querySelector('.main a.explore-btn');
    if (exploreBtn) {
        exploreBtn.textContent = t.explore;
        const baseHref = exploreBtn.getAttribute('href').split('?')[0];
        exploreBtn.setAttribute('href', `${baseHref}?lang=${lang}`);
    }
    // Footer
    const footerP = document.querySelector('footer p');
    if (footerP) {
        footerP.textContent = t.copyright;
    }

    // Card titles, descriptions, and buttons
    const cardTitles = document.querySelectorAll('.card-title');
    if (cardTitles.length > 0) {
        if (cardTitles[0]) cardTitles[0].textContent = t.card1Title;
        if (cardTitles[1]) cardTitles[1].textContent = t.card2Title;
    }
    const cardDescs = document.querySelectorAll('.card-desc');
    if (cardDescs.length > 0) {
        if (cardDescs[0]) cardDescs[0].textContent = t.card1Desc;
        if (cardDescs[1]) cardDescs[1].textContent = t.card2Desc;
    }
    const cardBtns = document.querySelectorAll('.card-btn');
    if (cardBtns.length > 0) {
        if (cardBtns[0]) cardBtns[0].textContent = t.card1Btn;
        if (cardBtns[1]) cardBtns[1].textContent = t.card2Btn;
    }

    // h3 services title
    const servicesTitle = document.querySelector('.div2 h3');
    if (servicesTitle) {
        servicesTitle.textContent = t.servicesTitle;
    }

    // Footer elements
    const footerPs = document.querySelectorAll('footer p');
    if (footerPs.length > 0) {
        if (footerPs[0]) footerPs[0].textContent = t.copyright;
        if (footerPs[1]) {
            // Developed by
            const devLink = footerPs[1].querySelector('a');
            footerPs[1].innerHTML = `${t.footerDev}<a href="https://erikbalic.hu" target="_blank">${t.footerDevName}</a>`;
        }
        if (footerPs[2]) {
            // Source code
            const githubLink = footerPs[2].querySelector('a');
            footerPs[2].innerHTML = `${t.footerSource}<a href="https://github.com/erikbalic1/WheelWise" target="_blank">${t.footerGithub}</a>`;
        }
    }
}

function getLangFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('lang');
}

function setCurrency(curr) {
    localStorage.setItem('wheelwise-currency', curr);
    const fmt = currencyFormats[curr] || currencyFormats.USD;
    document.querySelectorAll('.currency').forEach(span => {
        const baseAmount = parseFloat(span.getAttribute('data-amount'));
        if (!isNaN(baseAmount)) {
            let converted = baseAmount * fmt.rate;
            let display = '';
            if (curr === 'USD') display = `${fmt.symbol}${converted.toLocaleString('en-US', {minimumFractionDigits:2, maximumFractionDigits:2})}`;
            else if (curr === 'EUR') display = `${fmt.symbol}${converted.toLocaleString('de-DE', {minimumFractionDigits:2, maximumFractionDigits:2})}`;
            else if (curr === 'HUF') display = `${converted.toLocaleString('hu-HU', {maximumFractionDigits:0})} ${fmt.symbol}`;
            else if (curr === 'RON') display = `${converted.toLocaleString('ro-RO', {minimumFractionDigits:2, maximumFractionDigits:2})} ${fmt.symbol}`;
            span.textContent = display;
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const select = document.getElementById('language-select');
    let lang = getLangFromUrl() || localStorage.getItem('wheelwise-lang') || 'en';
    if (select) {
        select.value = lang;
        select.addEventListener('change', function() {
            setLanguage(this.value);
            // Update URL with selected language
            const url = new URL(window.location);
            url.searchParams.set('lang', this.value);
            window.history.replaceState({}, '', url);
        });
        setLanguage(lang);
    }

    // Currency selector
    const currencySelect = document.getElementById('currency-select');
    if (currencySelect) {
        const savedCurrency = localStorage.getItem('wheelwise-currency') || 'USD';
        currencySelect.value = savedCurrency;
        setCurrency(savedCurrency);
        currencySelect.addEventListener('change', function() {
            setCurrency(this.value);
        });
    }

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    function setTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
            // Moon SVG
            themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/>';
        } else {
            document.body.classList.remove('dark-theme');
            // Sun SVG
            themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';
        }
        localStorage.setItem('wheelwise-theme', theme);
    }
    if (themeToggle) {
        // Load theme from localStorage
        const savedTheme = localStorage.getItem('wheelwise-theme') || 'light';
        setTheme(savedTheme);

        themeToggle.addEventListener('click', function() {
            const isDark = document.body.classList.contains('dark-theme');
            setTheme(isDark ? 'light' : 'dark');
        });
    }
});
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
        copyright: "© 2025 WheelWise. All rights reserved."
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
        copyright: "© 2025 WheelWise. Minden jog fenntartva."
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
        copyright: "© 2025 WheelWise. Toate drepturile rezervate."
    }
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
}

function getLangFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('lang');
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
});
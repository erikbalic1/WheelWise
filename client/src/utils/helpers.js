// Utility function to apply language translations
export function applyLanguage(lang, translations) {
  localStorage.setItem('wheelwise-lang', lang)
  const t = translations[lang] || translations.en

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n')
    if (t[key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = t[key]
      } else {
        el.textContent = t[key]
      }
    }
  })
}


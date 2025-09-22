import { Link, useLocation } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import './App.scss'
import { translations } from './utils/constants.js'


function Navbar({ lang, onLangChange }) {
  const location = useLocation()
  const [theme, setTheme] = useState(localStorage.getItem('wheelwise-theme') || 'light')
  const currentCurrency = localStorage.getItem('wheelwise-currency') || 'USD'

  useEffect(() => {
    document.body.classList.toggle('dark-theme', theme === 'dark')
    localStorage.setItem('wheelwise-theme', theme)
  }, [theme])

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <nav className="navbar">
      <h1>
        Wheel<span className="title logo-white">Wise.</span>
      </h1>
      <div className="nav-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>{translations[lang].home}</Link>
        <Link to="/cars" className={location.pathname === '/cars' ? 'active' : ''}>{translations[lang].findCars}</Link>
        <Link to="/advice" className={location.pathname === '/advice' ? 'active' : ''}>{translations[lang].advice}</Link>
        <Link to="/upload" className={location.pathname === '/upload' ? 'active' : ''}>{translations[lang].sellCars}</Link>
        <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>{translations[lang].contactUs}</Link>
      </div>
      <div className="auth">
        <Link to="/register" className={location.pathname === '/register' ? 'active login-btn' : 'login-btn'}>
          {translations[lang].login}
        </Link>
      </div>
      <div className="settings-selector">
        <select name="language" id="language-select" value={lang} onChange={e => onLangChange(e.target.value)}>
          <option value="en">EN</option>
          <option value="hu">HU</option>
          <option value="ro">RO</option>
        </select>
        <select name="currency" id="currency-select" style={{ marginLeft: '0.5rem' }} value={currentCurrency} onChange={e => {localStorage.setItem('wheelwise-currency', e.target.value); window.location.reload();}}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="HUF">HUF</option>
          <option value="RON">RON</option>
        </select>
      </div>
      <button
        id="theme-toggle"
        aria-label="Toggle theme"
        style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer' }}
        onClick={handleThemeToggle}
      >
        <svg
          id="theme-icon"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {theme === 'dark'
            ? (
              // Sun icon
              <>
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </>
            )
            : (
              // Moon icon
              <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
            )
          }
        </svg>
      </button>
    </nav>
  )
}


export default Navbar

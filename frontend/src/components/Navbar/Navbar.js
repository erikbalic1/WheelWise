import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import './Navbar.scss';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, changeLanguage, translations } = useLanguage();
  const { user, logout, isAuthenticated } = useAuth();
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    setIsLanguageOpen(false);
  };

  const getLanguageFlag = (lang) => {
    const flags = {
      en: '🇺🇸',
      hu: '🇭🇺',
      de: '🇩🇪'
    };
    return flags[lang] || '🌐';
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const handleProfileClick = (path) => {
    setIsUserMenuOpen(false);
    navigate(path);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left: Brand Logo */}
        <Link to="/" className="navbar-brand">
          <span className="brand-wheel">Wheel</span><span className="brand-wise">Wise</span>
        </Link>

        {/* Center: Navigation Links - Desktop Only */}
        <ul className="navbar-links">
          <li>
            <NavLink to="/" end>{translations.nav.home}</NavLink>
          </li>
          <li>
            <NavLink to="/buy-cars">{translations.nav.buyCars}</NavLink>
          </li>
          <li>
            <NavLink to="/ask-ai">{translations.nav.askAI}</NavLink>
          </li>
          <li>
            <NavLink to="/about">{translations.nav.about}</NavLink>
          </li>
          <li>
            <NavLink to="/contact">{translations.nav.contact}</NavLink>
          </li>
        </ul>

        {/* Right: Theme Toggle, Language Selector, Sign In, Hamburger */}
        <div className="navbar-actions">
          {/* Theme Toggle Switch - Desktop Only */}
          <div className="theme-switch desktop-only">
            <input
              type="checkbox"
              id="theme-toggle"
              checked={theme === 'dark'}
              onChange={toggleTheme}
            />
            <label htmlFor="theme-toggle" className="switch-label">
            </label>
          </div>

          {/* Language Dropdown - Desktop Only */}
          <div className="language-selector desktop-only">
            <button
              className="language-button"
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            >
              <span className="language-flag">{getLanguageFlag(language)}</span>
              <span className={`arrow ${isLanguageOpen ? 'open' : ''}`}>▼</span>
            </button>
            {isLanguageOpen && (
              <div className="language-dropdown">
                <button
                  className={language === 'en' ? 'active' : ''}
                  onClick={() => handleLanguageChange('en')}
                >
                  🇺🇸 English
                </button>
                <button
                  className={language === 'hu' ? 'active' : ''}
                  onClick={() => handleLanguageChange('hu')}
                >
                  🇭🇺 Magyar
                </button>
                <button
                  className={language === 'de' ? 'active' : ''}
                  onClick={() => handleLanguageChange('de')}
                >
                  🇩🇪 Deutsch
                </button>
              </div>
            )}
          </div>

          {/* Sign In Button or User Menu */}
          {isAuthenticated ? (
            <div className="user-menu">
              <button
                className="user-button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <span className="user-name">{user?.name}</span>
                <span className={`arrow ${isUserMenuOpen ? 'open' : ''}`}>▼</span>
              </button>
              {isUserMenuOpen && (
                <div className="user-dropdown">
                  <button onClick={() => handleProfileClick('/profile')} className="animated-btn">
                    {translations.nav.editProfile}
                  </button>
                  <button onClick={() => handleProfileClick('/sell-cars')} className="animated-btn">
                    {translations.nav.sellCar}
                  </button>
                  <button onClick={handleLogout} className="logout-btn">
                    {translations.nav.logOut}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="btn-signin"
              onClick={() => navigate('/auth')}
            >
              {translations.nav.signIn}
            </button>
          )}

          {/* Hamburger Menu Button - Mobile/Tablet Only */}
          <button 
            className="hamburger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={isMobileMenuOpen ? 'active' : ''}></span>
            <span className={isMobileMenuOpen ? 'active' : ''}></span>
            <span className={isMobileMenuOpen ? 'active' : ''}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMobileMenu}></div>
      )}

      {/* Mobile Dropdown Menu */}
      <div className={`mobile-dropdown ${isMobileMenuOpen ? 'open' : ''}`}>
        {/* Navigation Links */}
        <ul className="mobile-nav-links">
          <li>
            <NavLink to="/" onClick={closeMobileMenu} end>{translations.nav.home}</NavLink>
          </li>
          <li>
            <NavLink to="/buy-cars" onClick={closeMobileMenu}>{translations.nav.buyCars}</NavLink>
          </li>
          <li>
            <NavLink to="/ask-ai" onClick={closeMobileMenu}>{translations.nav.askAI}</NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={closeMobileMenu}>{translations.nav.about}</NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={closeMobileMenu}>{translations.nav.contact}</NavLink>
          </li>
        </ul>

        {/* Theme and Language Settings */}
        <div className="mobile-settings">
          <div className="setting-item">
            <span className="setting-label">Theme</span>
            <div className="theme-switch mobile-theme">
              <input
                type="checkbox"
                id="theme-toggle-mobile"
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />
              <label htmlFor="theme-toggle-mobile" className="switch-label">
              </label>
            </div>
          </div>

          <div className="setting-item">
            <span className="setting-label">Language</span>
            <div className="language-options">
              <button
                className={`lang-btn ${language === 'en' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('en')}
              >
                🇺🇸
              </button>
              <button
                className={`lang-btn ${language === 'hu' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('hu')}
              >
                🇭🇺
              </button>
              <button
                className={`lang-btn ${language === 'de' ? 'active' : ''}`}
                onClick={() => handleLanguageChange('de')}
              >
                🇩🇪
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

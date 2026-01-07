import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './Home.scss';

const Home = () => {
  const { translations } = useLanguage();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">{translations.home.title}</h1>
          <p className="hero-subtitle">{translations.home.subtitle}</p>
          <p className="hero-description">{translations.home.description}</p>
          <div className="hero-cta">
            <Link to="/buy-cars" className="btn btn-primary">{translations.home.ctaBuy}</Link>
            <Link to="/sell-cars" className="btn btn-secondary">{translations.home.ctaSell}</Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <h2 className="section-title">{translations.home.statsTitle}</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">5,000+</div>
              <div className="stat-label">{translations.home.statsCars}</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">{translations.home.statsUsers}</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">3,500+</div>
              <div className="stat-label">{translations.home.statsDeals}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">{translations.home.featuresTitle}</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3 className="feature-title">{translations.home.feature1Title}</h3>
              <p className="feature-description">{translations.home.feature1Desc}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">{translations.home.feature2Title}</h3>
              <p className="feature-description">{translations.home.feature2Desc}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3 className="feature-title">{translations.home.feature3Title}</h3>
              <p className="feature-description">{translations.home.feature3Desc}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './Home.scss';

const Home = () => {
  const { translations } = useLanguage();

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="container">
          <h1 className="hero-title">{translations.home.title}</h1>
          <p className="hero-subtitle">{translations.home.subtitle}</p>
          <p className="hero-description">{translations.home.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

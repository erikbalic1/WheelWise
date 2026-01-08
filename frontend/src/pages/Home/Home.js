import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './Home.scss';

// Import brand logos
import alfaRomeoLogo from '../../assets/brands/alfa_romeo.png';
import astonMartinLogo from '../../assets/brands/aston_martin.png';
import audiLogo from '../../assets/brands/audi.png';
import bentleyLogo from '../../assets/brands/bentley.png';
import bmwLogo from '../../assets/brands/bmw.png';
import bugattiLogo from '../../assets/brands/bugatti.png';
import citroenLogo from '../../assets/brands/citroen.png';
import daciaLogo from '../../assets/brands/dacia.png';
import dodgeLogo from '../../assets/brands/dodge.png';
import elementalLogo from '../../assets/brands/elemental.png';
import ferrariLogo from '../../assets/brands/ferrari.png';
import fiatLogo from '../../assets/brands/fiat.png';
import fordLogo from '../../assets/brands/ford.png';
import hondaLogo from '../../assets/brands/honda.png';
import hyundaiLogo from '../../assets/brands/hyuandai.png';
import infinitiLogo from '../../assets/brands/infiniti.png';
import isuzuLogo from '../../assets/brands/isuzu.png';
import jaguarLogo from '../../assets/brands/jaguar.png';
import jeepLogo from '../../assets/brands/jeep.png';
import kiaLogo from '../../assets/brands/kia.png';
import koenigseggLogo from '../../assets/brands/koenigsegg.png';
import lamborghiniLogo from '../../assets/brands/lamborghini.png';
import landRoverLogo from '../../assets/brands/land_rover.png';
import lexusLogo from '../../assets/brands/lexus.png';
import maseratiLogo from '../../assets/brands/maserati.png';
import mazdaLogo from '../../assets/brands/mazda.png';
import mclarenLogo from '../../assets/brands/mclaren.png';
import mercedesLogo from '../../assets/brands/mercedes.png';
import miniLogo from '../../assets/brands/mini.png';
import mitsubishiLogo from '../../assets/brands/mitsubishi.png';
import nissanLogo from '../../assets/brands/nissan.png';
import opelLogo from '../../assets/brands/opel.png';
import paganiLogo from '../../assets/brands/pagani.png';
import peugeotLogo from '../../assets/brands/peugeot.png';
import porscheLogo from '../../assets/brands/porsche.png';
import renaultLogo from '../../assets/brands/renault.png';
import rollsRoyceLogo from '../../assets/brands/rolls_royce.png';
import seatLogo from '../../assets/brands/seat.png';
import skodaLogo from '../../assets/brands/skoda.png';
import subaruLogo from '../../assets/brands/subaru.png';
import suzukiLogo from '../../assets/brands/suzuki.png';
import teslaLogo from '../../assets/brands/tesla.png';
import toyotaLogo from '../../assets/brands/toyota.png';
import volkswagenLogo from '../../assets/brands/volkswagen.png';
import volvoLogo from '../../assets/brands/volvo.png';

const Home = () => {
  const { translations } = useLanguage();
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const brands = [
    { name: 'Alfa Romeo', logo: alfaRomeoLogo },
    { name: 'Aston Martin', logo: astonMartinLogo },
    { name: 'Audi', logo: audiLogo },
    { name: 'Bentley', logo: bentleyLogo },
    { name: 'BMW', logo: bmwLogo },
    { name: 'Bugatti', logo: bugattiLogo },
    { name: 'Citroen', logo: citroenLogo },
    { name: 'Dacia', logo: daciaLogo },
    { name: 'Dodge', logo: dodgeLogo },
    { name: 'Elemental', logo: elementalLogo },
    { name: 'Ferrari', logo: ferrariLogo },
    { name: 'Fiat', logo: fiatLogo },
    { name: 'Ford', logo: fordLogo },
    { name: 'Honda', logo: hondaLogo },
    { name: 'Hyundai', logo: hyundaiLogo },
    { name: 'Infiniti', logo: infinitiLogo },
    { name: 'Isuzu', logo: isuzuLogo },
    { name: 'Jaguar', logo: jaguarLogo },
    { name: 'Jeep', logo: jeepLogo },
    { name: 'Kia', logo: kiaLogo },
    { name: 'Koenigsegg', logo: koenigseggLogo },
    { name: 'Lamborghini', logo: lamborghiniLogo },
    { name: 'Land Rover', logo: landRoverLogo },
    { name: 'Lexus', logo: lexusLogo },
    { name: 'Maserati', logo: maseratiLogo },
    { name: 'Mazda', logo: mazdaLogo },
    { name: 'McLaren', logo: mclarenLogo },
    { name: 'Mercedes', logo: mercedesLogo },
    { name: 'Mini', logo: miniLogo },
    { name: 'Mitsubishi', logo: mitsubishiLogo },
    { name: 'Nissan', logo: nissanLogo },
    { name: 'Opel', logo: opelLogo },
    { name: 'Pagani', logo: paganiLogo },
    { name: 'Peugeot', logo: peugeotLogo },
    { name: 'Porsche', logo: porscheLogo },
    { name: 'Renault', logo: renaultLogo },
    { name: 'Rolls Royce', logo: rollsRoyceLogo },
    { name: 'Seat', logo: seatLogo },
    { name: 'Skoda', logo: skodaLogo },
    { name: 'Subaru', logo: subaruLogo },
    { name: 'Suzuki', logo: suzukiLogo },
    { name: 'Tesla', logo: teslaLogo },
    { name: 'Toyota', logo: toyotaLogo },
    { name: 'Volkswagen', logo: volkswagenLogo },
    { name: 'Volvo', logo: volvoLogo },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section fade-in-up" ref={(el) => (sectionsRef.current[0] = el)}>
        <div className="hero-content">
          <h1 className="hero-title">{translations.home.title}</h1>
          <p className="hero-subtitle">{translations.home.subtitle}</p>
          <p className="hero-description">{translations.home.description}</p>
          <div className="hero-cta">
            <Link to="/buy-cars" className="btn btn-primary">{translations.home.ctaBuy}</Link>
            <Link to="/ask-ai" className="btn btn-secondary">{translations.home.ctaAskAI}</Link>
          </div>
        </div>
      </section>

      {/* Car Brands Section */}
      <section className="brands-section fade-in-up" ref={(el) => (sectionsRef.current[1] = el)}>
        <div className="brands-scroll">
          <div className="brands-track">
            {brands.map((brand, index) => (
              <div key={index} className="brand-item">
                <img src={brand.logo} alt={brand.name} />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {brands.map((brand, index) => (
              <div key={`duplicate-${index}`} className="brand-item">
                <img src={brand.logo} alt={brand.name} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section fade-in-up" ref={(el) => (sectionsRef.current[2] = el)}>
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
      <section className="features-section fade-in-up" ref={(el) => (sectionsRef.current[3] = el)}>
        <div className="container">
          <h2 className="section-title">{translations.home.featuresTitle}</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3 className="feature-title">{translations.home.feature1Title}</h3>
              <p className="feature-description">{translations.home.feature1Desc}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✓</div>
              <h3 className="feature-title">{translations.home.feature2Title}</h3>
              <p className="feature-description">{translations.home.feature2Desc}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✓</div>
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

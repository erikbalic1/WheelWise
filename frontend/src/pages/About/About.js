import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './About.scss';

const About = () => {
  const { translations } = useLanguage();
  const sectionsRef = useRef([]);
  const [stats, setStats] = useState({
    cars: 0,
    users: 0,
    deals: 0,
    satisfaction: 0
  });
  const hasAnimatedRef = useRef(false);
  const statsRef = useRef(null);

  const animateValue = (key, start, end, duration) => {
    const startTime = performance.now();
    
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (end - start) * easeOutQuart);
      
      setStats(prev => ({ ...prev, [key]: current }));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  };

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

    const sections = sectionsRef.current;
    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  useEffect(() => {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            // Start all animations at the same time with slower duration
            animateValue('cars', 0, 10000, 3000);
            animateValue('users', 0, 50000, 3000);
            animateValue('deals', 0, 5000, 3000);
            animateValue('satisfaction', 0, 98, 3000);
          }
        });
      },
      {
        threshold: 0.3
      }
    );

    const statsElement = statsRef.current;
    if (statsElement) {
      statsObserver.observe(statsElement);
    }

    return () => {
      if (statsElement) {
        statsObserver.unobserve(statsElement);
      }
    };
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero fade-in-up" ref={(el) => (sectionsRef.current[0] = el)}>
        <div className="hero-content">
          <h1 className="hero-title">
            {translations.about?.title || 'About WheelWise'}
          </h1>
          <p className="hero-subtitle">
            {translations.about?.subtitle || 'Your Trusted Platform for Buying and Selling Quality Vehicles'}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="about-section mission-section fade-in-up" ref={(el) => (sectionsRef.current[1] = el)}>
        <div className="container">
          <div className="section-content">
            <div className="content-text">
              <h2>{translations.about?.missionTitle || 'Our Mission'}</h2>
              <p>
                {translations.about?.missionText || 
                  'At WheelWise, we believe that buying or selling a car should be a simple, transparent, and enjoyable experience. Our mission is to revolutionize the automotive marketplace by connecting buyers and sellers through a platform built on trust, quality, and innovation.'}
              </p>
              <p>
                {translations.about?.missionText2 || 
                  'We are committed to providing verified listings, secure transactions, and exceptional customer support to ensure that every user finds their perfect vehicle with confidence.'}
              </p>
            </div>
            <div className="content-image">
              <div className="image-placeholder">
                <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="about-section values-section fade-in-up" ref={(el) => (sectionsRef.current[2] = el)}>
        <div className="container">
          <h2 className="section-title">
            {translations.about?.valuesTitle || 'Our Core Values'}
          </h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
              </div>
              <h3>{translations.about?.value1Title || 'Trust & Transparency'}</h3>
              <p>
                {translations.about?.value1Desc || 
                  'Every listing is verified and transparent. We ensure all information is accurate and trustworthy.'}
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
              </div>
              <h3>{translations.about?.value2Title || 'Security First'}</h3>
              <p>
                {translations.about?.value2Desc || 
                  'Your safety is our priority. We use advanced security measures to protect your data and transactions.'}
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                </svg>
              </div>
              <h3>{translations.about?.value3Title || 'Customer Focused'}</h3>
              <p>
                {translations.about?.value3Desc || 
                  'Our dedicated support team is available 24/7 to assist you throughout your journey.'}
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </div>
              <h3>{translations.about?.value4Title || 'Innovation'}</h3>
              <p>
                {translations.about?.value4Desc || 
                  'We continuously improve our platform with the latest technology to enhance your experience.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="about-section stats-section fade-in-up" ref={(el) => (sectionsRef.current[3] = el)}>
        <div className="container" ref={statsRef}>
          <h2 className="section-title">
            {translations.about?.statsTitle || 'Our Impact'}
          </h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{stats.cars.toLocaleString()}+</div>
              <div className="stat-label">{translations.about?.statCars || 'Cars Listed'}</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.users.toLocaleString()}+</div>
              <div className="stat-label">{translations.about?.statUsers || 'Happy Users'}</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.deals.toLocaleString()}+</div>
              <div className="stat-label">{translations.about?.statDeals || 'Successful Deals'}</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.satisfaction}%</div>
              <div className="stat-label">{translations.about?.statSatisfaction || 'Satisfaction Rate'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-section team-section fade-in-up" ref={(el) => (sectionsRef.current[4] = el)}>
        <div className="container">
          <h2 className="section-title">
            {translations.about?.teamTitle || 'Meet Our Team'}
          </h2>
          <p className="section-description">
            {translations.about?.teamDescription || 
              'Dedicated professionals working together to make your car buying and selling experience exceptional.'}
          </p>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3>{translations.about?.ceoName || 'John Smith'}</h3>
              <p className="team-role">{translations.about?.ceoRole || 'CEO & Founder'}</p>
            </div>

            <div className="team-card">
              <div className="team-avatar">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3>{translations.about?.ctoName || 'Sarah Johnson'}</h3>
              <p className="team-role">{translations.about?.ctoRole || 'CTO'}</p>
            </div>

            <div className="team-card">
              <div className="team-avatar">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <h3>{translations.about?.cooName || 'Michael Chen'}</h3>
              <p className="team-role">{translations.about?.cooRole || 'COO'}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-section cta-section fade-in-up" ref={(el) => (sectionsRef.current[5] = el)}>
        <div className="container">
          <div className="cta-content">
            <h2>{translations.about?.ctaTitle || 'Ready to Get Started?'}</h2>
            <p>
              {translations.about?.ctaText || 
                'Join thousands of satisfied users and experience the future of car buying and selling.'}
            </p>
            <div className="cta-buttons">
              <a href="/buy-cars" className="btn btn-primary">
                {translations.about?.ctaBrowse || 'Browse Cars'}
              </a>
              <a href="/ask-ai" className="btn btn-secondary">
                {translations.about?.ctaAskAI || 'Ask AI'}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

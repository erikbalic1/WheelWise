import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../../context/LanguageContext';
import './Footer.scss';

const Footer = () => {
  const { language } = useContext(LanguageContext);

  const footerTranslations = {
    en: {
      quickLinks: 'Quick Links',
      home: 'Home',
      buyCars: 'Buy Cars',
      askAI: 'Ask AI',
      about: 'About Us',
      contact: 'Contact',
      information: 'Information',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      faq: 'FAQ',
      contactUs: 'Contact Us',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      addressValue: '123 Main Street, Budapest, Hungary',
      followUs: 'Follow Us',
      copyright: '© 2026 WheelWise. All rights reserved.',
      sourceCode: 'Source Code'
    },
    hu: {
      quickLinks: 'Gyors Linkek',
      home: 'Főoldal',
      buyCars: 'Autók Vásárlása',
      askAI: 'AI Tanács',
      about: 'Rólunk',
      contact: 'Kapcsolat',
      information: 'Információ',
      privacyPolicy: 'Adatvédelmi Szabályzat',
      termsOfService: 'Felhasználási Feltételek',
      faq: 'GYIK',
      contactUs: 'Kapcsolat',
      email: 'E-mail',
      phone: 'Telefon',
      address: 'Cím',
      addressValue: '123 Fő Utca, Budapest, Magyarország',
      followUs: 'Kövessen Minket',
      copyright: '© 2026 WheelWise. Minden jog fenntartva.',
      sourceCode: 'Forráskód'
    },
    de: {
      quickLinks: 'Schnelllinks',
      home: 'Startseite',
      buyCars: 'Autos Kaufen',
      askAI: 'AI Fragen',
      about: 'Über Uns',
      contact: 'Kontakt',
      information: 'Information',
      privacyPolicy: 'Datenschutzrichtlinie',
      termsOfService: 'Nutzungsbedingungen',
      faq: 'FAQ',
      contactUs: 'Kontakt',
      email: 'E-Mail',
      phone: 'Telefon',
      address: 'Adresse',
      addressValue: '123 Hauptstraße, Budapest, Ungarn',
      followUs: 'Folgen Sie Uns',
      copyright: '© 2026 WheelWise. Alle Rechte vorbehalten.',
      sourceCode: 'Quellcode'
    }
  };

  const t = footerTranslations[language];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-brand">
            <span className="brand-wheel">Wheel</span><span className="brand-wise">Wise</span>
          </h3>
          <p className="footer-description">Your trusted car marketplace</p>
          <div className="footer-social">
            <span>{t.followUs}</span>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <h4>{t.quickLinks}</h4>
          <ul>
            <li><Link to="/">{t.home}</Link></li>
            <li><Link to="/buy-cars">{t.buyCars}</Link></li>
            <li><Link to="/ask-ai">{t.askAI}</Link></li>
            <li><Link to="/about">{t.about}</Link></li>
            <li><Link to="/contact">{t.contact}</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>{t.information}</h4>
          <ul>
            <li><Link to="/privacy">{t.privacyPolicy}</Link></li>
            <li><Link to="/terms">{t.termsOfService}</Link></li>
            <li><Link to="/faq">{t.faq}</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>{t.contactUs}</h4>
          <p>{t.email}: info@wheelwise.com</p>
          <p>{t.phone}: +36 1 234 5678</p>
          <p>{t.address}: {t.addressValue}</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{t.copyright}</p>
        <a href="https://github.com/yourusername/wheelwise" target="_blank" rel="noopener noreferrer">
          {t.sourceCode}
        </a>
      </div>
    </footer>
  );
};

export default Footer;

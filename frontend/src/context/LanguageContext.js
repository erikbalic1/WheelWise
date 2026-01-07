import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export { LanguageContext };

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    nav: {
      home: 'Home',
      buyCars: 'Buy Cars',
      sellCars: 'Sell Cars',
      about: 'About Us',
      contact: 'Contact Us',
      signIn: 'Sign In',
    },
    home: {
      title: 'Find Your Perfect Car',
      subtitle: 'Your trusted marketplace for buying and selling cars',
      description: 'Browse thousands of verified listings, connect with sellers, and drive away with confidence.',
      ctaBuy: 'Browse Cars',
      ctaSell: 'Sell Your Car',
      featuresTitle: 'Why Choose WheelWise?',
      feature1Title: 'Verified Listings',
      feature1Desc: 'All cars are verified and checked for quality',
      feature2Title: 'Secure Transactions',
      feature2Desc: 'Safe and secure payment processing',
      feature3Title: 'Expert Support',
      feature3Desc: '24/7 customer support to help you',
      statsTitle: 'Trusted by Thousands',
      statsCars: 'Active Listings',
      statsUsers: 'Happy Users',
      statsDeals: 'Successful Deals',
    },
  },
  hu: {
    nav: {
      home: 'Főoldal',
      buyCars: 'Autók Vásárlása',
      sellCars: 'Autók Eladása',
      about: 'Rólunk',
      contact: 'Kapcsolat',
      signIn: 'Bejelentkezés',
    },
    home: {
      title: 'Találd Meg a Tökéletes Autót',
      subtitle: 'A megbízható piactér autók vásárlásához és eladásához',
      description: 'Böngéssz több ezer ellenőrzött hirdetés között, lépj kapcsolatba eladókkal, és vezess el bizalommal.',
      ctaBuy: 'Autók Böngészése',
      ctaSell: 'Autó Eladása',
      featuresTitle: 'Miért a WheelWise-t Válaszd?',
      feature1Title: 'Ellenőrzött Hirdetések',
      feature1Desc: 'Minden autó ellenőrzött és minőségileg ellenőrzött',
      feature2Title: 'Biztonságos Tranzakciók',
      feature2Desc: 'Biztonságos és megbízható fizetési feldolgozás',
      feature3Title: 'Szakértői Támogatás',
      feature3Desc: '24/7 ügyfélszolgálat, hogy segítsünk neked',
      statsTitle: 'Ezrek Bíznak Bennünk',
      statsCars: 'Aktív Hirdetés',
      statsUsers: 'Elégedett Felhasználó',
      statsDeals: 'Sikeres Üzlet',
    },
  },
  de: {
    nav: {
      home: 'Startseite',
      buyCars: 'Autos Kaufen',
      sellCars: 'Autos Verkaufen',
      about: 'Über Uns',
      contact: 'Kontakt',
      signIn: 'Anmelden',
    },
    home: {
      title: 'Finden Sie Ihr Perfektes Auto',
      subtitle: 'Ihr vertrauenswürdiger Marktplatz für den Kauf und Verkauf von Autos',
      description: 'Durchsuchen Sie Tausende von verifizierten Angeboten, kontaktieren Sie Verkäufer und fahren Sie mit Vertrauen.',
      ctaBuy: 'Autos Durchsuchen',
      ctaSell: 'Ihr Auto Verkaufen',
      featuresTitle: 'Warum WheelWise?',
      feature1Title: 'Verifizierte Angebote',
      feature1Desc: 'Alle Autos sind verifiziert und qualitätsgeprüft',
      feature2Title: 'Sichere Transaktionen',
      feature2Desc: 'Sichere und zuverlässige Zahlungsabwicklung',
      feature3Title: 'Expertenunterstützung',
      feature3Desc: '24/7 Kundensupport, um Ihnen zu helfen',
      statsTitle: 'Vertraut von Tausenden',
      statsCars: 'Aktive Angebote',
      statsUsers: 'Zufriedene Benutzer',
      statsDeals: 'Erfolgreiche Geschäfte',
    },
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
  });

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage,
        translations: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

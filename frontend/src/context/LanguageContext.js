import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

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
      title: 'Welcome to WheelWise',
      subtitle: 'Your trusted car marketplace',
      description: 'Browse thousands of cars, find your perfect match, and drive away with confidence.',
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
      title: 'Üdvözöl a WheelWise',
      subtitle: 'A megbízható autópiac',
      description: 'Böngéssz több ezer autó között, találd meg a tökéletes párod, és vezess el bizalommal.',
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
      title: 'Willkommen bei WheelWise',
      subtitle: 'Ihr vertrauenswürdiger Automarkt',
      description: 'Durchsuchen Sie Tausende von Autos, finden Sie Ihr perfektes Match und fahren Sie mit Vertrauen davon.',
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

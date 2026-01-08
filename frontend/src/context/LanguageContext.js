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
    auth: {
      loginTitle: 'Welcome Back',
      loginSubtitle: 'Sign in to your WheelWise account',
      registerTitle: 'Create Account',
      registerSubtitle: 'Join WheelWise today',
      name: 'Full Name',
      namePlaceholder: 'Enter your full name',
      email: 'Email Address',
      emailPlaceholder: 'Enter your email',
      password: 'Password',
      passwordPlaceholder: 'Enter your password',
      confirmPassword: 'Confirm Password',
      confirmPasswordPlaceholder: 'Confirm your password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      loginButton: 'Sign In',
      registerButton: 'Create Account',
      noAccount: "Don't have an account?",
      hasAccount: 'Already have an account?',
      signUp: 'Sign Up',
      signIn: 'Sign In',
      orContinue: 'or continue with',
      nameRequired: 'Name is required',
      emailRequired: 'Email is required',
      emailInvalid: 'Email is invalid',
      passwordRequired: 'Password is required',
      passwordLength: 'Password must be at least 6 characters',
      passwordMatch: 'Passwords do not match',
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
    auth: {
      loginTitle: 'Üdvözlünk Vissza',
      loginSubtitle: 'Jelentkezz be a WheelWise fiókodba',
      registerTitle: 'Fiók Létrehozása',
      registerSubtitle: 'Csatlakozz a WheelWise-hoz még ma',
      name: 'Teljes Név',
      namePlaceholder: 'Add meg a neved',
      email: 'E-mail Cím',
      emailPlaceholder: 'Add meg az e-mail címed',
      password: 'Jelszó',
      passwordPlaceholder: 'Add meg a jelszavad',
      confirmPassword: 'Jelszó Megerősítése',
      confirmPasswordPlaceholder: 'Erősítsd meg a jelszavad',
      rememberMe: 'Emlékezz rám',
      forgotPassword: 'Elfelejtetted a jelszavad?',
      loginButton: 'Bejelentkezés',
      registerButton: 'Fiók Létrehozása',
      noAccount: 'Még nincs fiókod?',
      hasAccount: 'Már van fiókod?',
      signUp: 'Regisztráció',
      signIn: 'Bejelentkezés',
      orContinue: 'vagy folytasd a következővel',
      nameRequired: 'A név megadása kötelező',
      emailRequired: 'Az e-mail megadása kötelező',
      emailInvalid: 'Érvénytelen e-mail cím',
      passwordRequired: 'A jelszó megadása kötelező',
      passwordLength: 'A jelszónak legalább 6 karakter hosszúnak kell lennie',
      passwordMatch: 'A jelszavak nem egyeznek',
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
    auth: {
      loginTitle: 'Willkommen Zurück',
      loginSubtitle: 'Melden Sie sich bei Ihrem WheelWise-Konto an',
      registerTitle: 'Konto Erstellen',
      registerSubtitle: 'Treten Sie WheelWise noch heute bei',
      name: 'Vollständiger Name',
      namePlaceholder: 'Geben Sie Ihren vollständigen Namen ein',
      email: 'E-Mail-Adresse',
      emailPlaceholder: 'Geben Sie Ihre E-Mail ein',
      password: 'Passwort',
      passwordPlaceholder: 'Geben Sie Ihr Passwort ein',
      confirmPassword: 'Passwort Bestätigen',
      confirmPasswordPlaceholder: 'Bestätigen Sie Ihr Passwort',
      rememberMe: 'Angemeldet bleiben',
      forgotPassword: 'Passwort vergessen?',
      loginButton: 'Anmelden',
      registerButton: 'Konto Erstellen',
      noAccount: 'Sie haben noch kein Konto?',
      hasAccount: 'Sie haben bereits ein Konto?',
      signUp: 'Registrieren',
      signIn: 'Anmelden',
      orContinue: 'oder fortfahren mit',
      nameRequired: 'Name ist erforderlich',
      emailRequired: 'E-Mail ist erforderlich',
      emailInvalid: 'E-Mail ist ungültig',
      passwordRequired: 'Passwort ist erforderlich',
      passwordLength: 'Passwort muss mindestens 6 Zeichen lang sein',
      passwordMatch: 'Passwörter stimmen nicht überein',
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

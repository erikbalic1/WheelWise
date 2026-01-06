import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import BuyCars from './pages/BuyCars/BuyCars';
import SellCars from './pages/SellCars/SellCars';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Auth from './pages/Auth/Auth';
import './styles/global.scss';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/buy-cars" element={<BuyCars />} />
              <Route path="/sell-cars" element={<SellCars />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;

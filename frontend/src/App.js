import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home/Home';
import BuyCars from './pages/BuyCars/BuyCars';
import CarDetail from './pages/CarDetail/CarDetail';
import AskAI from './pages/AskAI/AskAI';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Auth from './pages/Auth/Auth';
import './styles/global.scss';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <ScrollToTop />
          <div className="App">
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/buy-cars" element={<BuyCars />} />
                <Route path="/buy-cars/:id" element={<CarDetail />} />
                <Route path="/ask-ai" element={<AskAI />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/auth" element={<Auth />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Navbar from './Navbar'
import Home from './pages/Home'
import Cars from './pages/Cars'
import Advice from './pages/Advice'
import Upload from './pages/Upload'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup.jsx'
import Footer from './Footer'
import './App.scss'
import './styles/style.css'
import { translations } from './utils/constants.js'

function App() {
  const [lang, setLang] = useState(localStorage.getItem('wheelwise-lang') || 'en')

  const handleLangChange = (newLang) => {
    localStorage.setItem('wheelwise-lang', newLang)
    setLang(newLang)
  }

  return (
    <Router>
      <Navbar lang={lang} onLangChange={handleLangChange} />
      <Routes>
        <Route path="/" element={<Home lang={lang} translations={translations} />} />
        <Route path="/cars" element={<Cars lang={lang} translations={translations} />} />
        <Route path="/advice" element={<Advice lang={lang} translations={translations} />} />
        <Route path="/upload" element={<Upload lang={lang} translations={translations} />} />
        <Route path="/contact" element={<Contact lang={lang} translations={translations} />} />
        <Route path="/login" element={<Login lang={lang} translations={translations} />} />
        <Route path='/register' element={<Signup lang={lang} translations={translations} />} />
      </Routes>
      <Footer lang={lang} translations={translations} />
    </Router>
  )
}

export default App

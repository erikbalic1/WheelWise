import { Link } from 'react-router-dom'
import '../App.scss'

function Home({ lang, translations }) {
  return (
    <div className="main">
      <div className="div1">
        <h2>
          {translations[lang].welcome}
          <span className="title">Wheel</span>
          <span className="title2">Wise.</span>
          {lang === 'hu' && <span className="hu-suffix"> oldalán</span>}
        </h2>
        <p>{translations[lang].trusted}</p>
        <Link to="/cars" className="explore-btn">{translations[lang].explore}</Link>
      </div>
      <div className="div2">
        <h3>{translations[lang].servicesTitle}</h3>
        <div className="card-list">
          <div className="card">
            <img src="/assets/car1.png" alt="Find Cars" className="card-img" />
            <div className="card-content">
              <h4 className="card-title">{translations[lang].card1Title}</h4>
              <p className="card-desc">{translations[lang].card1Desc}</p>
            </div>
            <Link to="/cars" className="card-btn">{translations[lang].card1Btn}</Link>
          </div>
          <div className="card">
            <img src="/assets/car2.png" alt="Car Advice" className="card-img" />
            <div className="card-content">
              <h4 className="card-title">{translations[lang].card2Title}</h4>
              <p className="card-desc">{translations[lang].card2Desc}</p>
            </div>
            <Link to="/advice" className="card-btn">{translations[lang].card2Btn}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Home

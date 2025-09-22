import '../App.scss'

function Cars({ lang, translations }) {
  return (
    <div className="main">
      <h1>{translations[lang].findCars}</h1>
      {/* ...existing code... */}
    </div>
  )
}

export default Cars
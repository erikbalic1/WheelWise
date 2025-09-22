import '../App.scss'

function Upload({ lang, translations }) {
  return (
    <div className="main">
      <h1>{translations[lang].sellCars}</h1>
      {/* ...existing code... */}
    </div>
  )
}

export default Upload
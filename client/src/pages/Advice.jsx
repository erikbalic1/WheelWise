import '../App.scss'

function Advice({ lang, translations }) {
  return (
    <div className="main">
      <h1>{translations[lang].advice}</h1>
      {/* ...existing code... */}
    </div>
  )
}

export default Advice
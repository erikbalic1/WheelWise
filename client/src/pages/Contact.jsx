import '../App.scss'

function Contact({ lang, translations }) {
  return (
    <div className="main">
      <h1>{translations[lang].contactUs}</h1>
      {/* ...existing code... */}
    </div>
  )
}

export default Contact
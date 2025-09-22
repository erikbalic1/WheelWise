import './App.scss'

function Footer({ lang, translations }) {
  return (
    <footer className='footer'>
      <p>{translations[lang].copyright}</p>
      <p>
        {translations[lang].footerDev}
        <a href="https://erikbalic.hu" target="_blank" rel="noopener noreferrer">
          {translations[lang].footerDevName}
        </a>
      </p>
      <p>
        {translations[lang].footerSource}
        <a href="https://github.com/erikbalic1/WheelWise" target="_blank" rel="noopener noreferrer">
          {translations[lang].footerGithub}
        </a>
      </p>
    </footer>
  )
}

export default Footer

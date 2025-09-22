import React from 'react';
import '../App.scss'


function Login({ lang, translations }) {
  return (
    <div className="main">
      <h1>{translations[lang].login}</h1>
      Login  
    </div>
  )
}
export default Login;
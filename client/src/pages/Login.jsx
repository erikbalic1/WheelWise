import React, { useState } from 'react';
import '../App.scss'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ lang, translations }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/login', { username, password })
      .then(result => {
        console.log(result);
        navigate('/');
      })
      .catch(error => {
        console.error('There was an error logging in!', error);
      });
  };

  return (
    <div className="login-container">
      <h2>{translations[lang].login || "Sign In"}</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">{translations[lang].username || "Username"}</label>
        <input
          id="username"
          type="text"
          placeholder={translations[lang].username || "Username"}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">{translations[lang].password || "Password"}</label>
        <input
          id="password"
          type="password"
          placeholder={translations[lang].password || "Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{translations[lang].login || "Login"}</button>
      </form>
    </div>
  )
}
export default Login;
import { useState } from 'react'
import { translations } from '../utils/constants.js'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
 
function SignUp({ lang }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3001/register', { username, email, password })
      .then(result => {
        console.log(result)
        navigate('/login');
      })
      .catch(error => {
        console.error('There was an error registering!', error)
      })
  }

  return (
    <div className="register">
        <form className='signup-form' onSubmit={handleSubmit}>
            <h2>{translations[lang].register || "Sign Up"}</h2>
            <label htmlFor="username">{translations[lang].username || "Username"}</label>
            <input
              id="username"
              type="text"
              placeholder={translations[lang].username || "Username"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="email">{translations[lang].email || "Email"}</label>
            <input
              id="email"
              type="email"
              placeholder={translations[lang].email || "Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">{translations[lang].password || "Password"}</label>
            <input
              id="password"
              type="password"
              placeholder={translations[lang].password || "Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">{translations[lang].register || "Register"}</button>
            <div style={{ marginTop: '1rem', textAlign: 'center' }}>
              <span>Already have an account?</span>
              <br />
              <Link to="/login" className="login-link-btn">
                {translations[lang].login || "Login"}
              </Link>
            </div>
        </form>
    </div>
  )
}

export default SignUp

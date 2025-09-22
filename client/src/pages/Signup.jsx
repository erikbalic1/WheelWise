import { useState } from 'react'
import { translations } from '../utils/constants.js'

function SignUp({ lang }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle register logic here
  }

  return (
    <div className="register">
        <h2>Sign Up</h2>
        <form className='signup-form' onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={translations[lang].username || "Username"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder={translations[lang].email || "Email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder={translations[lang].password || "Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">{translations[lang].register || "Register"}</button>
        </form>
    </div>
  )
}

export default SignUp

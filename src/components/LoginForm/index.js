import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken) {
      navigate('/', { replace: true }) // Navigate to home if token exists
    }
  }, [navigate])

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const submitForm = async event => {
    event.preventDefault()
    const userDetails = {
      username,
      password
    }

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails)
    }

    const response = await fetch(url, options)
    const data = await response.json()
    //ternary operator
    // response.ok ? navigate('/', { replace: true }); : setErrorMsg(data.error_msg)
    if (response.ok) {
      // If the response is successful, navigate to the specified route
      navigate('/', { replace: true } );
      Cookies.set('jwt_token', data.jwt_token, {
        expires: 30
      })
    } else {
      setErrorMsg(data.error_msg);
    }
  }

  const renderPasswordField = () => {
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-filed"
          value={password}
          onChange={onChangePassword}
        />
      </>
    )
  }

  const renderUsernameField = () => {
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-filed"
          value={username}
          onChange={onChangeUsername}
        />
      </>
    )
  }
  return (
    <div className="login-form-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
        className="login-website-logo-mobile-image"
        alt="website logo"
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
        className="login-image"
        alt="website login"
      />
      <form className="form-container" onSubmit={submitForm}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-desktop-image"
          alt="website logo"
        />
        <div className="input-container">{renderUsernameField()}</div>
        <div className="input-container">{renderPasswordField()}</div>
        <button type="submit" className="login-button">
          Login
        </button>
        <p className='error-message'>{errorMsg}</p>
      </form>
    </div>
  )
}

export default LoginForm

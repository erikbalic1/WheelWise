import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import './Auth.scss';

const Auth = () => {
  const { translations } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = translations.auth?.nameRequired || 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = translations.auth?.emailRequired || 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = translations.auth?.emailInvalid || 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = translations.auth?.passwordRequired || 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = translations.auth?.passwordLength || 'Password must be at least 6 characters';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = translations.auth?.passwordMatch || 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      // TODO: Integrate with API
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  return (
    <div className="auth-page">
      <div key={isLogin ? 'login' : 'register'} className="auth-container fade-in-up">
        <div className="auth-header">
          <h1 className="auth-title">
            {isLogin 
              ? (translations.auth?.loginTitle || 'Welcome Back') 
              : (translations.auth?.registerTitle || 'Create Account')}
          </h1>
          <p className="auth-subtitle">
            {isLogin
              ? (translations.auth?.loginSubtitle || 'Sign in to your WheelWise account')
              : (translations.auth?.registerSubtitle || 'Join WheelWise today')}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">{translations.auth?.name || 'Full Name'}</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={translations.auth?.namePlaceholder || 'Enter your full name'}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">{translations.auth?.email || 'Email Address'}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder={translations.auth?.emailPlaceholder || 'Enter your email'}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">{translations.auth?.password || 'Password'}</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder={translations.auth?.passwordPlaceholder || 'Enter your password'}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">{translations.auth?.confirmPassword || 'Confirm Password'}</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder={translations.auth?.confirmPasswordPlaceholder || 'Confirm your password'}
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>
          )}

          {isLogin && (
            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span>{translations.auth?.rememberMe || 'Remember me'}</span>
              </label>
              <button type="button" className="forgot-password" onClick={() => {}}>
                {translations.auth?.forgotPassword || 'Forgot password?'}
              </button>
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-submit">
            {isLogin 
              ? (translations.auth?.loginButton || 'Sign In') 
              : (translations.auth?.registerButton || 'Create Account')}
          </button>
        </form>

        <div className="auth-toggle">
          <p>
            {isLogin
              ? (translations.auth?.noAccount || "Don't have an account?")
              : (translations.auth?.hasAccount || 'Already have an account?')}
            {' '}
            <button onClick={toggleAuthMode} className="toggle-btn">
              {isLogin
                ? (translations.auth?.signUp || 'Sign Up')
                : (translations.auth?.signIn || 'Sign In')}
            </button>
          </p>
        </div>

        <div className="auth-divider">
          <span>{translations.auth?.orContinue || 'or continue with'}</span>
        </div>

        <div className="social-login">
          <button className="social-btn google">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
          <button className="social-btn facebook">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;

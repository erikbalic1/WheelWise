import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import './Auth.scss';

const Auth = () => {
  const { translations } = useLanguage();
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    mfaCode: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [mfaRequired, setMfaRequired] = useState(false);

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

    if (isLogin && mfaRequired) {
      const mfaCode = formData.mfaCode?.trim() || '';
      if (!mfaCode) {
        newErrors.mfaCode = 'MFA code is required';
      } else if (!/^\d{6}$/.test(mfaCode)) {
        newErrors.mfaCode = 'MFA code must be 6 digits';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    
    if (validateForm()) {
      setLoading(true);
      try {
        let result;
        if (isLogin) {
          result = await login(formData.email, formData.password, formData.mfaCode || '');
        } else {
          result = await register(formData.name, formData.email, formData.password);
        }

        if (result.success) {
          setMfaRequired(false);
          navigate('/');
        } else if (result.mfaRequired) {
          setMfaRequired(true);
          setApiError(result.message || 'Enter the code from Google Authenticator.');
        } else {
          setApiError(result.message);
        }
      } catch (error) {
        setApiError('An unexpected error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      mfaCode: ''
    });
    setErrors({});
    setApiError('');
    setMfaRequired(false);
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
          {apiError && <div className="error-message api-error">{apiError}</div>}
          
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

          {isLogin && mfaRequired && (
            <div className="form-group">
              <label htmlFor="mfaCode">Google Authenticator Code</label>
              <input
                type="text"
                id="mfaCode"
                name="mfaCode"
                value={formData.mfaCode || ''}
                onChange={handleInputChange}
                placeholder="Enter 6-digit code"
                className={errors.mfaCode ? 'error' : ''}
                maxLength="6"
                inputMode="numeric"
              />
              {errors.mfaCode && <span className="error-message">{errors.mfaCode}</span>}
            </div>
          )}

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

          <button type="submit" className="btn btn-primary btn-submit" disabled={loading}>
            {loading ? (
              <span>Loading...</span>
            ) : (
              isLogin 
                ? (translations.auth?.loginButton || 'Sign In') 
                : (translations.auth?.registerButton || 'Create Account')
            )}
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

      </div>
    </div>
  );
};

export default Auth;

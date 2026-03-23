import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Auth.scss';

const MfaLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const stateEmail = location.state?.email;
    const statePassword = location.state?.password;

    if (!stateEmail || !statePassword) {
      navigate('/auth', {
        state: { error: 'Please log in first.' },
        replace: true
      });
      return;
    }

    setEmail(stateEmail);
    setPassword(statePassword);
  }, [location.state, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!/^\d{6}$/.test(code.trim())) {
      setError('Please enter a valid 6-digit code.');
      return;
    }

    setLoading(true);
    try {
      const result = await login(email, password, code.trim());

      if (result.success) {
        navigate('/');
        return;
      }

      if (result.mfaRequired) {
        setError(result.message || 'Invalid MFA code. Please try again.');
      } else {
        setError(result.message || 'Login failed. Please try again.');
        navigate('/auth');
      }
    } catch (submitError) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container fade-in-up">
        <div className="auth-header">
          <h1 className="auth-title">MFA Verification</h1>
          <p className="auth-subtitle">Enter the 6-digit code from Google Authenticator</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="error-message api-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="mfaCode">Authenticator Code</label>
            <input
              type="text"
              id="mfaCode"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter 6-digit code"
              maxLength="6"
              inputMode="numeric"
              autoFocus
            />
          </div>

          <button type="submit" className="btn btn-primary btn-submit" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify & Sign In'}
          </button>
        </form>

        <div className="auth-toggle">
          <p>
            <button onClick={() => navigate('/auth')} className="toggle-btn">
              Back to Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MfaLogin;

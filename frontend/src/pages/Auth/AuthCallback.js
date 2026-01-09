import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      const error = params.get('error');

      if (error) {
        navigate('/auth', { state: { error: 'Authentication failed. Please try again.' } });
        return;
      }

      if (token) {
        // Store the token
        localStorage.setItem('token', token);
        
        // Fetch user data
        try {
          const response = await fetch('http://localhost:5000/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            navigate('/');
            window.location.reload(); // Reload to update auth context
          } else {
            navigate('/auth', { state: { error: 'Failed to authenticate. Please try again.' } });
          }
        } catch (error) {
          navigate('/auth', { state: { error: 'Failed to authenticate. Please try again.' } });
        }
      } else {
        navigate('/auth');
      }
    };

    handleCallback();
  }, [location, navigate, login]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      fontSize: '1.2rem'
    }}>
      <p>Authenticating...</p>
    </div>
  );
};

export default AuthCallback;

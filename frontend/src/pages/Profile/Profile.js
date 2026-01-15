import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import api from '../../services/api';
import './Profile.scss';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { translations } = useLanguage();
  
  // Form states
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Animation refs
  const headerRef = useRef(null);
  const tabsRef = useRef(null);
  const contentRef = useRef(null);

  // Fade-in animation on mount
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-visible');
        }
      });
    }, observerOptions);

    if (headerRef.current) observer.observe(headerRef.current);
    if (tabsRef.current) observer.observe(tabsRef.current);
    if (contentRef.current) observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, []);
  
  // General info state
  const [generalInfo, setGeneralInfo] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });
  
  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Avatar state
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || '');
  const [previewAvatar, setPreviewAvatar] = useState(user?.avatar || '');

  // Handle general info change
  const handleGeneralChange = (e) => {
    setGeneralInfo({
      ...generalInfo,
      [e.target.name]: e.target.value
    });
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  // Handle avatar URL change
  const handleAvatarChange = (e) => {
    setAvatarUrl(e.target.value);
    setPreviewAvatar(e.target.value);
  };

  // Update general info
  const handleUpdateGeneral = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await api.put('/auth/profile', {
        name: generalInfo.name,
        email: generalInfo.email
      });

      if (response.data.success) {
        updateUser(response.data.user);
        setMessage({ type: 'success', text: translations.profile?.successUpdate || 'Profile updated successfully!' });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || translations.profile?.errorUpdate || 'Failed to update profile'
      });
    } finally {
      setLoading(false);
    }
  };

  // Update password
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: translations.profile?.errorPasswordMatch || 'New passwords do not match' });
      setLoading(false);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: translations.profile?.newPasswordNote || 'Password must be at least 6 characters long' });
      setLoading(false);
      return;
    }

    try {
      const response = await api.put('/auth/password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });

      if (response.data.success) {
        setMessage({ type: 'success', text: translations.profile?.successPassword || 'Password updated successfully!' });
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || translations.profile?.errorPassword || 'Failed to update password'
      });
    } finally {
      setLoading(false);
    }
  };

  // Update avatar
  const handleUpdateAvatar = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await api.put('/auth/avatar', {
        avatar: avatarUrl
      });

      if (response.data.success) {
        updateUser(response.data.user);
        setMessage({ type: 'success', text: translations.profile?.successAvatar || 'Avatar updated successfully!' });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || translations.profile?.errorAvatar || 'Failed to update avatar'
      });
    } finally {
      setLoading(false);
    }
  };

  // Get initials for default avatar
  const getInitials = () => {
    if (!user?.name) return 'U';
    const names = user.name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return user.name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header fade-in-up" ref={headerRef}>
          <div className="profile-avatar-section">
            <div className="avatar-display">
              {user?.avatar || previewAvatar ? (
                <img 
                  src={previewAvatar || user?.avatar} 
                  alt={user?.name}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="avatar-initials" style={{ display: (user?.avatar || previewAvatar) ? 'none' : 'flex' }}>
                {getInitials()}
              </div>
            </div>
            <div className="profile-info">
              <h1>{user?.name}</h1>
              <p className="user-email">{user?.email}</p>
              <span className="user-badge">{user?.provider} account</span>
            </div>
          </div>
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="profile-tabs fade-in-up" ref={tabsRef}>
          <button
            className={`tab ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            {translations.profile?.generalTab || 'General Info'}
          </button>
          <button
            className={`tab ${activeTab === 'avatar' ? 'active' : ''}`}
            onClick={() => setActiveTab('avatar')}
          >
            {translations.profile?.avatarTab || 'Profile Picture'}
          </button>
          {user?.provider === 'local' && (
            <button
              className={`tab ${activeTab === 'password' ? 'active' : ''}`}
              onClick={() => setActiveTab('password')}
            >
              {translations.profile?.passwordTab || 'Change Password'}
            </button>
          )}
        </div>

        <div className="profile-content fade-in-up" ref={contentRef}>
          {/* General Info Tab */}
          {activeTab === 'general' && (
            <form className="profile-form" onSubmit={handleUpdateGeneral}>
              <h2>{translations.profile?.generalTitle || 'General Information'}</h2>
              <div className="form-group">
                <label htmlFor="name">{translations.profile?.nameLabel || 'Full Name'}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={generalInfo.name}
                  onChange={handleGeneralChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">{translations.profile?.emailLabel || 'Email Address'}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={generalInfo.email}
                  onChange={handleGeneralChange}
                  required
                />
              </div>

              <div className="form-info">
                <p><strong>{translations.profile?.accountTypeLabel || 'Account Type'}:</strong> {user?.provider}</p>
                <p><strong>{translations.profile?.memberSinceLabel || 'Member Since'}:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
                <p><strong>{translations.profile?.verificationLabel || 'Verification Status'}:</strong> {user?.isVerified ? (translations.profile?.verified || 'Verified') : (translations.profile?.notVerified || 'Not Verified')}</p>
              </div>

              <button 
                type="submit" 
                className="btn-primary"
                disabled={loading}
              >
                {loading ? (translations.profile?.updatingButton || 'Updating...') : (translations.profile?.saveButton || 'Save Changes')}
              </button>
            </form>
          )}

          {/* Avatar Tab */}
          {activeTab === 'avatar' && (
            <form className="profile-form" onSubmit={handleUpdateAvatar}>
              <h2>{translations.profile?.avatarTitle || 'Profile Picture'}</h2>
              <div className="avatar-preview-section">
                <div className="avatar-preview-large">
                  {previewAvatar ? (
                    <img 
                      src={previewAvatar} 
                      alt="Avatar preview"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div className="avatar-initials-large" style={{ display: previewAvatar ? 'none' : 'flex' }}>
                    {getInitials()}
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="avatar">{translations.profile?.avatarUrlLabel || 'Avatar URL'}</label>
                <input
                  type="url"
                  id="avatar"
                  name="avatar"
                  value={avatarUrl}
                  onChange={handleAvatarChange}
                  placeholder={translations.profile?.avatarUrlPlaceholder || 'https://example.com/avatar.jpg'}
                />
                <small>{translations.profile?.avatarUrlNote || 'Enter a URL to your profile picture'}</small>
              </div>

              <div className="avatar-suggestions">
                <p>{translations.profile?.avatarServicesTitle || 'Try these avatar services:'}</p>
                <ul>
                  <li><a href="https://gravatar.com" target="_blank" rel="noopener noreferrer">Gravatar</a></li>
                  <li><a href="https://ui-avatars.com" target="_blank" rel="noopener noreferrer">UI Avatars</a></li>
                  <li><a href="https://robohash.org" target="_blank" rel="noopener noreferrer">RoboHash</a></li>
                </ul>
              </div>

              <button 
                type="submit" 
                className="btn-primary"
                disabled={loading}
              >
                {loading ? (translations.profile?.updatingButton || 'Updating...') : (translations.profile?.updateAvatarButton || 'Update Avatar')}
              </button>
            </form>
          )}

          {/* Password Tab */}
          {activeTab === 'password' && user?.provider === 'local' && (
            <form className="profile-form" onSubmit={handleUpdatePassword}>
              <h2>{translations.profile?.passwordTitle || 'Change Password'}</h2>
              <div className="form-group">
                <label htmlFor="currentPassword">{translations.profile?.currentPasswordLabel || 'Current Password'}</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">{translations.profile?.newPasswordLabel || 'New Password'}</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength="6"
                />
                <small>{translations.profile?.newPasswordNote || 'Password must be at least 6 characters long'}</small>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">{translations.profile?.confirmPasswordLabel || 'Confirm New Password'}</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                  minLength="6"
                />
              </div>

              <button 
                type="submit" 
                className="btn-primary"
                disabled={loading}
              >
                {loading ? (translations.profile?.updatingButton || 'Updating...') : (translations.profile?.changePasswordButton || 'Change Password')}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

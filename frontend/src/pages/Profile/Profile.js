import React from 'react';
import { useAuth } from '../../context/AuthContext';
import './Profile.scss';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>Edit Profile</h1>
        <p>Profile page for {user?.name}</p>
        <p>Coming soon...</p>
      </div>
    </div>
  );
};

export default Profile;

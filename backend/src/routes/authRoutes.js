const express = require('express');
const passport = require('passport');
const {
  register,
  login,
  getMe,
  oauthSuccess,
  oauthFailure,
  logout
} = require('../controllers/authController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// Local authentication routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Get current user (protected route)
router.get('/me', protect, getMe);

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/api/auth/failure',
    session: false
  }),
  oauthSuccess
);

// Facebook OAuth routes
router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get('/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/api/auth/failure',
    session: false
  }),
  oauthSuccess
);

// OAuth failure route
router.get('/failure', oauthFailure);

module.exports = router;

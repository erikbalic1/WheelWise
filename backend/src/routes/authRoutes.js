const express = require('express');
const {
  register,
  login,
  getMe,
  logout,
  updateProfile,
  updatePassword,
  updateAvatar,
  setupMfa,
  enableMfa,
  disableMfa
} = require('../controllers/authController');
const { protect } = require('../middlewares/auth');

const router = express.Router();

// Local authentication routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Get current user (protected route)
router.get('/me', protect, getMe);

// Profile update routes (protected)
router.put('/profile', protect, updateProfile);
router.put('/password', protect, updatePassword);
router.put('/avatar', protect, updateAvatar);

// MFA routes (protected)
router.post('/mfa/setup', protect, setupMfa);
router.post('/mfa/enable', protect, enableMfa);
router.post('/mfa/disable', protect, disableMfa);

module.exports = router;

const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const User = require('../models/User');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

const sanitizeUser = (user) => ({
  id: user._id,
  email: user.email,
  name: user.name,
  avatar: user.avatar,
  provider: user.provider,
  isVerified: user.isVerified,
  mfaEnabled: user.mfaEnabled,
  createdAt: user.createdAt
});

// Register new user
exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validation
    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create user
    const user = await User.create({
      email,
      password,
      name,
      provider: 'local'
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: sanitizeUser(user)
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password, mfaCode } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Check if user exists
    const user = await User.findOne({ email }).select('+password +mfaSecret');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Defensive check if stored user has no password
    if (!user.password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Enforce MFA when enabled
    if (user.mfaEnabled) {
      if (!mfaCode) {
        return res.status(401).json({
          success: false,
          mfaRequired: true,
          message: 'MFA code is required'
        });
      }

      const normalizedCode = String(mfaCode).replace(/\s+/g, '');
      const isMfaCodeValid = speakeasy.totp.verify({
        secret: user.mfaSecret,
        encoding: 'base32',
        token: normalizedCode,
        window: 1
      });

      if (!isMfaCodeValid) {
        return res.status(401).json({
          success: false,
          mfaRequired: true,
          message: 'Invalid MFA code'
        });
      }
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: sanitizeUser(user)
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
};

// Get current user
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user: sanitizeUser(user)
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Logout
exports.logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
};

// Update profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.user.id;

    // Check if email is being changed and if it already exists
    if (email && email !== req.user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email already in use'
        });
      }
    }

    // Update user
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: sanitizeUser(user)
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during profile update',
      error: error.message
    });
  }
};

// Update password
exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    // Validation
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide current and new password'
      });
    }

    // Get user with password
    const user = await User.findById(userId).select('+password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify current password
    const isPasswordCorrect = await user.comparePassword(currentPassword);
    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Validate new password
    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long'
      });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error('Update password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during password update',
      error: error.message
    });
  }
};

// Update avatar
exports.updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const userId = req.user.id;

    if (!avatar) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an avatar URL'
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { avatar },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Avatar updated successfully',
      user: sanitizeUser(user)
    });
  } catch (error) {
    console.error('Update avatar error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during avatar update',
      error: error.message
    });
  }
};

// Generate MFA setup QR (for logged-in users)
exports.setupMfa = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('+mfaTempSecret');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const secret = speakeasy.generateSecret({
      name: `WheelWise (${user.email})`,
      issuer: 'WheelWise',
      length: 20
    });

    const qrCodeDataUrl = await qrcode.toDataURL(secret.otpauth_url);

    user.mfaTempSecret = secret.base32;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'MFA setup initialized',
      mfaEnabled: user.mfaEnabled,
      qrCode: qrCodeDataUrl,
      manualEntryKey: secret.base32
    });
  } catch (error) {
    console.error('Setup MFA error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during MFA setup',
      error: error.message
    });
  }
};

// Verify TOTP code and enable MFA
exports.enableMfa = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Please provide MFA code'
      });
    }

    const user = await User.findById(req.user.id).select('+mfaTempSecret +mfaSecret');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (!user.mfaTempSecret) {
      return res.status(400).json({
        success: false,
        message: 'MFA setup is not initialized'
      });
    }

    const normalizedCode = String(code).replace(/\s+/g, '');
    const isCodeValid = speakeasy.totp.verify({
      secret: user.mfaTempSecret,
      encoding: 'base32',
      token: normalizedCode,
      window: 1
    });

    if (!isCodeValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid MFA code'
      });
    }

    user.mfaSecret = user.mfaTempSecret;
    user.mfaTempSecret = null;
    user.mfaEnabled = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'MFA enabled successfully',
      user: sanitizeUser(user)
    });
  } catch (error) {
    console.error('Enable MFA error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while enabling MFA',
      error: error.message
    });
  }
};

// Disable MFA (requires current MFA code)
exports.disableMfa = async (req, res) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Please provide MFA code'
      });
    }

    const user = await User.findById(req.user.id).select('+mfaSecret +mfaTempSecret');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (!user.mfaEnabled || !user.mfaSecret) {
      return res.status(400).json({
        success: false,
        message: 'MFA is not enabled'
      });
    }

    const normalizedCode = String(code).replace(/\s+/g, '');
    const isCodeValid = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: 'base32',
      token: normalizedCode,
      window: 1
    });

    if (!isCodeValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid MFA code'
      });
    }

    user.mfaEnabled = false;
    user.mfaSecret = null;
    user.mfaTempSecret = null;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'MFA disabled successfully',
      user: sanitizeUser(user)
    });
  } catch (error) {
    console.error('Disable MFA error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while disabling MFA',
      error: error.message
    });
  }
};

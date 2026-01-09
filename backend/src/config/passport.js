const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

// Serialize user for the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google OAuth Strategy - only configure if credentials are provided
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists with this Google ID
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        // Check if user exists with this email
        user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // Link Google account to existing user
          user.googleId = profile.id;
          user.provider = 'google';
          if (!user.avatar && profile.photos && profile.photos.length > 0) {
            user.avatar = profile.photos[0].value;
          }
          await user.save();
          return done(null, user);
        }

        // Create new user
        user = await User.create({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName,
          avatar: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
          provider: 'google',
          isVerified: true
        });

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  ));
} else {
  console.log('Google OAuth not configured - skipping Google strategy');
}

// Facebook OAuth Strategy - only configure if credentials are provided
if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
  passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ['id', 'displayName', 'email', 'picture.type(large)']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists with this Facebook ID
        let user = await User.findOne({ facebookId: profile.id });

        if (user) {
          return done(null, user);
        }

        // Check if user exists with this email (if email is available)
        if (profile.emails && profile.emails.length > 0) {
          user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            // Link Facebook account to existing user
            user.facebookId = profile.id;
            user.provider = 'facebook';
            if (!user.avatar && profile.photos && profile.photos.length > 0) {
              user.avatar = profile.photos[0].value;
            }
            await user.save();
            return done(null, user);
          }
        }

        // Create new user
        user = await User.create({
          facebookId: profile.id,
          email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : `${profile.id}@facebook.com`,
          name: profile.displayName,
          avatar: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : null,
          provider: 'facebook',
          isVerified: true
        });

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  ));
} else {
  console.log('Facebook OAuth not configured - skipping Facebook strategy');
}

module.exports = passport;

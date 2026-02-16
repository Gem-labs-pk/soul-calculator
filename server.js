require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('./models/User');
require('./models/SoulProfile');

const User = mongoose.model('users');
const SoulProfile = mongoose.model('soulProfiles');

mongoose.connect(process.env.MONGO_URI);

const app = express();

app.use(express.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY]
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public')); // Serves your index.html

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) return done(null, existingUser);
      
      const user = await new User({ googleId: profile.id, displayName: profile.displayName }).save();
      done(null, user);
    }
  )
);

// --- ROUTES ---

// Auth
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/');
});
app.get('/api/current_user', (req, res) => res.send(req.user));
app.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// Save Result
app.post('/api/results', async (req, res) => {
    if (!req.user) return res.status(401).send({ error: 'Login required' });
    const { element, zodiac, abjadScore, urduName } = req.body;
    const profile = new SoulProfile({ 
        _user: req.user.id, element, zodiac, abjadScore, urduName 
    });
    await profile.save();
    res.send(profile);
});

// Get History
app.get('/api/history', async (req, res) => {
    if (!req.user) return res.send([]);
    const history = await SoulProfile.find({ _user: req.user.id }).sort({ date: -1 });
    res.send(history);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
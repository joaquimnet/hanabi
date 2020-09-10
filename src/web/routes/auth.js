const { Router } = require('express');
const passport = require('passport');

const authRoutes = Router();

authRoutes.get('/', passport.authenticate('discord'));

authRoutes.get(
  '/redirect',
  passport.authenticate('discord', {
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect('/');
  },
);

authRoutes.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/'));
});

module.exports = authRoutes;

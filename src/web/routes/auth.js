const { Router } = require('express');
const passport = require('passport');

const { logger } = require('../../modules');

const authRoutes = Router();

authRoutes.get('/', passport.authenticate('discord'));

authRoutes.get(
  '/redirect',
  passport.authenticate('discord', {
    failureRedirect: '/forbidden',
  }),
  (req, res) => {
    // logger.info(req.user);
    res.redirect('/');
  },
);

module.exports = authRoutes;

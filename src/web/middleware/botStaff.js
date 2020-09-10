const passport = require('passport');
const bot = require('../../bot');

exports.botStaff = (redirectUrl) => (req, res, next) => {
  if (!req.user) {
    // User is unauthenticated
    return passport.authenticate('discord', { successRedirect: redirectUrl })(req, res, next);
  }

  const userId = req.user._id;

  if (bot.config.admins.includes(userId)) {
    return next();
  }

  if (bot.config.owners.includes(userId)) {
    return next();
  }

  // User is unauthorized
  return res.redirect('/');
};

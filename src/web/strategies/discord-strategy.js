const DiscordStrategy = require('passport-discord').Strategy;
const passport = require('passport');

const { logger } = require('../../modules');
const { Profile } = require('../../models');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await Profile.findById(id);
  if (user) {
    done(null, user);
  } else {
    const createdUser = new Profile({ _id: id });
    await createdUser.save();
    done(null, createdUser);
  }
});

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CLIENT_REDIRECT,
      scope: ['identify'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await Profile.findById(profile.id);
        done(null, user);
      } catch (err) {
        logger.error(err);
        done(err);
      }
    },
  ),
);

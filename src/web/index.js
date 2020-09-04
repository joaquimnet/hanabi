const express = require('express');
// const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

// eslint-disable-next-line no-unused-vars
const DiscordStrategy = require('./strategies/discord-strategy');
const { sessionStoreMiddleware } = require('./session');
const authRoutes = require('./routes/auth');
const { logger } = require('../modules');

const app = express();

app.engine('html', require('eta').renderFile);
app.set('view engine', 'eta');
app.set('views', path.join(__dirname, './views'));

// app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));
app.use(sessionStoreMiddleware);
app.use(express.static(path.join(__dirname, 'static')));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  logger.info('Req User:', req.user);
  res.render('index');
});

module.exports = app;

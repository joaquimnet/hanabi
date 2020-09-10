const bot = require('../../bot');

const index_get = (req, res) => {
  res.render('dashboard/index');
};

const status_get = (req, res) => {
  res.render('dashboard/status');
};

const users_get = (req, res) => {
  res.render('dashboard/users');
};

const guilds_get = (req, res) => {
  res.render('dashboard/guilds');
};

const messages_get = (req, res) => {
  res.render('dashboard/messages');
};

const commands_get = (req, res) => {
  res.render('dashboard/commands', { commands: bot.commands });
};

const listeners_get = (req, res) => {
  res.render('dashboard/listeners');
};

const tasks_get = (req, res) => {
  res.render('dashboard/tasks');
};

module.exports = {
  index_get,
  status_get,
  users_get,
  guilds_get,
  messages_get,
  commands_get,
  listeners_get,
  tasks_get,
};

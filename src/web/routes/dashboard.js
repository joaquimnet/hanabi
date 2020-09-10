const { Router } = require('express');

const { dashboardController } = require('../controllers');

const dashboardRoutes = Router();

dashboardRoutes.get('/', dashboardController.index_get);

dashboardRoutes.get('/status', dashboardController.status_get);
dashboardRoutes.get('/users', dashboardController.users_get);
dashboardRoutes.get('/guilds', dashboardController.guilds_get);
dashboardRoutes.get('/messages', dashboardController.messages_get);
dashboardRoutes.get('/commands', dashboardController.commands_get);
dashboardRoutes.get('/listeners', dashboardController.listeners_get);
dashboardRoutes.get('/tasks', dashboardController.tasks_get);

module.exports = dashboardRoutes;

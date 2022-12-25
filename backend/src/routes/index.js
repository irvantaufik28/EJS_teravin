const express = require('express');

const rootRouter = express.Router();

const employee = require('./employeeRouter');

rootRouter.use('/', employee);
module.exports = rootRouter;

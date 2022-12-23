const express = require("express");
const rootRouter = express.Router();

const employee = require("./employee_router");


rootRouter.use("/api", employee);
module.exports = rootRouter;
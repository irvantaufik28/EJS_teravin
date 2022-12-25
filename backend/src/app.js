require('dotenv').config();

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const serverError = require('./middlerware/serverError');
const rootRouter = require('./routes/index');

const EmployeeRepository = require('./repository/employeeRepository');
const AddressRepository = require('./repository/addressRepository');
const EmployeeUseCase = require('./usecase/employee_usecase');

const employeeUC = new EmployeeUseCase(
  new EmployeeRepository(),
  new AddressRepository(),
);

const app = express();

app.use((req, res, next) => {
  req.employeeUC = employeeUC;
  next();
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/v1', rootRouter);

app.use(serverError);

const swaggerDocument = require('./docs/docs.json');

app.use(
  '/docs',
  swaggerUi.serveFiles(swaggerDocument),
  swaggerUi.setup(swaggerDocument),
);

module.exports = app;

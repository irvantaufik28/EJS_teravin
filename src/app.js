require("dotenv").config();

const express = require("express");
const cors = require("cors");
const serverError = require("./middlerware/serverError");
const rootRouter = require("./routes/index");


const EmployeeRepository = require("./repository/employee_repo");
const AddressRepository = require("./repository/addressRepository")
const EmployeeUseCase = require("./usecase/employee_usecase");
const AddressUseCase = require("./usecase/address_usecase");


const employeeUC = new EmployeeUseCase(new EmployeeRepository(), new AddressRepository());
const addressUC = new AddressUseCase(new AddressRepository());

const app = express();

app.use((req, res, next) => {
  req.employeeUC = employeeUC;
  req.addressUC = addressUC;
  next();
});


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/api/v1", rootRouter);



app.use(serverError);

module.exports = app;

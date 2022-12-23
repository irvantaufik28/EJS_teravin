require("dotenv").config();

const express = require("express");
const cors = require("cors");
const serverError = require("./middlerware/serverError");
const rootRouter = require("./routes/index");
const EmployeeRepository = require("./repository/employee_repo");
const EmployeeUseCase = require("./usecase/employee_usecase");

const employeeUC = new EmployeeUseCase(new EmployeeRepository());

const app = express();

app.use((req, res, next) => {
  req.employeeUC = employeeUC;
  next();
});


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine','ejs')
app.use('/', (req, res) =>{
  res.render('home')
})

app.use("/", rootRouter);



app.use(serverError);

module.exports = app;

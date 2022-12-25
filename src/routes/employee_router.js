const express = require('express');
const employeeController = require('../controller/employeeController');
const createEmployeeValidator = require('../middlerware/validator/CreateEmployeeValidator');
const updateEmployeeValidator = require('../middlerware/validator/CreateEmployeeValidator');

const router = express.Router();
router.get('/employee', employeeController.getAllEmployee);
router.get('/employee/:id', employeeController.getEmployeeById);
router.post('/employee', createEmployeeValidator.EmployeeValidation, employeeController.createEmployee);
router.put('/employee/:id', updateEmployeeValidator.EmployeeValidation, employeeController.updateEmployee);
router.delete('/employee/:id', employeeController.deleteEmployee);

module.exports = router;

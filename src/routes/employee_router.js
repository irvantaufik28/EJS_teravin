const express = require('express');
const employeeController = require('../controller/employeeController');

const router = express.Router();
router.get('/api/v1/employee',  employeeController.getAllEmployee);
router.get('/api/v1/employee/:id', employeeController.getEmployeeById);
router.post('/api/employee', employeeController.createEmployee);
router.put('/api/v1/employee/:id', employeeController.updateEmployee);
router.delete('/api/v1/employee/:id', employeeController.deleteEmployee);

module.exports = router;
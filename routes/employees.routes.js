const express= require('express');
const router=  express.Router();

const { createEmployee, updateEmployee, deleteEmployeeById, getAll, getEmployeeById, empLogin } = require('../controllers/employees.controller');
const verifyIfLoggedIn = require('../middlewares/VerifyIfLoggedIn');
router.post("/createEmployee", createEmployee)
router.put("/update/:id", updateEmployee)
router.delete('/delete/:id', deleteEmployeeById)
router.get("/all",verifyIfLoggedIn, getAll)
router.get("/employee/:id", getEmployeeById)
router.post("/login", empLogin)
module.exports= router;
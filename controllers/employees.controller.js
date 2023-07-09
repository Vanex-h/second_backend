const express = require("express");
const { Employee, employeeValidator } = require("../models/employee.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createEmployee = async (req, res) => {
  try {
    const { value, error } = employeeValidator.validate(req.body);
    if (error) return res.status(406).json({ message: error.message });

    const  { firstName , lastName , username , email , password } = value

    const passHashed = await bcrypt.hash(password, 10);
    console.log(passHashed);

    const employee = new Employee({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: passHashed,
    });
    await employee.save();
    return res.status(200).json({ message: "Employee added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const getAll = async (req, res) => {
  try {
    const data = await Employee.find({});
    return res.json(data);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};
const getEmployeeById = async (req, res) => {
  try {
    const id = req.body.id;
    const employee = await Employee.findOne(id);
    if (employee) {
      console.log(employee);
      return res.json(employee);
    } else {
      return res.status(404).json({ message: "That employee doesn't exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const id = req.body.id;
    const emp = await Employee.findOne(id);
    if (emp) {
      emp.firstName = req.body.firstName;
      emp.lastName = req.body.lastName;
      emp.username = req.body.username;
      emp.email = req.body.email;

      await emp.save();
      return res.json({ message: "Employee updated successfully", user });
    } else {
      return res.status(404).json({ message: "That employee doesn't exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteEmployeeById = async (req, res) => {
  try {
    const id = req.body.id;
    const employee = await Employee.findOne(id);
    if (employee) {
      await employee.delete();
      res.status(200).json({ message: "Successfully deleted the employee" });
    } else {
      return res.status(404).json({ message: "That employee doesn't exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const empLogin=async(req,res)=>{
    try {
        
        const {username,password}=req.body
        const employee= await Employee.findOne({username:username})
        if(!employee){
            return res.status(404).json({message: "Invalid credentials"})
        }
        const passwordMatch= await bcrypt.compare(password, employee.password)
    if(!passwordMatch){
        return res.status(404).json("Invalid credentials")
    }
    const token= jwt.sign({
        firstName:employee.firstName,
        lastName: employee.lastName,
        username: employee.username,
        email: employee.email,
        id:employee._id
    }, process.env.JWT_SECRET)
    console.log(token);
    return res.status(200).json({message: "Login successfully", token})
} catch (error) {
  console.log(error)
    return res.status(500).json({ message: "Server error" });
}
};


const getEmployeeProfile=async(res,req)=>{
    const id= req.body.id
    const employee= await Employee.findById(id)
    return res.status(200).json({message: "Employee profile found", employee})
}

module.exports = {
  createEmployee,
  getAll,
  getEmployeeById,
  deleteEmployeeById,
  updateEmployee,
  empLogin,
  getEmployeeProfile
};

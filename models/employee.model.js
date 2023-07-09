const mongoose= require('mongoose')
const Joi  = require('joi')


const empSchema= new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    username : {
        type : String ,
        required : true,
        unique : true
    
    },
    email  :  {
        type : String ,
        required :  true,
        unique : true
    },
    password :  {
        type : String ,
        required : true 
    }


}, {timestamps :true})


const employeeValidator = Joi.object({
    username : Joi.string().required().min(3).max(10),
    email : Joi.string().required().email(),
    firstName: Joi.string().required().min(1).max(10),
    lastName: Joi.string().required().min(1).max(10),
    password: Joi.string().required().min(8)
})
const Employee= mongoose.model('employee', empSchema);
module.exports= {
    Employee ,
    employeeValidator
}
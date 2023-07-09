const express= require('express');
const connectingToDb = require('./utils/connectToDb');
const employeesRoutes= require('./routes/employees.routes')
const cors= require('cors')
const app= express();
require('dotenv').config()
const PORT = 1600;

app.use(express.json())
app.use(cors())

app.use('/', employeesRoutes)
connectingToDb();
app.listen(PORT, ()=>{
    console.log("Listening on port: "+ PORT);
})
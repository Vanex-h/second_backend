const mongoose= require('mongoose')
const url= 'mongodb://127.0.0.1:27017/second'

const connectingToDb= async()=>{
    await mongoose.connect(url)
    console.log('Connected to the db successfully');
}

module.exports= connectingToDb;
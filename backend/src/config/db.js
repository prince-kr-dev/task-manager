const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database connected successfully");   
    }catch(err){
        console.log("ERROR" + err);
    }
}

module.exports = {connectDB};
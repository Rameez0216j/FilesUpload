const mongoose=require("mongoose");
require("dotenv").config();

exports.connectDB=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=> console.log("DB connected Successfully"))
    .catch((error)=> {
        console.log("DB connection failed");
        console.log(error);
        process.exit(1);
    });
}
// creating app
const express=require("express");
const app=express();

// Importing port
require("dotenv").config();
const PORT=process.env.PORT || 4000;

// embedding parsers
app.use(express.json());

// importing file Uploader
const fileUpload=require("express-fileupload");
app.use(fileUpload({
    // these flags are necessary for Uploading to cloudinary (find out why?)
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// connect to DB
const DB = require("./config/database");
DB.connectDB();

// connecting cloudinary
const cloudinary= require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// mounting api route
const upload = require("./routes/FileUpload");
app.use("/api/v1/upload",upload);

// adding middleware

// starting server
app.listen(PORT,()=>{
    console.log(`App is running at PORT : ${PORT}`);
})


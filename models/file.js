const mongoose=require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String
    },
    tags:{
        type:String
    },
    email:{
        type:String
    }
});



// POST Middleware
// here post middleware should be written after defining schema and before importing the model from schema [post middleware is defined on schema] - H/W read documentation for reason...
// here fileSchema.post(method_name_on_which_we_are_applying(here save function),async function(doc)
fileSchema.post("save",async function(doc){
    try{
        // doc is referring the same document entered in database
        console.log("Doc",doc);
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        });

        // sending mail
        let info=await transporter.sendMail({
            from:"Rameez-Academy | Learn with fun",
            to: doc.email,
            subject:"New file is Uploaded on Cloudinary",
            html:`<h2>Hello Sir/Madam,</h2><p>File Uploaded successfully! View here: <a href="${doc.imageUrl}">${doc.imageUrl}</a></p>`
        })
        console.log("INFO : ",info);

    }catch(error){
        console.log(error);
    }
})


const file =mongoose.model("File",fileSchema);
module.exports=file;
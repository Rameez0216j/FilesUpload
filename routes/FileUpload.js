const express= require("express");
const router=express.Router();

// importing handlers
// const {imageUpload, videoUpload, imageReducerUpload,localFileUpload}=require("../controllers/fileUpload")
const {localFileUpload , imageUpload, videoUpload, imageSizeReducer}=require("../controllers/fileUpload")

// path defining
router.post("/localFileUpload",localFileUpload); 
router.post("/imageUpload",imageUpload); 
router.post("/videoUpload",videoUpload); 
router.post("/imageSizeReducer",imageSizeReducer); 

// exporting Route
module.exports=router;
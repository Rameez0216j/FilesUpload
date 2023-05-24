const File=require("../models/file");
const cloudinary=require("cloudinary").v2;

// localFileUpload handler
exports.localFileUpload = async (req,res)=>{
    try{
        // fetch file from request
        const file=req.files.Rameez;
        console.log("File obtained ---> ",file);
    
        // create path where file needs to be stored on server
        let path= __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH --> ",path);
    
        // add path to move function for storing the file
        file.mv(path, (err)=>{
            console.log(err)
        });
    
        // send a success response
        res.status(200).json({
            success:true,
            message:"File uploaded Successfully"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"File uploaded Failed"
        })
    }
}




// validator function
function isFileTypeSupported(type,supportedTypes){
    return supportedTypes.includes(type);
}
// file uploader function to cloudinary
async function uploadFileToCloudinary(file,folder,quality){
    const options={folder};
    // fix the tempFilePath error by using the flags in 
    console.log("tempFilePath : ",file.tempFilePath);

    if(quality){
        options.quality = quality;
    }
    
    
    options.resource_type="auto"; // for Video uploading [find out why ?] ---> for automatic detection of fileType
    // uploading to cloudinary
    // HW: after uploading to cloudinary name is changing for files find out Why?
    return await cloudinary.uploader.upload(file.tempFilePath,options);

}
// image Uploader handler to cloudinary
exports.imageUpload= async (req,res)=>{
    try{
        // fetch data
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file=req.files.imageFile;
        console.log(file);

        // validation
        const supportedTypes=["jpg","jpeg","png"];
        const fileType=file.name.split(".")[1].toLowerCase();
        console.log("File Type : ",fileType);
        
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                status:false,
                message:"file type is not supported"
            })
        }

        // if file is supported then upload it to cloudinary
        console.log("Uploading to Cloud...");
        //user defined function --->  uploadToCloudinary(file,folder_name_on_cloudinary,quality)
        const response=await uploadFileToCloudinary(file,"Rameez");
        console.log(response);
        // Making entry into DB
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        });
        // sending success response
        res.status(200).json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image Uploaded Successfully !!!"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Image Uploading Failed !!!"
        })
    }
}



// videoUpload Handler
exports.videoUpload= async (req,res)=>{
    try{
        // fetch data
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file=req.files.videoFile;
        // console.log(file);

        // validation
        const supportedTypes=["mp4","mov"];
        const fileType=file.name.split(".")[1].toLowerCase();
        console.log("File Type : ",fileType);
        
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                status:false,
                message:"file type is not supported"
            })
        }

        // if file is supported then upload it to cloudinary
        console.log("Uploading to Cloud...");
        //user defined function --->  uploadToCloudinary(file,folder_name_on_cloudinary,quality) [HW: put size validation on your own]
        const response=await uploadFileToCloudinary(file,"Rameez");
        console.log(response);
        // Making entry into DB
        const fileData=await File.create({
            name,
            tags,
            email,
            videoUrl:response.secure_url
        });
        // sending success response
        res.status(200).json({
            success:true,
            videoUrl:response.secure_url,
            message:"Video Uploaded Successfully !!!"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Video Uploading Failed !!!"
        })
    }
}




// reducedImageUpload Handler
exports.imageSizeReducer= async (req,res)=>{
    try{
        // fetch data
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        const file=req.files.imageFile;
        // console.log(file);

        // validation
        const supportedTypes=["jpg", "jpeg", "png"];
        const fileType=file.name.split(".")[1].toLowerCase();
        console.log("File Type : ",fileType);
        
        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                status:false,
                message:"file type is not supported"
            })
        }

        // if file is supported then upload it to cloudinary
        console.log("Uploading to Cloud...");
        //user defined function --->  uploadToCloudinary(file,folder_name_on_cloudinary,quality [in % here 90% as given below as 90])
        // read this --->  https://cloudinary.com/documentation/image_optimization
        // HW: instead of quality use height attribute and other attributes for compression
        const response=await uploadFileToCloudinary(file,"Rameez",90);
        console.log(response);
        // Making entry into DB
        const fileData=await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        });
        // sending success response
        res.status(200).json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image Uploaded Successfully !!!"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message:"Image Uploading Failed !!!"
        })
    }
}
require("dotenv").config()
const client = require("../config/db");
const {ObjectId} = require("mongodb");


const createBanner = async (req,res)=>{

    try{

        const {bannerTitle, bannerDescription} = req.body;
        const  imageFile = req.file? req.file.filename : null
       
        const newBanner = {
            bannerTitle,
            bannerDescription,
            bannerImage: imageFile,
            isActive : true
        }
        const db = client.db(process.env.DB_NAME);

        const result = await db.collection('Banner').insertOne(newBanner);
        if(!result){
            return res.status(400).json({message:"Banner not created"})
        }
        else{
            return res.status(200).json({message:"Banner created successfully"})
        }



    }catch(err){
        console.log(err)
    }
}

 const getBanner = async(req,res)=>{

        try{

            const isActive = (req.params.isActive === "true")? true : false;
            console.log(isActive)
            const db = await client.db(process.env.DB_NAME);

            const banners = await db.collection("Banner").find({isActive:isActive}).toArray();

            if(!banners){
                return res.status(400).json({message:"No Banner found"})
            }
            else{
                return res.status(200).json({banners})
            }

        }
        catch(err){
            console.log(err)
        }
 }

 const deleteBanner = async(req,res)=>{
  
    try{
    
         const id = req.params.id;
         const db = await client.db(process.env.DB_NAME);
         const result = await db.collection("Banner").deleteOne({_id: new ObjectId(id)});

         if(!result){
                return res.status(400).json({message:"Banner not deleted"})
            }
            else{
                return res.status(200).json({message:"Banner deleted successfully"})
            }
 
    }
    catch(err){
        console.log(err)
    }


 }
 const isActiveBanner = async(req,res)=>{

    try{
            const id = req.params.id;
            // console.log(id)
            const db = await client.db(process.env.DB_NAME);
            const banner = await db.collection("Banner").findOne({_id: new ObjectId(id)});
            // console.log(banner)

            if(banner.isActive === true){
                const result =  await db.collection("Banner").updateOne({_id: new ObjectId(id)},{$set:{isActive:false}})
                if(result){
                    return res.status(200).json({message:"Banner is inactive"})
                }
            }
            else{
                const result =  await db.collection("Banner").updateOne({_id: new ObjectId(id)},{$set:{isActive:true}})
                if(result){
                    return res.status(200).json({message:"Banner is active"})
                }
            }
           

    }
    catch(err){
        console.log(err)
    }
 }

 const editBanner = async(req,res)=>{

    try{

        const id = req.params.id;
        const {bannerTitle, bannerDescription} = req.body;
        const  imageFile = req.file? req.file.filename : null
        const db = await client.db(process.env.DB_NAME);
        const banner = await db.collection("Banner").findOne({_id: new ObjectId(id)});
        const newBanner = {
            bannerTitle,
            bannerDescription,
            bannerImage: imageFile,
            isActive : banner.isActive
        }
        const result = await db.collection("Banner").updateOne({_id: new ObjectId(id)},{$set:newBanner});
        if(result.modifiedCount === 1){
            return res.status(200).json({message:"Banner updated successfully"})
        }
        else{
            return res.status(400).json({message:"Failed to update banner"})
        }

    }
    catch(err){
        console.log(err)
    }
 }

 const getAllBanner = async(req,res)=>{

    try{
        const db = await client.db(process.env.DB_NAME);
        const result = await db.collection("Banner").find().toArray();
       
        if(!result){
            return res.status(400).json({message: "No Banner found"})
        }else{
            return res.status(200).json({message: "Banner found successfully", result})
        }
        
          
    }
     catch(err){
        console.log(err)
   }
 }

module.exports = {createBanner,getBanner ,deleteBanner,isActiveBanner,editBanner,getAllBanner}

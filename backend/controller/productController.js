require("dotenv").config()
const client = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const regiterProduct  = async (req,res)=>{

    try{



        const {id,productName , price , description ,rate ,rating , category,stock} = req.body;

        const productImages = ['image1','image2','image3','image4','image5'];

        const images = {}
            productImages.forEach(key=>{
                if(req.files[key]){
                    imagePath = req.files[key].path
                }
            });

         const newProducts = {
            id,
            productName,
            price:parseFloat(price),
            description,
            images,
            rate:parseInt(rate),
            rating:parseFloat(rating),
            category,
            stock,

         }   
                const db = await client.db(process.env.DB_NAME);
                const isMatched = await db.collection("products").findOne({id});
         if(isMatched){
            return res.status(400).json({message:"Product already exist"})
         }else{
            const result = await db.collection("products").insertOne(newProducts);
            if(!result){
                return res.status(400).json({message:"product not created"})
            }
            else{
                return res.status(200).json({message:"product created successfully"})
            }
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {regiterProduct}
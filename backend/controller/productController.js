    require("dotenv").config()
    const client = require("../config/db");
    const jwt = require("jsonwebtoken");
    const bcrypt = require("bcrypt");


    const regiterProduct  = async (req,res)=>{

        try{



            const {id,productName , price , description ,rate ,rating , category,stock} = req.body;

            const productImages = ['image1','image2','image3','image4','image5'];

            const images = []
                productImages.forEach(key=>{
                    if (req.files && req.files[key]) {
                        let imgPaths = req.files[key][0].path.replace(/\\/g, "/");
                        images.push(`http://127.0.0.1:3030/${imgPaths}`); // ✅ Correct way to store images in an array
                    }
                });

               // console.log("image paths" + images);
            const newProducts = {
                id,
                productName,
                price:parseFloat(price),
                description,
                images,
                rate:parseInt(rate),
                rating:parseFloat(rating),
                category,
                stock : true,

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

    const getProducts = async (req,res)=>{
        
        try{

            const db = await client.db(process.env.DB_NAME);
            const products = await db.collection("products").find({}).toArray();
            if(!products){
                return res.status(400).json({message:"No products found"})
            }
            else{
                return res.status(200).json({products})
            }


        }
        catch(err){
            console.log(err);
        }

    }

const editProduct = async (req,res)=>{

    try{
        const id = req.params.id;
        const {productName , price , description ,rate ,rating , category,stock} = req.body;
        const db = await client.db(process.env.DB_NAME);
        const isMatched = await db.collection("products").findOne({id});

        if(!isMatched){
            return res.status(400).json({message:"Product not found"})
        }
        else{
            const productImages = ['image1','image2','image3','image4','image5'];

            const images = []
                productImages.forEach(key=>{
                    if (req.files && req.files[key]) {
                        let imgPaths = req.files[key][0].path.replace(/\\/g, "/");
                        images.push(`http://127.0.0.1:3030/${imgPaths}`); // ✅ Correct way to store images in an array
                    }
                });
            const newProduct = {
               
                productName,
                price:parseFloat(price),
                description,
                images,
                rate:parseInt(rate),
                rating:parseFloat(rating),
                category,
                stock,

            }
            const result = await db.collection("products").updateOne({id},{$set:newProduct});
            if(result.modifiedCount === 1){
                return res.status(200).json({message:"Product updated successfully"})
            }
            else{
                return res.status(400).json({message:"Failed to update product"})
            }
        }

    }
    catch(err){
 
        console.log(err)
    }

}

const deletProduct = async (req,res)=>{

    try{

        const id = req.params.id;
    
        const db = client.db(process.env.DB_NAME);
        const product = await db.collection("products").deleteOne({id})
        if(product.deletedCount === 1){
            return res.status(200).json({message:"Product deleted successfully"})
        }
        else{
            return res.status(400).json({message:"Failed to delete product"})
        }
       


    }
    catch(err){
        console.log(err)
    }
}

const getbyCat = async (req,res)=>{

    try{

        const id = req.params.id;
        const db = client.db(process.env.DB_NAME);
        const product = await db.collection("products").find({category:id}).toArray()
        if(product.length > 0){
            return res.status(200).json(product)
        }
        else{
            return res.status(400).json({message:"No product found in this category"})
        }
    }
    catch(err){
        console.log(err)
    }
}


    module.exports = {regiterProduct,getProducts,editProduct,deletProduct ,getbyCat}
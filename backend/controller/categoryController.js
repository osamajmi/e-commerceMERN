require("dotenv").config()
const client = require("../config/db");



const createCat = async (req,res)=>{

    try{

        const { Id , categoryName } = req.body;

        const category = {
            Id,
            categoryName
         }
 
         const db = client.db(process.env.DB_NAME)

        const isValid = await db.collection("categories").findOne({Id})

        if(isValid){
             return res.status(400).json({message: "Category already exists"})
        }
        else{

         
            const result = await db.collection("categories").insertOne(category);
    
            if(!result){
                return res.status(400).json({message: "Category not created"})
            }
            else{
                return res.status(201).json({message: "Category created successfully", result})
            }

        }

      
      


    }
    catch(err){
        console.log(err)
    }
}


const getAllCat = async (req,res)=>{

    try{
        const db = client.db(process.env.DB_NAME)
        const result = await db.collection("categories").find().toArray()

        if(!result){
            return res.status(400).json({message: "No categories found"})
        }else{
            return res.status(200).json({message: "Categories found successfully", result})
        }
    
    }
    catch(err){
        console.log(err)
    }
}

const getCatById = async (req,res)=>{

    try{
        const db = client.db(process.env.DB_NAME)
        const id = req.params.id
        const result = await db.collection("categories").findOne({Id: id})
        if(!result){
            return res.status(400).json({message: "Category not found"})
            }
        else{
                return res.status(200).json({message: "Category found successfully", result})
                }
    }
    catch(err){
        console.log(err)
    }
}

const editCat = async (req,res)=>{

    try{

        const { Id , categoryName } = req.body;
        const id = req.params.id;

        const category = {
            Id,
            categoryName
         }
 
         const db = client.db(process.env.DB_NAME)

         const isValid = await db.collection("categories").findOne({Id: id})

         if(isValid){
            const result = await db.collection("categories").updateOne({Id: id},{$set: category})

            if(result){
               return res.status(200).json({message: "Category updated successfully", result})
   
            }
            else{
               return res.status(400).json({message: "Category not updated"})
            }
         }
         else{
            return res.status(400).json({message: "Category not found"})
         }

       
         


    }
    catch(err){
        console.log(err)
    }
}


const deletCat = async (req,res)=>{

    try{

        const id = req.params.id;
        const db = client.db(process.env.DB_NAME)

        const isValid = await db.collection("categories").findOne({Id: id})
        if(isValid){
            const result = await db.collection("categories").deleteOne({Id: id})

            if(result){
                return res.status(200).json({message: "Category deleted successfully", result})
            }
            else{
                return res.status(400).json({message: "Category not deleted"})
            }
    
        }
        else{
            return res.status(404).json({message: "Category not found"})
        }

        
    }
    catch(err){
        console.log(err)
    }


}


module.exports = {createCat ,getCatById ,getAllCat, editCat, deletCat}
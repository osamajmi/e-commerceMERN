
require("dotenv").config()
const client = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const RegisterUser = async (req,res)=>{

    try{

        const {userId,name,email,password,phone} = req.body;
        const hassedPassword = await bcrypt.hash(password,10);
      
        const users = {
            userId,
            name,
            email,
            password: hassedPassword,
            phone,
            role :"buyer"
        }

        const db = await client.db(process.env.DB_NAME)

        const user = await db.collection("users").findOne({userId});

        if(!user){
            let result = await db.collection("users").insertOne(users)
             res.status(200).json({result,massage:"user register sucessFully"})
        }
       else{
            res.status(400).json({massage:"user already exist"})
       }


    }
    catch(err){
         console.log(err)
    }
}

const getUser = async (req,res)=>{

    try{
        const db = await client.db(process.env.DB_NAME)
        const user = await db.collection("users").find({}).toArray()
        res.status(200).json(user)

    }catch(err){

        console.log(err)
        res.status(400).json({massage:'user not availlabe'})

    }
}

const EditUser = async (req,res)=>{
    try{



        const userid = req.params.id
        const {userId,name,email,password,phone} = req.body;
        const hassedPassword = await bcrypt.hash(password,10);
      
        const users = {
            userId,
            name,
            email,
            password: hassedPassword,
            phone,
            role :"buyer"
        }

        const db = await client.db(process.env.DB_NAME)
        const user = await db.collection("users").findOne({userId:userid})
        if(!user){
            res.status(400).json({massage:'user not found'})

        }else{
            const user = await db.collection("users").updateOne({userId:userid},{$set:users})
        }
    }

    catch(err){
        console.log(err)
        res.status(400).json({massage:"user not found"})
    }
}


const deleteUser = async (req,res)=>{

    try{

        const id  = req.params.id;
        const db = await client.db(process.env.DB_NAME);
        const user = await db.collection("users").deleteOne({userId:id})

        if(!user){
            res.status(400).json({massage:'user not found'})
        }
        else{
            res.status(200).json({massage:'user deleted successfully'})
        }


    }catch(err){
  
        console.log(err)

    }
}

module.exports = {RegisterUser,getUser,EditUser,deleteUser}

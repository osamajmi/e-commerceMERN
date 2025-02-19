require("dotenv").config()
const client = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const Login = async (req,res)=>{
   
    try{
        const {userId,password} = req.body;
        const db = await client.db(process.env.DB_NAME);
        const user = await db.collection("users").findOne({userId});
        const admin = await db.collection("Admin").findOne({userId})

        if(user || admin){
            const founderUser = user || admin;
            const isMatch = await bcrypt.compare(password,founderUser.password)
            if(isMatch){
                const token = jwt.sign({userId:founderUser.userId, role:founderUser.role,},process.env.JWT_SECRET,{expiresIn: "24h"});
                res.json({massage:"Login Sucessfull",token, userId:founderUser.userId, role:founderUser.role})
            }
            else{
                    res.json({massage: "Invalid password"})
            }

        }
        else{
            res.json({massage:"invalid userId "})
        }

    }
   catch{

   }

};

module.exports = {Login}
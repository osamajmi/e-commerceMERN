
require("dotenv").config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const client = require('../config/db');


const superAdminCreate = async (req, res) => {

    try{

        const password = "admin@123";
        const db =  client.db(process.env.DB_NAME);

        const admin = await db.collection("Admin").findOne({"role":"Admin"})

        if(!admin){
            const hassedPassword = await bcrypt.hash(password, 10);

            await db.collection("Admin").insertOne({
                userId: "Admin",
                password:hassedPassword,
                role:"Admin"
            })
            console.log("Admin Created sucessfully !!!!")
          //  res.status(200).json({message: "Admin Created sucessfully !!!!"})

        }
        else{

            console.log("Admin already exits ")
           // res.status(400).json({message: "Admin already exits "})
        }

    }
    catch(err){
        console.log(err)
    }
}

module.exports = superAdminCreate;
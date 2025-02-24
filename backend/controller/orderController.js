require("dotenv").config()
const client = require("../config/db");

const orderCreated = async (req,res)=>{
    try{
        const {quantity,price,productId,productName,userId,} = req.body;
        const db = await client.db(process.env.DB_NAME);

        const order ={
            orderID : `ord-${Math.floor(100000 + Math.random() * 900000)}${new Date().getFullYear()}`,
            quantity,
            price,
            productId,
            productName,
            userId,
            orderCreated: new Date().toLocaleString(),
            status:"Pending",
        }
       
        const result = await db.collection("orders").insertOne(order);

        if(!result){
            return res.status(400).json({message:"Order not created"})
        }
        
        res.status(201).json({message: "Order created successfully", order});

    } catch(err) {
        console.log(err);
        res.status(500).json({message: "Internal server error"});
    }
}

const getAllorders = async (req,res)=>{
    try{
        const db = await client.db(process.env.DB_NAME);
        const result = await db.collection("orders").find().toArray();
        res.status(200).json(result);
        
            }
            catch(err){
                console.log(err);
            }


    }


const getOrderByID = async (req,res)=>{
    try{
        const db = await client.db(process.env.DB_NAME);
        const id = req.params.id;
        const result = await db.collection("orders").findOne({orderID:id});
        res.status(200).json(result);

}
catch(err){
    console.log(err);
}
}

const acceptOrder = async (req,res)=>{
    try{
        const db = await client.db(process.env.DB_NAME);
        const status = req.body
        const id = req.params.id;
        const result = await db.collection("orders").updateOne({orderID:id},{$set:status});
        res.status(200).json({message:"Order accepted successfully"});
        }
        catch(err){
            console.log(err);
        }
}

const orderbyUserId = async (req,res)=>{
    try{
        const db = await client.db(process.env.DB_NAME);
        const id = req.params.id;
        const result = await db.collection("orders").find({userId:id}).toArray();
        res.status(200).json(result);

}
catch(err){
    console.log(err);
}}

const rejectOrder = async (req,res)=>{
    try{
        const db = await client.db(process.env.DB_NAME);
        const id = req.params.id;
        const result = await db.collection("orders").updateOne({orderID:id},{$set:{status:"Rejected"}});
        res.status(200).json({message:"Order rejected successfully"});
        }
        catch(err){
            console.log(err);
        }

}

module.exports = {orderCreated,getAllorders,getOrderByID,acceptOrder
,orderbyUserId,rejectOrder};
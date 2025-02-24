require("dotenv").config()
const client = require("../config/db");



const cartCreate =  async (req, res) => {

    try {
         
        const {userId , productId, quantity} = req.body;
        const db = await client.db(process.env.DB_NAME);
        

        const isMatch = await db.collection("cart").findOne({userId,productId}) ;

        if(isMatch){
            await db.collection("cart").updateOne({userId,productId},{$inc:{quantity:parseInt(quantity)}});
            res.json({message:"Product  Update in cart",status:200})
        }
        else{
             const cart = {
                userId,
                productId,
                quantity : parseInt(quantity)
             }
            const result = await db.collection("cart").insertOne(cart);
            if(!result){
                return res.status(400).json({message:"Cart not created"})
            }else{
                return res.status(201).json({message:"Cart created successfully"})
            }

        }
    
        

        

     


    }
    catch (err) {
        console.log(err)
    }

}

const getCart = async (req,res)=>{
    try{
        const db = await client.db(process.env.DB_NAME);
        const result = await db.collection("cart").find().toArray();
        if(!result){
            return res.status(400).json({message:"No cart found"})
        }
        else{
            return res.status(200).json({result})
        }
    }
    catch(err){
        console.log(err)
    }
}

const deletCart = async (req,res)=>{
    try{
        const id = req.params.id;
        const db = await client.db(process.env.DB_NAME);
        const result = await db.collection("cart").deleteOne({productId:id});
        if(!result){
            return res.status(400).json({message:"Cart not deleted"})
        }
        else{
            return res.status(200).json({message:"Cart deleted successfully"})
        }
    }
    catch(err){
        console.log(err)
    }
}

const getbyUser = async (req,res)=>{
    try{
        const id = req.params.id;
        const db = await client.db(process.env.DB_NAME);
        const result = await db.collection("cart").find({userId:id}).toArray();
        if(!result){
            return res.status(400).json({message:"No cart found"})
            }
        else{
            return res.status(200).json({result})
        }

}catch(err){
    console.log(err)
}
}

module.exports = {cartCreate,getCart,deletCart,getbyUser};
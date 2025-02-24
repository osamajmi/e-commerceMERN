const express = require('express');
const  Users = require('../controller/userController');
const categories = require("../controller/categoryController")
const { Login } = require('../controller/loginController');
const Cart = require('../controller/cartController');
const Order = require('../controller/orderController');
const uploads = require('../middleware/productImage');
const uploadsBanner = require('../middleware/uploadBanner');
const Product = require('../controller/productController');
const Banner = require('../controller/bannerController');
const Router = express.Router();


      // user routes  
            Router.post("/Register", Users.RegisterUser);
            Router.get("/Users", Users.getUser);
            Router.put("/editUser",Users.EditUser);
            Router.delete("/deleteUser/:id",Users.deleteUser);


      //user admin Login
            Router.post("/Login",Login)


     // category routes
            Router.post("/createCategory",categories.createCat)
            Router.get("/Category",categories.getAllCat);
            Router.get("/Category/:id",categories.getCatById)
            Router.put("/editCategory/:id",categories.editCat);
            Router.delete("/deleteCategory/:id",categories.deletCat);

    // products routes
            Router.post("/regProduct", uploads.fields([ 
                  { name: "image1", maxCount: 1 },
                  { name: "image2", maxCount: 1 },
                  { name: "image3", maxCount: 1 },
                  { name: "image4", maxCount: 1 },
                  { name: "image5", maxCount: 1 },]) , Product.regiterProduct)

            Router.get("/Products",Product.getProducts);
            Router.put("/editProducts/:id",uploads.fields([ 
                  { name: "image1", maxCount: 1 },
                  { name: "image2", maxCount: 1 },
                  { name: "image3", maxCount: 1 },
                  { name: "image4", maxCount: 1 },
                  { name: "image5", maxCount: 1 },]),Product.editProduct);
            Router.delete("/DeleteProduct/:id",Product.deletProduct);
            Router.get("/getByCat/:id",Product.getbyCat);
    // Cart api 

            Router.post("/addCart",Cart.cartCreate);
            Router.get("/getCart",Cart.getCart);
            Router.delete("/deleteCart/:id",Cart.deletCart);
            Router.get("/getbyUser/:id",Cart.getbyUser);
    
     // order api
           Router.post("/createOrder",Order.orderCreated);
           Router.get("/getAllOrders",Order.getAllorders);
           Router.get("/getOrder/:id",Order.getOrderByID);
           Router.put("/acceptOrder/:id",Order.acceptOrder);
           Router.put("/rejectOrder/:id",Order.rejectOrder);

    // banner Routes
           Router.post("/Banner",uploadsBanner.single("bannerImage"),Banner.createBanner);
           Router.get('/getAllBanner',Banner.getAllBanner);
           Router.get('/getBanner/:isActive',Banner.getBanner);
           Router.put("/isActiveBanner/:id",Banner.isActiveBanner);
           Router.delete("/deleteBanner/:id",Banner.deleteBanner); 
           Router.put("/editBanner/:id",uploadsBanner.single("bannerImage"),Banner.editBanner);



module.exports = Router;
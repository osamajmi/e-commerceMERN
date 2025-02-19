const express = require('express');
const  Users = require('../controller/userController');
const categories = require("../controller/categoryController")
const { Login } = require('../controller/loginController');
const uploads = require('../middleware/productImage');
const Product = require('../controller/productController');
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
            Router.post("/regProduct", uploads.fields([ { name: "image1", maxCount: 1 },
                  { name: "image2", maxCount: 1 },
                  { name: "image3", maxCount: 1 },
                  { name: "image4", maxCount: 1 },
                  { name: "image5", maxCount: 1 },]) , Product.regiterProduct)








module.exports = Router;
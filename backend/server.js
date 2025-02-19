require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Client = require("./config/db");
const port = process.env.PORT || 3000;
const app = express();

// All imports supper Admin  Form controller 
const AdminCreate = require('./controller/superAdminControler');
const Router = require("./router/routes");



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// connection to db 
Client.connect()
.then(() => {
    console.log("Connected to MongoDB");
    // Super Admin created 
    AdminCreate();
})
.catch((err) => {
    console.log("Error connecting to MongoDB:", err);
})


app.use("/", Router)




app.listen(port , () => {
    console.log(`Server is running on port http://127.0.0.1:${port}`);
})
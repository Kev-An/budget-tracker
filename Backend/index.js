const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;
const mongodbURI = process.env.mongodbURI;
const app = express();
const router = require("./routes.js");

//middleware
app.use(cors());
app.use("/api",router);

//mongoose connection
mongoose.connect(mongodbURI)
.then(() => {
    console.log("connected to database");
    
    app.listen(PORT,(req, res) => {
        console.log("listening on Port",PORT);
    });
}
   

).catch((error)=>{
    console.log(error);
})

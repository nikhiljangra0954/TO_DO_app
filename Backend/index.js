// here we will make server for our app
const express = require('express');
require("dotenv").config();
const { connection } = require('./Config/Db');
const cors = require("cors");
const { todoRouter } = require('./Routes/todoRoutes');
const app = express();
app.use(cors()); //  Cross-Origin Resource Sharing to connect with the frontend
app.use(express.json()); 




// testing Route
app.get("/" ,(req,res)=>{
    try {
        res.status(200).send("Welcome to the TODO app Backend")
    } catch (error) {
        console.log(error);
    }
})

app.use("/" , todoRouter)

app.listen(process.env.port , async () => {
    try {
        await connection; // connect to database
        console.log("listening on " + process.env.port, "Coonected to MongoDB");
      } catch (error) {
        console.log(error.message);
      }
})
require('dotenv').config()
//Package User Inside this fil
const express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var mongoose = require("mongoose");
var cors = require('cors');

const userRoutes = require('./routes/user');


const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_ADDRESS).then(res => console.log("Database Connected")).
  catch(err => console.log(err));
//MidleWare Stuff
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//Imports Routes From all Files
app.use("/api",userRoutes);


//Start Web APP
app.listen(port, () => {
  console.log(`APP is Running At http://localhost:${port}`);
})
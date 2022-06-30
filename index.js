require('dotenv').config()
//Package User Inside this fil
const express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var mongoose = require("mongoose");
var cors = require('cors');

const userRoutes = require('./routes/user');


const app = express();
const port = 3001


mongoose.connect(process.env.MONGO_ADDRESS).then(res => console.log("Database Connected")).
  catch(err => console.log("Unable to Connect with Database"));
//MidleWare Stuff
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//Imports Rountes From all Files
app.use("/api",userRoutes);
app.listen(process.env.PORT, () => {
  console.log(`APP is Running At http://localhost:${process.env.PORT}`);
})
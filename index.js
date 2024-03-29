require('dotenv').config()
//Package User Inside this fil
const express = require('express')
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var mongoose = require("mongoose");
var cors = require('cors');

const userRoutes = require('./routes/user');
const packaeRoutes = require('./routes/package');
const empolyeRoutes = require('./routes/employe');
const paymentRoutes = require('./routes/payment');
const { home } = require('./controllers');
const app = express();
const port = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_ADDRESS).then(res => console.log("Database Connected")).
  catch(err => console.log(err));
//MidleWare Stuff
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({origin: ['http://localhost:3000', 'http://127.0.0.1:3000','https://relaxed-alfajores-1445cf.netlify.app','https://api.razorpay.com','https://astounding-tulumba-302b52.netlify.app'],credentials: true}));


//Imports Routes From all Files
app.get("/api",home);
app.use("/api",userRoutes);
app.use("/api",packaeRoutes);
app.use("/api",empolyeRoutes);
app.use("/api",paymentRoutes);

//Start Web APP
app.listen(port, () => {
  console.log(`APP is Running At http://localhost:${port}`);
})

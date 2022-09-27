const express = require("express");
const { isLogin } = require("../controllers/auth");
const { createOrder } = require("../controllers/payment");
const router = express.Router();
router.post("/order/create",isLogin,createOrder);
module.exports=router;
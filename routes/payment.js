const express = require("express");
const { isLogin } = require("../controllers/auth");
const { createOrder, verifyOrder } = require("../controllers/payment");
const router = express.Router();
router.post("/order/create",isLogin,createOrder);
router.post("/payment/verfiy",verifyOrder);
module.exports=router;
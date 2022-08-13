const express = require("express");
const { isLogin, isEmploye } = require("../controllers/auth");
const router = express.Router();
const {addPackage, delPackage} = require("../controllers/employe");
router.post("/package/add",isLogin,isEmploye,addPackage);
router.delete("/package/del",isLogin,isEmploye,delPackage);
module.exports=router;
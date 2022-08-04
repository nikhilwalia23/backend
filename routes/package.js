var express=require("express");
var router = express.Router();
const {buyPackage, showPackages}=require("../controllers/package")
const {isLogin} = require("../controllers/auth");
router.post("/package/buypackage",isLogin,buyPackage);
router.get("/package/showpackage",isLogin,showPackages);
module.exports=router;
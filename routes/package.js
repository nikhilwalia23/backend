var express=require("express");
var router = express.Router();
const {buyPackage, showPackages, showAllPackages}=require("../controllers/package")
const {isLogin} = require("../controllers/auth");
router.post("/package/buypackage",isLogin,buyPackage);
router.get("/package/showpackage",isLogin,showPackages);
router.get("/package/showallpackage",showAllPackages);
module.exports=router;
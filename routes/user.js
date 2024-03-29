var express=require("express");
const { login,singUp,isLogin, welcome, forgetPassword, ressetPassword } = require("../controllers/auth");
const {getUser, updateUser} = require("../controllers/user");
const {showPackages, buyPackage} =require("../controllers/package")
var router=express.Router();
router.post("/signup",singUp);
router.post("/login",login);
router.get("/welcome",isLogin,welcome);
router.get("/user/:UserId",getUser);
router.put("/user/:UserId",isLogin,updateUser);
router.post("/package/showpackage",isLogin,showPackages);
router.post("/package/buypackage",isLogin,buyPackage);
router.post("/user/forgetpassword",forgetPassword);
router.post("/user/resetpassword",ressetPassword);
module.exports=router;

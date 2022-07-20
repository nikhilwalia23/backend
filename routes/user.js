var express=require("express");
const { login,singUp,isLogin, welcome } = require("../controllers/auth");
const {buyPackage, getUser} = require("../controllers/user");
var router=express.Router();
router.post("/signup",singUp);
router.post("/login",login);
router.get("/welcome",welcome);
router.post("/buypackage",isLogin,buyPackage);
router.get("/user/:UserId",getUser);
module.exports=router;

var express=require("express");
const { login,singUp,isLogin, welcome } = require("../controllers/auth");
const {buyPackage} = require("../controllers/user");
var router=express.Router();
router.post("/signup",(req,res,next) => {console.log(`midle ware working ${req.body.email}`); next();},singUp);
router.post("/login",login);
router.get("/welcome",isLogin,welcome);
router.post("/buypackage",isLogin,buyPackage);
module.exports=router;
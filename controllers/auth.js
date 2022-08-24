const {User}=require("../models/users");
const jwt=require("jsonwebtoken")
var singUp = (req,res) =>
{
    //Check Before Creating User
    const user = new User(req.body);
    user.save((err,user)=>
    {
        if(err)
        {
            return res.status(400).json({"error":"Action Failed"}).status(400);
        }
        else
        {
            return res.status(400).json({"message":"User Account Created"}).status(200);
        }
    });
}
var login =(req,res) => 
{
    const email=req.body.email;
    const ps=req.body.password;
    User.findOne({email},(err,user) =>
    {
        if(err)
        {
            return res.json(err).status(400);
        }
        else if(!user)
        {
            return res.status(404).json({"error":"User Does not Account"});
        }
        else
        {
            const {name,number,role}=user;
            const id=user._id;
            if(user.authenticate(ps))
            {
                jwt.sign({id},process.env.HASHING_KEY,(err,token) =>
                {
                    if(err)
                    {
                        return res.status(404).json({"error":"Unable To login"});
                    }
                    else
                    {
                        res.cookie("token",token,{path:"http://localhost:3001/api/", httpOnly:true})
                        return res.status(200).json({id,name,role});
                    }
                });
            }
            else
            {
                return res.status(404).json({"error":"UserId and Password Does not Matach"});
            }
        }
    })
}
var isLogin = (req,res,next) =>
{
    if(req.cookies['token']==undefined)
    {
        return res.status(400).json({"error":"Token must be provided"});
    }
    const token=req.cookies['token'];
    jwt.verify(token,process.env.HASHING_KEY,(err,curr) => 
    {
        if(err)
        {
            return res.send(err);
        }
        else
        {
            if(curr.id==req.body.id)
            {
                next();
            }
            else
            {
                res.status(401).json({"error":"Acess Denied"});
            }
        }
    });
}
var isEmploye = (req,res,next) => 
{
    const id = req.body.id;
    User.findById(id,(err,user) => 
    {
        if(err)
        {
            return res.status(400).json(err);
        }
        else
        {
            if(user.role==1)
            {
                next();
            }
            else
            {
                return res.status(403).json({"error":"You are not eligible for this operation"});
            }
        }
    });
}
var welcome = (req,res) =>
{
    
    res.send("you are logged in");
}
module.exports = {singUp,login,isLogin,welcome,isEmploye};
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
            return res.json({"error":"Action Failed"}).status(400);
        }
        else
        {
            return res.json({"message":"User Account Created"}).status(200);
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
                jwt.sign({id},'0xa5b2d60f32436310afebcfda832817a68921beb782fabf7915cc0460b443116aet',(err,token) =>
                {
                    if(err)
                    {
                        return res.status(404).json({"error":"Unable To login"});
                    }
                    else
                    {
                        return res.status(200).json({id,name,role,token});
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
    const token=req.body.token;
    jwt.verify(token,'0xa5b2d60f32436310afebcfda832817a68921beb782fabf7915cc0460b443116aet',(err,curr) => 
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
var welcome = (req,res) =>
{
    
    res.send("Welcome "+req.body.name);
}
module.exports = {singUp,login,isLogin,welcome};
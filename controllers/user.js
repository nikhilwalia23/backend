const {User} = require('../models/users');
const {Caller_query} = require('../models/caller_query');
let getUser = (req,res) => 
{
    const email=req.params.UserId;
    User.findOne({'email': email}, (err,user) => 
    {
        if(err)
        {
            return res.status(400).json(err);
        }
        else
        {
            if(!user)
            {
                return res.status(404).json({"error":"User Does Not Exist"});
            }
            user.salt = undefined;
            user.encry_password = undefined;
            user.Packages_taken = undefined;
            user.__v = undefined;
            return res.status(200).json(user);
        }
    });
}
let updateUser = (req,res) => 
{
    const email=req.params.UserId;
    User.findOne({'email':email}, (err,user) => 
    {
        if(err)
        {
            return res.status(400).json({err});
        }
        else
        {
            if(!user)
            {
                return res.status(400).json({"err":"User Does not exisit"});
            }
            if(req.body.name)
            {
                user.name=req.body.name;
            }
            user.save((err,user) => 
            {
                if(err)
                {
                    return res.status(400).json({err});
                }
                else
                {
                    return res.status(200).json({"message":"Deatisl Updated Successfully"});
                }
            });
        }
    });
}
let book_call = (req,res) =>
{
    const {id,status,start,end} = req.body;
    const user=id;
    const caller = new Caller_query({user,status,start,end});
    caller.save((err,cal) => 
    {
        console.log(start);
        if(err)
        {
            return res.status(440).json({"err":err});
        }
        return res.start(200).json(cal);
    });
}
module.exports = {getUser,updateUser,book_call};
const {Packages} =require('../models/packages');
const {Transecions} = require('../models/transections');
const {User} = require('../models/users');
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
let buyPackage = (req,res) => 
{
    const {id,Package,member} = req.body;
    const user=id;
    const payment_status = false;
    Packages.findById(Package, (err,Pack) => 
    {
        if(err)
        {
            return res.status(404).json({"error": "Package Unavailable"});
        }
        else
        {
            let cost = Pack.price;
            cost=cost*member;
            const tr = new Transecions({user,Package,member,cost});
            tr.save((err,trans) => 
            {
                if(err)
                {
                    return res.status(400).json({"error":"Not able to Save"});
                }
                else
                {
                    return res.status(200).json(trans);
                }
            })
           
        }
    });
}
module.exports = {getUser,buyPackage};
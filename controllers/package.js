const {Packages} = require('../models/packages');
const {Transecions} = require('../models/transections');
const {User} = require('../models/users')
let showAllPackages = (req,res) => 
{
    Packages.find({published:true}).sort({'date':'-1'}).limit(10).exec((err,packs)=>
    {
        if(err)
        {
            return res.status(400).json({"error":"Internal Server Problem"});
        }
        return res.status(200).json(packs);
    });
}
let buyPackage = (req,res) => 
{
    const {id,Package,member,name} = req.body;
    const user=id;
    const payment_status = false;
    Packages.findById(Package, (err,Pack) => 
    {
        if(err)
        {
            return res.status(404).json({"error": "Internal Server Error"});
        }
        else
        {
            if(!Pack){return res.status(404).json({"error": "Package Unavailable"});}
            let cost = Pack.price;
            cost=cost*member;
            const tr = new Transecions({user,Package,member,cost,name});
            tr.save((err,trans) => 
            {
                if(err)
                {
                    return res.status(400).json({"error":"Not able to Save"});
                }
                else
                {
                    console.log(trans);
                    User.findById(id,(err,user) => 
                    {
                        if(err)
                        {
                            return res.status(500).json({"error":"Internal Server Error"});
                        }
                        if(!user)
                        {
                            return res.status(4500).json({"error":"User Not Found"});
                        }
                        user.Packages_taken.push(trans._id);
                        user.save((err,user) => 
                        {
                            if(err || !user)
                            {
                                return res.status(500).json({"error":"Internal Server Error1"});
                            }
                            return res.status(200).json(tr);
                        })
                    });
                }
            })
           
        }
    });
}
let showPackages = (req,res) => 
{
    const id = req.body.id;
    User.findById(id,'name').populate('Packages_taken').exec((err,temp) => 
    {
        if(err)
        {
            console.log(err);
            return res.status(401).json(err);
        }
        else
        {
            return res.status(200).json(temp);
        }
    })
}
//Admin controller
let updatePackage = (req,res) => 
{
    var id=req.body.package.id;
    Packages.findById(id,(err,pk) => 
    {
        if(err)
        {
            return res.status(400).json(err);
        }
        if(!pk)
        {
            return res.status(404).json({"error" :"Package Not Found"});
        }
        if(!req.body.package.price)
        {
            pk.price=req.body.price;
        }
        if(!package_desription)
        {
            pk.package_desription=req.body.package_desription;
        }
        pk.save((err,temp))
        {
            if(err)
            {
                return res.status(400).json(err);
            }
            else
            {
                return res.status(200).json({"msg":"Data Updated Successfully"});
            }
        }
    });
}
module.exports = {buyPackage,showPackages,showAllPackages};
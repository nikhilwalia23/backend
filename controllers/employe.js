const {Packages} = require('../models/packages');
const addPackage = (req,res) => 
{
    const {package_name,price} = req.body;
    const employe=req.body.id;
    const pack = new Packages({package_name,price,employe});
    pack.save((err,pk) => 
    {
        if(err){return res.status(400).json(err);}
        return res.status(200).json({"msg":"Packgae added sucessfully"});
    });
}
const updatePackage = (req,res) => 
{

}
const delPackage = (req,res) => 
{
    const {id} = req.body.package_id;
    Packages.deleteOne(id,(err,pack) => 
    {
        if(err){return res.status(400).json(err);}
        return res.status(200).json({"msg":"Packgae removed sucessfully"});
    });
}
module.exports = {addPackage,updatePackage,delPackage};
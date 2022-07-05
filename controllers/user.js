const {Packages} =require('../models/packages');
const {Transecions} = require('../models/transections');
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
module.exports = {buyPackage};
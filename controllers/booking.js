const {Packages} =require('../models/packages');
let buyPackage = (req,res) => 
{
    const {id,Package,member} = req.body;
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
            const tr = new Transecions({user,Package,member,cost});
            tr.save((err,trans) => 
            {
                if(err)
                {
                    return res.status(400).json({"error":"Not able to Save"});
                }
                else
                {
                    User.findById(id,(err,user) => 
                    {
                        if(err)
                        {
                            return res.status(400).json({"error":"Internal Server Error0"});
                        }
                        if(!user)
                        {
                            return res.status(400).json({"error":"User Not Found"});
                        }
                        user.Packages_taken.push(trans._id);
                        user.save((err,user) => 
                        {
                            if(err || !user)
                            {
                                return res.status(400).json({"error":"Internal Server Error1"});
                            }
                            return res.status(200).json(tr);
                        })
                    });
                }
            })
           
        }
    });
}

module.exports = {buyPackage};
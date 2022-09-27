let Razorpay = require("razorpay");
let instance = new Razorpay({ key_id: process.env.RAZOR_PAY_ID, key_secret: process.env.RAZOR_PAY_KEY });

let createOrder = (req,res) => {
    //server to server communication for crating order
    let totelAmount=req.body.ammount;
    let transId=req.body.transId;
    let option = {
        amount: totelAmount * 100,
        currency: "INR",
        receipt: transId
    }
    instance.orders.create(option,(error,order) => 
    {
        if(error)
        {
            return res.status(500).json(error);
        }
        else
        {
            console.log(order);
            return res.status(200).json({orderId:order.id,orderAmmount:order.amount});
        }
    });
}
module.exports = { createOrder };
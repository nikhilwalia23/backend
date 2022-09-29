let Razorpay = require("razorpay");
var crypto = require("crypto");
var { Transecions } = require("../models/transections")
let instance = new Razorpay({ key_id: process.env.RAZOR_PAY_ID, key_secret: process.env.RAZOR_PAY_KEY });

let createOrder = (req, res) => {
    //server to server communication for crating order
    let totelAmount = req.body.ammount;
    let transId = req.body.transId;
    let option = {
        amount: totelAmount * 100,
        currency: "INR",
        receipt: transId
    }
    instance.orders.create(option, (error, order) => {
        if (error) {
            return res.status(500).json(error);
        }
        else {
            console.log(order);
            return res.status(200).json({ orderId: order.id, orderAmmount: order.amount });
        }
    });
}
function verifyOrder(req, res) {
    //Do Vefication update states paid in transeciton
    let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;
    var expectedSignature = crypto.createHmac('sha256', process.env.RAZOR_PAY_KEY)
        .update(body.toString())
        .digest('hex');
    console.log("sig received ", req.body.response.razorpay_signature);
    console.log("sig generated ", expectedSignature);
    if (expectedSignature === req.body.response.razorpay_signature)
    {
        instance.orders.fetch(req.body.response.razorpay_order_id,(error,order) => 
        {
            var response = { "signatureIsValid": "true" }
            if(error)
            {
                return res.status(500).json({"error":"Internal Server Error","signatureIsValid": "false"});
            }
            else
            {
                Transecions.findByIdAndUpdate(order.receipt,{paymentId:req.body.response.razorpay_payment_id,payment_status:true},(err,trans) => 
                {
                    if(err)
                    {
                        return res.status(500).json(err);
                    }
                    if(!trans)
                    {
                        return res.status(404).json({"error":"Transection Not Found","signatureIsValid": "false"});
                    }
                    return res.status(200).json(response);
                });
            }
        });
    }
    else
    {
        return res.status(500).json({"error":"bhag bsdk","signatureIsValid": "false"});
    }

}
module.exports = { createOrder, verifyOrder };
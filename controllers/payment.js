let Razorpay = require("razorpay");
var crypto = require("crypto");
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
let verifyOrder = (req, res) => {
    //Do Vefication update states paid in transeciton
    let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;

    var crypto = require("crypto");
    var expectedSignature = crypto.createHmac('sha256', process.env.RAZOR_PAY_KEY)
        .update(body.toString())
        .digest('hex');
    console.log("sig received ", req.body.response.razorpay_signature);
    console.log("sig generated ", expectedSignature);
    var response = { "signatureIsValid": "false" }
    if (expectedSignature === req.body.response.razorpay_signature)
        response = { "signatureIsValid": "true" }
    return res.status(200).json(response);

}
module.exports = { createOrder, verifyOrder };
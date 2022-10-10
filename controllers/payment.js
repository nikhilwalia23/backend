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
    //Do Verification update states paid in transeciton

    //Verifiaction by Client
    // let razrosign = req.body.razorpaySignature;
    // let paymentid = req.body.paymentId;




    //vefification by Webhook (Workion on it)
    console.log(req.body.payload.payment);
    let razrosign=req.headers['x-razorpay-signature'];
    let paymentid=req.body.payload.payment.entity.id;
    let orderid=req.body.payload.payment.entity.order_id;
    console.log("paymentid :-   " + paymentid);
    console.log("orderid :-    "+ orderid);
    console.log(razrosign);

    instance.payments.edit(paymentid,{"notes": {
		"key1": "value1",
		"key2": "value2"
	}}, (err, pay) => {
        if (err) {
            return res.status(404).json({ "error": "payment id not found" });
        }
        else {
            let body = req.body;
            var expectedSignature = crypto.createHmac('sha256', process.env.RAZOR_PAY_KEY)
                .update(JSON.stringify(body))
                .digest('hex');
            console.log("sig received ", razrosign);
            console.log("sig generated ", expectedSignature);
            if (expectedSignature === razrosign) {
                instance.orders.fetch(pay.order_id, (error, order) => {
                    var response = { "signatureIsValid": "true" }
                    if (error) {
                        return res.status(500).json({ "error": "Internal Server Error", "signatureIsValid": "false" });
                    }
                    else {
                        Transecions.findByIdAndUpdate(order.receipt, { paymentId: paymentid, payment_status: true }, (err, trans) => {
                            if (err) {
                                return res.status(500).json(err);
                            }
                            else if (!trans) {
                                return res.status(404).json({ "error": "Transection Not Found", "signatureIsValid": "false" });
                            }
                            else{return res.status(200).json(response);}
                        });
                    }
                });
            }
            else {
                return res.status(500).json({ "error": "bhag bsdk", "signatureIsValid": "false" });
            }
        }
    });

}
module.exports = { createOrder, verifyOrder };

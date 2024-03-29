var mongoose = require("mongoose");
var ObjectId=mongoose.ObjectId;
const transectionSchema = mongoose.Schema({
    user : 
    {
        type : ObjectId,
        ref : 'User'
    },
    cost : 
    {
        type: Number
    },
    payment_status : 
    {
        type : Boolean,
        default : false
    },
    Package : 
    {
        type : ObjectId,
        ref : 'Packages'
    },
    member : 
    {
        type : Number
    },
    name : 
    {
        type : String,
        require: true
    },
    paymentId: 
    {
        type: String,
        default: ""
    }
});
const Transecions = mongoose.model("Transection",transectionSchema);
module.exports = {Transecions};

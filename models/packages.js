var mongoose = require("mongoose");
var ObjectId=mongoose.ObjectId;
const Packages_Schema = mongoose.Schema({
    package_name : 
    {
        type : String,
        trim: true,
        unique : true,
        required : true
    },
    price : 
    {
        type : Number,
        required : true
    },
    main_destinations : 
    {
        type : Array,
        default : []
    },
    package_desription : 
    {
        type : String
    },
    services : 
    {
        type : Array,
        default: []
    },
    member : 
    {
        type : Number,
        default : 1
    },
    employe: 
    {
        type: ObjectId,
        ref: "User"
    },
    famousFor:
    {
        type: String
    }
});
const Packages = mongoose.model("Packages",Packages_Schema);
module.exports = {Packages};
var mongoose = require("mongoose");
var ObjectId=mongoose.ObjectId;
const worksSchema = mongoose.Schema({
    work_category : 
    {
        type: ObjectId,
        ref : "Works_Category"
    },
    start_date : 
    {
        type : Date,
    },
    end_date :
    {
        type : Date,
    },
    visit_payment : 
    {
        type: Boolean,
    },
    user_id : 
    {
        type : ObjectId,
        ref : "User",
        required : true,
    },
    worker_id : 
    {
        type : ObjectId,
        ref : "User",
        required : true,
    },
    cost : 
    {
        type: Number
    },
    final_payment : 
    {
        type : Boolean
    }
});

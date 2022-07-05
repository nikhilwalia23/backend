var mongoose = require("mongoose");
var ObjectId=mongoose.ObjectId;
const callerSchema = mongoose.Schema({
    user : 
    {
        type : ObjectId,
        ref : 'User'
    },
    status : 
    {
        type : Boolean
    },
    start :
    {
        type: Date
    },
    end : 
    {
        type: Date
    }
});
var Caller_query = mongoose.model("Caller_query",callerSchema);
module.exports = {Caller_query};
var mongoose = require("mongoose");
const worker_categorySchema = mongoose.Schema({
    name : 
    {
        type : String,
        trim: true,
        unique : true,
        required : true
    }
});
module.exports = mongoose.model("Worker_category",worker_categorySchema);
var mongoose = require("mongoose");
const crypto = require('crypto');
var ObjectId=mongoose.ObjectId;
const userSchema = new mongoose.Schema({
    name :
    {
        type: String,
        required: true,
        maxlength: 32,
    },
    email :
    {
        type: String,
        unique: true,
        required : true
    },
    number : 
    {
        type: String,
        maxlength: 10,
        required: true,
        unique: true,
        trim: true
    },
    role :
    {
        type: Number,
        default: 0
    },
    address : 
    {
        type: String,
        maxlength: 75
    },
    encry_password :
    {
        type: String,
        required: true,
    },
    salt :
    {
        type : String,
    },
    Packages_taken : [{ type : ObjectId, ref: 'Packages' }]
});
//Virtual Methods Set Up and Salt value and Encrypt the password before Saving into the Database
userSchema.virtual("password").set(function(password)
{
    this._password=password;
    this.salt=crypto.randomUUID();
    this.encry_password=this.securePassword(password);
}).get(function()
{
    return this._password;
})
userSchema.methods=
{
    securePassword: function(plainPassword)
    {
        if(plainPassword==""){return plainPassword;}
        else
        {
            try
            {
                const hash = crypto.createHmac('sha256', plainPassword)
               .update(this.salt)
               .digest('hex');
               return hash;
            }
            catch(err)
            {
                return "Something Wrong With Crypto";
            }
        }
    },
    authenticate: function(plainPassword)
    {
        return this.securePassword(plainPassword)===this.encry_password;
    }
};

//diffrent Collection for Worker
const workerSchema = mongoose.Schema({
    name :
    {
        type: String,
        required: true,
        // maxlength: 32,
        trim: true
    },
    email :
    {
        type: String,
        // maxlength: 32,
        unique: true,
    },
    number : 
    {
        type: String,
        // maxlength: 10,
        required: true,
        unique: true,
        trim: true
    },
    role :
    {
        type: Number,
        default: 1
    },
    address : 
    {
        tyep: String,
        // maxlength: 75
    },
    encry_password :
    {
        type: String,
        required: true,
    },
    salt :
    {
        type : String,
    },
    work_done :
    {
        type : Array,
        default : [
            {
                type:ObjectId,
                ref:'Works'
            }]
    },
    offer_work : 
    {
        type : Array,
        default : [
            {
                type:ObjectId,
                ref:'Works'
            }]
    },
    worker_category :
    {
        type : ObjectId,
        ref : 'Worker_category'
    }
});

workerSchema.virtual("password").set(function(password)
{
    this._password=password;
    this.salt=crypto.randomUUID();
    this.encry_password=this.securePassword(password);
}).get(function()
{
    return this._password;
})

workerSchema.methods = 
{
    securePassword: function(plainPassword)
    {
        if(plainPassword==""){return plainPassword;}
        else
        {
            try
            {
                const hash = crypto.createHmac('sha256', plainPassword)
               .update(this.salt)
               .digest('hex');
               return hash;
            }
            catch(err)
            {
                return "Something Wrong With Crypto";
            }
        }
    },
    authenticate: function(plainPassword)
    {
        return this.securePassword(plainPassword)===this.encry_password;
    }
}
const User = mongoose.model("User",userSchema);
const Worker = mongoose.model("Worker",workerSchema);
module.exports = {User,Worker};
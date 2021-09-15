const mongoose = require('mongoose');
const schema  = mongoose.Schema;

const UserSchema  = new schema({
    username:{
        type: String,
        require: true,
        unique: true,
        trim: true,
        minlength: true
    },
    email:{
        type: String,
        require: true,
    },
    account_type:{
        type: String,
        require: true,
         
    },
    address:{
        type: String,
        require: true,
         
    },
    password:{
        type: String,
        require:true,
    }
},{
    timestamps: true,
});

const user = mongoose.model('User',UserSchema);
module.exports = user;
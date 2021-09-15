const mongoose = require('mongoose');
const schema  = mongoose.Schema;

const shoppingCartSchema  = new schema({
    username:{
        type: String,
        require: true,
        trim: true,
        minlength: true
    },
    // the primary key for product
    products:[
        //productname:
        {
            productname:String,
            amount:Number,
            price:Number
        }
    ]

},{
    timestamps: true,
});

const product = mongoose.model('shoppingCart',shoppingCartSchema);
module.exports = product;
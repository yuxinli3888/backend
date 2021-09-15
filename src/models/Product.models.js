const mongoose = require('mongoose');
const schema  = mongoose.Schema;
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const productSchema  = new schema({
    productname:{
        type: String,
        require: true,
        unique: true,
        trim: true,
        minlength: true
    },
    price:{
        type: Number,
        require: true,
    },
    supplier:{
        type: String,
        require: true,
    },
    
    description:{
        type: String,
        require: true,
    },
    category:{
        type: String,
        require:true,
    }
},{
    timestamps: true,
});
productSchema.plugin(mongoose_fuzzy_searching, { fields: [{
    name: 'productname',
    minSize: 3,
    weight: 4,
  },{
    name: 'category',
    minSize: 2,
    weight: 4,
  }, {
  name: 'description',
  minSize: 2,
  weight: 2,
    },] });


const product = mongoose.model('Product',productSchema);
module.exports = product;
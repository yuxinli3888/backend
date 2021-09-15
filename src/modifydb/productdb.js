let Product = require('../models/Product.models');


async function listProduct(res) {
    Product.find({}).exec((err, productData) => {
        if(err) throw err;
        if(productData) {
            res.end(JSON.stringify(productData));
        } else {
            res.end();
        }
    }) 

}

function addProduct(req,res) {
    const productname = req.body.productname;
    const price = req.body.price;
    const supplier = req.body.supplier;
    const description = req.body.description;
    const category = req.body.category;
   
    const newProduct = new Product({productname,price,supplier,description,category});
        newProduct.save()
        .then(()=> res.json('Product added!'))
        .catch(err=> res.status(400).json('Error: '+err)); 

}

function search(req,res){
    Product.fuzzySearch(req.body.key, (err, doc) => {
        if (err) {
          console.error(err);
          res.json("failed")
        } else {
          console.log(doc);
          res.json(doc);
        }
    });


}



module.exports = {
listProduct: listProduct,
addProduct: addProduct,
search:search,
 
}
  
let ShoppingCart = require("../models/ShoppingCart.models");
let Product = require('../models/Product.models');

async function listShoppingCartforUser(req,res) {
    ShoppingCart.findOne({username : req.body.username})
    .then((cart)=>{
        res.json(cart);
    })
    .catch(err=> res.status(400).json('Error: '+err));
}

async function addProduct(req,res){
    const a =  await Product.findOne({productname:req.body.productname});
    let price = 0
    if (a!==null){
        price = a.price;
    }

    let cart = await ShoppingCart.findOne({username: req.body.username});
    const productname = req.body.productname;
    const username = req.body.username;
    if(cart === null){
        const cart = new ShoppingCart({username:username, products:[{productname:productname,
            amount:1, price:price}]});
        cart.save()
        .then(()=> {res.json(cart);})
        .catch(err=> res.status(400).json('Error: '+err)); 
    }else{
        for(let i = 0; i<cart.products.length;i+=1){
            if(cart.products[i].productname === req.body.productname){
                cart.products[i].amount += 1;
                cart.products[i].price = price;
                cart.save();
                res.json(cart);
                return;
            }
        }
        cart.products.push({productname:productname,amount:1,price:price});
        cart.save();
        res.json(cart);
    }
}

async function minusProduct(req,res){
    const a =  await Product.findOne({productname:req.body.productname});
    let price = 0
    if (a!==null){
        price = a.price;
    }

    let cart = await ShoppingCart.findOne({username: req.body.username});
    if(cart === null){
        res.json("you can not minus a non exsit product in shopping cart");
    }else{
        for(let i = 0; i<cart.products.length;i+=1){
            if(cart.products[i].productname === req.body.productname){
                if(cart.products[i].amount===1){
                    cart.products[i].price = price;
                    cart.save();
                    res.json(cart);
                    return;
                }else{
                    cart.products[i].price = price;
                    cart.products[i].amount -= 1;
                    cart.save();
                    res.json(cart);
                    return;
                }
            }
        }
        res.json("you can not minus a non exsit product in shopping cart");
    }
}
async function getProductPrice(req,res){
    const a =  await Product.findOne({productname:req.body.productname});
    if (a==null){
        res.json({price:-1})
    }
    else{
        const price = a.price
        res.json({price:price})  
    }

}


async function deleteProduct(req,res){
    let cart = await ShoppingCart.findOne({username: req.body.username});
    if(cart === null){
        res.json("you can not minus a non exsit product in shopping cart");
    }else{
        for(let i = 0 ; i<req.body.products.length; i++){
            let target = -1;
            for(let j = 0; j< cart.products.length; j++){
                if(req.body.products[i] === cart.products[j].productname){
                    target = j;
                    break;
                }
            }
            if(target!==-1){
                cart.products[target] = cart.products[0];
                cart.products.shift();
            }
        }
        cart.save();
        res.json(cart);
        return;
    }
}


module.exports = {
    listShoppingCartforUser:listShoppingCartforUser,
    addProduct:addProduct,
    minusProduct:minusProduct,
    deleteProduct:deleteProduct,
    getProductPrice:getProductPrice
}
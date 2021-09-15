const router = require('express').Router();
const cartdb = require("../modifydb/ShoppingCartdb");
router.route('/').post((req,res)=>{
    cartdb.listShoppingCartforUser(req,res);
});

router.route('/add').post((req,res)=>{
    cartdb.addProduct(req,res);
});

router.route('/minus').post((req,res)=>{
    cartdb.minusProduct(req,res);
});

router.route('/delete').post((req,res)=>{
    cartdb.deleteProduct(req,res);
});
router.route('/price').post((req,res)=>{
    cartdb.getProductPrice(req,res);
});

module.exports = router;
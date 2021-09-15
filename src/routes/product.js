const router = require('express').Router();
const productdb = require('../modifydb/productdb');

router.route('/get').get((req,res)=>{
    
    productdb.listProduct(res);
});

router.route('/add').post((req,res)=>{

     productdb.addProduct(req,res);
});

router.route('/search').post((req,res)=>{
    productdb.search(req,res);
});

module.exports = router;
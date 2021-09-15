const router = require('express').Router();
const userdb = require('../modifydb/userdb');
 

  
router.route('/').get((req,res)=>{

    userdb.listUsers(res);
});

router.route('/add').post((req,res)=>{
    userdb.addUsers(req,res);
});
 
router.route('/login').post((req,res)=>{
    
    userdb.verifydUsers(req,res);
});

router.route('/setting').post((req,res)=>{

    userdb.modifyUsers(req,res);
})

router.route('/updatepassword').post((req,res)=>{

    userdb.updatePassword(req,res)
})

router.route('/searchuserinfo').post((req,res)=>{

    userdb.searchUserInfo(req,res)
})



module.exports = router;
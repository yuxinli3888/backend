let User = require('../models/User.models');
var CryptoJS = require('crypto-js');
async function listUsers(res){
    User.find()
    .then(users=> res.json(users))
    .catch(err=> res.status(400).json('Error: '+err));
}

function addUsers(req,res){
    console.log("con")
    const username = req.body.username;
    const email = req.body.email;
    const account_type = req.body.account_type;
    const address = req.body.address;
    
    const password= CryptoJS.enc.Utf8.parse(req.body.password).toString();   
    const newUser = new User({username,email,account_type,address,password});

    newUser.save()
        .then(()=> res.json('User added!'))
        .catch(err=> res.json('Error: '+err));

}
async function verifydUsers(req,res) {
    console.log("cometohe")
    const username = req.body.username
    const password = CryptoJS.enc.Utf8.parse(req.body.password).toString();

    let a =  await User.findOne({username:username});
    if (a==null){
        res.json({status:"Invalid"})
    }
    else{
        if (a.password==password){
            res.json({status:"Success"})
            console.log(res)
            
        }
        else{
            res.json({status:"Fail"})


        }
         
    }
    
}
async function modifyUsers(req,res) {
    console.log("call 2222")
    let tnewUserName = req.body.newUserName;
    let tnewEmail = req.body.newEmail;
    let tnewAddress = req.body.newAddress;
    let tcurrentUserName = req.body.currentUserName;  
    let origin =  await User.findOne({username:tcurrentUserName});
    if (tnewUserName === "") {
        tnewUserName = tcurrentUserName
    }
    if (tnewEmail === "") {
        //console.log("Did not enter email")
        tnewEmail = origin.email
    }
    if (tnewAddress === "") {
        //console.log("Did not enter address")
        tnewAddress = origin.address
    }
    //console.log(origin)
    //console.log("runtohere")

    const newUserName = tnewUserName;
    const newEmail = tnewEmail;
    const newAddress = tnewAddress;
    const currentUserName = tcurrentUserName;
    let a =  await User.findOne({username:newUserName});
    console.log("before")
    console.log(a)
    if (a === null || newUserName === currentUserName) {
        var update = User.findOneAndUpdate({username: currentUserName}, {
            username: newUserName,
            email: newEmail, 
            address: newAddress, 
        },function(err, doc){
            if(err){
            }
        
        });
        res.json({status:"UserUpdated"})
        
    }
    else {
        res.json({status:"Invalid"})
        
    }
    let aa =  await User.findOne({username:newUserName});
    console.log("after")
    console.log(aa)

}

async function updatePassword(req,res) {
    console.log("call here")
    const username = req.body.username;
    const password = CryptoJS.enc.Utf8.parse(req.body.password).toString();
    console.log("new password:")
    console.log(password)
    let a =  await User.findOne({username:username});
    if (a === null) {
        res.json({status:"WithoutLogin"})
        return
    }
    var update = User.findOneAndUpdate({username: username}, {
        password: password
    },function(err, doc){
        if(err){
        }
    
    });
    console.log("after")
    let aa =  await User.findOne({username:username});
    console.log(aa)
    res.json({status:"Password Updated"})
}

async function searchUserInfo(req,res) {
    
    const username = req.body.username;

    console.log(username)
    let a =  await User.findOne({username:username});
    console.log("here")
    console.log(a)
    const email = a.email;
    const address = a.address;
    const usernamee = a.username;
    //res.json({email:email, address:address, username:usernamee})
    res.json({status:"Password Updated"})
}
 

module.exports = {
    listUsers:listUsers,
    addUsers: addUsers,
    verifydUsers:verifydUsers,
    modifyUsers:modifyUsers,
    updatePassword:updatePassword,
    searchUserInfo:searchUserInfo
}

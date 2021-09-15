const express = require('express');
const cors = require('cors');
const mongoose  = require('mongoose');

 

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri,{useUnifiedTopology: true,});

const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB is connected!")

})
 


const productRouter = require('./routes/product');
const usersRouter = require('./routes/user');
const shoppingCartRouter = require('./routes/shoppingCart');
app.use('/shoppingCart',shoppingCartRouter);
app.use('/dashboard/product',productRouter);
app.use('/user',usersRouter);
app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
    
});


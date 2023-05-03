import express from 'express';
import cors from 'cors';
import data from './data.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import connectDB from './config';
import dotenv from 'dotenv';
import userRouter from './routers/userRouter.js';
// import orderRouter from './routers/orderRouter.js';


// it will read all env variables from .env file and attach it to our process.env obj 
dotenv.config()

mongoose.set('strictQuery', true);

 
// we will get our connection from config.js file 

const app = express();
app.use(cors());
// here we are using json because the data which we are going to send inside the body is in json format
app.use(bodyParser.json());

// here we are going to use userrouter
app.use('/api/users', userRouter);
// app.use('/api/orders', orderRouter);


app.get("/api/products", (req, res) => {
    res.send(data.products);
});

app.get('/api/products/:id', (req,res) => {
    const product = data.products.find((x) => x._id === req.params.id);
    if (product){
        res.send(product);
    } else{
        res.status(404).send({ message: 'Product Not Found!'});
    }
});
// in this expressAsynchandler thir are 4 paramter
app.use((err, req, res, next)=>{
    const status = err.name && err.name === 'ValidationError'? 400 : 500;
    res.status(status).send({message:err.message});
})

app.listen(5000, () => {
    console.log("serve at http://localhost:5000");
    connectDB();
});

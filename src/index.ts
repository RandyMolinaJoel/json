import express from 'express';
import mongoose from 'mongoose';
import authJwt from './helpers/jwt';
import {errorHandle} from './helpers/error_handle';
// import cors from 'cors';

import productsRouter from './routes/products';
import usersRouter from './routes/users';

const app = express();
const api = 'localhost/api/v1';
app.use(express.json());

app.use(errorHandle);

app.use(`${api}/product`, productsRouter)
app.use(`${api}/user`, usersRouter)

mongoose.connect("mongodb://root:example@localhost:27017/?authMechanism=DEFAULT", {
    //useNewUrIParser: true,
    //useUnifiedTopology: true,
    dbName: 'MERN_SHOP',
})
.then(() =>{
    console.log("Database connection is ready...")
})
.catch((err) => {
    console.log(err)
});



app.listen(3000, ()=> {
    console.log(`The server was running in port ${3000}`)
})
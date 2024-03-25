const express = require('express');
const mongoose =require('mongoose');
const cors = require('cors');
const routes = require('./routes/index');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
global.__basedir = __dirname;
require('./config/db');
app.use(cors({
    origin:"http://localhost:3000",
    optionsSuccessStatus:200,

}));
app.use(express.json());

app.use('/',routes);
const server = app.listen( PORT,()=>{
    console.log(`server is listening on port ${PORT}`);
})
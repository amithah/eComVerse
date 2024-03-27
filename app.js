const express = require('express');
const cors = require('cors');
const routes = require('./routes/index');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
global.__basedir = __dirname;

const PORT = process.env.PORT;
require('./config/db');
const origin = process.env.ORIGIN || 'http://localhost:3000';
app.use(cors({
    origin,
    optionsSuccessStatus:200,

}));
app.use(express.json());

app.use('/',routes);
const server = app.listen( PORT,()=>{
    console.log(`server is listening on port ${PORT}`);
})
module.exports = app
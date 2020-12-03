const express = require('express');
const app = express();
const morgan = require('morgan');
const authRoute = require('./routes/auth');

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//routes

app.use('/auth',authRoute);

module.exports = app;
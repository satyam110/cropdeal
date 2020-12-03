const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const farmerRoute = require('./routes/farmer');

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//database connection

mongoose.connect(process.env.FARMER_URL,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex:true})
        .then(console.log('Connected to Mongo Atlas'))
        .catch(error=>console.log(error));

// routes
app.use('/farmer',farmerRoute);


module.exports = app;
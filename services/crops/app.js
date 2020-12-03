const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const cropsRoute = require('./routes/crops');

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());


//database connection
mongoose.connect(process.env.CROP_URL,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
        .then(console.log('Connected to Mongo Atlas'))
        .catch(error=>console.log(error));



// routes
app.use('/crops',cropsRoute);



// error handling
app.use((req,res,next) => {
    const error = new Error('Not Found');
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message : error.message
        }
    })
})


module.exports = app;
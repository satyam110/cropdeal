const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
//routes
const cropsRoute = require('./routes/crops');
const adminRoutes = require('./routes/adminCrops');
const paymentRoutes = require('./routes/payments');
//swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
       info:{
           title: 'Crops Microservice API',
           version: '1.0.0',
           description: 'API for managing crops data related operations',
           contact: {
               name: 'Satyam Pawar',
               email: 'satyamp110@gmail.com'
           }
       } ,
       servers: ["http://localhost:3001"]
    },
    apis: ['./routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
// swagger 
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use('/uploads',express.static("uploads"))

//database connection
mongoose.connect(process.env.CROP_URL,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
        .then(console.log('Connected to Mongo Atlas'))
        .catch(error=>console.log(error));



// routes
app.use('/crops',cropsRoute);
app.use('/admin', adminRoutes);
app.use('/payment', paymentRoutes);

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
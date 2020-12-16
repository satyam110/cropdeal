const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const farmerRoute = require('./routes/farmer');
const cors = require('cors');
//swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
       info:{
           title: 'Farmer Microservice API',
           version: '1.0.0',
           description: 'API for managing farmer operations in application',
           contact: {
               name: 'Satyam Pawar',
               email: 'satyamp110@gmail.com'
           }
       } ,
       servers: ["http://localhost:3000"]
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
//database connection

mongoose.connect(process.env.FARMER_URL,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex:true})
        .then(console.log('Connected to Mongo Atlas'))
        .catch(error=>console.log(error));

// routes
app.use('/farmer',farmerRoute);

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
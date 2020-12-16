const express = require('express');
const router = express.Router();

const { validateToken, isValidUser, isAdmin , isDealer} = require('../controllers/auth.controller');
const { stripePayment, getPayment, getPaymentById, getPaymentBySeller, getPaymentByBuyer } = require('../controllers/payment.controller');

/**
 * @swagger
 * /payment:
 *  post:
 *      summary: send request from frontend to validate stripe payment token
 *      description: validates payment token and stores order details if transaction successful
 *      responses:
 *          200:
 *              description: payment successful
 *          403:
 *              description: authorization error
 */

router.post('/', validateToken, isDealer, stripePayment);

/**
 * @swagger
 * /payment:
 *  get:
 *      summary: returns all payment details
 *      description: gets all payment details
 *      responses:
 *          201:
 *              description: returns JSON array of all payments
 *          400:
 *              description: failed to get data
 *          403:
 *              description: authorization error
 *          404: 
 *              description: no data found
 */

router.get('/', validateToken, getPayment);


/**
 * @swagger
 * /payment/:id:
 *  get:
 *      summary: returns payment related to id
 *      description: gets payment for given id
 *      responses:
 *          201:
 *              description: returns JSON object of payment
 *          400:
 *              description: failed to get data
 *          403:
 *              description: authorization error
 *          404: 
 *              description: no data found for given id
 */
router.get('/:id', validateToken, getPaymentById);

/**
 * @swagger
 * /payment/seller/:sellerId:
 *  get:
 *      summary: returns payment related to seller id
 *      description: gets payment for given seller id
 *      responses:
 *          201:
 *              description: returns JSON object of payment
 *          400:
 *              description: failed to get data
 *          403:
 *              description: authorization error
 *          404: 
 *              description: no data found for given seller id
 */
router.get('/seller/:sellerId', validateToken, getPaymentBySeller);

/**
 * @swagger
 * /payment/buyer/:buyerId:
 *  get:
 *      summary: returns payment related to buyer id
 *      description: gets payment for given buyer id
 *      responses:
 *          201:
 *              description: returns JSON object of payment
 *          400:
 *              description: failed to get data
 *          403:
 *              description: authorization error
 *          404: 
 *              description: no data found for given buyer id
 */
router.get('/buyer/:buyerId', validateToken, getPaymentByBuyer)

module.exports=router;
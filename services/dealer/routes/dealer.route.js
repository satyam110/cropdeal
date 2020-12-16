const express = require('express');
const router = express.Router();

const {dealerSignUp,deleteDealerProfile,getDealerProfile,updateDealerProfile,getDealers,dealerSignIn, subscribeCrop, getCropsSubscribed} = require('../controllers/dealer.controller');
const { validateToken, isValidUser, isAdmin } = require('../controllers/auth.controller');

/**
 * @swagger
 * /dealer:
 *  get:
 *     summary: gets list of all dealers registered
 *     description: returns JSON array containing registered dealers
 *     responses:
 *      203:
 *          description: JSON array containing registered dealers
 *      400: 
 *          description: no data available
 *      401:
 *          description: admin privilege needed
 *      403:
 *          description: authorization error
 */
router.get('/', validateToken, isAdmin, getDealers);


/**
 * @swagger
 * /dealer/profile/:id:
 *  get:
 *     summary: get dealer data
 *     description: returns dealer data
 *     responses:
 *      203:
 *          description: dealer object
 *      400: 
 *          description: no data available
 *      401:
 *          description: admin privilege needed
 *      403:
 *          description: authorization error
 */
router.get('/profile/:id', validateToken, isValidUser ,getDealerProfile);

/**
 * @swagger
 * /dealer/signup:
 *  post:
 *     summary: sign up as dealer
 *     description: sign up dealer
 *     responses:
 *      201:
 *          description: dealer registered
 *      400: 
 *          description: registration failed
 *      422:
 *          description: email already exists
 *      500:
 *          description: bcrypt error
 */
router.post('/signup', dealerSignUp)  

/**
 * @swagger
 * /dealer/login:
 *  post:
 *     summary: login as dealer
 *     description: dealer login
 *     responses:
 *      200:
 *          description: auth successful
 *      401: 
 *          description: auth failed
 */
router.post('/login', dealerSignIn)

/**
 * @swagger
 * /dealer/:id:
 *  put:
 *     summary: update dealer profile
 *     description: dealer data update
 *     responses:
 *      200:
 *          description: update successful
 *      401: 
 *          description: invalid user
 *      403:
 *          description: authorization error
 *      404:
 *          description: data not found
 */
router.put('/:id', validateToken, isValidUser, updateDealerProfile)

/**
 * @swagger
 * /dealer/:id:
 *  delete:
 *     summary: delete dealer profile
 *     description: dealer data delete
 *     responses:
 *      200:
 *          description: deleted successful
 *      401: 
 *          description: admin privilege
 *      403:
 *          description: authorization error
 *      404:
 *          description: data not found
 */
router.delete('/:id', validateToken, isAdmin, deleteDealerProfile)

/**
 * @swagger
 * /dealer/subscribe/:id:
 *  put:
 *     summary: update crop subscription as per dealer id
 *     description: subscription update
 *     responses:
 *      200:
 *          description: update successful
 *      401: 
 *          description: invalid user
 *      403:
 *          description: authorization error
 */
router.put('/subscribe/:id',validateToken,subscribeCrop)

/**
 * @swagger
 * /dealer/subscribe/:id:
 *  get:
 *     summary: get crop subscription as per dealer id
 *     description: get dealer subscriptions
 *     responses:
 *      200:
 *          description: list of subscribed crops
 *      400: 
 *          description: microservice error
 *      403:
 *          description: authorization error
 */
router.get('/subscribe/:id', validateToken, getCropsSubscribed)

module.exports = router;
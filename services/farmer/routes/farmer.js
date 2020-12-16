const express = require('express');
const router = express.Router();

const {getFarmerProfile,farmerSignUp, farmerSignIn ,deleteFarmerProfile, getFarmers, updateFarmerProfile} = require('../controllers/farmer.controller');
const { validateToken, isValidUser, isCropService, isAdmin} = require('../controllers/auth.controller');
/**
 * @swagger
 * /farmer:
 *  get:
 *     summary: gets list of all farmers registered
 *     description: returns JSON array containing registered farmers
 *     responses:
 *      203:
 *          description: JSON array containing registered farmers
 *      400: 
 *          description: no data available
 *      401:
 *          description: admin privilege needed
 *      403:
 *          description: authorization error
 */
router.get('/', validateToken, isAdmin, getFarmers);


/**
 * @swagger
 * /farmer/profile/:id:
 *  get:
 *     summary: get farmer data
 *     description: returns farmer data
 *     responses:
 *      203:
 *          description: farmer object
 *      400: 
 *          description: no data available
 *      401:
 *          description: admin privilege needed
 *      403:
 *          description: authorization error
 */
router.get('/profile/:id', validateToken, isValidUser , getFarmerProfile);

/**
 * @swagger
 * /farmer/:id:
 *  get:
 *     summary: get farmer data for crops microservice
 *     description: returns farmer data
 *     responses:
 *      203:
 *          description: farmer object
 *      400: 
 *          description: no data available
 *      401:
 *          description: admin privilege needed
 *      403:
 *          description: authorization error
 */
router.get('/:id', isCropService, getFarmerProfile)

/**
 * @swagger
 * /farmer/signup:
 *  post:
 *     summary: sign up as farmer
 *     description: sign up farmer
 *     responses:
 *      201:
 *          description: farmer registered
 *      400: 
 *          description: registration failed
 *      422:
 *          description: email already exists
 *      500:
 *          description: bcrypt error
 */
router.post('/signup', farmerSignUp)  


/**
 * @swagger
 * /farmer/:id:
 *  put:
 *     summary: update farmer profile
 *     description: farmer data update
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
router.put('/:id', validateToken, isValidUser, updateFarmerProfile)


/**
 * @swagger
 * /farmer/login:
 *  post:
 *     summary: login as farmer
 *     description: farmer login
 *     responses:
 *      200:
 *          description: auth successful
 *      401: 
 *          description: auth failed
 */
router.post('/login', farmerSignIn)

/**
 * @swagger
 * /farmer/:id:
 *  delete:
 *     summary: delete farmer profile
 *     description: farmer data delete
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
router.delete('/:id', validateToken , isAdmin , deleteFarmerProfile)


module.exports = router;

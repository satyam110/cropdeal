const express = require('express');
const router = express.Router();

const {getFarmerProfile,farmerSignUp, farmerSignIn ,deleteFarmerProfile, getFarmers} = require('../controllers/farmer.controller');
const { validateToken, isValidUser, isCropService, isAdmin} = require('../controllers/auth.controller');
/**
 * get all farmers
 */
router.get('/', validateToken, isAdmin, getFarmers);


/**
 * profile display endpoint
 */
router.get('/profile/:id', validateToken, isValidUser , getFarmerProfile);

/**
 * farmer details for crop service 
 */
router.get('/:id', isCropService, getFarmerProfile)
/**
 * signup endpoint
 */
router.post('/signup', farmerSignUp)  


/**
 * sign in endpoint
 */
router.post('/login', farmerSignIn)

/**
 * delete route
 */
router.delete('/:id', validateToken , isAdmin , deleteFarmerProfile)


module.exports = router;

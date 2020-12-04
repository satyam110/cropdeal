const express = require('express');
const router = express.Router();

const {dealerSignUp,deleteDealerProfile,getDealerProfile,updateDealerProfile,getDealers,dealerSignIn, verifyToken} = require('../controllers/dealer.controller');
const { validateToken, isValidUser, isAdmin } = require('../controllers/auth.controller');

/**
 * get all dealers
 */
router.get('/', validateToken, isAdmin, getDealers);


/**
 * profile display endpoint
 */
router.get('/profile/:id', validateToken, isValidUser ,getDealerProfile);

/**
 * signup endpoint
 */
router.post('/signup', dealerSignUp)  

/**
 * sign in endpoint
 */
router.post('/login', dealerSignIn)

/**
 * update dealer profile
 */
router.put('/:id', validateToken, isValidUser, updateDealerProfile)

/**
 * delete route
 */
router.delete('/:id', validateToken, isAdmin, deleteDealerProfile)


module.exports = router;
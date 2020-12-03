const express = require('express');
const router = express.Router();

const {dealerSignUp,deleteDealerProfile,getDealerProfile,getDealers,dealerSignIn, verifyToken} = require('../controllers/dealer.controller');
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
 * delete route
 */
router.delete('/:id', validateToken, isAdmin, deleteDealerProfile)


module.exports = router;
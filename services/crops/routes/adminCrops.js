const express = require('express');
const router = express.Router();

const { getCropsUnderReview, approveCrop } = require('../controllers/crop.controller');
const { validateToken, isAdmin} = require('../controllers/auth.controller');


/**
 * @swagger
 * /admin:
 *  get:
 *      summary: returns crops uploaded by farmer for approval
 *      description: gets crops under review
 *      responses:
 *          201:
 *              description: returns JSON array of crops with non approved status
 *          400:
 *              description: failed to retrieve data
 *          401:
 *              description: admin privilege needed
 *          403:
 *              description: authorization error
 */

router.get('/',validateToken, isAdmin, getCropsUnderReview)

/**
 * @swagger
 * /admin/:id:
 *  put:
 *      summary: updates crop's approval status
 *      description: update status of crop approval
 *      responses:
 *          201:
 *              description: status approved
 *          400:
 *              description: failed to update data
 *          401:
 *              description: admin privilege needed
 *          403:
 *              description: authorization error
 */

router.put('/:id',validateToken, isAdmin, approveCrop);
module.exports=router;
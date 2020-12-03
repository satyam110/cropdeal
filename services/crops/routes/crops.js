const express = require('express');
const router = express.Router();

const { getCrops,getCropById,postCropDetails,updateCropDetails, deleteCropById } = require('../controllers/crop.controller');
const { validateToken, isValidUser, isAdmin } = require('../controllers/auth.controller');
/**
 * get all crops
 */

router.get('/',validateToken,getCrops);

/**
 * get crop by id
 */

router.get('/:cropId',validateToken,getCropById);

/**
 * post crop details
 */

router.post('/',validateToken, isValidUser, postCropDetails);

/**
 * update crop details
 */

router.put('/:cropId', validateToken, isValidUser, updateCropDetails);

/**
 * delete crop details
 */

router.delete('/:cropId', validateToken, isValidUser, deleteCropById);



module.exports=router;
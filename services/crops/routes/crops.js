const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getCrops,getCropById,postCropDetails,updateCropDetails, deleteCropById, getCropsFarmer, getCropsSubscribed, getCropsUnderReview, approveCrop, stripePayment, getDistinctCropName } = require('../controllers/crop.controller');
const { validateToken, isValidUser, isAdmin , isDealer} = require('../controllers/auth.controller');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
}
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        const isValid = MIME_TYPE_MAP[file.mimetype]
        let error = new Error("Invalid mime type");
        if(isValid){
            error = null
        }
        cb(error, 'uploads');
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null,  req.user.id + '-' + Date.now() + '.' + ext);
    }
})



/**
 * @swagger
 * /crops:
 *   get:
 *    summary: get JSON array of crop data
 *    description: Get all crops
 *    responses:
 *     201:
 *      description: Get the list of crops 
 *     400:
 *      description: Request Failed 
 *     403:
 *      description: authorization error    
 */

router.get('/',validateToken,getCrops);

/**
 * @swagger
 * /crops/:cropId:
 *  get:
 *    summary: get JSON object of crop speciefied with its ID
 *    description: Get a Crop
 *    responses:
 *      201:
 *       description: Get crop object
 *      403:
 *       description: authorization error
 *      404:
 *       description: Not Found
 *      500:
 *       description: Internal Server Error
 *        
 */

router.get('/:cropId',validateToken,getCropById);

/** 
 * @swagger
 * /crops/dealer/names:
 *   get:
 *     summary: gets unique crop names
 *     description: Get unique crop names in database
 *     responses:
 *      200:
 *       description: Get array of crop names with distinct name
 *      403:
 *       description: authorization error
 *      404:
 *       description: Not Found
 *      500:
 *       description: Internal Server Error 
 */

router.get('/dealer/names', getDistinctCropName);

/**
 * @swagger
 * /crops/farmer/:farmerId:
 *  get:
 *      summary: gets array of crops uploaded by a farmer
 *      description: get crop according to farmer id
 *      responses:
 *        200:
 *          description: Success
 *        403:
 *            description: authorization error
 *        404:
 *          description: Not Found
 *        500:
 *          description: Internal Server Error
 */

router.get('/farmer/:farmerId',validateToken,getCropsFarmer)

/**
 * @swagger
 * /crops/dealer:
 *  post:
 *      summary: gets array of subscribed crops to dealer microservice
 *      description: get subscribed crops for dealer microservice
 *      responses:
 *          200:
 *            description: Success
 *          403:
 *            description: authorization error
 *          404:
 *            description: Not Found
 *          
 */

router.post('/dealer',validateToken, isDealer, getCropsSubscribed)

/**
 * @swagger
 * /crops:
 *  post:
 *      summary: inserts crop data into database
 *      description: insert crop details in database
 *      responses:
 *          201:
 *              description: crop details saved successfully
 *          400:
 *              description: failed to save data
 *          403:
 *              description: authorization error
 */

router.post('/',validateToken, isValidUser,multer({storage:storage}).single("image"),postCropDetails);

/**
 * @swagger
 * /crops/:cropId:
 *  put:
 *      summary: update data for specific crop details
 *      description: updates data for given crop id
 *      responses:
 *          201:
 *              description: crop details updated successfully
 *          400:
 *              description: failed to update data | Invalid User to update data
 *          403:
 *              description: authorization error
 */

router.put('/:cropId', validateToken, isValidUser, updateCropDetails);

/**
 * @swagger
 * /crops/:cropId:
 *  delete:
 *      summary: deletes a specific crop data
 *      description: delete crop details in database
 *      responses:
 *          200:
 *              description: crop details deleted successfully
 *          401:
 *              description: failed to delete crop data | Invalid User to delete data
 *          403:
 *              description: authorization error
 */

router.delete('/:cropId', validateToken, isValidUser, deleteCropById);


module.exports=router;
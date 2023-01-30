const express = require('express');
const { body } = require('express-validator');

const amenityController = require('../controllers/amenity');

const router = express.Router();

router.get('/amenities', amenityController.getAllAmenities);

router.get('/amenity/', amenityController.getSingleAmenity);

router.delete('/amenity/', amenityController.deleteAmenity);

router.post('/amenity',
    [
        body('title')
            .notEmpty()
            .withMessage('Please enter amenity title!'),
        body('logo')
            .notEmpty()
            .withMessage("Please enter the amenity's logo"),
        body('cta')
            .trim()
            .notEmpty()
            .withMessage("Please enter the amenity's cta"),
        body('horizontal')
            .trim()
            .notEmpty()
            .withMessage("Please enter the amenity's orientation"),
    ],
    amenityController.addAmenity
);

router.put('/amenity',
    [
        body('title')
            .notEmpty()
            .withMessage('Please enter amenity title!'),
        body('logo')
            .notEmpty()
            .withMessage("Please enter the amenity's logo"),
        body('cta')
            .trim()
            .notEmpty()
            .withMessage("Please enter the amenity's cta"),
        body('horizontal')
            .trim()
            .notEmpty()
            .withMessage("Please enter the amenity's orientation"),
    ],
    amenityController.updateAmenity);

module.exports = router;
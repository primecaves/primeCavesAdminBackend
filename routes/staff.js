const express = require('express');
const { body } = require('express-validator');

const staffController = require('../controllers/staff');

const router = express.Router();

router.get('/staffs', staffController.getAllStaffs);

router.get('/staff/', staffController.getSingleStaff);

router.delete('/staff/', staffController.deleteStaff);

router.post('/staff',
    [
        body('title')
            .notEmpty()
            .withMessage('Please enter staff title!'),
        body('logo')
            .notEmpty()
            .withMessage("Please enter the staff's logo"),
        body('cta')
            .trim()
            .notEmpty()
            .withMessage("Please enter the staff's cta"),
        body('horizontal')
            .trim()
            .notEmpty()
            .withMessage("Please enter the staff's orientation"),
    ],
    staffController.addStaff
);

router.put('/staff',
    [
        body('title')
            .notEmpty()
            .withMessage('Please enter staff title!'),
        body('logo')
            .notEmpty()
            .withMessage("Please enter the staff's logo"),
        body('cta')
            .trim()
            .notEmpty()
            .withMessage("Please enter the staff's cta"),
        body('horizontal')
            .trim()
            .notEmpty()
            .withMessage("Please enter the staff's orientation"),
    ],
    staffController.updateStaff);

module.exports = router;
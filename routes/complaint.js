const express = require('express');
const { body } = require('express-validator');

const complaintController = require('../controllers/complaint');

const router = express.Router();

router.get('/complaints', complaintController.getAllComplaints);

router.get('/complaint/', complaintController.getSingleComplaint);

router.delete('/complaint/', complaintController.deleteComplaint);

router.post('/complaint',
    [
        body('title')
            .notEmpty()
            .withMessage('Please enter complaint title!'),
        body('logo')
            .notEmpty()
            .withMessage("Please enter the complaint's logo"),
        body('cta')
            .trim()
            .notEmpty()
            .withMessage("Please enter the complaint's cta"),
        body('horizontal')
            .trim()
            .notEmpty()
            .withMessage("Please enter the complaint's orientation"),
    ],
    complaintController.addComplaint
);

router.put('/complaint',
    [
        body('title')
            .notEmpty()
            .withMessage('Please enter complaint title!'),
        body('logo')
            .notEmpty()
            .withMessage("Please enter the complaint's logo"),
        body('cta')
            .trim()
            .notEmpty()
            .withMessage("Please enter the complaint's cta"),
        body('horizontal')
            .trim()
            .notEmpty()
            .withMessage("Please enter the complaint's orientation"),
    ],
    complaintController.updateComplaint);

module.exports = router;
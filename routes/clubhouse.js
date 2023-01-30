const express = require('express');
const { body } = require('express-validator');

const clubhouseController = require('../controllers/clubhouse');

const router = express.Router();

router.get('/clubhouses', clubhouseController.getAllClubhouses);

router.get('/clubhouse/', clubhouseController.getSingleClubhouse);

router.delete('/clubhouse/', clubhouseController.deleteClubhouse);

router.post('/clubhouse',
    [
        body('title')
            .notEmpty()
            .withMessage('Please enter clubhouse title!'),
        body('logo')
            .notEmpty()
            .withMessage("Please enter the clubhouse's logo"),
        body('cta')
            .trim()
            .notEmpty()
            .withMessage("Please enter the clubhouse's cta"),
        body('horizontal')
            .trim()
            .notEmpty()
            .withMessage("Please enter the clubhouse's orientation"),
    ],
    clubhouseController.addClubhouse
);

router.put('/clubhouse',
    [
        body('title')
            .notEmpty()
            .withMessage('Please enter clubhouse title!'),
        body('logo')
            .notEmpty()
            .withMessage("Please enter the clubhouse's logo"),
        body('cta')
            .trim()
            .notEmpty()
            .withMessage("Please enter the clubhouse's cta"),
        body('horizontal')
            .trim()
            .notEmpty()
            .withMessage("Please enter the clubhouse's orientation"),
    ],
    clubhouseController.updateClubhouse);

module.exports = router;
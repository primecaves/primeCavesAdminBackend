const express = require('express');
const { body } = require('express-validator');

const securityController = require('../controllers/security');

const router = express.Router();

router.get('/securities', securityController.getAllSecurities);

router.get('/security/', securityController.getSingleSecurity);

router.delete('/security/', securityController.deleteSecurity);

router.post('/security',
    [
        body('title')
            .notEmpty()
            .withMessage('Please enter security title!'),
        body('logo')
            .notEmpty()
            .withMessage("Please enter the security's logo"),
        body('cta')
            .trim()
            .notEmpty()
            .withMessage("Please enter the security's cta"),
        body('horizontal')
            .trim()
            .notEmpty()
            .withMessage("Please enter the security's orientation"),
    ],
    securityController.addSecurity
);

router.put('/security',
    [
        body('title')
            .notEmpty()
            .withMessage('Please enter security title!'),
        body('logo')
            .notEmpty()
            .withMessage("Please enter the security's logo"),
        body('cta')
            .trim()
            .notEmpty()
            .withMessage("Please enter the security's cta"),
        body('horizontal')
            .trim()
            .notEmpty()
            .withMessage("Please enter the security's orientation"),
    ],
    securityController.updateSecurity);

module.exports = router;
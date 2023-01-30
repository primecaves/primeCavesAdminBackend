const express = require('express');
const { body } = require('express-validator');

const maintenanceController = require('../controllers/maintenance');

const router = express.Router();

router.get('/maintenance', maintenanceController.getAllMaintenances);

router.get('/maintenance', maintenanceController.getSingleMaintenance);

router.delete('/maintenance', maintenanceController.deleteMaintenance);

router.post('/maintenance',
    [
        body('maintenance_name')
            .notEmpty()
            .withMessage('Please enter maintenance name!'),
        body('maintenance_type')
            .notEmpty()
            .withMessage("Please enter the maintenance's type"),
        body('staff_role')
            .trim(),
        body('maintenance_cost')
            .trim()
            .notEmpty()
            .withMessage("Please enter the maintenance cost"),
        body('image')
            .trim()
            .notEmpty()
            .withMessage("Please enter the maintenance image"),
    ],
    maintenanceController.addMaintenance
);

router.put('/maintenance',
    [
        body('maintenance_name')
            .notEmpty()
            .withMessage('Please enter maintenance name!'),
        body('maintenance_type')
            .notEmpty()
            .withMessage("Please enter the maintenance's type"),
        body('staff_role')
            .trim(),
        body('maintenance_cost')
            .trim()
            .notEmpty()
            .withMessage("Please enter the maintenance cost"),
        body('image')
            .trim()
            .notEmpty()
            .withMessage("Please enter the maintenance image"),
    ],
    maintenanceController.updateMaintenance);

module.exports = router;
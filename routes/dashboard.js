const express = require('express');
const { body } = require('express-validator');

const dashboardController = require('../controllers/dashboard');

const router = express.Router();

router.get('/dashboards', dashboardController.getAllDashboards);

router.get('/dashboard', dashboardController.getSingleDashboard);

router.get('/dashboardDetails', dashboardController.getDashboardDetails);

router.delete('/dashboard', dashboardController.deleteDashboard);

router.post('/dashboard',
    [
        body('service_type')
            .notEmpty()
            .withMessage('Please enter dashboard service type!'),
        body('value')
            .notEmpty()
            .withMessage("Please enter the dashboard value"),

    ],
    dashboardController.addDashboard
);

router.put('/dashboard',
    [
        body('service_type')
            .notEmpty()
            .withMessage('Please enter dashboard service type!'),
        body('value')
            .notEmpty()
            .withMessage("Please enter the dashboard value"),
        body('pieDashboard')
            .notEmpty()
            .withMessage("Please enter  Pie dashboard value"),
        body('blockWiseFlat')
            .notEmpty()
            .withMessage("Please enter  blockwisefalt dashboard value"),
        body('tableDashboard')
            .notEmpty()
            .withMessage("Please enter  table dashboard value"),
    ],
    dashboardController.updateDashboard);

module.exports = router;
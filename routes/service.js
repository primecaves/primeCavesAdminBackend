const express = require('express');
const { body } = require('express-validator');

const menuController = require('../controllers/service');

const router = express.Router();

// router.get('/service', menuController.getAllMenus);

router.get('/service', menuController.getServiceByServiceType);

module.exports = router;
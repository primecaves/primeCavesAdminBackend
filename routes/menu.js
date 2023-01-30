const express = require('express');
const { body } = require('express-validator');

const menuController = require('../controllers/menu');

const router = express.Router();

router.get('/menus', menuController.getAllMenus);

router.get('/menu/', menuController.getSingleMenu);

router.delete('/menu/', menuController.deleteMenu);

router.post('/menu',
    [
        body('title')
            .notEmpty()
            .withMessage('Please enter menu title!'),
        body('logo')
            .notEmpty()
            .withMessage("Please enter the menu's logo"),
        body('cta')
            .trim()
            .notEmpty()
            .withMessage("Please enter the menu's cta"),
        body('horizontal')
            .trim()
            .notEmpty()
            .withMessage("Please enter the menu's orientation"),
    ],
    menuController.addMenu
);

router.put('/menu',
    [
        body('title')
            .notEmpty()
            .withMessage('Please enter menu title!'),
        body('logo')
            .notEmpty()
            .withMessage("Please enter the menu's logo"),
        body('cta')
            .trim()
            .notEmpty()
            .withMessage("Please enter the menu's cta"),
        body('horizontal')
            .trim()
            .notEmpty()
            .withMessage("Please enter the menu's orientation"),
    ],
    menuController.updateMenu);

module.exports = router;
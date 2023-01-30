const Menu = require('../models/menu');
const sydFunctions = require('../utils/syd-functions');

exports.getAllMenus = async (req, res, next) => {
    try {
        const list = await Menu.find()
        res.status(200).json({ message: "List of menus", data: list });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Recovery failed!' });
    }
};

exports.getSingleMenu = async (req, res, next) => {
    const { id } = req.query;
    try {
        const menu = await Menu.findById(id)
        if (!menu) {
            return res.status(404).json({ message: 'Menu not found!' });
        }
        res.status(200).json({ message: "Retrieved menu", menu: menu });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Recovery failed!' });
    }

};

exports.addMenu = async (req, res, next) => {
    const errorMessage = sydFunctions.validators(req, res);
    console.log('Retrieved errorMessage', errorMessage);
    if (errorMessage) {
        return res.status(422).json({ message: 'Validation error', error: errorMessage });
    }
    const menu = new Menu({
        title: req.body.title,
        logo: req.body.logo,
        cta: req.body.cta,
        horizontal: req.body.horizontal,
    });

    try {
        const result = await menu.save()
        console.log('result', result);
        return res.status(201).json({
            message: "Menu is successfully added!",
            menu: result
        });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Creation failed!' });
    }
};

exports.updateMenu = async (req, res, next) => {
    const errorMessage = sydFunctions.validators(req, res);
    console.log('Retrieved errorMessage', errorMessage);
    if (errorMessage) {
        return res.status(422).json({ message: 'Validation failed!', error: errorMessage });
    }
    const { id } = req.query;
    try {
        const menu = await Menu.findById(id);
        if (!menu) {
            return res.status(404).json({ message: 'Menu not found!' });
        }
        menu.title = req.body.title
        menu.logo = req.body.logo
        menu.cta = req.body.cta
        menu.horizontal = req.body.horizontal
        const result = await menu.save();
        res.status(200).json({ 'message': 'Modification successfully completed!', menu: result });

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Update failed!' });
    }

};

exports.deleteMenu = async (req, res, next) => {
    const { id } = req.query;
    try {
        const menu = await Menu.findById(id);
        console.log("🚀 ~ file: menu.js:91 ~ exports.deleteMenu ~ menu", menu)
        if (!menu) {
            return res.status(404).json({ message: 'Menu not found!' });
        }
        await Menu.findByIdAndRemove(id);
        res.status(200).json({ 'message': 'Deletion completed successfully!' });

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Delete failed!' });
    }
};


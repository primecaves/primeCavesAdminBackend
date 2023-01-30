const Security = require('../models/security');
const sydFunctions = require('../utils/syd-functions');

exports.getAllSecurities = async (req, res, next) => {
    try {
        const list = await Security.find()
        res.status(200).json({ message: "List of securitys", data: list });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Recovery failed!' });
    }
};

exports.getSingleSecurity = async (req, res, next) => {
    const { id } = req.query;
    try {
        const security = await Security.findById(id)
        if (!security) {
            return res.status(404).json({ message: 'Security not found!' });
        }
        res.status(200).json({ message: "Retrieved security", security: security });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Recovery failed!' });
    }

};

exports.addSecurity = async (req, res, next) => {
    const errorMessage = sydFunctions.validators(req, res);
    console.log('Retrieved errorMessage', errorMessage);
    if (errorMessage) {
        return res.status(422).json({ message: 'Validation error', error: errorMessage });
    }
    const security = new Security({
        title: req.body.title,
        logo: req.body.logo,
        cta: req.body.cta,
        horizontal: req.body.horizontal,
    });

    try {
        const result = await security.save()
        console.log('result', result);
        return res.status(201).json({
            message: "Security is successfully added!",
            security: result
        });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Creation failed!' });
    }
};

exports.updateSecurity = async (req, res, next) => {
    const errorMessage = sydFunctions.validators(req, res);
    console.log('Retrieved errorMessage', errorMessage);
    if (errorMessage) {
        return res.status(422).json({ message: 'Validation failed!', error: errorMessage });
    }
    const { id } = req.query;
    try {
        const security = await Security.findById(id);
        if (!security) {
            return res.status(404).json({ message: 'Security not found!' });
        }
        security.title = req.body.title
        security.logo = req.body.logo
        security.cta = req.body.cta
        security.horizontal = req.body.horizontal
        const result = await security.save();
        res.status(200).json({ 'message': 'Modification successfully completed!', security: result });

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Update failed!' });
    }

};

exports.deleteSecurity = async (req, res, next) => {
    const { id } = req.query;
    try {
        const security = await Security.findById(id);
        if (!security) {
            return res.status(404).json({ message: 'Security not found!' });
        }
        await Security.findByIdAndRemove(id);
        res.status(200).json({ 'message': 'Deletion completed successfully!' });

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Delete failed!' });
    }
};


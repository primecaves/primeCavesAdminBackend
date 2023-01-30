const Clubhouse = require('../models/clubhouse');
const sydFunctions = require('../utils/syd-functions');

exports.getAllClubhouses = async (req, res, next) => {
    try {
        const list = await Clubhouse.find()
        res.status(200).json({ message: "List of clubhouses", data: list });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Recovery failed!' });
    }
};

exports.getSingleClubhouse = async (req, res, next) => {
    const { id } = req.query;
    try {
        const clubhouse = await Clubhouse.findById(id)
        if (!clubhouse) {
            return res.status(404).json({ message: 'Clubhouse not found!' });
        }
        res.status(200).json({ message: "Retrieved clubhouse", clubhouse: clubhouse });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Recovery failed!' });
    }

};

exports.addClubhouse = async (req, res, next) => {
    const errorMessage = sydFunctions.validators(req, res);
    console.log('Retrieved errorMessage', errorMessage);
    if (errorMessage) {
        return res.status(422).json({ message: 'Validation error', error: errorMessage });
    }
    const clubhouse = new Clubhouse({
        title: req.body.title,
        logo: req.body.logo,
        cta: req.body.cta,
        horizontal: req.body.horizontal,
    });

    try {
        const result = await clubhouse.save()
        console.log('result', result);
        return res.status(201).json({
            message: "Clubhouse is successfully added!",
            clubhouse: result
        });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Creation failed!' });
    }
};

exports.updateClubhouse = async (req, res, next) => {
    const errorMessage = sydFunctions.validators(req, res);
    console.log('Retrieved errorMessage', errorMessage);
    if (errorMessage) {
        return res.status(422).json({ message: 'Validation failed!', error: errorMessage });
    }
    const { id } = req.query;
    try {
        const clubhouse = await Clubhouse.findById(id);
        if (!clubhouse) {
            return res.status(404).json({ message: 'Clubhouse not found!' });
        }
        clubhouse.title = req.body.title
        clubhouse.logo = req.body.logo
        clubhouse.cta = req.body.cta
        clubhouse.horizontal = req.body.horizontal
        const result = await clubhouse.save();
        res.status(200).json({ 'message': 'Modification successfully completed!', clubhouse: result });

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Update failed!' });
    }

};

exports.deleteClubhouse = async (req, res, next) => {
    const { id } = req.query;
    try {
        const clubhouse = await Clubhouse.findById(id);
        if (!clubhouse) {
            return res.status(404).json({ message: 'Clubhouse not found!' });
        }
        await Clubhouse.findByIdAndRemove(id);
        res.status(200).json({ 'message': 'Deletion completed successfully!' });

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Delete failed!' });
    }
};


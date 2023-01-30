const Amenity = require('../models/amenity');
const sydFunctions = require('../utils/syd-functions');

exports.getAllAmenities = async (req, res, next) => {
    try {
        const list = await Amenity.find()
        res.status(200).json({ message: "List of amenities", data: list });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Recovery failed!' });
    }
};

exports.getSingleAmenity = async (req, res, next) => {
    const { id } = req.query;
    try {
        const amenity = await Amenity.findById(id)
        if (!amenity) {
            return res.status(404).json({ message: 'Amenity not found!' });
        }
        res.status(200).json({ message: "Retrieved amenity", amenity: amenity });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Recovery failed!' });
    }

};

exports.addAmenity = async (req, res, next) => {
    const errorMessage = sydFunctions.validators(req, res);
    console.log('Retrieved errorMessage', errorMessage);
    if (errorMessage) {
        return res.status(422).json({ message: 'Validation error', error: errorMessage });
    }
    const amenity = new Amenity({
        title: req.body.title,
        logo: req.body.logo,
        cta: req.body.cta,
        horizontal: req.body.horizontal,
    });

    try {
        const result = await amenity.save()
        console.log('result', result);
        return res.status(201).json({
            message: "Amenity is successfully added!",
            amenity: result
        });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Creation failed!' });
    }
};

exports.updateAmenity = async (req, res, next) => {
    const errorMessage = sydFunctions.validators(req, res);
    console.log('Retrieved errorMessage', errorMessage);
    if (errorMessage) {
        return res.status(422).json({ message: 'Validation failed!', error: errorMessage });
    }
    const { id } = req.query;
    try {
        const amenity = await Amenity.findById(id);
        if (!amenity) {
            return res.status(404).json({ message: 'Amenity not found!' });
        }
        amenity.title = req.body.title
        amenity.logo = req.body.logo
        amenity.cta = req.body.cta
        amenity.horizontal = req.body.horizontal
        const result = await amenity.save();
        res.status(200).json({ 'message': 'Modification successfully completed!', amenity: result });

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Update failed!' });
    }

};

exports.deleteAmenity = async (req, res, next) => {
    const { id } = req.query;
    try {
        const amenity = await Amenity.findById(id);
        if (!amenity) {
            return res.status(404).json({ message: 'Amenity not found!' });
        }
        await Amenity.findByIdAndRemove(id);
        res.status(200).json({ 'message': 'Deletion completed successfully!' });

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Delete failed!' });
    }
};


const Staff = require('../models/staff');
const sydFunctions = require('../utils/syd-functions');

exports.getAllStaffs = async (req, res, next) => {
    try {
        const list = await Staff.find()
        res.status(200).json({ message: "List of staffs", data: list });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Recovery failed!' });
    }
};

exports.getSingleStaff = async (req, res, next) => {
    const { id } = req.query;
    try {
        const staff = await Staff.findById(id)
        if (!staff) {
            return res.status(404).json({ message: 'Staff not found!' });
        }
        res.status(200).json({ message: "Retrieved staff", staff: staff });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Recovery failed!' });
    }

};

exports.addStaff = async (req, res, next) => {
    const errorMessage = sydFunctions.validators(req, res);
    console.log('Retrieved errorMessage', errorMessage);
    if (errorMessage) {
        return res.status(422).json({ message: 'Validation error', error: errorMessage });
    }
    const staff = new Staff({
        title: req.body.title,
        logo: req.body.logo,
        cta: req.body.cta,
        horizontal: req.body.horizontal,
    });

    try {
        const result = await staff.save()
        console.log('result', result);
        return res.status(201).json({
            message: "Staff is successfully added!",
            staff: result
        });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Creation failed!' });
    }
};

exports.updateStaff = async (req, res, next) => {
    const errorMessage = sydFunctions.validators(req, res);
    console.log('Retrieved errorMessage', errorMessage);
    if (errorMessage) {
        return res.status(422).json({ message: 'Validation failed!', error: errorMessage });
    }
    const { id } = req.query;
    try {
        const staff = await Staff.findById(id);
        if (!staff) {
            return res.status(404).json({ message: 'Staff not found!' });
        }
        staff.title = req.body.title
        staff.logo = req.body.logo
        staff.cta = req.body.cta
        staff.horizontal = req.body.horizontal
        const result = await staff.save();
        res.status(200).json({ 'message': 'Modification successfully completed!', staff: result });

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Update failed!' });
    }

};

exports.deleteStaff = async (req, res, next) => {
    const { id } = req.query;
    try {
        const staff = await Staff.findById(id);
        if (!staff) {
            return res.status(404).json({ message: 'Staff not found!' });
        }
        await Staff.findByIdAndRemove(id);
        res.status(200).json({ 'message': 'Deletion completed successfully!' });

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Delete failed!' });
    }
};


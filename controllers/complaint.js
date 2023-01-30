const Complaint = require('../models/complaint');
const sydFunctions = require('../utils/syd-functions');

exports.getAllComplaints = async (req, res, next) => {
    try {
        const list = await Complaint.find()
        res.status(200).json({ message: "List of complaints", data: list });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Recovery failed!' });
    }
};

exports.getSingleComplaint = async (req, res, next) => {
    const { id } = req.query;
    try {
        const complaint = await Complaint.findById(id)
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found!' });
        }
        res.status(200).json({ message: "Retrieved complaint", complaint: complaint });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Recovery failed!' });
    }

};

exports.addComplaint = async (req, res, next) => {
    const errorMessage = sydFunctions.validators(req, res);
    console.log('Retrieved errorMessage', errorMessage);
    if (errorMessage) {
        return res.status(422).json({ message: 'Validation error', error: errorMessage });
    }
    const complaint = new Complaint({
        title: req.body.title,
        logo: req.body.logo,
        cta: req.body.cta,
        horizontal: req.body.horizontal,
    });

    try {
        const result = await complaint.save()
        console.log('result', result);
        return res.status(201).json({
            message: "Complaint is successfully added!",
            complaint: result
        });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Creation failed!' });
    }
};

exports.updateComplaint = async (req, res, next) => {
    const errorMessage = sydFunctions.validators(req, res);
    console.log('Retrieved errorMessage', errorMessage);
    if (errorMessage) {
        return res.status(422).json({ message: 'Validation failed!', error: errorMessage });
    }
    const { id } = req.query;
    try {
        const complaint = await Complaint.findById(id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found!' });
        }
        complaint.title = req.body.title
        complaint.logo = req.body.logo
        complaint.cta = req.body.cta
        complaint.horizontal = req.body.horizontal
        const result = await complaint.save();
        res.status(200).json({ 'message': 'Modification successfully completed!', complaint: result });

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Update failed!' });
    }

};

exports.deleteComplaint = async (req, res, next) => {
    const { id } = req.query;
    try {
        const complaint = await Complaint.findById(id);
        if (!complaint) {
            return res.status(404).json({ message: 'Complaint not found!' });
        }
        await Complaint.findByIdAndRemove(id);
        res.status(200).json({ 'message': 'Deletion completed successfully!' });

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Delete failed!' });
    }
};


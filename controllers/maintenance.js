const Maintenance = require('../models/maintenance');
const sydFunctions = require('../utils/syd-functions');

exports.getAllMaintenances = async (req, res, next) => {
    try {
        const list = await Maintenance.find()
        res.status(200).json({
            message: "List of maintenances",
            key_to_remove: ['_id', 'createdAt', 'updatedAt', '__v', 'image', 'id'],
            display_name_key: 'maintenance_name',
            filter_key: 'maintenance_type',
            data: list
        });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Recovery failed!' });
    }
};

exports.getSingleMaintenance = async (req, res, next) => {
    const { id } = req.query;
    try {
        const maintenance = await Maintenance.findById(id)
        if (!maintenance) {
            return res.status(404).json({ message: 'Maintenance not found!' });
        }
        res.status(200).json({ message: "Retrieved maintenance", maintenance: maintenance });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Recovery failed!' });
    }

};

exports.addMaintenance = async (req, res, next) => {
    const errorMessage = sydFunctions.validators(req, res);
    console.log('Retrieved errorMessage', errorMessage);
    if (errorMessage) {
        return res.status(422).json({ message: 'Validation error', error: errorMessage });
    }
    const maintenance = new Maintenance({
        maintenance_name: req.body.maintenance_name,
        maintenance_type: req.body.maintenance_type,
        staff_role: req.body.staff_role,
        maintenance_cost: req.body.maintenance_cost,
        image: req.body.image,
    });

    try {
        const result = await maintenance.save()
        console.log('result', result);
        return res.status(201).json({
            message: "Maintenance is successfully added!",
            maintenance: result
        });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Creation failed!' });
    }
};

exports.updateMaintenance = async (req, res, next) => {
    const errorMessage = sydFunctions.validators(req, res);
    if (errorMessage) {
        return res.status(422).json({ message: 'Validation failed!', error: errorMessage });
    }
    const { id } = req.query;
    try {
        const maintenance = await Maintenance.findById(id);
        if (!maintenance) {
            return res.status(404).json({ message: 'Maintenance not found!' });
        }
        maintenance.maintenance_name = req.body.maintenance_name;
        maintenance.maintenance_type = req.body.maintenance_type;
        maintenance.staff_role = req.body.staff_role;
        maintenance.maintenance_cost = req.body.maintenance_cost;
        maintenance.image = req.body.image;
        const result = await maintenance.save();
        res.status(200).json({ 'message': 'Modification successfully completed!', maintenance: result });

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Update failed!' });
    }

};

exports.deleteMaintenance = async (req, res, next) => {
    const { id } = req.query;
    try {
        const maintenance = await Maintenance.findById(id);
        if (!maintenance) {
            return res.status(404).json({ message: 'Maintenance not found!' });
        }
        await Maintenance.findByIdAndRemove(id);
        res.status(200).json({ 'message': 'Deletion completed successfully!' });

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Delete failed!' });
    }
};


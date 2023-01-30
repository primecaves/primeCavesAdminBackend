
const Maintenance = require('../models/maintenance');
const Clubhouse = require('../models/clubhouse');
const Amenity = require('../models/amenity');
const Staff = require('../models/staff');
const Complaint = require('../models/complaint');
const Security = require('../models/security');
const _size = require('lodash/size')

exports.getServiceByServiceType = async (req, res, next) => {
    const { serviceType } = req.query;
    try {
        if (!serviceType) {
            return res.status(404).json({ message: 'Service not found!' });
        }
        var data
        if (serviceType === 'maintenance') {
            const value = await Maintenance.find()
            data = {
                count: _size(value),
                display_name_key: 'maintenance_name',
                filter_key: 'maintenance_type',
                value,
            }
        }
        else if (serviceType === 'amenity') {
            const value = await Amenity.find()
            data = {
                count: _size(value),
                display_name_key: 'maintenance_name',
                filter_key: 'maintenance_type',
                value,
            }
        }
        else if (serviceType === 'clubhouse') {
            const value = await Clubhouse.find()
            data = {
                count: _size(value),
                display_name_key: 'maintenance_name',
                filter_key: 'maintenance_type',
                value,
            }
        }
        else if (serviceType === 'staff') {
            const value = await Staff.find()
            data = {
                count: _size(value),
                display_name_key: 'maintenance_name',
                filter_key: 'maintenance_type',
                value,
            }
        }
        else if (serviceType === 'complaint') {
            const value = await Complaint.find()
            data = {
                count: _size(value),
                display_name_key: 'maintenance_name',
                filter_key: 'maintenance_type',
                value,
            }
        }
        else if (serviceType === 'security') {
            const value = await Security.find()
            data = {
                count: _size(value),
                display_name_key: 'maintenance_name',
                filter_key: 'maintenance_type',
                value,
            }
        }
        return res.status(200).json({
            response: 200,
            message: "Service Retrieved",
            data,
        });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({
            response: 500,
            message: 'Recovery failed!'
        });
    }

};

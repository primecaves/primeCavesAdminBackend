const { pieDashbaordData, blockWiseFlatData, tableData } = require('../constants/mockResponses');
const Dashboard = require('../models/dashboard');
const sydFunctions = require('../utils/syd-functions');
const _get = require('lodash/get')

exports.getAllDashboards = async (req, res, next) => {
    try {
        const data = await Dashboard.find()
        res.status(200).json({ message: "List of dashboards", data });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Recovery failed!' });
    }
};

exports.getSingleDashboard = async (req, res, next) => {
    const { service_type } = req.query;
    try {
        const dashboard = await Dashboard.findOne({ service_type })
        if (!dashboard) {
            return res.status(404).json({
                response: 404,
                message: 'Dashboard not found!'
            });
        }
        res.status(200).json({
            response: 200,
            message: "Retrieved dashboard",
            data: dashboard
        });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ response: 500, message: 'Recovery failed!' });
    }

};
exports.getDashboardDetails = async (req, res, next) => {
    const { service_type } = req.query;
    const { dashboard_type } = req.query;
    try {
        const dashboard = await Dashboard.findOne({ service_type });
        console.log("dashboard", dashboard)
        const dashboardDetails = _get(dashboard, dashboard_type,)

        if (!dashboard) {
            return res.status(404).json({
                response: 404,
                message: 'Dashboard not found!'
            });
        }
        res.status(200).json({
            response: 200,
            message: "Retrieved dashboard details",
            data: dashboardDetails
        });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ response: 500, message: 'Recovery failed!' });
    }

};
exports.addDashboard = async (req, res, next) => {
    const errorMessage = sydFunctions.validators(req, res);
    if (errorMessage) {
        return res.status(422).json({ message: 'Validation error', error: errorMessage });
    }
    const dashboard = new Dashboard({
        service_type: req.body.service_type,
        value: req.body.value,
        pieDashboard: pieDashbaordData,
        blockWiseFlat: blockWiseFlatData,
        tableDashboard: tableData,
    });

    try {
        const result = await dashboard.save()
        console.log('result', result);
        return res.status(201).json({
            message: "Dashboard is successfully added!",
            dashboard: result
        });
    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Creation failed!' });
    }
};

exports.updateDashboard = async (req, res, next) => {
    const errorMessage = sydFunctions.validators(req, res);
    console.log('Retrieved errorMessage', errorMessage);
    if (errorMessage) {
        return res.status(422).json({ message: 'Validation failed!', error: errorMessage });
    }
    const { id } = req.query;
    try {
        const dashboard = await Dashboard.findById(id);
        if (!dashboard) {
            return res.status(404).json({ message: 'Dashboard not found!' });
        }
        dashboard.service_type = req.body.service_type;
        dashboard.value = req.body.value;
        const result = await dashboard.save();
        res.status(200).json({ 'message': 'Modification successfully completed!', dashboard: result });

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Update failed!' });
    }

};

exports.deleteDashboard = async (req, res, next) => {
    const { id } = req.query;
    try {
        const dashboard = await Dashboard.findById(id);
        if (!dashboard) {
            return res.status(404).json({ message: 'Dashboard not found!' });
        }
        await Dashboard.findByIdAndRemove(id);
        res.status(200).json({ 'message': 'Deletion completed successfully!' });

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Delete failed!' });
    }
};


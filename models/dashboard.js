const mongoose = require('mongoose');


const miniDashboardSchema = mongoose.Schema({
    key: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    show_navigation: {
        type: Boolean,
        required: true,
    },
    dashboard_type: {
        type: String,
    },
});

const dashboardSchema = mongoose.Schema(
    {
        service_type: { type: String },
        value: [miniDashboardSchema],
        pieDashboard: { type: Object },
        blockWiseFlat: { type: Object },
        tableDashboard: { type: Object },

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Dashboard', dashboardSchema);
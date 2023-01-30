const mongoose = require('mongoose');
const maintenanceSchema = mongoose.Schema(
    {
        maintenance_name: { type: String },
        maintenance_type: { type: String },
        staff_role: { type: String },
        maintenance_cost: { type: String },
        image: { type: String },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Maintenance', maintenanceSchema);
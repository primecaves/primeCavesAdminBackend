const mongoose = require('mongoose');
const serviceSchema = mongoose.Schema(
    {
        name: { type: String },
        age: { type: Number },
        bio: { type: String },
        photoUrl: { type: String },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Service', serviceSchema);
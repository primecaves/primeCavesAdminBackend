const mongoose = require('mongoose');
const clubhouseSchema = mongoose.Schema(
    {
        title: { type: String },
        logo: { type: String },
        cta: { type: String },
        horizontal: { type: Boolean },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Clubhouse', clubhouseSchema);
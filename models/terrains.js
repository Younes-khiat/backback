const mongoose = require('mongoose');

const terrainsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    size: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
}, { timestamps: true });
module.exports = mongoose.model('Terrains', terrainsSchema);
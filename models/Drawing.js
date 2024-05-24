const mongoose = require('mongoose');

const DrawingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Drawing = mongoose.model('Drawing', DrawingSchema);
module.exports = Drawing;

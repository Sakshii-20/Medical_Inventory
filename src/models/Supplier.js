const mongoose = require('mongoose');
const supplierSchema = new mongoose.Schema({
    supplierId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model("Supplier", supplierSchema);

const mongoose = require('mongoose');


const medicineSchema = new mongoose.Schema({
    medicineId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    batchNo: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",   
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Medicine", medicineSchema);

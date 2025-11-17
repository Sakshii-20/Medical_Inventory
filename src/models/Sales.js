const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    saleId: {
        type: String,
        required: true,
        unique: true
    },
    medicineId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicine",   
        required: true
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",   
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",       
        required: true
    },
    quantitySold: {
        type: Number,
        required: true,
        min: 1
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    saleDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model("Sales", salesSchema);

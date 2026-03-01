const mongoose = require('mongoose');

const proformaSchema = new mongoose.Schema({
    nivSelections: [{
        lastLastYearNIVSource: String,
        lastLastYearNIVLocalAmount: Number,
        lastYearNIVSource: String,
        lastYearNIVLocalAmount: Number,
        thisYearNIVSource: String,
        thisYearNIVLocalAmount: Number,
        specificYearNIVSource: String,
        specificYearNIVLocalAmount: Number,
        halfYearNIVSource: String,
        halfYearNIVLocalAmount: Number
    }],
    summary: {
        totalAmount: {
            type: Number,
            required: true
        },
        status: {
            type: String,
            default: 'Draft'
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

proformaSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Proforma', proformaSchema);

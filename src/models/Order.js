const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    // Customer details (new format from checkout)
    customerName: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },

    // Legacy customer object (for compatibility)
    customer: {
        name: { type: String },
        email: { type: String },
        mobile: { type: String },
        address: { type: String },
        city: { type: String },
        state: { type: String },
        pinCode: { type: String }
    },

    // Products/items array
    items: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true }
    }],

    // Legacy products array (for compatibility)
    products: [{
        name: { type: String },
        price: { type: Number },
        quantity: { type: Number }
    }],

    // Order totals
    subtotal: { type: Number, required: true },
    shipping: { type: Number, default: 0 },
    deliveryCharge: { type: Number, default: 0 },
    total: { type: Number, required: true },

    // Payment & status
    paymentMethod: { type: String, default: 'COD' },
    paymentStatus: { type: String, default: 'Pending' },
    orderStatus: { type: String, default: 'Pending' },
    deliveryStatus: { type: String, default: 'Pending Delivery' },
    orderSource: { type: String, default: 'Website' },

    // Staff info (for agent/customer portal)
    staff: {
        name: { type: String },
        id: { type: String }
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

orderSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Order', orderSchema);

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single order
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findOne({ orderId: req.params.id });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new order
router.post('/', async (req, res) => {
    try {
        // Accept flexible order format from checkout
        const orderData = req.body;

        // Generate orderId if not provided
        const orderId = orderData.orderId || 'ORD-' + Date.now();

        // Convert items to products format if needed
        let products = [];
        if (orderData.items && Array.isArray(orderData.items)) {
            products = orderData.items.map(item => ({
                name: item.name,
                price: item.price,
                quantity: item.quantity
            }));
        } else if (orderData.products && Array.isArray(orderData.products)) {
            products = orderData.products;
        }

        // Extract customer info - handle both formats
        const customer = orderData.customer || {
            name: orderData.name || '',
            email: orderData.email || '',
            mobile: orderData.phone || '',
            address: orderData.address || '',
            city: orderData.city || '',
            state: orderData.state || '',
            pinCode: orderData.pincode || orderData.pinCode || ''
        };

        // Calculate totals
        const subtotal = orderData.subtotal || orderData.totalAmount ||
            products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
        const shipping = orderData.shipping || 0;
        const deliveryCharge = orderData.deliveryCharge || 0;
        const total = orderData.total || orderData.totalAmount || subtotal;

        // Create order object in the format the model expects
        const order = {
            orderId: orderId,
            products: products,
            customer: customer,
            staff: orderData.staff || {
                name: 'Website Customer',
                id: 'N/A'
            },
            subtotal: subtotal,
            shipping: shipping,
            deliveryCharge: deliveryCharge,
            total: total,
            paymentMethod: orderData.paymentMethod || 'COD',
            paymentStatus: orderData.paymentStatus || 'Pending',
            orderStatus: orderData.orderStatus || 'Pending',
            deliveryStatus: orderData.deliveryStatus || 'Pending Delivery',
            orderSource: orderData.orderSource || 'Website',
            createdAt: orderData.createdAt || new Date().toISOString()
        };

        const newOrder = new Order(order);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update order
router.put('/:id', async (req, res) => {
    try {
        const order = await Order.findOneAndUpdate(
            { orderId: req.params.id },
            { ...req.body, updatedAt: Date.now() },
            { new: true }
        );
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete order
router.delete('/:id', async (req, res) => {
    try {
        const order = await Order.findOneAndDelete({ orderId: req.params.id });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;

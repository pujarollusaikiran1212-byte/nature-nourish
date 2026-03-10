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
        const orderData = req.body;

        // Generate orderId if not provided
        const orderId = orderData.orderId || 'ORD-' + Date.now();

        // Convert items to products format
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

        // Build customer object
        const customer = {
            name: orderData.customerName || orderData.customer?.name || '',
            email: orderData.email || orderData.customer?.email || '',
            mobile: orderData.phone || orderData.customer?.mobile || '',
            address: orderData.address || orderData.customer?.address || '',
            city: orderData.city || orderData.customer?.city || '',
            state: orderData.state || orderData.customer?.state || '',
            pinCode: orderData.pincode || orderData.customer?.pinCode || ''
        };

        // Calculate totals
        const subtotal = orderData.subtotal || orderData.totalAmount ||
            products.reduce((sum, p) => sum + ((p.price || 0) * (p.quantity || 1)), 0);
        const shipping = orderData.shipping || 0;
        const deliveryCharge = orderData.deliveryCharge || 0;
        const total = orderData.total || orderData.totalAmount || subtotal;

        // Create order object
        const order = {
            orderId: orderId,
            // New format fields
            customerName: customer.name,
            email: customer.email,
            phone: customer.mobile,
            address: customer.address,
            city: customer.city,
            state: customer.state,
            pincode: customer.pinCode,
            items: products,
            // Legacy format for compatibility
            products: products,
            customer: customer,
            // Totals
            subtotal: subtotal,
            shipping: shipping,
            deliveryCharge: deliveryCharge,
            total: total,
            // Status
            paymentMethod: orderData.paymentMethod || 'COD',
            paymentStatus: orderData.paymentStatus || 'Pending',
            orderStatus: orderData.orderStatus || 'Pending',
            deliveryStatus: orderData.deliveryStatus || 'Pending Delivery',
            orderSource: orderData.orderSource || 'Website',
            // Staff info
            staff: orderData.staff || { name: 'Website Customer', id: 'N/A' },
            // Timestamps
            createdAt: orderData.createdAt || new Date().toISOString()
        };

        const newOrder = new Order(order);
        const savedOrder = await newOrder.save();

        console.log('Order saved:', savedOrder.orderId);
        res.status(201).json({
            success: true,
            orderId: savedOrder.orderId,
            message: 'Order placed successfully'
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(400).json({ success: false, message: error.message });
    }
});

// Update order status
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

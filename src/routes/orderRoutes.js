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

        console.log('Received order data:', JSON.stringify(orderData));

        // Generate orderId if not provided
        const orderId = orderData.orderId || 'ORD-' + Date.now();

        // Convert items to products format
        let products = [];
        if (orderData.items && Array.isArray(orderData.items) && orderData.items.length > 0) {
            products = orderData.items.map(item => ({
                name: String(item.name || ''),
                price: Number(item.price) || 0,
                quantity: Number(item.quantity) || 1
            }));
        } else if (orderData.products && Array.isArray(orderData.products) && orderData.products.length > 0) {
            products = orderData.products.map(p => ({
                name: String(p.name || ''),
                price: Number(p.price) || 0,
                quantity: Number(p.quantity) || 1
            }));
        }

        // Build customer object
        const customer = {
            name: String(orderData.customerName || orderData.customer?.name || ''),
            email: String(orderData.email || orderData.customer?.email || ''),
            mobile: String(orderData.phone || orderData.customer?.mobile || ''),
            address: String(orderData.address || orderData.customer?.address || ''),
            city: String(orderData.city || orderData.customer?.city || ''),
            state: String(orderData.state || orderData.customer?.state || ''),
            pinCode: String(orderData.pincode || orderData.customer?.pinCode || '')
        };

        // Calculate totals
        const subtotal = Number(orderData.subtotal) || Number(orderData.totalAmount) ||
            products.reduce((sum, p) => sum + ((p.price || 0) * (p.quantity || 1)), 0);
        const shipping = Number(orderData.shipping) || 0;
        const deliveryCharge = Number(orderData.deliveryCharge) || 0;
        const total = Number(orderData.total) || Number(orderData.totalAmount) || subtotal;

        // Validate required fields
        if (!customer.name || customer.name.trim() === '') {
            return res.status(400).json({ success: false, message: 'Customer name is required' });
        }
        if (!customer.mobile || customer.mobile.trim() === '') {
            return res.status(400).json({ success: false, message: 'Customer mobile is required' });
        }
        if (!customer.address || customer.address.trim() === '') {
            return res.status(400).json({ success: false, message: 'Customer address is required' });
        }
        if (!customer.city || customer.city.trim() === '') {
            return res.status(400).json({ success: false, message: 'Customer city is required' });
        }
        if (!customer.state || customer.state.trim() === '') {
            return res.status(400).json({ success: false, message: 'Customer state is required' });
        }
        if (!customer.pinCode || customer.pinCode.trim() === '') {
            return res.status(400).json({ success: false, message: 'Customer pincode is required' });
        }
        if (products.length === 0) {
            return res.status(400).json({ success: false, message: 'At least one product is required' });
        }

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

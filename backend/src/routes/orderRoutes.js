const express = require('express');
const router = express.Router();

// Mock data for testing without database
let mockOrders = [
    {
        _id: '507f1f77bcf86cd799439011',
        orderId: 'ORD-001',
        products: [{
            name: 'Solar Calm',
            price: 100,
            quantity: 1
        }],
        customer: {
            name: 'John Doe',
            email: 'john@example.com',
            mobile: '9876543210',
            address: '123 Main St',
            city: 'Mumbai',
            state: 'Maharashtra',
            pinCode: '400001'
        },
        staff: {
            name: 'Staff Member',
            id: 'STAFF-001'
        },
        subtotal: 100,
        shipping: 0,
        total: 100,
        paymentMethod: 'Cash on Delivery',
        paymentStatus: 'Pending',
        orderStatus: 'Pending',
        deliveryStatus: 'Pending Delivery',
        orderSource: 'Customer Portal',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

// Get all orders
router.get('/', (req, res) => {
    res.json(mockOrders);
});

// Get single order
router.get('/:id', (req, res) => {
    const order = mockOrders.find(o => o._id === req.params.id);
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
});

// Create new order
router.post('/', (req, res) => {
    const newOrder = {
        _id: Date.now().toString(),
        ...req.body,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    mockOrders.push(newOrder);
    res.status(201).json(newOrder);
});

// Update order
router.put('/:id', (req, res) => {
    const orderIndex = mockOrders.findIndex(o => o._id === req.params.id);
    if (orderIndex === -1) {
        return res.status(404).json({ message: 'Order not found' });
    }
    mockOrders[orderIndex] = {
        ...mockOrders[orderIndex],
        ...req.body,
        updatedAt: new Date().toISOString()
    };
    res.json(mockOrders[orderIndex]);
});

// Delete order
router.delete('/:id', (req, res) => {
    const orderIndex = mockOrders.findIndex(o => o._id === req.params.id);
    if (orderIndex === -1) {
        return res.status(404).json({ message: 'Order not found' });
    }
    mockOrders.splice(orderIndex, 1);
    res.json({ message: 'Order deleted successfully' });
});

module.exports = router;

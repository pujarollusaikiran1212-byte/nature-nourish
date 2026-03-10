require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB, getConnectionStatus } = require('./src/config/db');

const app = express();

// Configure CORS - Allow ALL origins (fixes custom domain issue)
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Express JSON middleware - required for parsing JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from backend folder
app.use(express.static(__dirname));

// API Routes
app.use('/api/products', require('./src/routes/productRoutes'));
app.use('/api/orders', require('./src/routes/orderRoutes'));
app.use('/api/proformas', require('./src/routes/proformaRoutes'));
app.use('/api/reviews', require('./src/routes/reviewRoutes'));

// NEW: Direct /place-order route for frontend checkout
app.post('/place-order', async (req, res) => {
    try {
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

        // Extract customer info
        const customer = orderData.customer || {
            name: orderData.name || '',
            email: orderData.email || '',
            mobile: orderData.phone || orderData.mobile || '',
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

        // Create order object
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

        // Import Order model and save
        const Order = require('./src/models/Order');
        const newOrder = new Order(order);
        const savedOrder = await newOrder.save();

        console.log('Order placed successfully:', savedOrder.orderId);
        res.status(201).json({
            success: true,
            orderId: savedOrder.orderId,
            message: 'Order placed successfully'
        });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

// Default health check route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Health check route
app.get('/api/health', (req, res) => {
    const dbStatus = getConnectionStatus();
    res.json({
        status: 'OK',
        message: 'Nature Nourish API is running',
        database: dbStatus ? 'Connected' : 'Disconnected'
    });
});

// Serve index.html for root route (for browser access)
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve admin.html for /admin route
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Serve customer-portal.html for /customer-portal route
app.get('/customer-portal', (req, res) => {
    res.sendFile(path.join(__dirname, 'customer-portal.html'));
});

// Serve checkout.html for /checkout route
app.get('/checkout', (req, res) => {
    res.sendFile(path.join(__dirname, 'checkout.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

const PORT = parseInt(process.env.PORT, 10) || 5500;

connectDB();

// Function to start the server with port validation
function startServer(port) {
    // Validate port is within acceptable range
    if (port < 0 || port > 65535 || isNaN(port)) {
        console.error('Invalid port number. Using default port 5500.');
        port = 5500;
    }

    const server = app.listen(port, '0.0.0.0', () => {
        console.log(`Server running on port ${port}`);
    });

    // Handle port conflicts gracefully
    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            if (port < 65535) {
                console.log(`Port ${port} is already in use. Trying port ${port + 1}...`);
                startServer(port + 1);
            } else {
                console.error('No available ports found!');
            }
        } else {
            console.error('Server error:', err);
        }
    });
}

// Start server with error handling
startServer(PORT);

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB, getConnectionStatus } = require('./src/config/db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from backend folder
app.use(express.static(__dirname));

// API Routes
app.use('/api/products', require('./src/routes/productRoutes'));
app.use('/api/orders', require('./src/routes/orderRoutes'));
app.use('/api/proformas', require('./src/routes/proformaRoutes'));
app.use('/api/reviews', require('./src/routes/reviewRoutes'));

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

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

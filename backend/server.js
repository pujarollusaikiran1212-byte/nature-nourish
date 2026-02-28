require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB, getConnectionStatus } = require('./src/config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the root directory (frontend)
app.use(express.static(path.join(__dirname, '..')));

// API Routes
app.use('/api/products', require('./src/routes/productRoutes'));
app.use('/api/orders', require('./src/routes/orderRoutes'));
app.use('/api/proformas', require('./src/routes/proformaRoutes'));

// Health check route - now includes DB status
app.get('/api/health', (req, res) => {
    const dbStatus = getConnectionStatus();
    res.json({
        status: 'OK',
        message: 'Nature Nourish API is running',
        database: dbStatus ? 'Connected' : 'Disconnected'
    });
});

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB (non-blocking - server starts regardless)
connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
    console.log(`Frontend: http://localhost:${PORT}/`);
});

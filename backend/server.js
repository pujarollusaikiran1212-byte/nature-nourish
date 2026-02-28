require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB, getConnectionStatus } = require('./src/config/db');

const app = express();

// Current directory (where server.js is located)
const serverDir = __dirname;
console.log('Server directory:', serverDir);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from server directory (backend folder)
app.use(express.static(serverDir));

// API Routes
app.use('/api/products', require('./src/routes/productRoutes'));
app.use('/api/orders', require('./src/routes/orderRoutes'));
app.use('/api/proformas', require('./src/routes/proformaRoutes'));

// Health check route
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
    const indexPath = path.join(serverDir, 'index.html');
    console.log('Serving index.html from:', indexPath);
    res.sendFile(indexPath);
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

const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
    try {
        const options = {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            family: 4,
            retryWrites: true,
            retryReads: true
        };

        // Use environment variable for MongoDB URI, fallback to local for development
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/natureNourish';

        console.log('Attempting to connect to MongoDB...');
        console.log('MongoDB URI:', mongoURI.replace(/\/\/.*:.*@/, '//****:****@')); // Hide credentials in log

        await mongoose.connect(mongoURI, options);
        isConnected = true;
        console.log('MongoDB Connected Successfully!');
    } catch (err) {
        console.log('MongoDB Connection Error:', err.message);
        console.log('Note: Server will start but database operations may not work');
        isConnected = false;
    }
};

const getConnectionStatus = () => isConnected;

module.exports = { connectDB, getConnectionStatus };

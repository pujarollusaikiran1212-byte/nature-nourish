const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        console.log('MongoDB already connected');
        return true;
    }

    try {
        // Try environment variable first
        let mongoURI = process.env.MONGODB_URI;

        console.log('MONGODB_URI from env:', mongoURI ? 'Set' : 'Not Set');

        // If no env variable, use the default URI
        if (!mongoURI) {
            // Using the default connection string
            mongoURI = 'mongodb+srv://asus:01lWUs7yjxFnX126@cluster1.mpartvh.mongodb.net/SoapWebsite?appName=Cluster1&retryWrites=true&w=majority';
            console.log('Using default MongoDB URI from code');
        }

        console.log('Attempting MongoDB connection...');

        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
        });

        isConnected = true;
        console.log('MongoDB Connected Successfully');
        return true;
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        isConnected = false;
        return false;
    }
};

const getConnectionStatus = () => isConnected;

module.exports = { connectDB, getConnectionStatus };

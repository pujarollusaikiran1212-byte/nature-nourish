const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        console.log('MongoDB already connected');
        return;
    }

    try {
        // Try environment variable first, then use default
        let mongoURI = process.env.MONGODB_URI;

        // If no env variable, use the provided URI
        if (!mongoURI) {
            mongoURI = 'mongodb+srv://asus:01lWUs7yjxFnX126@cluster1.mpartvh.mongodb.net/SoapWebsite?appName=Cluster1&retryWrites=true&w=majority';
            console.log('Using default MongoDB URI from code');
        }

        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        });
        isConnected = true;
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        isConnected = false;
    }
};

const getConnectionStatus = () => isConnected;

module.exports = { connectDB, getConnectionStatus };





const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
    if (isConnected) {
        console.log('MongoDB already connected');
        return;
    }

    try {
        const mongoose = require('mongoose');
        // Use the correct MongoDB Atlas connection string with database name
        const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://asus:01lWUs7yjxFnX126@cluster1.mpartvh.mongodb.net/storeDB?retryWrites=true&w=majority';
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

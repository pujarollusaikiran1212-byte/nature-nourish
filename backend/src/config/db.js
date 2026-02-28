const mongoose = require('mongoose');
const dns = require('dns');

// Fix DNS issue - use Google DNS for SRV lookups
dns.setServers(['8.8.8.8']);

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

        // MongoDB Atlas connection string with correct credentials
        const mongoURI = 'mongodb+srv://asus:bpPcyAafw4jOZlq8@cluster1.mpartvh.mongodb.net/SoapWebsite?appName=Cluster1';

        console.log('Attempting to connect to MongoDB Atlas...');

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

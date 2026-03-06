const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            family: 4,
            retryWrites: true,
            retryReads: true
        };

        // Get MongoDB URI from environment variable
        let mongoURI = process.env.MONGODB_URI;

        // If using mongodb+srv://, convert to standard mongodb://
        if (mongoURI && mongoURI.startsWith('mongodb+srv://')) {
            // Parse the SRV connection string and convert to standard connection
            // Extract username, password, and cluster info
            const srvMatch = mongoURI.match(/mongodb\+srv:\/\/([^:]+):([^@]+)@([^?]+)\/?(.*)/);
            if (srvMatch) {
                const username = srvMatch[1];
                const password = srvMatch[2];
                const cluster = srvMatch[3];
                const params = srvMatch[4] || '';

                // Convert to standard mongodb connection with direct connection
                mongoURI = `mongodb://${username}:${password}@${cluster}/?${params}`;
                console.log('Converted mongodb+srv to standard mongodb connection');
            }
        }

        // Fallback to local MongoDB if not set
        mongoURI = mongoURI || 'mongodb://localhost:27017/natureNourish';

        console.log('Attempting to connect to MongoDB...');
        // Hide credentials in log
        const maskedURI = mongoURI.replace(/\/\/.*:.*@/, '//****:****@');
        console.log('MongoDB URI:', maskedURI);

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

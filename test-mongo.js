const { MongoClient } = require('mongodb');
const dns = require('dns');

// Force Node.js to use Google DNS for SRV lookups
dns.setServers(['8.8.8.8']);

const uri = 'mongodb+srv://asus:bpPcyAafw4jOZlq8@cluster1.mpartvh.mongodb.net/SoapWebsite?appName=Cluster1';

async function testConnection() {
    const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 30000,
        connectTimeoutMS: 30000,
        tls: true
    });

    try {
        console.log('Connecting to MongoDB Atlas...');
        await client.connect();
        console.log('✓ Connected successfully!');

        const db = client.db('SoapWebsite');
        console.log('Database:', db.databaseName);

        const collections = await db.listCollections().toArray();
        console.log('Collections:', collections.map(c => c.name));

        await client.close();
        console.log('\n✓✓✓ MongoDB is WORKING! ✓✓✓');
        process.exit(0);
    } catch (error) {
        console.error('✗ Failed:', error.message);
        process.exit(1);
    }
}

testConnection();

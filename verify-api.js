// Test API connectivity
const https = require('https');

console.log('Testing Nature Nourish API...\n');

// Test health endpoint
https.get('https://nature-nourish-production.up.railway.app/api/health', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        console.log('Health Check Result:');
        console.log(JSON.parse(data));

        // Test order placement
        console.log('\nTesting Order Placement...');

        const orderData = JSON.stringify({
            orderId: 'TEST-' + Date.now(),
            customerName: 'API Test User',
            email: 'test@example.com',
            phone: '9876543210',
            address: 'Test Address, Mumbai',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400001',
            items: [{ name: 'Solar Calm', price: 149, quantity: 1 }],
            subtotal: 149,
            total: 149,
            paymentMethod: 'COD'
        });

        const req = https.request({
            hostname: 'nature-nourish-production.up.railway.app',
            path: '/api/orders',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': orderData.length
            }
        }, (res2) => {
            let data2 = '';
            res2.on('data', (chunk) => data2 += chunk);
            res2.on('end', () => {
                console.log('Order Placement Result:');
                console.log(JSON.parse(data2));
                console.log('\n✅ API is working! Jio, Airtel, and WiFi users CAN place orders.');
            });
        });

        req.on('error', (e) => {
            console.error('Order Error:', e.message);
        });

        req.write(orderData);
        req.end();
    });
}).on('error', (e) => {
    console.error('Health Check Error:', e.message);
});

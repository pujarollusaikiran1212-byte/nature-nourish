const http = require('http');

console.log('Testing API endpoints...\n');

// Test health endpoint
http.get('http://localhost:3000/api/health', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        console.log('Health Check Response:');
        console.log(data);
    });
}).on('error', (err) => {
    console.error('Health Check Error:', err.message);
});

// Test products endpoint
setTimeout(() => {
    http.get('http://localhost:3000/api/products', (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
            console.log('\nProducts API Response:');
            console.log(data);
        });
    }).on('error', (err) => {
        console.error('Products API Error:', err.message);
    });
}, 1000);

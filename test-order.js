const axios = require('axios');

const order = {
    orderId: 'ORD-TEST-001',
    products: [
        {
            name: 'Solar Calm',
            price: 100,
            quantity: 2
        }
    ],
    customer: {
        name: 'Test Customer',
        email: 'test@example.com',
        mobile: '9876543210',
        address: '123 Test St',
        city: 'Mumbai',
        state: 'Maharashtra',
        pinCode: '400001'
    },
    staff: {
        name: 'Admin',
        id: 'ADMIN-001'
    },
    subtotal: 200,
    shipping: 0,
    total: 200,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending',
    orderStatus: 'Pending',
    deliveryStatus: 'Pending Delivery',
    orderSource: 'Website'
};

axios.post('http://localhost:5000/api/orders', order)
    .then(response => {
        console.log('✅ Order created successfully!');
        console.log(response.data);
    })
    .catch(error => {
        console.error('❌ Error:', error.message);
        if (error.response) {
            console.error('Response:', error.response.data);
        }
    });

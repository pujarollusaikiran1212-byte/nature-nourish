const axios = require('axios');

const orderData = {
    orderId: 'ORD-' + Date.now(),
    products: [
        {
            name: 'Solar Calm',
            price: 100,
            quantity: 2
        }
    ],
    customer: {
        name: 'Test Customer New',
        email: 'testnew@example.com',
        mobile: '9876543210',
        address: '123 Test Street',
        city: 'Mumbai',
        state: 'Maharashtra',
        pinCode: '400001'
    },
    staff: {
        name: 'Agent',
        id: 'A001'
    },
    subtotal: 200,
    shipping: 30,
    total: 230,
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending',
    orderStatus: 'Pending',
    deliveryStatus: 'Pending Delivery',
    orderSource: 'Customer Portal'
};

axios.post('https://nature-nourish-production.up.railway.app/api/orders', orderData)
    .then(response => {
        console.log('Order created successfully:', response.data);
    })
    .catch(error => {
        console.error('Error:', error.response ? error.response.data : error.message);
    });

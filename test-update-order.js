const axios = require('axios');

const orderId = 'ORD-TEST-001';

axios.put(`https://nature-nourish-production.up.railway.app/api/orders/${orderId}`, {
    deliveryStatus: 'In Transit',
    orderStatus: 'Processing'
})
    .then(response => {
        console.log('✅ Order updated successfully!');
        console.log(response.data);
    })
    .catch(error => {
        console.error('❌ Error:', error.message);
        if (error.response) {
            console.error('Response:', error.response.data);
        }
    });

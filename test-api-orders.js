// Test script to check orders API
const API_URL = 'https://nature-nourish-production.up.railway.app';

async function testOrdersAPI() {
    console.log('Testing Orders API...\n');

    // Test 1: Check API health
    try {
        const healthRes = await fetch(`${API_URL}/api/health`);
        const health = await healthRes.json();
        console.log('✓ API Health:', health);
    } catch (err) {
        console.log('✗ API Health Check Failed:', err.message);
    }

    // Test 2: Try to fetch orders
    console.log('\n--- Fetching Orders ---');
    try {
        const ordersRes = await fetch(`${API_URL}/api/orders`);
        const ordersText = await ordersRes.text();

        if (ordersText.includes('buffering timed out')) {
            console.log('✗ MongoDB Connection Issue!');
            console.log('Error:', ordersText);
        } else {
            const orders = JSON.parse(ordersText);
            console.log('✓ Orders count:', orders.length);
            if (orders.length > 0) {
                console.log('Latest order:', orders[0].orderId);
            }
        }
    } catch (err) {
        console.log('✗ Error fetching orders:', err.message);
    }

    // Test 3: Try to create a test order
    console.log('\n--- Creating Test Order ---');
    const testOrder = {
        orderId: 'TEST-' + Date.now(),
        products: [{ name: 'Test Product', price: 100, quantity: 1 }],
        customer: {
            name: 'Test Customer',
            email: 'test@example.com',
            mobile: '1234567890',
            address: 'Test Address',
            city: 'Test City',
            state: 'Test State',
            pinCode: '123456'
        },
        staff: { name: 'Test', id: 'N/A' },
        subtotal: 100,
        shipping: 0,
        deliveryCharge: 0,
        total: 100,
        paymentMethod: 'Cash on Delivery',
        paymentStatus: 'Pending',
        orderStatus: 'Pending',
        deliveryStatus: 'Pending Delivery',
        orderSource: 'Website',
        createdAt: new Date().toISOString()
    };

    try {
        const createRes = await fetch(`${API_URL}/api/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testOrder)
        });

        const createData = await createRes.text();
        if (createData.includes('buffering timed out')) {
            console.log('✗ MongoDB Connection Issue - Cannot save order!');
        } else {
            const data = JSON.parse(createData);
            console.log('✓ Test order created:', data.orderId || data._id);
        }
    } catch (err) {
        console.log('✗ Error creating order:', err.message);
    }
}

testOrdersAPI();


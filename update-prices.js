const axios = require('axios');

async function updatePrices() {
    try {
        // Get all products
        const response = await axios.get('http://localhost:5000/api/products');
        const products = response.data;

        console.log(`Found ${products.length} products. Updating prices to ₹100...\n`);

        for (const product of products) {
            await axios.put(`http://localhost:5000/api/products/${product._id}`, {
                ...product,
                price: 100
            });
            console.log(`✅ Updated: ${product.name} -> ₹100`);
        }

        console.log('\n🎉 All prices updated to ₹100!');
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

updatePrices();

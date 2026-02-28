const axios = require('axios');

const products = [
    {
        name: "Lavender Bliss Soap",
        subtitle: "Calming & Relaxing",
        description: "Natural lavender essential oil soap for stress relief",
        price: 100,
        image: "https://via.placeholder.com/300",
        category: "soap",
        badge: "Best Seller",
        rating: 4.8,
        reviewCount: 120,
        inStock: true
    },
    {
        name: "Aloe Vera Glow",
        subtitle: "Skin Healing & Moisturizing",
        description: "Pure aloe vera soap for sensitive skin",
        price: 100,
        image: "https://via.placeholder.com/300",
        category: "soap",
        badge: "Popular",
        rating: 4.5,
        reviewCount: 85,
        inStock: true
    },
    {
        name: "Lemon Zest Refresh",
        subtitle: "Energizing & Refreshing",
        description: "Fresh lemon oil soap for revitalizing bath experience",
        price: 100,
        image: "https://via.placeholder.com/300",
        category: "soap",
        badge: "New",
        rating: 4.6,
        reviewCount: 65,
        inStock: true
    }
];

async function addProducts() {
    for (const product of products) {
        try {
            const response = await axios.post('http://localhost:5000/api/products', product);
            console.log('✅ Added:', response.data.name);
        } catch (error) {
            console.error('❌ Error:', error.message);
        }
    }
    console.log('\n🎉 All products added!');
}

addProducts();

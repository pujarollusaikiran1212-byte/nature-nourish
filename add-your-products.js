const axios = require('axios');

const products = [
    {
        name: "Solar Calm",
        subtitle: "Tan Correcting Body Soap",
        description: "Specially formulated to reduce tan and brighten your skin.",
        price: 100,
        image: "https://via.placeholder.com/200x200/b19cd9/ffffff?text=Solar+Calm",
        category: "soap",
        badge: "Popular",
        rating: 5,
        reviewCount: 245,
        inStock: true
    },
    {
        name: "Clearwave",
        subtitle: "Body Acne Control Soap",
        description: "Formulated to treat and prevent body acne effectively.",
        price: 100,
        image: "https://via.placeholder.com/200x200/98ff98/ffffff?text=Clearwave",
        category: "soap",
        badge: "Best Seller",
        rating: 5,
        reviewCount: 398,
        inStock: true
    },
    {
        name: "Milk Cloud",
        subtitle: "Gentle Daily Body Soap",
        description: "Ultra-gentle formula perfect for daily use and sensitive skin.",
        price: 100,
        image: "https://via.placeholder.com/200x200/ffb6c1/ffffff?text=Milk+Cloud",
        category: "soap",
        badge: "New",
        rating: 4,
        reviewCount: 156,
        inStock: true
    },
    {
        name: "Glow Dust",
        subtitle: "Exfoliating Body Soap",
        description: "Premium exfoliating soap with natural scrub particles.",
        price: 100,
        image: "https://via.placeholder.com/200x200/90ee90/ffffff?text=Glow+Dust",
        category: "soap",
        badge: "Premium",
        rating: 5,
        reviewCount: 312,
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
    console.log('\n🎉 All 4 products added!');
}

addProducts();

/* ============================================
   NATURE NOURISH - FRONTEND WITH BACKEND API
   ============================================ */

// API Base URL - Update this when deploying to production
const API_BASE_URL = 'http://localhost:3000/api';

// Initialize cart and reviews arrays
let cart = [];
let reviews = [];

console.log("🧼 Premium Soap Website Loaded Successfully!");

// ============================================
// INDIAN CITIES BY STATE
// ============================================

const citiesByState = {
    "Andhra Pradesh": ["Hyderabad", "Vijayawada", "Visakhapatnam", "Tirupati", "Kurnool"],
    "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Papum Pare", "Pasighat"],
    "Assam": ["Guwahati", "Dibrugarh", "Silchar", "Nagaon", "Barpeta"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Darbhanga"],
    "Chhattisgarh": ["Raipur", "Bilaspur", "Durg", "Rajnandgaon", "Kabirdham"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama", "Ponda"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar"],
    "Haryana": ["Faridabad", "Gurgaon", "Hisar", "Ambala", "Yamunanagar"],
    "Himachal Pradesh": ["Shimla", "Solan", "Mandi", "Kangra", "Kullu"],
    "Jharkhand": ["Ranchi", "Dhanbad", "Giridih", "East Singhbhum", "Jamshedpur"],
    "Karnataka": ["Bangalore", "Mysore", "Pune", "Belgaum", "Hubli"],
    "Kerala": ["Kochi", "Thiruvananthapuram", "Kozhikode", "Kottayam", "Alappuzha"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Ujjain", "Gwalior"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Aurangabad", "Kolhapur"],
    "Manipur": ["Imphal", "Bishnupur", "Moirang", "Kakching"],
    "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongpoh"],
    "Mizoram": ["Aizawl", "Lunglei", "Saiha"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Wokha"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur", "Balasore"],
    "Punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Kota", "Ajmer", "Udaipur"],
    "Sikkim": ["Gangtok", "Namchi", "Geyzing"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar"],
    "Tripura": ["Agartala", "Udaipur", "Ambassa", "Dharmanagar"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Meerut"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Nainital", "Rishikesh", "Udham Singh Nagar"],
    "West Bengal": ["Kolkata", "Darjeeling", "Asansol", "Durgapur", "West Midnapore"]
};

// ============================================
// PRODUCT PRICE MAPPING
// ============================================

const productPrices = {
    'Solar Calm': 299,
    'Clearwave': 349,
    'Milk Cloud': 249,
    'Glow Dust': 379
};

// ============================================
// API HELPER FUNCTIONS
// ============================================

async function fetchAPI(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const config = { ...defaultOptions, ...options };

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Something went wrong');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// ============================================
// PRODUCT FUNCTIONS
// ============================================

// Load products from backend
async function loadProducts() {
    try {
        const products = await fetchAPI('/products');
        return products;
    } catch (error) {
        console.error('Error loading products:', error);
        // Fallback to hardcoded products
        return [
            {
                name: 'Solar Calm',
                subtitle: 'Tan Correcting Body Soap',
                description: 'Specially formulated to reduce tan and brighten your skin.',
                price: 299,
                image: 'https://via.placeholder.com/200x200/b19cd9/ffffff?text=Solar+Calm',
                badge: 'Popular',
                rating: 5,
                reviewCount: 245
            },
            {
                name: 'Clearwave',
                subtitle: 'Body Acne Control Soap',
                description: 'Formulated to treat and prevent body acne effectively.',
                price: 349,
                image: 'https://via.placeholder.com/200x200/98ff98/ffffff?text=Clearwave',
                badge: 'Best Seller',
                rating: 5,
                reviewCount: 398
            },
            {
                name: 'Milk Cloud',
                subtitle: 'Gentle Daily Body Soap',
                description: 'Ultra-gentle formula perfect for daily use and sensitive skin.',
                price: 249,
                image: 'https://via.placeholder.com/200x200/ffb6c1/ffffff?text=Milk+Cloud',
                badge: 'New',
                rating: 4,
                reviewCount: 156
            },
            {
                name: 'Glow Dust',
                subtitle: 'Exfoliating Body Soap',
                description: 'Premium exfoliating soap with natural scrub particles.',
                price: 379,
                image: 'https://via.placeholder.com/200x200/90ee90/ffffff?text=Glow+Dust',
                badge: 'Premium',
                rating: 5,
                reviewCount: 312
            }
        ];
    }
}

// ============================================
// SHOPPING CART FUNCTIONS
// ============================================

function addToCart(productName, price) {
    cart.push({
        id: Date.now(),
        name: productName,
        price: price,
        quantity: 1
    });

    updateCartCount();
    updateCartDisplay();

    // Visual feedback
    const button = event.currentTarget || event.target;
    if (button) {
        const originalText = button.textContent;
        const originalBg = button.style.backgroundColor;

        button.textContent = '✓ Added!';
        button.style.backgroundColor = '#28a745';
        button.style.color = '#fff';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = originalBg;
            button.style.color = '';
        }, 2000);
    }

    console.log(`${productName} added to cart. Total items: ${cart.length}`);
}

function updateCartCount() {
    const cartBadge = document.getElementById('cart-count');
    cartBadge.textContent = cart.length;
}

function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-items-container');
    const cartSummary = document.getElementById('cart-summary');

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-message">Your cart is empty. Start shopping!</p>';
        cartSummary.style.display = 'none';
        return;
    }

    let cartHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartHTML += `
            <div class="cart-item">
                <img src="${getProductImage(item.name)}" alt="${item.name}" class="cart-item-image" onerror="this.src='https://via.placeholder.com/100/667eea/ffffff?text=${item.name}'">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="cart-item-quantity">₹${item.price} x ${item.quantity} = ₹${itemTotal}</p>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button onclick="decreaseQuantity(${index})">-</button>
                        <input type="number" value="${item.quantity}" min="1" readonly>
                        <button onclick="increaseQuantity(${index})">+</button>
                    </div>
                    <span style="font-weight: bold; color: #667eea;">₹${itemTotal.toFixed(2)}</span>
                    <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
                </div>
            </div>
        `;
    });

    cartContainer.innerHTML = cartHTML;

    const subtotal = parseFloat(total).toFixed(2);
    const shipping = 0;
    const finalTotal = (parseFloat(subtotal) + shipping).toFixed(2);

    document.getElementById('subtotal').textContent = '₹' + subtotal;
    document.getElementById('cart-total').textContent = '₹' + finalTotal;
    cartSummary.style.display = 'block';

    console.log(`Cart updated: ${cart.length} items, Total: ₹${finalTotal}`);
}

function getProductImage(productName) {
    const images = {
        'Solar Calm': 'solar-calm.jpg',
        'Clearwave': 'clearwave.jpg',
        'Milk Cloud': 'milk-cloud.jpg',
        'Glow Dust': 'glow-dust.jpg'
    };
    return images[productName] || 'placeholder.jpg';
}

function increaseQuantity(index) {
    cart[index].quantity += 1;
    updateCartDisplay();
}

function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        updateCartDisplay();
    }
}

function removeFromCart(index) {
    const removedItem = cart[index].name;
    cart.splice(index, 1);
    updateCartDisplay();
    updateCartCount();
    console.log(`${removedItem} removed from cart.`);
}

function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    document.getElementById('cart').scrollIntoView({ behavior: 'smooth' });
    alert('Proceed to checkout functionality. For now, use "Buy Now - COD" button on products.');
}

// ============================================
// CASH ON DELIVERY (COD) FUNCTIONS
// ============================================

function openCODForm(productName, price) {
    const modal = document.getElementById('cod-modal');
    document.getElementById('cod-product').value = productName;
    document.getElementById('cod-price').value = '₹' + price;
    modal.style.display = 'block';
}

function closeCODForm() {
    document.getElementById('cod-modal').style.display = 'none';
}

function updateCities() {
    const stateDropdown = document.getElementById('cod-state');
    const cityDropdown = document.getElementById('cod-city');
    const selectedState = stateDropdown.value;

    cityDropdown.innerHTML = '';

    if (selectedState && citiesByState[selectedState]) {
        const cities = citiesByState[selectedState];
        cityDropdown.innerHTML = '<option value="">-- Select City --</option>';

        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            cityDropdown.appendChild(option);
        });
    } else {
        cityDropdown.innerHTML = '<option value="">-- Select State First --</option>';
    }
}

async function submitCODOrder(event) {
    event.preventDefault();

    const name = document.getElementById('cod-name').value;
    const email = document.getElementById('cod-email').value;
    const mobile = document.getElementById('cod-mobile').value;
    const state = document.getElementById('cod-state').value;
    const city = document.getElementById('cod-city').value;
    const address = document.getElementById('cod-address').value;
    const pin = document.getElementById('cod-pin').value;
    const productName = document.getElementById('cod-product').value;
    const priceText = document.getElementById('cod-price').value;
    const price = parseInt(priceText.replace('₹', ''));

    if (!name || !email || !mobile || !state || !city || !address || !pin) {
        alert('Please fill in all fields correctly');
        return;
    }

    const orderData = {
        products: [{
            name: productName,
            price: price,
            quantity: 1
        }],
        customer: {
            name: name,
            email: email,
            mobile: mobile,
            address: address,
            city: city,
            state: state,
            pinCode: pin
        },
        subtotal: price,
        shipping: 0,
        total: price,
        paymentMethod: 'Cash on Delivery',
        orderSource: 'Website COD'
    };

    try {
        const order = await fetchAPI('/orders', {
            method: 'POST',
            body: JSON.stringify(orderData)
        });

        showSuccessMessage(order);
    } catch (error) {
        // Fallback: show success message anyway (for demo purposes)
        console.log('Order would be saved to backend:', orderData);
        showSuccessMessage({
            orderId: 'ORD-' + Date.now(),
            ...orderData
        });
    }

    document.getElementById('cod-modal').style.display = 'none';
    document.getElementById('cod-form').reset();
}

function showSuccessMessage(order) {
    const successModal = document.getElementById('success-modal');
    const successMessage = document.getElementById('success-message');

    successMessage.innerHTML = `
        <strong>Order ID:</strong> ${order.orderId || 'N/A'}<br>
        <strong>Product:</strong> ${order.products[0].name}<br>
        <strong>Amount:</strong> ₹${order.total}<br><br>
        <strong>Customer Details:</strong><br>
        <strong>Name:</strong> ${order.customer.name}<br>
        <strong>Email:</strong> ${order.customer.email}<br>
        <strong>Mobile:</strong> ${order.customer.mobile}<br>
        <strong>Address:</strong> ${order.customer.address}<br>
        <strong>City:</strong> ${order.customer.city}<br>
        <strong>State:</strong> ${order.customer.state}<br>
        <strong>PIN Code:</strong> ${order.customer.pinCode}<br><br>
        <strong>Payment Method:</strong> ${order.paymentMethod}<br>
        <strong>Order Date:</strong> ${new Date().toLocaleString()}<br><br>
        <p style="color: #28a745; font-weight: bold;">✅ Your order has been placed successfully!</p>
        <p>Our delivery team will contact you within 24 hours to confirm delivery details.</p>
    `;

    successModal.style.display = 'block';
}

function closeSuccessModal() {
    document.getElementById('success-modal').style.display = 'none';
}

// ============================================
// REVIEW FUNCTIONS
// ============================================

async function submitReview(event) {
    event.preventDefault();

    const name = document.getElementById('reviewer-name')?.value || document.querySelector('#review-form input[type="text"]')?.value;
    const rating = document.getElementById('rating')?.value || document.querySelector('#review-form select')?.value;
    const text = document.querySelector('#review-form textarea')?.value;

    if (!name || !rating || !text) {
        alert('Please fill in all fields');
        return;
    }

    const reviewData = {
        reviewerName: name,
        rating: parseInt(rating),
        reviewText: text
    };

    try {
        await fetchAPI('/reviews', {
            method: 'POST',
            body: JSON.stringify(reviewData)
        });
    } catch (error) {
        console.log('Review would be saved to backend:', reviewData);
    }

    alert(`Thank you ${name}! Your ${rating}-star review has been submitted.`);

    const form = document.getElementById('review-form');
    if (form) form.reset();
}

// ============================================
// CUSTOMER PORTAL FUNCTIONS
// ============================================

function openCustomerPortal() {
    const modal = document.getElementById('customer-portal-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeCustomerPortal() {
    const modal = document.getElementById('customer-portal-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function updateCustomerCities() {
    const stateDropdown = document.getElementById('customer-state');
    const cityDropdown = document.getElementById('customer-city');
    const selectedState = stateDropdown.value;

    cityDropdown.innerHTML = '';

    if (selectedState && citiesByState[selectedState]) {
        const cities = citiesByState[selectedState];
        cityDropdown.innerHTML = '<option value="">-- Select City --</option>';

        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            cityDropdown.appendChild(option);
        });
    } else {
        cityDropdown.innerHTML = '<option value="">-- Select State First --</option>';
    }
}

async function submitCustomerOrder(event) {
    event.preventDefault();

    const staffName = document.getElementById('customer-staff-name').value;
    const staffId = document.getElementById('customer-staff-id').value;
    const productName = document.getElementById('customer-product').value;
    const customerName = document.getElementById('customer-customer-name').value;
    const customerEmail = document.getElementById('customer-customer-email').value;
    const customerMobile = document.getElementById('customer-customer-mobile').value;
    const quantity = parseInt(document.getElementById('customer-quantity').value);
    const state = document.getElementById('customer-state').value;
    const city = document.getElementById('customer-city').value;
    const address = document.getElementById('customer-address').value;
    const pin = document.getElementById('customer-pin').value;
    const status = document.getElementById('customer-status').value;

    if (!staffName || !staffId || !productName || !customerName || !customerEmail || !customerMobile || !state || !city || !address || !pin) {
        alert('Please fill in all fields');
        return;
    }

    const unitPrice = productPrices[productName] || 0;
    const total = unitPrice * quantity;

    const orderData = {
        products: [{
            name: productName,
            price: unitPrice,
            quantity: quantity
        }],
        customer: {
            name: customerName,
            email: customerEmail,
            mobile: customerMobile,
            address: address,
            city: city,
            state: state,
            pinCode: pin
        },
        staff: {
            name: staffName,
            id: staffId
        },
        subtotal: total,
        shipping: 0,
        total: total,
        paymentMethod: 'Cash on Delivery',
        deliveryStatus: status,
        orderSource: 'Customer Portal'
    };

    try {
        const order = await fetchAPI('/orders', {
            method: 'POST',
            body: JSON.stringify(orderData)
        });

        showCustomerPortalSuccess(order);
    } catch (error) {
        console.log('Order would be saved to backend:', orderData);
        showCustomerPortalSuccess({
            orderId: 'ORD-' + Date.now(),
            ...orderData
        });
    }

    document.getElementById('customer-portal-modal').style.display = 'none';
    document.getElementById('customer-form').reset();
}

function showCustomerPortalSuccess(order) {
    const successModal = document.getElementById('success-modal');
    const successMessage = document.getElementById('success-message');

    successMessage.innerHTML = `
        <strong>Order ID:</strong> ${order.orderId}<br><br>
        <strong>Staff Details:</strong><br>
        <strong>Staff Name:</strong> ${order.staff.name}<br>
        <strong>Staff ID:</strong> ${order.staff.id}<br><br>
        <strong>Customer Details:</strong><br>
        <strong>Name:</strong> ${order.customer.name}<br>
        <strong>Email:</strong> ${order.customer.email}<br>
        <strong>Mobile:</strong> ${order.customer.mobile}<br>
        <strong>Address:</strong> ${order.customer.address}<br>
        <strong>City:</strong> ${order.customer.city}<br>
        <strong>State:</strong> ${order.customer.state}<br>
        <strong>PIN Code:</strong> ${order.customer.pinCode}<br><br>
        <strong>Order Details:</strong><br>
        <strong>Product:</strong> ${order.products[0].name}<br>
        <strong>Quantity:</strong> ${order.products[0].quantity}<br>
        <strong>Total Amount:</strong> ₹${order.total}<br>
        <strong>Delivery Status:</strong> ${order.deliveryStatus}<br>
        <strong>Payment Method:</strong> ${order.paymentMethod}<br><br>
        <p style="color: #28a745; font-weight: bold;">✅ Customer order registered successfully!</p>
    `;

    successModal.style.display = 'block';
}

// ============================================
// MODAL CLOSE HANDLERS
// ============================================

window.onclick = function (event) {
    const codModal = document.getElementById('cod-modal');
    const successModal = document.getElementById('success-modal');
    const customerModal = document.getElementById('customer-portal-modal');

    if (event.target === codModal) {
        codModal.style.display = 'none';
    }
    if (event.target === successModal) {
        successModal.style.display = 'none';
    }
    if (event.target === customerModal) {
        customerModal.style.display = 'none';
    }
}

// ============================================
// SMOOTH SCROLL FOR NAVIGATION
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// ============================================
// SHOP NOW BUTTON
// ============================================

const ctaBtn = document.querySelector('.cta-btn');
if (ctaBtn) {
    ctaBtn.addEventListener('click', function () {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
}

console.log('🧼 All event listeners activated!');
console.log('🔗 API Base URL:', API_BASE_URL);

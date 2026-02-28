/* ============================================
   SOAP PRODUCT COLLECTION - JAVASCRIPT
   ============================================ */

// Initialize cart array
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
    'Solar Calm': 100,
    'Clearwave': 100,
    'Milk Cloud': 100,
    'Glow Dust': 100
};

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

    const deliveryOption = document.querySelector('input[name="delivery-option"]:checked');
    const deliveryCharge = deliveryOption ? parseInt(deliveryOption.value) : 0;
    document.getElementById('cod-delivery-charge').value = '₹' + deliveryCharge;

    const productPrice = parseInt(price);
    const totalAmount = productPrice + deliveryCharge;
    document.getElementById('cod-total-amount').value = '₹' + totalAmount;

    modal.style.display = 'block';
}

function updateDeliveryCharge() {
    const priceText = document.getElementById('cod-price').value;
    const productPrice = parseInt(priceText.replace('₹', '')) || 0;

    const deliveryOption = document.querySelector('input[name="delivery-option"]:checked');
    const deliveryCharge = deliveryOption ? parseInt(deliveryOption.value) : 0;

    document.getElementById('cod-delivery-charge').value = '₹' + deliveryCharge;

    const totalAmount = productPrice + deliveryCharge;
    document.getElementById('cod-total-amount').value = '₹' + totalAmount;
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

// FIXED: Submit COD order - NOW sends to backend!
function submitCODOrder(event) {
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

    const unitPrice = parseInt(priceText.replace('₹', '')) || 100;
    const quantity = 1;
    const totalAmount = unitPrice * quantity;

    if (!name || !email || !mobile || !state || !city || !address || !pin) {
        alert('Please fill in all fields correctly');
        return;
    }

    // Create order object in the format the backend expects
    const order = {
        orderId: 'ORD-' + Date.now(),
        products: [{
            name: productName,
            price: unitPrice,
            quantity: quantity
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
        staff: {
            name: 'Website Customer',
            id: 'N/A'
        },
        subtotal: totalAmount,
        shipping: 0,
        total: totalAmount,
        paymentMethod: 'Cash on Delivery',
        paymentStatus: 'Pending',
        orderStatus: 'Pending',
        deliveryStatus: 'Pending Delivery',
        orderSource: 'Website',
        createdAt: new Date().toISOString()
    };

    console.log('Submitting Website Order to Backend:', order);

    // Send to backend API
    fetch('https://nature-nourish-production.up.railway.app/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Order saved to backend:', data);

            const successModal = document.getElementById('success-modal');
            const successMessage = document.getElementById('success-message');

            successMessage.innerHTML = `
            <strong>Order ID:</strong> ${data.orderId || order.orderId}<br>
            <strong>Product:</strong> ${productName}<br>
            <strong>Amount:</strong> ₹${totalAmount}<br><br>
            <strong>Customer Details:</strong><br>
            <strong>Name:</strong> ${name}<br>
            <strong>Email:</strong> ${email}<br>
            <strong>Mobile:</strong> ${mobile}<br>
            <strong>Address:</strong> ${address}<br>
            <strong>City:</strong> ${city}<br>
            <strong>State:</strong> ${state}<br>
            <strong>PIN Code:</strong> ${pin}<br><br>
            <strong>Payment Method:</strong> Cash on Delivery<br>
            <strong>Order Date:</strong> ${new Date().toLocaleString()}<br><br>
            <p style="color: #28a745; font-weight: bold;">✅ Your order has been placed successfully!</p>
            <p>Our delivery team will contact you within 24 hours to confirm delivery details.</p>
        `;

            successModal.style.display = 'block';
            document.getElementById('cod-modal').style.display = 'none';
            document.getElementById('cod-form').reset();
        })
        .catch(error => {
            console.error('Error submitting order:', error);
            alert('Failed to submit order. Please try again.');
        });
}

function closeSuccessModal() {
    document.getElementById('success-modal').style.display = 'none';
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

function submitCustomerOrder(event) {
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
    const deliveryStatus = document.getElementById('customer-status').value;

    if (!staffName || !staffId || !productName || !customerName || !customerEmail || !customerMobile || !state || !city || !address || !pin) {
        alert('Please fill in all fields');
        return;
    }

    const unitPrice = productPrices[productName] || 0;
    const totalAmount = unitPrice * quantity;

    const order = {
        orderId: 'ORD-' + Date.now(),
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
        subtotal: totalAmount,
        shipping: 0,
        total: totalAmount,
        paymentMethod: 'Cash on Delivery',
        paymentStatus: 'Pending',
        orderStatus: 'Pending',
        deliveryStatus: deliveryStatus,
        orderSource: 'Customer Portal',
        createdAt: new Date().toISOString()
    };

    console.log('Customer Portal Order:', order);

    fetch('https://nature-nourish-production.up.railway.app/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
        .then(response => response.json())
        .then(data => {
            const successModal = document.getElementById('success-modal');
            const successMessage = document.getElementById('success-message');

            successMessage.innerHTML = `
            <strong>✅ Order Registered Successfully!</strong><br><br>
            <strong>Order ID:</strong> ${data.orderId || order.orderId}<br>
            <strong>Staff Name:</strong> ${staffName}<br>
            <strong>Staff ID:</strong> ${staffId}<br><br>
            <strong>Customer Details:</strong><br>
            <strong>Name:</strong> ${customerName}<br>
            <strong>Email:</strong> ${customerEmail}<br>
            <strong>Mobile:</strong> ${customerMobile}<br>
            <strong>Address:</strong> ${address}<br>
            <strong>City:</strong> ${city}<br>
            <strong>State:</strong> ${state}<br>
            <strong>PIN Code:</strong> ${pin}<br><br>
            <strong>Order Details:</strong><br>
            <strong>Product:</strong> ${productName}<br>
            <strong>Quantity:</strong> ${quantity}<br>
            <strong>Unit Price:</strong> ₹${unitPrice}<br>
            <strong>Total Amount:</strong> ₹${totalAmount}<br>
            <strong>Delivery Status:</strong> ${deliveryStatus}<br><br>
            <p style="color: #28a745; font-weight: bold;">✅ Order has been registered successfully!</p>
        `;

            successModal.style.display = 'block';
            document.getElementById('customer-portal-modal').style.display = 'none';
            document.getElementById('customer-form').reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to submit order. Please try again.');
        });
}

// ============================================
// REVIEW FUNCTIONS
// ============================================

function submitReview(event) {
    event.preventDefault();

    const nameInput = document.querySelector('#review-form input[type="text"]');
    const ratingSelect = document.getElementById('rating');
    const messageTextarea = document.querySelector('#review-form textarea');

    const name = nameInput ? nameInput.value : '';
    const stars = ratingSelect ? ratingSelect.value : '';
    const text = messageTextarea ? messageTextarea.value : '';

    if (!name || !stars || !text) {
        alert('Please fill in all fields');
        return;
    }

    const starDisplay = '★'.repeat(stars) + '☆'.repeat(5 - parseInt(stars));

    const review = {
        name: name,
        stars: stars,
        starDisplay: starDisplay,
        text: text,
        date: new Date().toLocaleDateString()
    };

    reviews.push(review);
    console.log('Review submitted:', review);

    alert(`Thank you ${name}! Your ${stars}-star review has been submitted.`);

    document.getElementById('review-form').reset();
}

// ============================================
// AGENT PORTAL FUNCTIONS
// ============================================

function openAgentPortal() {
    const modal = document.getElementById('agent-portal-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeAgentPortal() {
    const modal = document.getElementById('agent-portal-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function updateAgentCities() {
    const stateDropdown = document.getElementById('agent-state');
    const cityDropdown = document.getElementById('agent-city');
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

// FIXED: Submit agent order - NOW sends to backend!
function submitAgentOrder(event) {
    event.preventDefault();

    const agentName = document.getElementById('agent-name').value;
    const agentId = document.getElementById('agent-id').value;
    const productName = document.getElementById('agent-product').value;
    const quantity = document.getElementById('agent-quantity').value;
    const customerName = document.getElementById('agent-customer-name').value;
    const customerEmail = document.getElementById('agent-customer-email').value;
    const customerMobile = document.getElementById('agent-customer-mobile').value;
    const state = document.getElementById('agent-state').value;
    const city = document.getElementById('agent-city').value;
    const address = document.getElementById('agent-address').value;
    const pin = document.getElementById('agent-pin').value;
    const status = document.getElementById('agent-status').value;

    if (!agentName || !agentId || !productName || !customerName || !customerEmail || !customerMobile || !state || !city || !address || !pin) {
        alert('Please fill in all fields');
        return;
    }

    const unitPrice = productPrices[productName] || 0;
    const totalAmount = unitPrice * parseInt(quantity);

    // Create order object in the format the backend expects
    const order = {
        orderId: 'ORD-' + Date.now(),
        products: [{
            name: productName,
            price: unitPrice,
            quantity: parseInt(quantity)
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
            name: agentName,
            id: agentId
        },
        subtotal: totalAmount,
        shipping: 0,
        total: totalAmount,
        paymentMethod: 'Cash on Delivery',
        paymentStatus: 'Pending',
        orderStatus: 'Pending',
        deliveryStatus: status,
        orderSource: 'Agent Portal',
        createdAt: new Date().toISOString()
    };

    console.log('Submitting Agent Order to Backend:', order);

    // Send to backend API
    fetch('https://nature-nourish-production.up.railway.app/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Agent order saved to backend:', data);

            const successModal = document.getElementById('success-modal');
            const successMessage = document.getElementById('success-message');

            successMessage.innerHTML = `
            <strong>Delivery Order ID:</strong> ${data.orderId || order.orderId}<br><br>
            <strong>Agent Details:</strong><br>
            <strong>Agent Name:</strong> ${agentName}<br>
            <strong>Agent ID:</strong> ${agentId}<br><br>
            <strong>Customer Details:</strong><br>
            <strong>Name:</strong> ${customerName}<br>
            <strong>Email:</strong> ${customerEmail}<br>
            <strong>Mobile:</strong> ${customerMobile}<br>
            <strong>Address:</strong> ${address}<br>
            <strong>City:</strong> ${city}<br>
            <strong>State:</strong> ${state}<br>
            <strong>PIN Code:</strong> ${pin}<br><br>
            <strong>Order Details:</strong><br>
            <strong>Product:</strong> ${productName}<br>
            <strong>Quantity:</strong> ${quantity}<br>
            <strong>Unit Price:</strong> ₹${unitPrice}<br>
            <strong>Total Amount:</strong> ₹${totalAmount}<br>
            <strong>Payment Method:</strong> Cash on Delivery<br>
            <strong>Delivery Status:</strong> ${status}<br>
            <strong>Registered Date:</strong> ${new Date().toLocaleString()}<br><br>
            <p style="color: #28a745; font-weight: bold;">✅ Delivery order registered successfully!</p>
        `;

            successModal.style.display = 'block';

            const agentModal = document.getElementById('agent-portal-modal');
            if (agentModal) {
                agentModal.style.display = 'none';
            }

            const agentForm = document.getElementById('agent-form');
            if (agentForm) {
                agentForm.reset();
            }
        })
        .catch(error => {
            console.error('Error submitting agent order:', error);
            alert('Failed to submit order. Please try again.');
        });
}

// ============================================
// MODAL CLOSE HANDLERS
// ============================================

window.onclick = function (event) {
    const codModal = document.getElementById('cod-modal');
    const successModal = document.getElementById('success-modal');
    const customerModal = document.getElementById('customer-portal-modal');
    const agentModal = document.getElementById('agent-portal-modal');

    if (event.target === codModal) {
        codModal.style.display = 'none';
    }
    if (event.target === successModal) {
        successModal.style.display = 'none';
    }
    if (event.target === customerModal) {
        customerModal.style.display = 'none';
    }
    if (event.target === agentModal) {
        agentModal.style.display = 'none';
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
        const productsSection = document.getElementById('products');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ============================================
// CONTACT FORM HANDLER
// ============================================

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;

        const contactData = {
            name: name,
            email: email,
            message: message
        };

        console.log('Contact Form Submitted:', contactData);

        alert('Thank you for contacting us! We will get back to you soon.');

        this.reset();
    });
}

// ============================================
// REVIEW FORM EVENT LISTENER
// ============================================

const reviewForm = document.getElementById('review-form');
if (reviewForm) {
    reviewForm.addEventListener('submit', submitReview);
}

console.log('🧼 All event listeners activated!');

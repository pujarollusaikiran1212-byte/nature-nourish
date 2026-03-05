# Checkout System Fix - TODO

## Task: Fix the checkout system to redirect to a proper checkout page

### Steps to Complete:

- [x] 1. Modify `script.js` - Add localStorage cart persistence
  - [x] Add `saveCart()` function to save cart to localStorage
  - [x] Add `loadCart()` function to load cart from localStorage on page load
  - [x] Update `addToCart()` to call `saveCart()`
  - [x] Update `removeFromCart()` to call `saveCart()`
  - [x] Update `increaseQuantity()` to call `saveCart()`
  - [x] Update `decreaseQuantity()` to call `saveCart()`
  - [x] Update `addOfferBundle()` to call `saveCart()`

- [x] 2. Modify `script.js` - Fix proceedToCheckout function
  - [x] Replace alert with `window.location.href = 'checkout.html'`

- [x] 3. Create `checkout.html`
  - [x] Copy header/navbar from index.html
  - [x] Include same CSS link (style.css)
  - [x] Include same script.js
  - [x] Add cart loading from localStorage on page load
  - [x] Display order summary section
  - [x] Display customer details form
  - [x] Display payment method section (COD)
  - [x] Add order submission functionality

- [ ] 4. Test the checkout flow
  - [ ] Add items to cart
  - [ ] Click "Proceed to Checkout"
  - [ ] Verify redirect to checkout.html
  - [ ] Verify cart items display correctly
  - [ ] Fill customer details
  - [ ] Submit order
  - [ ] Verify order reaches backend


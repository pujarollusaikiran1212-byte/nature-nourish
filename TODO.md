# Backend Implementation Plan

## Phase 1: Create Models

### 1. Order Model
- [ ] Create `backend/src/models/Order.js`
- Fields: orderId, products, customer, staff, subtotal, shipping, total, paymentMethod, paymentStatus, orderStatus, deliveryStatus, orderSource, createdAt

### 2. Proforma Model
- [ ] Create `backend/src/models/Proforma.js`
- Fields: nivSelections, summary, createdAt

## Phase 2: Create Routes

### 3. Order Routes
- [ ] Create `backend/src/routes/orderRoutes.js`
- GET /api/orders - Get all orders
- GET /api/orders/:id - Get single order
- POST /api/orders - Create new order
- PUT /api/orders/:id - Update order
- DELETE /api/orders/:id - Delete order

### 4. Proforma Routes
- [ ] Create `backend/src/routes/proformaRoutes.js`
- GET /api/proformas - Get all proformas
- GET /api/proformas/:id - Get single proforma
- POST /api/proformas - Create new proforma

## Phase 3: Update Server

### 5. Update server.js
- [ ] Add order routes to server.js
- [ ] Add proforma routes to server.js

## Phase 4: Implement Product Routes

### 6. Product Routes Implementation
- [ ] Update `backend/src/routes/productRoutes.js` to work with database
- [ ] Add CRUD operations using Product model

## Status: In Progress 🚧

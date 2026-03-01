# TODO - Admin Portal PDF Download Feature

## Plan

### 1. Backend (No changes needed)
- Order Schema: ✅ Already has all required fields (Full Address, Email, Phone, Order ID, Items, Total, Date/Time)
- Order Routes: ✅ Already has proper CRUD endpoints

### 2. Frontend - Admin Portal Updates
- [ ] Add jsPDF library to admin.html
- [ ] Create PDF generation function using jsPDF
- [ ] Add "Download PDF" button to order details modal
- [ ] Style the button to be clean and mobile-friendly

### 3. Testing
- [ ] Verify PDF downloads correctly with all order details
- [ ] Test mobile responsiveness

## Files to Edit
- `backend/admin.html` - Add jsPDF and PDF download functionality

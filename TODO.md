# TODO - Fix Cart Price Sum and Admin Order Display

## Issues Identified:
1. **Cart prices not summing up**: The checkout page calculates totals from individual item prices, but the launch offer bundle prices are split across items which can cause rounding issues
2. **Order details not displaying in admin portal**: Need to verify order data is properly sent and stored

## Fix Plan:

### Fix 1: Update checkout.html to properly calculate totals with launch offer logic
- [ ] 1. Add launch offer pricing logic to checkout.html to match script.js
- [ ] 2. Fix the calculateTotals function to apply launch offer discounts properly

### Fix 2: Ensure order data is properly sent to backend
- [ ] 3. Verify order submission sends complete product details
- [ ] 4. Add console logging for debugging order submission

### Fix 3: Test the fixes
- [ ] 5. Verify cart total calculation
- [ ] 6. Verify orders appear in admin portal

## Files to Edit:
- checkout.html - Fix cart price calculation and order submission


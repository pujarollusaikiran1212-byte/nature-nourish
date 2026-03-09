# TODO - Fix Special Launch Offer Issues

## Issues to Fix:
1. **Images not showing in cart/order summary** - Product name includes "(Bundle)" suffix which breaks image lookup
2. **Verify only available soaps are added** - Ensure "Coming Soon" products are not added to bundles
3. **Fix pricing mismatch** - HTML shows ₹279/₹399 but JS shows ₹249/₹349

## Implementation Steps:
- [x] 1. Fix getProductImage() to handle "(Bundle)" suffix in product names
- [x] 2. Update LAUNCH_OFFER pricing in script.js to match HTML (₹279 for 2, ₹399 for 3)
- [x] 3. Test the fixes

## Files to Edit:
- script.js


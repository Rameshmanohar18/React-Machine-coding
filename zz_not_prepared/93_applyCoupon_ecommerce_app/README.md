> **Task on Checkout Page**: 

> An “Apply Coupon” button was already present
> On click: Open an existing modal (already in the codebase)
> Call an API to fetch available coupons (API contract was clearly mentioned)
> Display all coupons inside the modal
> On selecting a coupon (e.g., ₹500), reduce the total price accordingly

**Quick reference — what belongs to what:**

| What | File | Pre-existing or Implemented |
|---|---|---|
| Booking data, base price | `CheckoutPage` | Pre-existing |
| Apply Coupon button | `CheckoutPage` | Pre-existing |
| `isModalOpen` state + `onClick` | `CheckoutPage` | ***Implemented*** |
| `appliedCoupon` state + discount row | `CheckoutPage` | ***Implemented*** |
| `totalPrice` with discount | `CheckoutPage` | ***Implemented*** |
| Modal props wiring | `CheckoutPage` | ***Implemented*** |
| Modal structure + close button | `CouponModal` | Pre-existing |
| `fetchCoupons` API call | `CouponModal` | ***Implemented*** |
| Coupon list render + selection | `CouponModal` | ***Implemented*** |
| `handleApply` + footer button | `CouponModal` | ***Implemented*** |
| `setTimeout` bubbling fix | `CouponModal` | ***Implemented*** |
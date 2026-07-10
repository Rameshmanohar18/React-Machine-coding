const OrderSummary = ({ cartItems }) => {
  const selectedItems = cartItems.filter((item) => item.isSelected);
  const totalItems = selectedItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const subtotal = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className='order-summary'>
      <h3>Order Summary</h3>
      <p>
        Subtotal ({totalItems} items):{' '}
        <strong>₹{subtotal.toLocaleString()}</strong>
      </p>
      <p className='free-delivery'>
        ✓ Your order is eligible for FREE Delivery
      </p>
      <button className='proceed-btn' disabled={selectedItems.length === 0}>
        Proceed to Buy ({totalItems} items)
      </button>
    </div>
  );
};

export default OrderSummary
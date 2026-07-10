import { useState } from 'react';
import './index.css';
import { initialCartItems } from './data';
import CartItem from './components/CartItem';
import OrderSummary from './components/OrderSummary';

const App = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const handleToggleSelect = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setCartItems((prev) =>
      prev.map((item) => ({ ...item, isSelected: isChecked }))
    );
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(newQuantity, item.maxStock) }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const allSelected =
    cartItems.length > 0 && cartItems.every((item) => item.isSelected);
  const selectedCount = cartItems.filter((item) => item.isSelected).length;

  return (
    <div className='cart-container'>
      {/* Left Section - Cart Items */}
      <div className='cart-main'>
        <div className='cart-header'>
          <h2>Shopping Cart</h2>
          <label>
            <input
              type='checkbox'
              checked={allSelected}
              onChange={handleSelectAll}
            />{' '}
            Select all items ({selectedCount} of {cartItems.length} selected)
          </label>
        </div>

        {/* Cart Items List */}
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onToggleSelect={handleToggleSelect}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemove}
            />
          ))
        )}
      </div>

      {/* Right Section - Order Summary */}
      <div className='cart-sidebar'>
        <OrderSummary cartItems={cartItems} />
      </div>
    </div>
  );
};

export default App;

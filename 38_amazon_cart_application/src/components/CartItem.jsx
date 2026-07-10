const CartItem = ({ item, onToggleSelect, onUpdateQuantity, onRemove }) => {
  const { id, name, price, quantity, maxStock, isSelected, image } = item;

  return (
    <div className='cart-item'>
      <div className='cart-item-content'>
        <input
          type='checkbox'
          checked={isSelected}
          onChange={() => onToggleSelect(id)}
        />
        <span className='cart-item-image'>{image}</span>

        <div className='cart-item-details'>
          <h4 className='cart-item-name'>{name}</h4>
          <p className='cart-item-stock'>In Stock</p>
          <p className='cart-item-price'>₹{price.toLocaleString()}</p>

          {/* Quantity Controls */}
          <div className='quantity-controls'>
            <button
              onClick={() => onUpdateQuantity(id, quantity - 1)}
              disabled={quantity <= 1}
            >
              -
            </button>

            <select
              value={quantity}
              onChange={(e) => onUpdateQuantity(id, Number(e.target.value))}
            >
              {/* [...Array(5)] // [undefined, undefined, undefined, undefined,
              undefined] */}
              {[...Array(maxStock)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <button
              onClick={() => onUpdateQuantity(id, quantity + 1)}
              disabled={quantity >= maxStock}
            >
              +
            </button>

            {quantity >= maxStock && (
              <span className='max-limit-warning'>Max limit</span>
            )}
          </div>

          {/* Action Links */}
          <div className='cart-item-actions'>
            <button onClick={() => onRemove(id)}>Delete</button>
          </div>
        </div>

        {/* Item Total */}
        <div className='cart-item-total'>
          <p>₹{(price * quantity).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

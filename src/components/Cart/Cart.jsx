import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/slices/cartSlice";
import "./Cart.css";

const CartPage = () => {
  // Access the cart state from the Redux store
  const cart = useSelector((state) => state.cart);
  // Get the dispatch function to dispatch actions
  const dispatch = useDispatch();

  // Local state to manage shipping method and help visibility
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [showHelp, setShowHelp] = useState(false);

  // Handler for removing items from the cart
  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  // Handler for updating the selected shipping method
  const handleShippingChange = (event) => {
    setShippingMethod(event.target.value);
  };

  // Calculate the total price of items in the cart
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Determine shipping cost based on the selected shipping method
  const getShippingCost = () => {
    switch (shippingMethod) {
      case "express":
        return 150.0;
      case "overnight":
        return 250.0;
      default:
        return 50.0;
    }
  };

  // Get the shipping cost and calculate the grand total
  const shippingCost = getShippingCost();
  const grandTotal = cartTotal + shippingCost;

  return (
    <div className="cart-page">
      <h1>Cart</h1>
      {/* List of items in the cart */}
      <ul className="cart-list">
        {cart.map((item) => (
          <li key={item.id} className="cart-item">
            <span>
              {item.name} - R{item.price} x {item.quantity}
            </span>
            <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
          </li>
        ))}
      </ul>
      <h2 className="cart-total">Total: R{cartTotal.toFixed(2)}</h2>

      {/* Shipping options and help button */}
      <div className="shipping-options">
        <h3>Shipping Options</h3>
        <select
          value={shippingMethod}
          onChange={handleShippingChange}
          className="shipping-select"
        >
          <option value="standard">Standard - R50.00</option>
          <option value="express">Express - R150.00</option>
          <option value="overnight">Overnight - R250.00</option>
        </select>
        <button className="help-button" onClick={() => setShowHelp(true)}>
          Help
        </button>
      </div>

      <h2 className="cart-total">Shipping: R{shippingCost.toFixed(2)}</h2>
      <h2 className="grand-total">Grand Total: R{grandTotal.toFixed(2)}</h2>

      {/* Help modal displaying shipping details */}
      {showHelp && (
        <div className="help-modal">
          <h3>Shipping Options</h3>
          <ul>
            <li>
              <strong>Standard:</strong> Delivered in 5-7 business days. Cost:
              R50.00
            </li>
            <li>
              <strong>Express:</strong> Delivered in 2-3 business days. Cost:
              R150.00
            </li>
            <li>
              <strong>Overnight:</strong> Delivered next business day. Cost:
              R250.00
            </li>
          </ul>
          <button onClick={() => setShowHelp(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;

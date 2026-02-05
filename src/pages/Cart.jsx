import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

function Cart() {
  const { cart, removeFromCart, incrementQty, decrementQty } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart 🛒</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">🛒 Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.title} className="cart-item-image" />

              <div className="cart-item-details">
                <h4>{item.title}</h4>
                <p>Price: ₹ {item.price}</p>
                <p>Total: ₹ {item.price * item.qty}</p>
              </div>

              <div className="qty-controls">
                <button onClick={() => decrementQty(item.id)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => incrementQty(item.id)}>+</button>
              </div>

              <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Total: ₹ {total}</h3>
            <button className="checkout-btn" onClick={() => navigate("/checkout")}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;

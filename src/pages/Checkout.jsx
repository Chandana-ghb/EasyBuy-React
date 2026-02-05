import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Checkout.module.css";

function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user_details"));

  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const order = {
      userId: user.id,
      items: cart,
      date: new Date().toLocaleString(),
      status: "Pending" 
    };

    await fetch("https://easybuy-react.onrender.com/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order)
    });

    clearCart();
    alert("Order placed successfully");
  };


  return (
    <div className={styles.checkoutContainer}>
      <h2>Checkout</h2>
      <p>Total items: {cart.length}</p>
      <center><button className={styles.placeOrderBtn} onClick={placeOrder}>
        Place Order
      </button></center>
    </div>
  );
}

export default Checkout;

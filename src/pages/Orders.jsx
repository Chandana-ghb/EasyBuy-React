import React, { useEffect, useState } from "react";
import "../styles/Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user_details"));

  useEffect(() => {
    fetch(`https://easybuy-react.onrender.com/orders?userId=${user.id}`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [user.id]);

  return (
    <div className="orders-container">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p className="empty-orders">No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-header">
              <p className="order-date">
                <b>Order Date:</b> {order.date}
              </p>

              <span className={`status-badge ${(order.status || "pending").toLowerCase()}`}>
                {order.status || "Pending"}
              </span>
            </div>

            <div className="order-items">
              {(order.items || []).map((item) => (
                <div key={item.id} className="order-item">
                  <div className="item-left">
                    <p className="title">{item.title}</p>
                    <p className="qty">Qty: {item.qty}</p>
                  </div>

                  <p className="price">₹ {item.price * item.qty}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import "../styles/Home.css";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user_details"));
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const [orders, setOrders] = useState([]);
  const [offers, setOffers] = useState([]);
  const [offerIndex, setOfferIndex] = useState(0);
  const [products, setProducts] = useState([]);

  /* ================= AUTH GUARD ================= */
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  /* ================= FETCH USER ORDERS ================= */
  useEffect(() => {
    if (user?.id) {
      fetch(`http://localhost:5000/orders?userId=${user.id}`)
        .then((res) => res.json())
        .then((data) => setOrders(data));
    }
  }, [user]);

  /* ================= FETCH OFFERS ================= */
  useEffect(() => {
    fetch("http://localhost:5000/offers")
      .then((res) => res.json())
      .then((data) => setOffers(data));
  }, []);

  /* ================= FETCH PRODUCTS ================= */
  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  /* ================= AUTO CAROUSEL ================= */
  useEffect(() => {
    if (offers.length === 0) return;

    const timer = setInterval(() => {
      setOfferIndex((prev) => (prev + 1) % offers.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [offers]);

  const nextOffer = () =>
    setOfferIndex((prev) => (prev + 1) % offers.length);

  const prevOffer = () =>
    setOfferIndex((prev) =>
      prev === 0 ? offers.length - 1 : prev - 1
    );

  /* ================= ORDER STATUS ================= */
  const delivered = orders.filter((o) => o.status === "Delivered").length;
  const pending = orders.filter((o) => o.status === "Pending").length;
  const cancelled = orders.filter((o) => o.status === "Cancelled").length;

  if (!user) return null;

  return (
    <div className="home-container">
      {/* ================= WELCOME ================= */}
      <h2 className="welcome">Welcome, {user.name} 👋</h2>

      {/* ================= ORDER SUMMARY ================= */}
      <div className="order-summary">
        <div className="card delivered">Delivered: {delivered}</div>
        <div className="card pending">Pending: {pending}</div>
        <div className="card cancelled">Cancelled: {cancelled}</div>
      </div>

      {/* ================= OFFERS ================= */}
      {offers.length > 0 && (
        <div className="offers-section">
          <button className="nav-btn left" onClick={prevOffer}>❮</button>

          <img
            src={offers[offerIndex].image}
            alt={offers[offerIndex].title}
            className="offer-img"
          />

          <button className="nav-btn right" onClick={nextOffer}>❯</button>
          <h3 className="offer-title">{offers[offerIndex].title}</h3>
        </div>
      )}

      {/* ================= FEATURED PRODUCTS ================= */}
      <h3 className="section-title">Featured Products</h3>

      <div className="products-list">
        {products.slice(0, 4).map((product) => (
          <div key={product.id} className="product-card">

            {/* IMAGE WRAPPER */}
            <div className="image-wrapper">
              <img
                src={product.image}
                alt={product.title}
                className="product-img"
                onClick={() => navigate(`/products/${product.id}`)}
              />

              {/* ❤️ FAVORITE ICON */}
              <span
                className={`fav-icon ${
                  isFavorite(product.id) ? "active" : ""
                }`}
                onClick={() => toggleFavorite(product)}
              >
                ♥
              </span>
            </div>

            <h4 className="product-name">{product.title}</h4>
            <p className="product-price">₹ {product.price}</p>

            <button
              className="add-to-cart"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaHeart,
  FaShoppingCart,
  FaClipboardList
} from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import "../styles/Sidebar.css";

function Sidebar({ isOpen, closeSidebar }) {
  const { cart } = useCart();
  const { favorites } = useFavorites();
  const location = useLocation();

  return (
    <aside className={`sidebar ${isOpen ? "mobile-open" : ""}`}>
      <div className="menu-title">Menu</div>

      <nav className="menu">
        <Link to="/home" className={`link ${location.pathname === "/home" ? "active" : ""}`} onClick={closeSidebar}>
          <FaHome className="icon" />
          <span>Home</span>
        </Link>

        <Link to="/products" className={`link ${location.pathname === "/products" ? "active" : ""}`} onClick={closeSidebar}>
          <FaBox className="icon" />
          <span>Products</span>
        </Link>

        <Link to="/favorites" className={`link ${location.pathname === "/favorites" ? "active" : ""}`} onClick={closeSidebar}>
          <FaHeart className="icon" />
          <span>Favorites</span>
          {favorites.length > 0 && <b className="badge">{favorites.length}</b>}
        </Link>

        <Link to="/cart" className={`link ${location.pathname === "/cart" ? "active" : ""}`} onClick={closeSidebar}>
          <FaShoppingCart className="icon" />
          <span>Cart</span>
          {cart.length > 0 && <b className="badge">{cart.length}</b>}
        </Link>

        <Link to="/orders" className={`link ${location.pathname === "/orders" ? "active" : ""}`} onClick={closeSidebar}>
          <FaClipboardList className="icon" />
          <span>Orders</span>
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;

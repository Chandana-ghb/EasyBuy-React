import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { useFavorites } from "../context/FavoritesContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import styles from "../styles/Products.module.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [quantities, setQuantities] = useState({});
  const itemsPerPage = 6;

  const { cart, addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        const initialQty = {};
        data.forEach(p => initialQty[p.id] = 1);
        setQuantities(initialQty);
      });
  }, []);

  const categories = ["all", ...new Set(products.map(p => p.category))];

  // Filtering and sorting
  let filteredProducts = [...products];
  if (category !== "all") filteredProducts = filteredProducts.filter(p => p.category === category);
  if (search) filteredProducts = filteredProducts.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
  if (sortOrder === "low") filteredProducts.sort((a,b) => a.price - b.price);
  if (sortOrder === "high") filteredProducts.sort((a,b) => b.price - a.price);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage);

  const handleQtyChange = (id, delta) => {
    setQuantities(prev => {
      const newQty = Math.max(1, (prev[id] || 1) + delta);
      return { ...prev, [id]: newQty };
    });
  };

  return (
    <div className={styles.productsContainer}>
      <h2>Products</h2>

      <div className={styles.productsControls}>
        <input type="text" placeholder="Search..." value={search} onChange={e => { setSearch(e.target.value); setCurrentPage(1); }} />
        <select value={category} onChange={e => { setCategory(e.target.value); setCurrentPage(1); }}>
          {categories.map(c => <option key={c} value={c}>{c.toUpperCase()}</option>)}
        </select>
        <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
          <option value="" disabled>Sort by price</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>
      </div>

      <div className={styles.productsGrid}>
        {paginatedProducts.map(p => {
          const qty = quantities[p.id] || 1;
          return (
            <div key={p.id} className={styles.productCard}>
              <div className={styles.imageWrapper}>
                <img src={p.image} alt={p.title} />
                <span className={`${styles.favIcon} ${isFavorite(p.id) ? styles.active : ""}`} onClick={() => toggleFavorite(p)}>♥</span>
              </div>
              <h4>{p.title}</h4>
              <p>₹ {p.price}</p>

              <div className={styles.qtyControls}>
                <button onClick={() => handleQtyChange(p.id, -1)}>-</button>
                <span>{qty}</span>
                <button onClick={() => handleQtyChange(p.id, 1)}>+</button>
              </div>

              <button className={styles.addToCart} onClick={() => addToCart({ ...p, qty })}>
                Add to Cart
              </button>

              <button className={styles.buyNow} onClick={() => {
                addToCart({ ...p, qty });
                navigate("/checkout");
              }}>
                Buy Now
              </button>
            </div>
          );
        })}
      </div>

      <div className={styles.pagination}>
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p-1)}>Prev</button>
        {[...Array(totalPages)].map((_, i) => (
          <button key={i} className={currentPage === i+1 ? styles.active : ""} onClick={() => setCurrentPage(i+1)}>{i+1}</button>
        ))}
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p+1)}>Next</button>
      </div>
    </div>
  );
}

export default Products;

import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import styles from "../styles/Favorites.module.css";

function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();

  return (
    <div className={styles.container}>
      <center><h1>❤️ My Favorites</h1></center>

      {favorites.length === 0 ? (
        <p>No favorite products yet</p>
      ) : (
        <div className={styles.grid}>
          {favorites.map((p) => (
            <div key={p.id} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={p.image} alt={p.title} />
              </div>

              <h4>{p.title}</h4>
              <p>₹ {p.price}</p>

              <button
                className={styles.addToCartBtn}
                onClick={() => {
                  addToCart({
                    id: crypto.randomUUID(),
                    productId: p.productId,
                    title: p.title,
                    price: p.price,
                    image: p.image,
                    qty: 1,
                  });
                  // toast.success("Added to cart 🛒");
                }}
              >
                Add to Cart
              </button>

              {/* Pass full favorite object */}
              <button
                className={styles.removeFavBtn}
                onClick={() => toggleFavorite(p)}
              >
                Remove from Favorites
              </button>
            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default Favorites;

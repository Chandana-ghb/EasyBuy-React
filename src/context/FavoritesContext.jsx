import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const FavoritesContext = createContext();
const BASE_URL = import.meta.env.VITE_API_URL;

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [userId, setUserId] = useState(null);

  // Track logged-in user
  useEffect(() => {
    const checkUser = () => {
      const user = JSON.parse(localStorage.getItem("user_details"));
      setUserId(user?.id || null);
    };

    checkUser(); // first run
    const interval = setInterval(checkUser, 300); // detect user change
    return () => clearInterval(interval);
  }, []);

  // Load favorites when user changes
  useEffect(() => {
    if (!userId) {
      setFavorites([]);
      return;
    }

    const loadFavorites = async () => {
      try {
        const res = await fetch(`${BASE_URL}/favorites?userId=${userId}`);
        const data = await res.json();
        setFavorites(data);
      } catch (err) {
        console.error(err);
        setFavorites([]);
      }
    };

    loadFavorites();
  }, [userId]);

  // Check if product is favorite
  const isFavorite = (productId) => {
    return favorites.some(f => f.productId === productId);
  };

  const toggleFavorite = async (product) => {
  if (!userId) {
    toast.error("Please login first");
    return;
  }

  // Check if this product is already in favorites
  const existing = favorites.find(
    (f) => f.productId === (product.productId || product.id)
  );

  if (existing) {
    // Remove favorite
    await fetch(`${BASE_URL}/favorites/${existing.id}`, { method: "DELETE" });
    setFavorites(prev => prev.filter(f => f.id !== existing.id));
    toast.success("Removed from favorites ❤️");
  } else {
    // Add favorite
    const newFav = {
      id: crypto.randomUUID(),
      userId,
      productId: product.id, // always use product.id for new favorite
      title: product.title,
      price: product.price,
      image: product.image
    };

    const res = await fetch(`${BASE_URL}/favorites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newFav)
    });

    const data = await res.json();
    setFavorites(prev => [...prev, data]);
    toast.success("Added to favorites ❤️");
  }
};


  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);

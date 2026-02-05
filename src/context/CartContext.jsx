import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();
const BASE_URL = import.meta.env.VITE_API_URL;

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);

  // Track user continuously
  useEffect(() => {
    const checkUser = () => {
      const user = JSON.parse(localStorage.getItem("user_details"));
      setUserId(user?.id || null);
    };

    checkUser(); // run once
    const interval = setInterval(checkUser, 300); // detect user change
    return () => clearInterval(interval);
  }, []);

  // Load cart when user changes
  useEffect(() => {
    if (!userId) {
      setCart([]);
      return;
    }

    const loadCart = async () => {
      try {
        const res = await fetch(`${BASE_URL}/cart?userId=${userId}`);
        const data = await res.json();
        setCart(data);
      } catch (err) {
        console.error(err);
        setCart([]);
      }
    };

    loadCart();
  }, [userId]);

  // Add to cart
  const addToCart = async (product) => {
    if (!userId) {
      toast.error("Please login first");
      return;
    }

    const exists = cart.find((item) => item.productId === product.id);

    if (exists) {
      await incrementQty(exists.id, product.qty); // increment by selected qty
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          qty: product.qty || 1,
        }),
      });

      const newItem = await res.json();
      setCart((prev) => [...prev, newItem]);
      toast.success(`Added ${product.qty} item(s) to cart 🛒`);
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  // Increment quantity
  const incrementQty = async (id, delta = 1) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;

    await fetch(`${BASE_URL}/cart/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qty: item.qty + delta }),
    });

    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
    );
  };

  // Decrement quantity
  const decrementQty = async (id, delta = 1) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;

    if (item.qty <= delta) return removeFromCart(id);

    await fetch(`${BASE_URL}/cart/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ qty: item.qty - delta }),
    });

    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty - delta } : i))
    );
  };

  // Remove item
  const removeFromCart = async (id) => {
    await fetch(`${BASE_URL}/cart/${id}`, { method: "DELETE" });
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Clear cart (for checkout)
  const clearCart = async () => {
    for (let item of cart) {
      await fetch(`${BASE_URL}/cart/${item.id}`, { method: "DELETE" });
    }
    setCart([]);
    toast.success("Order placed 🎉");
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, incrementQty, decrementQty, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

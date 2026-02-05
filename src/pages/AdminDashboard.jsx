import { useEffect, useState } from "react";
import styles from "../styles/AdminDashboard.module.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function AdminDashboard() {
  /* ================= STATES ================= */
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [offers, setOffers] = useState([]);

  /* Product Form */
  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
    category: "",
    description: "",
  });
  const [editingProductId, setEditingProductId] = useState(null);

  /* Offer Form */
  const [offerForm, setOfferForm] = useState({
    title: "",
    image: "",
    category: "",
  });
  const [editingOfferId, setEditingOfferId] = useState(null);

  /* Tabs */
  const [activeTab, setActiveTab] = useState("products");

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchOffers();
  }, []);

  /* ================= FETCH ================= */
  const fetchProducts = async () => {
    const res = await fetch("https://easybuy-react.onrender.com/products");
    setProducts(await res.json());
  };

  const fetchOrders = async () => {
    const res = await fetch("https://easybuy-react.onrender.com/orders");
    setOrders(await res.json());
  };

  const fetchOffers = async () => {
    const res = await fetch("https://easybuy-react.onrender.com/offers");
    setOffers(await res.json());
  };

  /* ================= PRODUCTS ================= */
  const handleFormSubmit = async () => {
    if (!form.title || !form.price || !form.category)
      return alert("Fill title, price, category");

    if (editingProductId) {
      // EDIT MODE
      await fetch(`https://easybuy-react.onrender.com/products/${editingProductId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      });
      setEditingProductId(null);
    } else {
      // ADD MODE
      await fetch("https://easybuy-react.onrender.com/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, price: Number(form.price) }),
      });
    }

    setForm({ title: "", price: "", image: "", category: "", description: "" });
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await fetch(`https://easybuy-react.onrender.com/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  const startEditProduct = (product) => {
    setEditingProductId(product.id);
    setForm(product);
  };

  /* ================= OFFERS ================= */
  const handleOfferChange = (e) =>
    setOfferForm({ ...offerForm, [e.target.name]: e.target.value });

  const addOrEditOffer = async () => {
    if (!offerForm.title || !offerForm.image || !offerForm.category)
      return alert("Fill all offer fields");

    if (editingOfferId) {
      await fetch(`https://easybuy-react.onrender.com/offers/${editingOfferId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(offerForm),
      });
      setEditingOfferId(null);
    } else {
      await fetch("https://easybuy-react.onrender.com/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(offerForm),
      });
    }

    setOfferForm({ title: "", image: "", category: "" });
    fetchOffers();
  };

  const startEditOffer = (offer) => {
    setEditingOfferId(offer.id);
    setOfferForm(offer);
  };

  const deleteOffer = async (id) => {
    await fetch(`https://easybuy-react.onrender.com/offers/${id}`, { method: "DELETE" });
    fetchOffers();
  };

  /* ================= ORDERS ================= */
  const updateOrderStatus = async (id, status) => {
    await fetch(`https://easybuy-react.onrender.com/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  };

  return (
    <>
    <Navbar/>
    <div className={styles.adminContainer}>
      <h2>Admin Dashboard</h2>

      {/* ================= TABS ================= */}
      <div className={styles.tabs}>
        <button
          className={activeTab === "products" ? styles.activeTab : ""}
          onClick={() => setActiveTab("products")}
        >
          Products
        </button>
        <button
          className={activeTab === "offers" ? styles.activeTab : ""}
          onClick={() => setActiveTab("offers")}
        >
          Offers
        </button>
        <button
          className={activeTab === "orders" ? styles.activeTab : ""}
          onClick={() => setActiveTab("orders")}
        >
          Orders
        </button>
      </div>

      {/* ================= PRODUCTS TAB ================= */}
      {activeTab === "products" && (
        <>
          <section className={styles.adminSection}>
            <h3>{editingProductId ? "Edit Product" : "Add Product"}</h3>
            <div className={styles.formRow}>
              {["title", "price", "image", "category", "description"].map((f) => (
                <input
                  key={f}
                  name={f}
                  placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                  value={form[f]}
                  onChange={(e) => setForm({ ...form, [f]: e.target.value })}
                />
              ))}
              <button onClick={handleFormSubmit}>
                {editingProductId ? "Save Changes" : "Add Product"}
              </button>
              {editingProductId && (
                <button
                  onClick={() => {
                    setEditingProductId(null);
                    setForm({ title: "", price: "", image: "", category: "", description: "" });
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </section>

          <section className={styles.adminSection}>
            <h3>All Products</h3>
            <div className={styles.scrollList}>
              {products.map((p) => (
                <div key={p.id} className={styles.productCard}>
                  <span>
                    <b>{p.title}</b> — ₹{p.price}
                    <br />
                    <small>{p.description}</small>
                  </span>
                  <div className={styles.productActions}>
                    <button
                      onClick={() => startEditProduct(p)}
                      className={styles.editBtn}
                    >
                      Update
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* ================= OFFERS TAB ================= */}
      {activeTab === "offers" && (
        <section className={styles.adminSection}>
          <h3>{editingOfferId ? "Edit Offer" : "Add Offer"}</h3>
          <div className={styles.formRow}>
            <input
              name="title"
              placeholder="Offer Title"
              value={offerForm.title}
              onChange={handleOfferChange}
            />
            <input
              name="image"
              placeholder="Image URL"
              value={offerForm.image}
              onChange={handleOfferChange}
            />
            <input
              name="category"
              placeholder="Category"
              value={offerForm.category}
              onChange={handleOfferChange}
            />
            <button onClick={addOrEditOffer}>
              {editingOfferId ? "Save Changes" : "Add Offer"}
            </button>
            {editingOfferId && (
              <button
                onClick={() => {
                  setEditingOfferId(null);
                  setOfferForm({ title: "", image: "", category: "" });
                }}
              >
                Cancel
              </button>
            )}
          </div>

          <div className={styles.scrollList}>
            {offers.map((o) => (
              <div key={o.id} className={styles.offerCard}>
                <span>
                  <b>{o.title}</b> ({o.category})
                </span>
                <div className={styles.productActions}>
                  <button
                    onClick={() => startEditOffer(o)}
                    className={styles.editBtn}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteOffer(o.id)}
                    className={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= ORDERS TAB ================= */}
      {activeTab === "orders" && (
        <section className={styles.adminSection}>
          <h3>Orders</h3>
          <div className={styles.scrollList}>
            {orders.map((order) => (
              <div key={order.id} className={styles.orderCard}>
                <p>
                  <b>ID:</b> {order.id} | <b>Status:</b> {order.status}
                </p>

                {order.items.map((item) => (
                  <p key={item.id}>
                    {item.title} × {item.qty} — ₹{item.price * item.qty}
                  </p>
                ))}

                <div className={styles.orderButtons}>
                  <button onClick={() => updateOrderStatus(order.id, "Shipping")}>
                    Shipping
                  </button>
                  <button onClick={() => updateOrderStatus(order.id, "Delivered")}>
                    Delivered
                  </button>
                  <button onClick={() => updateOrderStatus(order.id, "Cancelled")}>
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
    <Footer />
    </>
  );
}

export default AdminDashboard;

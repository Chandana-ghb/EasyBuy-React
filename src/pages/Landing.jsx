import "../styles/Landing.css";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">

      {/* ===== STICKY NAVBAR ===== */}
      <nav className="landing-nav">
        <h2 className="landing-logo">EasyBuy 🛒</h2>
        <div className="landing-actions">
          <button onClick={() => navigate("/login")}>Login</button>
          <button className="primary" onClick={() => navigate("/register")}>
            Sign Up
          </button>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="landing-hero">
        <div className="hero-text fade-slide-left">
          <h1>
            Shop Smart.<br />
            <span>Shop Easy.</span>
          </h1>
          <p>
            Electronics, fashion, books & more — delivered fast and securely.
          </p>

          <div className="hero-buttons">
            <button className="primary" onClick={() => navigate("/register")}>
              Get Started
            </button>
            <button onClick={() => navigate("/login")}>Login</button>
          </div>
        </div>

        <div className="hero-image fade-slide-right">
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=900&q=80"
            alt="Online Shopping"
          />
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="landing-features">
        <div className="feature-card fade-up">
          🚚
          <h3>Fast Delivery</h3>
          <p>Across India in 2–4 days</p>
        </div>
        <div className="feature-card fade-up delay-1">
          🔐
          <h3>Secure Payments</h3>
          <p>100% protected checkout</p>
        </div>
        <div className="feature-card fade-up delay-2">
          💰
          <h3>Best Deals</h3>
          <p>Daily discounts & offers</p>
        </div>
      </section>

      {/* ===== SHOP BY CATEGORY ===== */}
      <section className="categories">
        <h2>Shop by Category</h2>

        <div className="category-grid">
          <div className="category-card">📱 Electronics</div>
          <div className="category-card">👗 Fashion</div>
          <div className="category-card">📚 Books</div>
          <div className="category-card">🏠 Home</div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="cta">
        <h2>Start Shopping Today</h2>
        <p>Create your account and enjoy exclusive deals.</p>
        <button className="primary" onClick={() => navigate("/register")}>
          Create Account
        </button>
      </section>

    </div>
  );
};

export default Landing;

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useUser } from "../context/UserContext";
import "../styles/Navbar.css"; // 👈 make sure this is imported

function Navbar({ toggleSidebar }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logoutUser } = useUser();

  const logout = () => {
    logoutUser();
    navigate("/login");
  };

  // Hide hamburger on admin page
  const hideMenu = location.pathname === "/admin";

  return (
    <header style={styles.header}>
      {/* LEFT - HAMBURGER (MOBILE ONLY) */}
      {!hideMenu && (
        <FiMenu
          className="menu-toggle"
          style={styles.menuIcon}
          onClick={toggleSidebar}
        />
      )}

      {/* CENTER - LOGO */}
      <h2 style={styles.logo}>EasyBuy 🛒</h2>

      {/* RIGHT - USER */}
      {user && (
        <div style={styles.right}>
          <span style={styles.user}>Hi, {user.name}</span>
          <button style={styles.logout} onClick={logout}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

const styles = {
  header: {
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 22px",
    background: "linear-gradient(135deg, #38bdf8, #2dd4bf)",
    boxShadow: "0 6px 18px rgba(56,189,248,0.35)",
    position: "sticky",
    top: 0,
    zIndex: 1000
  },
  menuIcon: {
    fontSize: "26px",
    color: "#ffffff",
    cursor: "pointer"
  },
  logo: {
    color: "#ffffff",
    fontWeight: "800",
    fontSize: "26px"
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "14px"
  },
  user: {
    color: "#ecfeff",
    fontSize: "15px",
    fontWeight: "500"
  },
  logout: {
    padding: "7px 14px",
    border: "none",
    borderRadius: "8px",
    background: "#ffffff",
    color: "#0ea5e9",
    fontWeight: "700",
    cursor: "pointer"
  }
};

export default Navbar;

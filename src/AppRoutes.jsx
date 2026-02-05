import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";   // ✅ import landing page
import Home from "./pages/Home";
import Products from "./pages/Products";
import Favorites from "./pages/Favorites";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";

function AppRoutes() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Hide Navbar/Sidebar/Footer for certain pages
  const hideLayoutPages = ["/login", "/register", "/admin", "/"];
  const isLayoutHidden = hideLayoutPages.includes(location.pathname);

  // Check if current route is invalid
  const validPages = [
    "/", "/home", "/products", "/favorites", "/cart", "/checkout", "/orders",
    "/login", "/register", "/admin"
  ];
  const isNotFoundPage = !validPages.includes(location.pathname);

  return (
    <div className="page-layout">
      {!isLayoutHidden && !isNotFoundPage && (
        <Navbar toggleSidebar={() => setOpen(!open)} />
      )}

      {!isLayoutHidden && !isNotFoundPage && (
        <Sidebar isOpen={open} closeSidebar={() => setOpen(false)} />
      )}

      <div className="content-wrapper">
        <div className="page-content">
          <Routes>
            {/* Landing page */}
            <Route path="/" element={<Landing />} />

            {/* Auth */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Private user routes */}
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/products" element={<PrivateRoute><Products /></PrivateRoute>} />
            <Route path="/favorites" element={<PrivateRoute><Favorites /></PrivateRoute>} />
            <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
            <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
            <Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />

            {/* Admin */}
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        {!isLayoutHidden && !isNotFoundPage && <Footer />}
      </div>
    </div>
  );
}

export default AppRoutes;

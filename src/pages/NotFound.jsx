// src/pages/NotFound.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: "#f8fafc",
        color: "#1e293b",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "72px", marginBottom: "20px" }}>404</h1>
      <h2 style={{ marginBottom: "20px" }}>Page Not Found</h2>
      <p style={{ marginBottom: "30px" }}>
        The page you are looking for does not exist.
      </p>
      <button
        onClick={() => navigate("/")}
        style={{
          background: "#0284c7",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        Go Home
      </button>
    </div>
  );
}

export default NotFound;

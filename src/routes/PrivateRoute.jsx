import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const user = localStorage.getItem("user_details");
  return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;

import React from "react";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./AppRoutes";

function App() {
  return (
    <div className="app-layout">
      <Toaster position="top-right" reverseOrder={false} />
      <AppRoutes />
    </div>
  );
}

export default App;

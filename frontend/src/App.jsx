import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Products from "./components/Products";

function App() {
  const [page, setPage] = useState("login");
  const [toast, setToast] = useState({ message: "", show: false });

  const showToastMessage = (message) => {
    setToast({ message, show: true });
    setTimeout(() => {
      setToast({ message: "", show: false });
    }, 3000);
  };

  const handleLogin = () => {
    showToastMessage("Login successful! Redirecting to products...");
    setTimeout(() => {
      setPage("products");
    }, 1500);
  };

  const handleLogout = () => {
    setPage("login");
    showToastMessage("Logged out successfully!");
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      {/* Toast Notification Pop-up */}
      {toast.show && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "#ffffff",
            color: "#333333",
            padding: "12px 18px",
            borderRadius: "8px",
            boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.15)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            minWidth: "280px",
            fontFamily: "sans-serif",
            borderLeft: "4px solid #10b981",
          }}
        >
          <div
            style={{
              backgroundColor: "#10b981",
              color: "#ffffff",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "bold",
              flexShrink: 0,
            }}
          >
            ✓
          </div>

          <span style={{ fontSize: "14px", fontWeight: "500", flexGrow: 1 }}>
            {toast.message}
          </span>

          <button
            onClick={() => setToast({ ...toast, show: false })}
            style={{
              background: "none",
              border: "none",
              fontSize: "16px",
              color: "#aaa",
              cursor: "pointer",
              padding: "0 4px",
              lineHeight: "1",
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Navigation Pages */}
      {page === "register" && (
        <Register goLogin={() => setPage("login")} />
      )}

      {page === "login" && (
        <Login
          onLogin={handleLogin}
          goRegister={() => setPage("register")}
        />
      )}

      {page === "products" && (
        <Products 
          onLogout={handleLogout} 
          showToast={showToastMessage} 
        />
      )}
    </div>
  );
}

export default App;
import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Products from "./components/Products";


function App() {
    const [page, setPage] = useState("register");

    const handleLogin = () => {
        setPage("success");

        setTimeout(() => {
            setPage("products");
        }, 1500);
    };

    // Logout function para bumalik sa login page
    const handleLogout = () => {
        setPage("login");
    };

    return (
        <div>
            {page === "register" && (
                <Register
                    goLogin={() => setPage("login")}
                />
            )}

            {page === "login" && (
                <Login
                    onLogin={handleLogin}
                    goRegister={() => setPage("register")}
                />
            )}

            {page === "success" && (
                <div className="success-container">
                    <h1>Login successful!</h1>
                    <p>Redirecting to products...</p>
                </div>
            )}

            {page === "products" && (
                <Products onLogout={handleLogout} />
            )}
        </div>
    );
}

export default App;
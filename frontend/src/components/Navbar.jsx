import { logout } from "../api";

function Navbar({ setPage, onLogout }) {
    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    const handleLogout = async () => {
        await logout();
        onLogout();
    };

    return (
        <nav className="navbar">
            <h2>My Products</h2>

            <div>
                <span>
                    Welcome, {user.username}
                </span>

                <button
                    onClick={() => setPage("products")}
                >
                    Products
                </button>

                <button
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
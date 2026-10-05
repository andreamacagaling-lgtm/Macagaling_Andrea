import { useState } from "react";
import { login } from "../api";

function Login({ onLogin, goRegister }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        try {
            const data = await login(
                username,
                password
            );

            setMessage(data.message);

            onLogin();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="auth-container">
            <form
                className="auth-card"
                onSubmit={handleSubmit}
            >
                <h1>Login</h1>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    required
                />

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

                {message && (
                    <p className="success">
                        {message}
                    </p>
                )}

                <button type="submit">
                    Login
                </button>

                <p className="switch-text">
                    Don't have an account?{" "}
                    <span
                        className="link"
                        onClick={goRegister}
                    >
                        Register
                    </span>
                </p>
            </form>
        </div>
    );
}

export default Login;
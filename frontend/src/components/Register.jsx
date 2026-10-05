import { useState } from "react";
import { register } from "../api";

function Register({ goLogin }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setError("");

        try {
            const data = await register(
                username,
                email,
                password,
                role
            );

            setMessage(data.message);

            setUsername("");
            setEmail("");
            setPassword("");
            setRole("user");
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
                <h1>Create Account</h1>

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
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
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

                <select
                    value={role}
                    onChange={(e) =>
                        setRole(e.target.value)
                    }
                    required
                >
                    <option value="user">
                        User
                    </option>

                    <option value="admin">
                        Admin
                    </option>
                </select>

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
                    Register
                </button>

                <p className="switch-text">
                    Already have an account?{" "}
                    <span
                        className="link"
                        onClick={goLogin}
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
}

export default Register;
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Login() {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
                background: "#f4f4f4",
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    background: "white",
                    padding: 30,
                    borderRadius: 10,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    width: 300,
                }}
            >
                <h2 style={{ textAlign: "center", marginBottom: 20 }}>Login</h2>

                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                        width: "94%",
                        marginBottom: 10,
                        padding: 8,
                        borderRadius: 6,
                        border: "1px solid #ccc",
                    }}
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{
                        width: "94%",
                        marginBottom: 15,
                        padding: 8,
                        borderRadius: 6,
                        border: "1px solid #ccc",
                    }}
                />

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: 8,
                        background: "#3498db",
                        color: "white",
                        border: "none",
                        borderRadius: 6,
                        cursor: "pointer",
                    }}
                >
                    Entrar
                </button>

                <p style={{ fontSize: 12, color: "#666", marginTop: 10 }}>
                    Use: <b>admin@email.com</b> / <b>123456</b>
                </p>
            </form>
        </div>
    );
}

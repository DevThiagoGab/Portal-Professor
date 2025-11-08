import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Sidebar() {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const styleLink = {
        display: "block",
        padding: "10px 16px",
        textDecoration: "none",
        color: "#333",
        borderRadius: "8px",
        marginBottom: "8px",
    };

    return (
        <div
            style={{
                width: 200,
                background: "#f3f3f3",
                height: "100vh",
                padding: "20px",
                boxSizing: "border-box",
            }}
        >
            <h3 style={{ marginBottom: 20 }}>📘 Portal</h3>
            <nav>
                <Link style={styleLink} to="/dashboard">🏠 Dashboard</Link>
                <Link style={styleLink} to="/alunos">👩‍🎓 Alunos</Link>
                <Link style={styleLink} to="/turmas">🏫 Turmas</Link>
                <Link style={styleLink} to="/avaliacoes">🧮 Avaliações</Link>
            </nav>
            <button
                onClick={handleLogout}
                style={{
                    marginTop: 20,
                    width: "100%",
                    padding: 8,
                    background: "#c0392b",
                    color: "white",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                }}
            >
                Sair
            </button>
        </div>
    );
}

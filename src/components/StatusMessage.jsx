export default function StatusMessage({ type, message, onRetry }) {
    const baseStyle = {
        textAlign: "center",
        marginTop: 50,
        fontSize: "16px",
        color: "#555",
    };

    const icons = {
        loading: "⏳",
        error: "❌",
        empty: "📭",
    };

    const colors = {
        loading: "#555",
        error: "red",
        empty: "#888",
    };

    return (
        <div style={{ ...baseStyle, color: colors[type] }}>
            <p>
                {icons[type]} {message}
            </p>

            {type === "error" && (
                <button
                    onClick={onRetry}
                    style={{
                        marginTop: 20,
                        padding: "8px 16px",
                        border: "none",
                        borderRadius: 6,
                        background: "#007BFF",
                        color: "white",
                        cursor: "pointer",
                    }}
                >
                    Tentar novamente
                </button>
            )}
        </div>
    );
}

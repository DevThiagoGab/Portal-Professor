import { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { DataContext } from "../../context/DataContext";
import StatusMessage from "../../components/StatusMessage";

export default function Dashboard() {
    const { alunos, turmas, avaliacoes } = useContext(DataContext);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    // 🕓 Simula carregamento inicial
    useEffect(() => {
        try {
            setCarregando(true);
            const timer = setTimeout(() => {
                setCarregando(false);
            }, 1000);
            return () => clearTimeout(timer);
        } catch (e) {
            setErro("Erro ao carregar o painel.");
            setCarregando(false);
        }
    }, []);

    // ⏳ Estado de carregamento
    if (carregando) {
        return (
            <Layout>
                <StatusMessage type="loading" message="Carregando painel..." />
            </Layout>
        );
    }

    // ❌ Estado de erro
    if (erro) {
        return (
            <Layout>
                <StatusMessage
                    type="error"
                    message={erro}
                    onRetry={() => window.location.reload()}
                />
            </Layout>
        );
    }

    return (
        <Layout>
            <h2>Dashboard</h2>

            {/* 🔹 Cards de resumo */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 20,
                    marginTop: 20,
                    marginBottom: 30,
                }}
            >
                <div
                    style={{
                        flex: "1",
                        minWidth: 200,
                        background: "#3498db",
                        color: "white",
                        padding: 20,
                        borderRadius: 10,
                        textAlign: "center",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    }}
                >
                    <h3>Total de Alunos</h3>
                    <p style={{ fontSize: 24, fontWeight: "bold" }}>{alunos.length}</p>
                </div>

                <div
                    style={{
                        flex: "1",
                        minWidth: 200,
                        background: "#2ecc71",
                        color: "white",
                        padding: 20,
                        borderRadius: 10,
                        textAlign: "center",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    }}
                >
                    <h3>Total de Turmas</h3>
                    <p style={{ fontSize: 24, fontWeight: "bold" }}>{turmas.length}</p>
                </div>

                <div
                    style={{
                        flex: "1",
                        minWidth: 200,
                        background: "#f39c12",
                        color: "white",
                        padding: 20,
                        borderRadius: 10,
                        textAlign: "center",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                    }}
                >
                    <h3>Total de Avaliações</h3>
                    <p style={{ fontSize: 24, fontWeight: "bold" }}>{avaliacoes.length}</p>
                </div>
            </div>

            {/* 🔸 Tabela de próximas avaliações */}
            <h3>📅 Próximas Avaliações</h3>

            {avaliacoes.length === 0 ? (
                <StatusMessage type="empty" message="Nenhuma avaliação cadastrada." />
            ) : (
                <table
                    border="1"
                    cellPadding="8"
                    cellSpacing="0"
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        textAlign: "center",
                        marginTop: 10,
                        borderRadius: 10,
                        overflow: "hidden",
                    }}
                >
                    <thead style={{ background: "#f5f5f5", fontWeight: "bold" }}>
                        <tr>
                            <th>Turma</th>
                            <th>Data</th>
                            <th>Atividade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {avaliacoes
                            .sort((a, b) => new Date(a.data) - new Date(b.data))
                            .map((p, i) => (
                                <tr key={i}>
                                    <td>{p.turma}</td>
                                    <td>{new Date(p.data).toLocaleDateString("pt-BR")}</td>
                                    <td>{p.nome}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            )}
        </Layout>
    );
}

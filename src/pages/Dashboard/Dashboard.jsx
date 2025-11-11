import { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { DataContext } from "../../context/DataContext";
import StatusMessage from "../../components/StatusMessage";

export default function Dashboard() {
    const { alunos, turmas, avaliacoes } = useContext(DataContext);

    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    // Simula carregamento inicial
    useEffect(() => {
        try {
            const timer = setTimeout(() => setCarregando(false), 1000);
            return () => clearTimeout(timer);
        } catch (err) {
            setErro("Erro ao carregar o painel.");
            setCarregando(false);
        }
    }, []);

    if (carregando) {
        return (
            <Layout>
                <StatusMessage type="loading" message="Carregando painel..." />
            </Layout>
        );
    }

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

    // Ordena avaliações por data (ascendente)
    const avaliacoesOrdenadas = [...avaliacoes].sort((a, b) => {
        if (!a.data || !b.data) return 0;
        return new Date(a.data) - new Date(b.data);
    });

    return (
        <Layout>
            <h2>Dashboard</h2>

            {/* Cards de resumo */}
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
                    }}
                >
                    <h3>Total de Turmas</h3>
                    <p style={{ fontSize: 24, fontWeight: "bold" }}>{turmas.length}</p>
                </div>

                <div
                    style={{
                        flex: "1",
                        minWidth: 200,
                        background: "#9b59b6",
                        color: "white",
                        padding: 20,
                        borderRadius: 10,
                        textAlign: "center",
                    }}
                >
                    <h3>Total de Avaliações</h3>
                    <p style={{ fontSize: 24, fontWeight: "bold" }}>
                        {avaliacoes.length}
                    </p>
                </div>
            </div>

            {/* Tabela de próximas avaliações */}
            <h3>📅 Próximas Avaliações</h3>

            {avaliacoesOrdenadas.length === 0 ? (
                <StatusMessage type="empty" message="Nenhuma avaliação cadastrada." />
            ) : (
                <table
                    border="1"
                    cellPadding="6"
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        textAlign: "center",
                        borderRadius: "10px",
                        overflow: "hidden",
                    }}
                >
                    <thead style={{ background: "#f5f5f5" }}>
                        <tr>
                            <th>Turma</th>
                            <th>Data</th>
                            <th>Atividade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {avaliacoesOrdenadas.map((a, i) => (
                            <tr key={i}>
                                <td>{a.turma}</td>
                                <td>
                                    {a.data
                                        ? new Date(a.data).toLocaleDateString("pt-BR", {
                                            day: "2-digit",
                                            month: "2-digit",
                                            year: "numeric",
                                        })
                                        : "—"}
                                </td>
                                <td>{a.nome}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </Layout>
    );
}

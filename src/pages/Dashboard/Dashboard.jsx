import { useContext } from "react";
import Layout from "../../components/Layout";
import { DataContext } from "../../context/DataContext";
import StatusMessage from "../../components/StatusMessage";

export default function Dashboard() {
    const { alunos, turmas, avaliacoes } = useContext(DataContext);

    if (!alunos && !turmas)
        return (
            <Layout>
                <StatusMessage type="loading" message="Carregando painel..." />
            </Layout>
        );

    return (
        <Layout>
            <h2>Dashboard</h2>

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
            </div>

            <h3>📅 Próximas Avaliações</h3>

            {avaliacoes.length === 0 ? (
                <StatusMessage type="empty" message="Nenhuma avaliação cadastrada." />
            ) : (
                <table
                    border="1"
                    cellPadding="6"
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        textAlign: "center",
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
                        {avaliacoes.map((p, i) => (
                            <tr key={i}>
                                <td>{p.turma}</td>
                                <td>{p.data}</td>
                                <td>{p.nome}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </Layout>
    );
}

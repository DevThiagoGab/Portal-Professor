import { useContext, useState } from "react";
import Layout from "../../components/Layout";
import { DataContext } from "../../context/DataContext";
import StatusMessage from "../../components/StatusMessage";

export default function Avaliacoes() {
    const { avaliacoes, setAvaliacoes } = useContext(DataContext);

    const [nome, setNome] = useState("");
    const [peso, setPeso] = useState("");
    const [turma, setTurma] = useState("");
    const [data, setData] = useState("");

    const totalPeso = avaliacoes.reduce((acc, a) => acc + Number(a.peso), 0);

    const handleAdd = () => {
        if (!nome || !peso || !turma || !data) {
            alert("Preencha todos os campos!");
            return;
        }

        const pesoNumero = Number(peso);

        // Filtra só as avaliações da mesma turma
        const avaliacoesDaTurma = avaliacoes.filter((a) => a.turma === turma);

        // Soma apenas os pesos dessa turma
        const somaPorTurma = avaliacoesDaTurma.reduce(
            (acc, a) => acc + Number(a.peso),
            0
        );

        // Valida se ao adicionar o novo peso vai ultrapassar 100%
        if (somaPorTurma + pesoNumero > 100) {
            alert(
                `A soma dos pesos da turma ${turma} ultrapassa 100%! (atual: ${somaPorTurma}%)`
            );
            return;
        }

        const nova = { nome, peso: pesoNumero, turma, data };
        setAvaliacoes((prev) => [...prev, nova]);

        // Limpa os campos
        setNome("");
        setPeso("");
        setTurma("");
        setData("");
    };

    const handleDelete = (index) => {
        if (window.confirm("Deseja realmente excluir essa avaliação?")) {
            setAvaliacoes(avaliacoes.filter((_, i) => i !== index));
        }
    };

    return (
        <Layout>
            <h2>Configuração de Avaliações</h2>

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    marginTop: "20px",
                }}
            >
                <input
                    placeholder="Nome da atividade"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <input
                    placeholder="Peso (%)"
                    type="number"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                />
                <input
                    placeholder="Turma"
                    value={turma}
                    onChange={(e) => setTurma(e.target.value)}
                />
                <input
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                />
                <button onClick={handleAdd}>Adicionar</button>
            </div>

            <p style={{ marginTop: 10 }}>
                Soma total dos pesos: <b>{totalPeso}%</b>
            </p>

            {avaliacoes.length === 0 ? (
                <StatusMessage
                    type="empty"
                    message="Nenhuma avaliação configurada."
                />
            ) : (
                <table
                    border="1"
                    cellPadding="6"
                    style={{ width: "100%", borderCollapse: "collapse", marginTop: 20 }}
                >
                    <thead style={{ background: "#f5f5f5" }}>
                        <tr>
                            <th>Turma</th>
                            <th>Data</th>
                            <th>Atividade</th>
                            <th>Peso</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {avaliacoes.map((a, i) => (
                            <tr key={i}>
                                <td>{a.turma}</td>
                                <td>{a.data}</td>
                                <td>{a.nome}</td>
                                <td>{a.peso}%</td>
                                <td>
                                    <button onClick={() => handleDelete(i)}>
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {avaliacoes.length > 0 && (
                <div style={{ marginTop: 20 }}>
                    <h4>Resumo por Turma</h4>
                    <ul>
                        {Object.entries(
                            avaliacoes.reduce((acc, a) => {
                                acc[a.turma] = (acc[a.turma] || 0) + Number(a.peso);
                                return acc;
                            }, {})
                        ).map(([turma, soma]) => (
                            <li key={turma}>
                                <b>{turma}:</b> {soma}% do total (máximo 100%)
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </Layout>
    );
}

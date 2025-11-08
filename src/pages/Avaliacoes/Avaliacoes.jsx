import { useState, useEffect, useContext } from "react";
import Layout from "../../components/Layout";
import { DataContext } from "../../context/DataContext";
import StatusMessage from "../../components/StatusMessage";

export default function Avaliacoes() {
    const { turmas, avaliacoes, setAvaliacoes } = useContext(DataContext);

    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [turmaSelecionada, setTurmaSelecionada] = useState("");
    const [criterios, setCriterios] = useState([]);
    const [novoCriterio, setNovoCriterio] = useState({ nome: "", peso: "" });
    const [alerta, setAlerta] = useState("");
    const [editando, setEditando] = useState(null);
    const [formEdicao, setFormEdicao] = useState({ nome: "", peso: "" });

    // Simula carregamento
    useEffect(() => {
        setCarregando(true);
        const timer = setTimeout(() => setCarregando(false), 800);
        return () => clearTimeout(timer);
    }, []);

    // Carrega critérios da turma selecionada
    useEffect(() => {
        if (turmaSelecionada) {
            const turmaAvaliacoes =
                avaliacoes.find((a) => a.turma === turmaSelecionada)?.criterios || [];
            setCriterios(turmaAvaliacoes);
        }
    }, [turmaSelecionada, avaliacoes]);

    // Salva automaticamente alterações
    useEffect(() => {
        if (turmaSelecionada) {
            const outras = avaliacoes.filter((a) => a.turma !== turmaSelecionada);
            setAvaliacoes([...outras, { turma: turmaSelecionada, criterios }]);
        }
    }, [criterios]);

    // Faz o alerta sumir automaticamente após 4 segundos
    useEffect(() => {
        if (alerta) {
            const timer = setTimeout(() => setAlerta(""), 4000);
            return () => clearTimeout(timer);
        }
    }, [alerta]);

    const somaPesos = criterios.reduce((acc, c) => acc + Number(c.peso || 0), 0);
    const somaInvalida = somaPesos !== 100 && criterios.length > 0;

    // Adicionar novo critério
    const handleAdd = (e) => {
        e.preventDefault();
        setAlerta("");

        if (!novoCriterio.nome || !novoCriterio.peso) return;
        const pesoNum = Number(novoCriterio.peso);
        if (pesoNum <= 0) return setAlerta("O peso deve ser maior que 0.");
        if (somaPesos + pesoNum > 100) {
            setAlerta("❌ A soma dos pesos ultrapassa 100%!");
            return;
        }

        setCriterios([...criterios, { id: Date.now(), ...novoCriterio, peso: pesoNum }]);
        setNovoCriterio({ nome: "", peso: "" });
        setAlerta("");
    };

    // Iniciar edição
    const iniciarEdicao = (criterio) => {
        setEditando(criterio.id);
        setFormEdicao({ nome: criterio.nome, peso: criterio.peso });
        setAlerta("");
    };

    // Cancelar edição
    const cancelarEdicao = () => {
        setEditando(null);
        setFormEdicao({ nome: "", peso: "" });
    };

    // Salvar edição
    const salvarEdicao = (id) => {
        setAlerta("");

        const pesoNovo = Number(formEdicao.peso);
        if (pesoNovo <= 0) return setAlerta("Peso deve ser maior que 0.");

        const somaSemAtual = criterios
            .filter((c) => c.id !== id)
            .reduce((acc, c) => acc + Number(c.peso || 0), 0);

        if (somaSemAtual + pesoNovo > 100) {
            setAlerta("❌ Essa alteração ultrapassa o limite de 100%.");
            return;
        }

        setCriterios(
            criterios.map((c) =>
                c.id === id ? { ...c, nome: formEdicao.nome, peso: pesoNovo } : c
            )
        );

        setEditando(null);
        setFormEdicao({ nome: "", peso: "" });
    };

    const handleDelete = (id) => {
        setCriterios(criterios.filter((c) => c.id !== id));
    };

    if (carregando)
        return (
            <Layout>
                <StatusMessage type="loading" message="Carregando configurações..." />
            </Layout>
        );

    if (erro)
        return (
            <Layout>
                <StatusMessage
                    type="error"
                    message={erro}
                    onRetry={() => window.location.reload()}
                />
            </Layout>
        );

    return (
        <Layout>
            <h2>Configuração de Avaliações</h2>

            {/* Selecionar turma */}
            <div style={{ marginBottom: 20 }}>
                <label style={{ marginRight: 8 }}>Selecione a turma:</label>
                <select
                    value={turmaSelecionada}
                    onChange={(e) => setTurmaSelecionada(e.target.value)}
                    style={{ padding: 6 }}
                >
                    <option value="">Turmas</option>
                    {turmas.map((t) => (
                        <option key={t.id} value={t.nome}>
                            {t.nome}
                        </option>
                    ))}
                </select>
            </div>

            {!turmaSelecionada ? (
                <StatusMessage type="empty" message="Selecione uma turma para configurar." />
            ) : (
                <div>
                    {/* Formulário de adição */}
                    <form onSubmit={handleAdd} style={{ marginBottom: 20 }}>
                        <input
                            type="text"
                            placeholder="Nome do critério"
                            value={novoCriterio.nome}
                            onChange={(e) =>
                                setNovoCriterio({ ...novoCriterio, nome: e.target.value })
                            }
                            required
                            style={{ marginRight: 8, padding: 6, width: 200 }}
                        />
                        <input
                            type="number"
                            placeholder="Peso (%)"
                            value={novoCriterio.peso}
                            onChange={(e) =>
                                setNovoCriterio({ ...novoCriterio, peso: e.target.value })
                            }
                            required
                            style={{ marginRight: 8, padding: 6, width: 100 }}
                        />
                        <button type="submit" style={{ padding: 6 }}>
                            Adicionar
                        </button>
                    </form>

                    {alerta && (
                        <div
                            style={{
                                background: "#ffe5e5",
                                border: "1px solid red",
                                padding: "8px 12px",
                                borderRadius: 6,
                                color: "red",
                                marginBottom: 10,
                            }}
                        >
                            {alerta}
                        </div>
                    )}

                    {/* Lista de critérios */}
                    {criterios.length === 0 ? (
                        <StatusMessage type="empty" message="Nenhum critério adicionado." />
                    ) : (
                        <table
                            border="1"
                            cellPadding="6"
                            style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                marginBottom: 20,
                            }}
                        >
                            <thead style={{ background: "#f5f5f5" }}>
                                <tr>
                                    <th>Critério</th>
                                    <th>Peso (%)</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {criterios.map((c) => (
                                    <tr key={c.id}>
                                        {editando === c.id ? (
                                            <>
                                                <td>
                                                    <input
                                                        type="text"
                                                        value={formEdicao.nome}
                                                        onChange={(e) =>
                                                            setFormEdicao({
                                                                ...formEdicao,
                                                                nome: e.target.value,
                                                            })
                                                        }
                                                        style={{ width: "100%", padding: 4 }}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={formEdicao.peso}
                                                        onChange={(e) =>
                                                            setFormEdicao({
                                                                ...formEdicao,
                                                                peso: e.target.value,
                                                            })
                                                        }
                                                        style={{ width: "60px", padding: 4 }}
                                                    />
                                                </td>
                                                <td>
                                                    <button
                                                        onClick={() => salvarEdicao(c.id)}
                                                        style={{ marginRight: 6 }}
                                                    >
                                                        Salvar
                                                    </button>
                                                    <button onClick={cancelarEdicao}>Cancelar</button>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td>{c.nome}</td>
                                                <td>{c.peso}%</td>
                                                <td>
                                                    <button
                                                        onClick={() => iniciarEdicao(c)}
                                                        style={{ marginRight: 6 }}
                                                    >
                                                        Editar
                                                    </button>
                                                    <button onClick={() => handleDelete(c.id)}>
                                                        Remover
                                                    </button>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}

                    {/* Soma total */}
                    <p style={{ fontWeight: "bold" }}>
                        Soma dos pesos:{" "}
                        <span style={{ color: somaInvalida ? "red" : "green" }}>
                            {somaPesos}%
                        </span>
                    </p>

                    {somaInvalida && (
                        <p style={{ color: "red", fontSize: 14 }}>
                            ⚠️ A soma deve ser exatamente 100%.
                        </p>
                    )}
                </div>
            )}
        </Layout>
    );
}

import { useState, useContext, useEffect } from "react";
import Layout from "../../components/Layout";
import { DataContext } from "../../context/DataContext";
import StatusMessage from "../../components/StatusMessage";

export default function Turmas() {
    const { alunos, setAlunos, turmas, setTurmas } = useContext(DataContext);

    const [form, setForm] = useState({ nome: "", capacidade: "" });
    const [editando, setEditando] = useState(null);
    const [turmaSelecionada, setTurmaSelecionada] = useState(null);
    const [alunoSelecionado, setAlunoSelecionado] = useState("");
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    // 🕓 Simula carregamento inicial
    useEffect(() => {
        try {
            setCarregando(true);
            const timer = setTimeout(() => setCarregando(false), 800);
            return () => clearTimeout(timer);
        } catch {
            setErro("Erro ao carregar turmas.");
            setCarregando(false);
        }
    }, []);

    // 🏫 Criação ou edição de turma
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.nome.trim() || !form.capacidade) return;

        if (editando) {
            setTurmas((prev) =>
                prev.map((t) =>
                    t.id === editando
                        ? { ...t, nome: form.nome, capacidade: Number(form.capacidade) }
                        : t
                )
            );
            setEditando(null);
        } else {
            const novaTurma = {
                id: Date.now(),
                nome: form.nome,
                capacidade: Number(form.capacidade),
                alunos: [],
            };
            setTurmas((prev) => [...prev, novaTurma]);
        }

        setForm({ nome: "", capacidade: "" });
    };

    // 🔁 Alternar exibição de detalhes
    const handleSelectTurma = (id) => {
        setTurmaSelecionada(id === turmaSelecionada ? null : id);
    };

    // 🔹 Função auxiliar para buscar nome da turma
    const getTurmaNome = (id) => {
        const turma = turmas.find((t) => t.id === id);
        return turma ? turma.nome : "";
    };

    // 🧠 Lista atualizada de alunos disponíveis
    const alunosDisponiveis = alunos.filter(
        (a) => !a.turma || a.turma === getTurmaNome(turmaSelecionada)
    );

    // ➕ Associar aluno (bidirecional)
    const handleAssociarAluno = () => {
        if (!alunoSelecionado || !turmaSelecionada) return;

        const aluno = alunos.find((a) => a.id === Number(alunoSelecionado));
        if (!aluno) return;

        // Evita adicionar aluno já associado
        const turmaAtual = turmas.find((t) => t.id === turmaSelecionada);
        if (turmaAtual.alunos.some((a) => a.id === aluno.id)) return;

        if (turmaAtual.alunos.length >= turmaAtual.capacidade) {
            alert("Capacidade máxima da turma atingida!");
            return;
        }

        // Atualiza turmas
        setTurmas((prev) =>
            prev.map((t) =>
                t.id === turmaSelecionada
                    ? { ...t, alunos: [...t.alunos, aluno] }
                    : t
            )
        );

        // Atualiza aluno
        setAlunos((prev) =>
            prev.map((a) =>
                a.id === aluno.id ? { ...a, turma: getTurmaNome(turmaSelecionada) } : a
            )
        );

        setAlunoSelecionado("");
    };

    // ❌ Remover aluno (bidirecional)
    const handleRemoverAluno = (turmaId, alunoId) => {
        setTurmas((prev) =>
            prev.map((t) =>
                t.id === turmaId
                    ? { ...t, alunos: t.alunos.filter((a) => a.id !== alunoId) }
                    : t
            )
        );

        setAlunos((prev) =>
            prev.map((a) => (a.id === alunoId ? { ...a, turma: "" } : a))
        );
    };

    // ✏️ Editar turma
    const handleEdit = (turma) => {
        setForm({ nome: turma.nome, capacidade: turma.capacidade });
        setEditando(turma.id);
    };

    // 🗑️ Excluir turma
    const handleDelete = (id) => {
        const turmaNome = getTurmaNome(id);
        setTurmas(turmas.filter((t) => t.id !== id));
        setAlunos((prev) =>
            prev.map((a) => (a.turma === turmaNome ? { ...a, turma: "" } : a))
        );
    };

    // ⏳ Feedbacks
    if (carregando)
        return (
            <Layout>
                <StatusMessage type="loading" message="Carregando turmas..." />
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
            <h2>Gerenciamento de Turmas</h2>

            {/* 📝 Formulário */}
            <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome da turma"
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    required
                    style={{ marginRight: 8, padding: 6 }}
                />
                <input
                    type="number"
                    name="capacidade"
                    placeholder="Capacidade"
                    value={form.capacidade}
                    onChange={(e) => setForm({ ...form, capacidade: e.target.value })}
                    required
                    style={{ marginRight: 8, padding: 6, width: 100 }}
                />
                <button type="submit" style={{ padding: 6 }}>
                    {editando ? "Salvar Alterações" : "Adicionar Turma"}
                </button>
            </form>

            {/* 📋 Lista de Turmas */}
            {turmas.length === 0 ? (
                <StatusMessage type="empty" message="Nenhuma turma cadastrada." />
            ) : (
                <table
                    border="1"
                    cellPadding="6"
                    cellSpacing="0"
                    style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20 }}
                >
                    <thead style={{ background: "#f5f5f5" }}>
                        <tr>
                            <th>Nome</th>
                            <th>Capacidade</th>
                            <th>Alunos</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {turmas.map((t) => (
                            <tr key={t.id}>
                                <td>{t.nome}</td>
                                <td>{t.capacidade}</td>
                                <td>{t.alunos.length}</td>
                                <td>
                                    <button onClick={() => handleSelectTurma(t.id)} style={{ marginRight: 6 }}>
                                        Ver
                                    </button>
                                    <button onClick={() => handleEdit(t)} style={{ marginRight: 6 }}>
                                        Editar
                                    </button>
                                    <button onClick={() => handleDelete(t.id)}>Excluir</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* 👇 Detalhes */}
            {turmaSelecionada && (
                <div
                    style={{
                        border: "1px solid #ccc",
                        padding: "10px",
                        borderRadius: "6px",
                    }}
                >
                    <h3>
                        Alunos da turma: {getTurmaNome(turmaSelecionada)} (
                        {turmas.find((t) => t.id === turmaSelecionada)?.alunos.length} /
                        {turmas.find((t) => t.id === turmaSelecionada)?.capacidade})
                    </h3>

                    {/* 🎓 Associar aluno */}
                    <div style={{ marginBottom: 10 }}>
                        <select
                            value={alunoSelecionado}
                            onChange={(e) => setAlunoSelecionado(e.target.value)}
                            style={{ padding: 6, marginRight: 8 }}
                        >
                            <option value="">Selecionar aluno</option>
                            {alunosDisponiveis.map((a) => (
                                <option key={a.id} value={a.id}>
                                    {a.nome}
                                </option>
                            ))}
                        </select>
                        <button onClick={handleAssociarAluno} style={{ padding: 6 }}>
                            Associar Aluno
                        </button>
                    </div>

                    {/* 📜 Lista de alunos da turma */}
                    {turmas.find((t) => t.id === turmaSelecionada)?.alunos.length === 0 ? (
                        <p style={{ color: "#777" }}>Nenhum aluno associado.</p>
                    ) : (
                        <ul>
                            {turmas
                                .find((t) => t.id === turmaSelecionada)
                                ?.alunos.map((a) => (
                                    <li key={a.id}>
                                        {a.nome}{" "}
                                        <button
                                            onClick={() => handleRemoverAluno(turmaSelecionada, a.id)}
                                            style={{
                                                color: "red",
                                                border: "none",
                                                background: "transparent",
                                                cursor: "pointer",
                                            }}
                                        >
                                            ✖
                                        </button>
                                    </li>
                                ))}
                        </ul>
                    )}
                </div>
            )}
        </Layout>
    );
}

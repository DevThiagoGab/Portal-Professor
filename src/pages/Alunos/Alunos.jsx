import { useState, useContext, useEffect, useMemo } from "react";
import Layout from "../../components/Layout";
import { DataContext } from "../../context/DataContext";
import StatusMessage from "../../components/StatusMessage";

export default function Alunos() {
    const { alunos, setAlunos } = useContext(DataContext);

    const [busca, setBusca] = useState("");
    const [filtroTurma, setFiltroTurma] = useState("Turmas");
    const [filtroStatus, setFiltroStatus] = useState("Status");
    const [editando, setEditando] = useState(null);
    const [form, setForm] = useState({ nome: "", email: "", turma: "", status: "Ativo" });

    // Estados de feedback
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    // Simula carregamento de dados (como se viesse de uma API)
    useEffect(() => {
        try {
            setCarregando(true);
            setErro(null);
            // Simula uma requisição de 1s
            const timer = setTimeout(() => {
                setCarregando(false);
            }, 1000);

            return () => clearTimeout(timer);
        } catch (e) {
            setErro("Erro ao carregar os dados dos alunos.");
            setCarregando(false);
        }
    }, []);

    // Gera lista de turmas dinamicamente
    const turmasDisponiveis = useMemo(() => {
        const turmas = alunos.map(a => a.turma);
        return ["Turmas", ...new Set(turmas.filter(Boolean))];
    }, [alunos]);

    // Filtragem geral
    const filtrados = alunos.filter(a => {
        const nomeMatch = a.nome.toLowerCase().includes(busca.toLowerCase());
        const turmaMatch = filtroTurma === "Turmas" || a.turma === filtroTurma;
        const statusMatch = filtroStatus === "Status" || a.status === filtroStatus;
        return nomeMatch && turmaMatch && statusMatch;
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            if (editando) {
                setAlunos(alunos.map(a => a.id === editando ? { ...form, id: editando } : a));
                setEditando(null);
            } else {
                const novo = { ...form, id: Date.now() };
                setAlunos([...alunos, novo]);
            }
            setForm({ nome: "", email: "", turma: "", status: "Ativo" });
        } catch (e) {
            setErro("Erro ao salvar aluno.");
        }
    };

    const handleEdit = (aluno) => {
        setForm(aluno);
        setEditando(aluno.id);
    };

    const handleDelete = (id) => {
        try {
            setAlunos(alunos.filter(a => a.id !== id));
        } catch {
            setErro("Erro ao remover aluno.");
        }
    };

    // Exibição de feedbacks
    if (carregando) {
        return (
            <Layout>
                <StatusMessage type="loading" message="Carregando alunos..." />
            </Layout>
        );
    }

    if (erro) {
        return (
            <Layout>
                <StatusMessage
                    type="error"
                    message="Erro ao carregar alunos."
                    onRetry={() => window.location.reload()}
                />
            </Layout>
        );
    }


    return (
        <Layout>
            <h2>Gerenciamento de Alunos</h2>

            {/* Busca e filtros */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: 20 }}>
                <input
                    type="text"
                    placeholder="Buscar por nome..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    style={{ padding: 6, minWidth: 175 }}
                />
                <select
                    value={filtroTurma}
                    onChange={(e) => setFiltroTurma(e.target.value)}
                    style={{ padding: 6 }}
                >
                    {turmasDisponiveis.map(t => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
                <select
                    value={filtroStatus}
                    onChange={(e) => setFiltroStatus(e.target.value)}
                    style={{ padding: 6 }}
                >
                    <option value="Status">Status</option>
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                </select>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    value={form.nome}
                    onChange={handleChange}
                    required
                    style={{ margin: "4px", padding: 6 }}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={form.email}
                    onChange={handleChange}
                    required
                    style={{ margin: "4px", padding: 6 }}
                />
                <input
                    type="text"
                    name="turma"
                    placeholder="Turma"
                    value={form.turma}
                    onChange={handleChange}
                    required
                    style={{ margin: "4px", padding: 6, width: 80 }}
                />
                <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    style={{ margin: "4px", padding: 6 }}
                >
                    <option>Ativo</option>
                    <option>Inativo</option>
                </select>
                <button type="submit" style={{ padding: 6 }}>
                    {editando ? "Salvar" : "Adicionar"}
                </button>
            </form>

            {/* Tabela */}
            {filtrados.length === 0 ? (
                <StatusMessage type="empty" message="Nenhum aluno encontrado" />
            ) : (
                <table
                    border="1"
                    cellPadding="6"
                    cellSpacing="0"
                    style={{ width: "100%", borderCollapse: "collapse" }}
                >
                    <thead style={{ background: "#f5f5f5" }}>
                        <tr>
                            <th>Nome</th>
                            <th>E-mail</th>
                            <th>Turma</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtrados.map((a) => (
                            <tr key={a.id}>
                                <td>{a.nome}</td>
                                <td>{a.email}</td>
                                <td>{a.turma}</td>
                                <td>{a.status}</td>
                                <td>
                                    <button onClick={() => handleEdit(a)} style={{ marginRight: 6 }}>
                                        Editar
                                    </button>
                                    <button onClick={() => handleDelete(a.id)}>Remover</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </Layout>
    );
}

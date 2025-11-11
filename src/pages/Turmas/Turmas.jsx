import { useState, useContext, useEffect, useMemo } from "react";
import Layout from "../../components/Layout";
import { DataContext } from "../../context/DataContext";
import StatusMessage from "../../components/StatusMessage";

export default function Turmas() {
  const { alunos, setAlunos, turmas, setTurmas } = useContext(DataContext);

  const [form, setForm] = useState({ nome: "", capacidade: "" });
  const [editando, setEditando] = useState(null);
  const [alunoSelecionado, setAlunoSelecionado] = useState("");
  const [turmaSelecionada, setTurmaSelecionada] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Local state de alunos disponíveis (para forçar re-render previsível)
  const [alunosDisponiveis, setAlunosDisponiveis] = useState([]);

  // Simula carregamento inicial
  useEffect(() => {
    try {
      const timer = setTimeout(() => setCarregando(false), 700);
      return () => clearTimeout(timer);
    } catch {
      setErro("Erro ao carregar turmas.");
      setCarregando(false);
    }
  }, []);

  // Recalcula lista de alunos disponíveis sempre que 'alunos' ou 'turmas' mudarem
  useEffect(() => {
    // alunos sem turma (turma === "" ou undefined or null)
    const livres = (alunos || []).filter((a) => !a.turma);
    setAlunosDisponiveis(livres);

    // DEBUG temporário (remova quando estiver seguro)
    console.log("DEBUG: alunos (context):", alunos);
    console.log("DEBUG: alunosDisponiveis (calc):", livres);
  }, [alunos, turmas]);

  // Função auxiliar para obter nome da turma por ID
  const getTurmaNome = (id) => {
    const turma = turmas.find((t) => t.id === id);
    return turma ? turma.nome : "";
  };

  // Criar ou editar turma
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.capacidade) return;

    if (editando) {
      setTurmas((prev) =>
        prev.map((t) =>
          t.id === editando
            ? { ...t, nome: form.nome.trim(), capacidade: Number(form.capacidade) }
            : t
        )
      );
      setEditando(null);
    } else {
      const novaTurma = {
        id: Date.now(),
        nome: form.nome.trim(),
        capacidade: Number(form.capacidade),
        alunos: [],
      };
      // adiciona e já seleciona a turma pra mostrar a lista
      setTurmas((prev) => {
        const novo = [...prev, novaTurma];
        return novo;
      });
      // seleciona a nova turma imediatamente
      setTurmaSelecionada(novaTurma.id);
    }

    setForm({ nome: "", capacidade: "" });
  };

  // Alterna exibição de detalhes
  const handleSelectTurma = (id) => {
    setTurmaSelecionada(id === turmaSelecionada ? null : id);
  };

  // Associar aluno (bidirecional) - usa id numerico
  const handleAssociarAluno = () => {
    if (!alunoSelecionado || !turmaSelecionada) return;

    const alunoIdNum = Number(alunoSelecionado);
    const turmaAtual = turmas.find((t) => t.id === turmaSelecionada);
    const alunoAtual = alunos.find((a) => a.id === alunoIdNum);

    if (!turmaAtual || !alunoAtual) return;

    if (alunoAtual.turma) {
      alert(`O aluno ${alunoAtual.nome} já está na turma ${alunoAtual.turma}.`);
      return;
    }

    if (turmaAtual.alunos.length >= turmaAtual.capacidade) {
      alert("Esta turma já atingiu a capacidade máxima!");
      return;
    }

    // Atualiza turmas: adiciona id do aluno na turma
    setTurmas((prev) =>
      prev.map((t) =>
        t.id === turmaSelecionada ? { ...t, alunos: [...t.alunos, alunoAtual.id] } : t
      )
    );

    // Atualiza aluno: define turma como nome
    setAlunos((prev) =>
      prev.map((a) => (a.id === alunoAtual.id ? { ...a, turma: turmaAtual.nome } : a))
    );

    // limpa seleção
    setAlunoSelecionado("");
  };

  // Remover aluno
  const handleRemoverAluno = (turmaId, alunoId) => {
    setTurmas((prev) =>
      prev.map((t) =>
        t.id === turmaId ? { ...t, alunos: t.alunos.filter((id) => id !== alunoId) } : t
      )
    );

    setAlunos((prev) => prev.map((a) => (a.id === alunoId ? { ...a, turma: "" } : a)));
  };

  // Editar turma
  const handleEdit = (turma) => {
    setForm({ nome: turma.nome, capacidade: turma.capacidade });
    setEditando(turma.id);
  };

  // Deletar turma e limpar alunos
  const handleDelete = (id) => {
    const turmaNome = getTurmaNome(id);
    setTurmas((prev) => prev.filter((t) => t.id !== id));
    setAlunos((prev) => prev.map((a) => (a.turma === turmaNome ? { ...a, turma: "" } : a)));
  };

  // Feedbacks
  if (carregando)
    return (
      <Layout>
        <StatusMessage type="loading" message="Carregando turmas..." />
      </Layout>
    );

  if (erro)
    return (
      <Layout>
        <StatusMessage type="error" message={erro} onRetry={() => window.location.reload()} />
      </Layout>
    );

  // Render
  return (
    <Layout>
      <h2>Gerenciamento de Turmas</h2>

      {/* Form */}
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

      {/* Lista */}
      {turmas.length === 0 ? (
        <StatusMessage type="empty" message="Nenhuma turma cadastrada." />
      ) : (
        <table border="1" cellPadding="6" style={{ width: "100%", borderCollapse: "collapse", marginBottom: 20, textAlign: "center" }}>
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

      {/* Detalhes da turma */}
      {turmaSelecionada && (
        <div style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "6px" }}>
          <h3>
            Alunos da turma: {getTurmaNome(turmaSelecionada)} (
            {turmas.find((t) => t.id === turmaSelecionada)?.alunos.length} /{" "}
            {turmas.find((t) => t.id === turmaSelecionada)?.capacidade})
          </h3>

          {/* Select com alunosDisponiveis (usa String no value) */}
          <div style={{ marginBottom: 10 }}>
            <select value={String(alunoSelecionado)} onChange={(e) => setAlunoSelecionado(e.target.value)} style={{ padding: 6, marginRight: 8 }}>
              <option value="">Selecionar aluno</option>
              {alunosDisponiveis.map((a) => (
                <option key={a.id} value={String(a.id)}>
                  {a.nome}
                </option>
              ))}
            </select>
            <button onClick={handleAssociarAluno} style={{ padding: 6 }}>
              Associar Aluno
            </button>
          </div>

          {/* Lista de alunos da turma */}
          {turmas.find((t) => t.id === turmaSelecionada)?.alunos.length === 0 ? (
            <p style={{ color: "#777" }}>Nenhum aluno associado.</p>
          ) : (
            <ul>
              {turmas.find((t) => t.id === turmaSelecionada)?.alunos.map((alunoId) => {
                const aluno = alunos.find((a) => a.id === alunoId);
                return (
                  <li key={alunoId}>
                    {aluno?.nome}{" "}
                    <button onClick={() => handleRemoverAluno(turmaSelecionada, alunoId)} style={{ color: "red", border: "none", background: "transparent", cursor: "pointer" }}>
                      ✖
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </Layout>
  );
}

import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [alunos, setAlunos] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [ready, setReady] = useState(false);

  // ✅ Carrega dados do localStorage uma única vez
  useEffect(() => {
    const alunosSalvos = localStorage.getItem("alunos");
    const turmasSalvas = localStorage.getItem("turmas");
    const avaliacoesSalvas = localStorage.getItem("avaliacoes");

    if (alunosSalvos) setAlunos(JSON.parse(alunosSalvos));
    if (turmasSalvas) setTurmas(JSON.parse(turmasSalvas));
    if (avaliacoesSalvas) setAvaliacoes(JSON.parse(avaliacoesSalvas));

    setReady(true);
  }, []);

  // ✅ Sincroniza localStorage *toda vez* que o estado muda
  useEffect(() => {
    if (ready) localStorage.setItem("alunos", JSON.stringify(alunos));
  }, [alunos, ready]);

  useEffect(() => {
    if (ready) localStorage.setItem("turmas", JSON.stringify(turmas));
  }, [turmas, ready]);

  useEffect(() => {
    if (ready) localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));
  }, [avaliacoes, ready]);

  return (
    <DataContext.Provider
      value={{
        alunos,
        setAlunos,
        turmas,
        setTurmas,
        avaliacoes,
        setAvaliacoes,
        ready,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

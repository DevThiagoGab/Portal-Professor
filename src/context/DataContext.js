import { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export function DataProvider({ children }) {
    const [alunos, setAlunos] = useState([]);
    const [turmas, setTurmas] = useState([]);
    const [avaliacoes, setAvaliacoes] = useState([]);

    // Carrega dados salvos no localStorage
    useEffect(() => {
        const alunosSalvos = localStorage.getItem("alunos");
        const turmasSalvas = localStorage.getItem("turmas");
        const avaliacoesSalvas = localStorage.getItem("avaliacoes");

        if (alunosSalvos) setAlunos(JSON.parse(alunosSalvos));
        if (turmasSalvas) setTurmas(JSON.parse(turmasSalvas));
        if (avaliacoesSalvas) setAvaliacoes(JSON.parse(avaliacoesSalvas));
    }, []);

    // Salva automaticamente quando houver mudanças
    useEffect(() => {
        localStorage.setItem("alunos", JSON.stringify(alunos));
    }, [alunos]);

    useEffect(() => {
        localStorage.setItem("turmas", JSON.stringify(turmas));
    }, [turmas]);

    useEffect(() => {
        localStorage.setItem("avaliacoes", JSON.stringify(avaliacoes));
    }, [avaliacoes]);

    return (
        <DataContext.Provider
            value={{
                alunos,
                setAlunos,
                turmas,
                setTurmas,
                avaliacoes,
                setAvaliacoes,
            }}
        >
            {children}
        </DataContext.Provider>
    );
}

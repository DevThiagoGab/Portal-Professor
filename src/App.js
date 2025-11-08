import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Alunos from "./pages/Alunos/Alunos";
import Turmas from "./pages/Turmas/Turmas";
import Avaliacoes from "./pages/Avaliacoes/Avaliacoes";
import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <Routes>
            {/* Rota de login pública */}
            <Route path="/login" element={<Login />} />

            {/* Rotas protegidas */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/alunos"
              element={
                <PrivateRoute>
                  <Alunos />
                </PrivateRoute>
              }
            />
            <Route
              path="/turmas"
              element={
                <PrivateRoute>
                  <Turmas />
                </PrivateRoute>
              }
            />
            <Route
              path="/avaliacoes"
              element={
                <PrivateRoute>
                  <Avaliacoes />
                </PrivateRoute>
              }
            />

            {/* Redireciona raiz para /login */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

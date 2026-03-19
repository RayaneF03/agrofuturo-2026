import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Sensores from "./pages/Sensores";
import Mapa from "./pages/Mapa";
import Pragas from "./pages/Pragas";
import Insumos from "./pages/Insumos";
import Vendas from "./pages/Vendas";
import Configuracoes from "./pages/Configuracoes";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("agrofuturo-auth") === "true";
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <Routes>
      {/* Rotas públicas — sem sidebar/header */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/" />
          ) : (
            <Login onLogin={() => setIsAuthenticated(true)} />
          )
        }
      />
      <Route
        path="/cadastro"
        element={
          isAuthenticated ? (
            <Navigate to="/" />
          ) : (
            <Cadastro onRegister={() => setIsAuthenticated(true)} />
          )
        }
      />

      {/* Rotas protegidas — com layout completo */}
      {isAuthenticated ? (
        <Route
          path="/"
          element={<Layout onLogout={() => setIsAuthenticated(false)} />}
        >
          <Route index element={<Dashboard />} />
          <Route path="sensores" element={<Sensores />} />
          <Route path="mapa" element={<Mapa />} />
          <Route path="pragas" element={<Pragas />} />
          <Route path="insumos" element={<Insumos />} />
          <Route path="vendas" element={<Vendas />} />
          <Route path="configuracoes" element={<Configuracoes />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}

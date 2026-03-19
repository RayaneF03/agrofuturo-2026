import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Sensores from './pages/Sensores'
import Mapa from './pages/Mapa'
import Pragas from './pages/Pragas'
import Insumos from './pages/Insumos'
import Vendas from './pages/Vendas'
import Configuracoes from './pages/Configuracoes'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'

export default function App() {
  return (
    <Routes>
      {/* Rotas públicas — sem sidebar/header */}
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />

      {/* Rotas protegidas — com layout completo */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="sensores" element={<Sensores />} />
        <Route path="mapa" element={<Mapa />} />
        <Route path="pragas" element={<Pragas />} />
        <Route path="insumos" element={<Insumos />} />
        <Route path="vendas" element={<Vendas />} />
        <Route path="configuracoes" element={<Configuracoes />} />
      </Route>
    </Routes>
  )
}

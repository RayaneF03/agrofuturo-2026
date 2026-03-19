import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Sensores from './pages/Sensores'
import Mapa from './pages/Mapa'
import Pragas from './pages/Pragas'
import Insumos from './pages/Insumos'
import Vendas from './pages/Vendas'
import Configuracoes from './pages/Configuracoes'

export default function App() {
  return (
    <Routes>
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

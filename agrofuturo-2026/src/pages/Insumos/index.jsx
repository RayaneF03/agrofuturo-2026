import { useState, useEffect } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, AreaChart, Area
} from 'recharts'
import { Droplets, TrendingDown, DollarSign, Leaf } from 'lucide-react'
import { api } from '../../services/api'
import { Card, StatCard, SectionHeader, ProgressBar } from '../../components/ui'

export default function Insumos() {
  const [relatorio, setRelatorio] = useState(null)
  const [periodo, setPeriodo] = useState('7d')

  useEffect(() => {
    api.getRelatorioInsumos(periodo).then(setRelatorio)
  }, [periodo])

  if (!relatorio) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 300 }}>
      <div style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 13 }}>Carregando...</div>
    </div>
  )

  const maxLitros = Math.max(...relatorio.porTalhao.map(t => t.litros))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }} className="animate-fadeIn">
      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        <StatCard icon={Droplets} label="Total Consumido" value={relatorio.totalGasto.toLocaleString('pt-BR')} unit="L" delta={-8.4} color="var(--accent-blue)" />
        <StatCard icon={DollarSign} label="Custo Total" value={`R$ ${(relatorio.custo / 1000).toFixed(1)}k`} delta={-8.4} color="var(--accent-yellow)" />
        <StatCard icon={TrendingDown} label="Economia (Precisão)" value={`${relatorio.economiaPrecisao}%`} delta={3.2} color="var(--accent-green)" />
        <StatCard icon={Leaf} label="Áreas Tratadas" value={relatorio.porTalhao.length} unit="talhões" color="var(--accent-orange)" />
      </div>

      {/* Period filter */}
      <div style={{ display: 'flex', gap: 6 }}>
        {[
          { key: '7d', label: '7 dias' },
          { key: '30d', label: '30 dias' },
          { key: '90d', label: '90 dias' },
        ].map(t => (
          <button key={t.key} onClick={() => setPeriodo(t.key)} style={{
            padding: '6px 16px', borderRadius: 7, fontSize: 12, fontWeight: 600,
            background: periodo === t.key ? 'var(--accent-green)' : 'var(--bg-card)',
            color: periodo === t.key ? '#fff' : 'var(--text-secondary)',
            border: `1px solid ${periodo === t.key ? 'transparent' : 'var(--border)'}`,
            transition: 'all var(--transition)',
          }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <Card style={{ padding: 20 }}>
        <SectionHeader title="Consumo por Tipo de Insumo" subtitle="Herbicida, Fungicida e Inseticida — litros/dia" />
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={relatorio.historico}>
            <defs>
              {[
                { id: 'gradH', color: '#2980b9' },
                { id: 'gradF', color: '#27ae60' },
                { id: 'gradI', color: '#e67e22' },
              ].map(g => (
                <linearGradient key={g.id} id={g.id} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={g.color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={g.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="data" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} />
            <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} />
            <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Area type="monotone" dataKey="herbicida" stroke="#2980b9" fill="url(#gradH)" strokeWidth={2} name="Herbicida (L)" />
            <Area type="monotone" dataKey="fungicida" stroke="#27ae60" fill="url(#gradF)" strokeWidth={2} name="Fungicida (L)" />
            <Area type="monotone" dataKey="inseticida" stroke="#e67e22" fill="url(#gradI)" strokeWidth={2} name="Inseticida (L)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Por Talhão */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Card style={{ padding: 20 }}>
          <SectionHeader title="Consumo por Talhão" subtitle="Litros utilizados por área" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {relatorio.porTalhao.map(t => (
              <div key={t.talhao}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{t.talhao}</span>
                  <div style={{ display: 'flex', gap: 12, fontSize: 11 }}>
                    <span style={{ color: 'var(--text-muted)' }}>{t.hectares} ha</span>
                    <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-blue)', fontWeight: 600 }}>{t.litros} L</span>
                  </div>
                </div>
                <ProgressBar value={t.litros} max={maxLitros} color="var(--accent-blue)" />
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>
                  {(t.litros / t.hectares).toFixed(1)} L/ha
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card style={{ padding: 20 }}>
          <SectionHeader title="Eficiência por Talhão" subtitle="% de precisão na aplicação" />
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={relatorio.porTalhao} barSize={28} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" domain={[80, 100]} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} />
              <YAxis dataKey="talhao" type="category" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} width={70} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12 }} />
              <Bar
                dataKey="eficiencia" fill="var(--accent-green)" radius={[0, 4, 4, 0]}
                name="Eficiência (%)"
              />
            </BarChart>
          </ResponsiveContainer>

          <div style={{
            marginTop: 14, padding: '10px 14px',
            background: 'rgba(79,191,79,0.08)',
            border: '1px solid rgba(79,191,79,0.2)',
            borderRadius: 8,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              🌱 Economia gerada pela pulverização de precisão:
            </span>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'var(--accent-green)' }}>
              {relatorio.economiaPrecisao}%
            </span>
          </div>
        </Card>
      </div>
    </div>
  )
}

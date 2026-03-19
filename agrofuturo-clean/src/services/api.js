// Simulates responses from the future C# API
// Replace these with actual fetch() calls to your backend

export const api = {
  baseUrl: 'https://api.agrofuturo.local/v1', // Future C# API

  // Dashboard
  async getDashboardStats() {
    return {
      insumoHoje: 342.5,
      insumoTotal: 12847.2,
      hectaresHoje: 48.3,
      hectaresTotal: 1240.6,
      pragasDetectadas: 7,
      sensoresAtivos: 24,
      sensoresTotal: 24,
      eficiencia: 94.2,
    }
  },

  async getConsumoSemanal() {
    return [
      { dia: 'Seg', insumo: 280, hectares: 38 },
      { dia: 'Ter', insumo: 420, hectares: 58 },
      { dia: 'Qua', insumo: 310, hectares: 42 },
      { dia: 'Qui', insumo: 380, hectares: 52 },
      { dia: 'Sex', insumo: 295, hectares: 40 },
      { dia: 'Sáb', insumo: 450, hectares: 62 },
      { dia: 'Dom', insumo: 342, hectares: 48 },
    ]
  },

  // Sensores
  async getSensores() {
    return Array.from({ length: 24 }, (_, i) => ({
      id: `SEN-${String(i + 1).padStart(3, '0')}`,
      nome: `Sensor Braço ${Math.floor(i / 4) + 1}-${(i % 4) + 1}`,
      posicao: i < 12 ? 'Esquerdo' : 'Direito',
      status: i === 5 || i === 14 ? 'alerta' : 'ativo',
      umidade: (40 + Math.random() * 40).toFixed(1),
      temperatura: (22 + Math.random() * 15).toFixed(1),
      pressao: (2.2 + Math.random() * 0.8).toFixed(2),
      fluxo: (1.8 + Math.random() * 1.2).toFixed(2),
      ultimaLeitura: new Date(Date.now() - Math.random() * 60000).toISOString(),
      bateria: Math.floor(60 + Math.random() * 40),
    }))
  },

  // Pragas
  async getPragas() {
    return [
      { id: 1, nome: 'Lagarta do Cartucho', cientifico: 'Spodoptera frugiperda', severidade: 'alta', area: 'Talhão A - Setor 3', coordenadas: [-23.12, -47.35], detectadaEm: '2026-03-19T08:30:00', tratada: false, imagem: '🐛' },
      { id: 2, nome: 'Cigarrinha-do-milho', cientifico: 'Dalbulus maidis', severidade: 'media', area: 'Talhão B - Setor 1', coordenadas: [-23.14, -47.38], detectadaEm: '2026-03-19T06:15:00', tratada: false, imagem: '🦟' },
      { id: 3, nome: 'Pulgão-da-soja', cientifico: 'Aphis glycines', severidade: 'baixa', area: 'Talhão C - Setor 2', coordenadas: [-23.10, -47.40], detectadaEm: '2026-03-18T14:20:00', tratada: true, imagem: '🐝' },
      { id: 4, nome: 'Mosca Branca', cientifico: 'Bemisia tabaci', severidade: 'media', area: 'Talhão A - Setor 1', coordenadas: [-23.13, -47.36], detectadaEm: '2026-03-18T10:45:00', tratada: true, imagem: '🦋' },
      { id: 5, nome: 'Percevejos', cientifico: 'Nezara viridula', severidade: 'alta', area: 'Talhão D - Setor 4', coordenadas: [-23.15, -47.39], detectadaEm: '2026-03-17T16:00:00', tratada: false, imagem: '🪲' },
      { id: 6, nome: 'Broca da Cana', cientifico: 'Diatraea saccharalis', severidade: 'baixa', area: 'Talhão B - Setor 3', coordenadas: [-23.11, -47.37], detectadaEm: '2026-03-17T09:30:00', tratada: true, imagem: '🐛' },
      { id: 7, nome: 'Tripes', cientifico: 'Frankliniella williamsi', severidade: 'media', area: 'Talhão C - Setor 1', coordenadas: [-23.16, -47.41], detectadaEm: '2026-03-16T11:00:00', tratada: true, imagem: '🦗' },
    ]
  },

  // Insumos
  async getRelatorioInsumos(periodo = '7d') {
    const days = periodo === '7d' ? 7 : periodo === '30d' ? 30 : 90
    return {
      totalGasto: 2847.5,
      custo: 14237.50,
      economiaPrecisao: 22.4,
      porTalhao: [
        { talhao: 'Talhão A', litros: 820, hectares: 120, eficiencia: 96 },
        { talhao: 'Talhão B', litros: 650, hectares: 95, eficiencia: 91 },
        { talhao: 'Talhão C', litros: 710, hectares: 105, eficiencia: 94 },
        { talhao: 'Talhão D', litros: 540, hectares: 78, eficiencia: 88 },
        { talhao: 'Talhão E', litros: 127.5, hectares: 18, eficiencia: 97 },
      ],
      historico: Array.from({ length: days }, (_, i) => ({
        data: new Date(Date.now() - (days - i - 1) * 86400000).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
        herbicida: Math.floor(80 + Math.random() * 120),
        fungicida: Math.floor(40 + Math.random() * 80),
        inseticida: Math.floor(20 + Math.random() * 60),
      }))
    }
  },

  // Vendas de Sensores
  async getVendasSensores() {
    return {
      totalVendas: 1247800,
      metaMensal: 1500000,
      crescimento: 18.4,
      unidadesVendidas: 342,
      ticketMedio: 3648.54,
      porModelo: [
        { modelo: 'AgroSensor Pro X1', vendas: 145, receita: 688050, margem: 42 },
        { modelo: 'AgroSensor Lite S3', vendas: 98, receita: 294098, margem: 35 },
        { modelo: 'AgroSensor Ultra V2', vendas: 67, receita: 201067, margem: 51 },
        { modelo: 'Kit Completo 24un', vendas: 32, receita: 64585, margem: 38 },
      ],
      porMes: [
        { mes: 'Out', vendas: 280000 },
        { mes: 'Nov', vendas: 340000 },
        { mes: 'Dez', vendas: 420000 },
        { mes: 'Jan', vendas: 380000 },
        { mes: 'Fev', vendas: 510000 },
        { mes: 'Mar', vendas: 720000 },
      ],
      clientes: [
        { nome: 'Fazenda Santa Rita', estado: 'MT', valor: 87200, sensores: 24, data: '2026-03-18' },
        { nome: 'Agropec Cerrado Ltda', estado: 'GO', valor: 43600, sensores: 12, data: '2026-03-17' },
        { nome: 'Granja São José', estado: 'PR', valor: 29040, sensores: 8, data: '2026-03-16' },
        { nome: 'Coop Agrícola Norte', estado: 'PA', valor: 218000, sensores: 60, data: '2026-03-15' },
        { nome: 'Fazenda Primavera', estado: 'MS', valor: 65400, sensores: 18, data: '2026-03-14' },
      ]
    }
  },

  // Mapa do campo
  async getMapaField() {
    return {
      talhoes: [
        { id: 'A', nome: 'Talhão A', hectares: 120, cultura: 'Soja', status: 'pulverizando', progresso: 75 },
        { id: 'B', nome: 'Talhão B', hectares: 95, cultura: 'Milho', status: 'concluido', progresso: 100 },
        { id: 'C', nome: 'Talhão C', hectares: 105, cultura: 'Soja', status: 'aguardando', progresso: 0 },
        { id: 'D', nome: 'Talhão D', hectares: 78, cultura: 'Algodão', status: 'alerta', progresso: 40 },
        { id: 'E', nome: 'Talhão E', hectares: 18, cultura: 'Sorgo', status: 'concluido', progresso: 100 },
      ]
    }
  }
}

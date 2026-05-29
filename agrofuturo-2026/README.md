<div align="center">

```
   ╔═══════════════════════════════════════╗
   ║   🌱  A G R O F U T U R O  🚜         ║
   ║   Sistema de Pulverização de Precisão ║
   ╚═══════════════════════════════════════╝
```

[![React](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-6.22-CA4245?style=flat-square&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Recharts](https://img.shields.io/badge/Recharts-2.12-22B5BF?style=flat-square)](https://recharts.org/)

> **Frontend React + Vite** para monitoramento em tempo real da pulverizadora **John Deere R4045** — leitura de sensores, detecção de pragas, controle de insumos e dashboard comercial.

</div>

---

## ✨ Funcionalidades

| Módulo               | Descrição                                                                           |
| -------------------- | ----------------------------------------------------------------------------------- |
| 📊 **Dashboard**     | Visão geral da operação — KPIs, consumo semanal e status dos talhões em tempo real  |
| 💻 **Sensores**      | Leitura ao vivo dos 24 sensores nos braços da pulverizadora com diagrama visual     |
| 🗺️ **Mapa do Campo** | Visualização geográfica dos talhões com progresso de pulverização por área          |
| 🐛 **Pragas**        | Detecções automáticas por sensor — severidade, localização e controle de tratamento |
| 💧 **Insumos**       | Relatório de consumo de herbicida, fungicida e inseticida por talhão e período      |
| 🛒 **Vendas**        | Painel comercial — receita, metas, modelos de sensores e clientes recentes          |
| ⚙️ **Configurações** | Parâmetros da pulverizadora, sensores e integração com a API C#                     |

---

## 🎨 Tema

O sistema suporta **dark mode** e **light mode** com alternância em tempo real, preferência salva automaticamente no `localStorage`.

```
🌑 Dark Mode  →  tema padrão, fundo verde-escuro profundo
☀️ Light Mode →  fundo claro, sidebar verde-escura
```

---

## 🚀 Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) **v18+**
- npm ou yarn

### Passos

```bash
# 1. Entre na pasta do projeto
cd agrofuturo-clean

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse em: **http://localhost:5173**

### Build para produção

```bash
npm run build
npm run preview
```

### Conta de teste

para testar entre com a conta admin2026@gmail.com e a senha: agrofuturo2026

---

## 📁 Estrutura do Projeto

```
agrofuturo-clean/
│
├── 📂 public/
│   └── vite.svg                  # Favicon
│
├── 📂 src/
│   │
│   ├── 📂 assets/                # Imagens e recursos estáticos
│   │
│   ├── 📂 components/
│   │   ├── 📂 layout/
│   │   │   ├── Header.jsx        # Barra superior com toggle de tema
│   │   │   ├── Layout.jsx        # Wrapper com Sidebar + Header + Outlet
│   │   │   └── Sidebar.jsx       # Menu lateral com navegação e status do trator
│   │   └── 📂 ui/
│   │       └── index.jsx         # Card, StatCard, Badge, ProgressBar, SectionHeader...
│   │
│   ├── 📂 context/
│   │   └── ThemeContext.jsx      # Gerenciamento dark/light mode
│   │
│   ├── 📂 hooks/                 # Hooks customizados (expansão futura)
│   │
│   ├── 📂 pages/
│   │   ├── 📂 Dashboard/         # Visão geral e KPIs
│   │   ├── 📂 Sensores/          # Grid de sensores + diagrama do trator
│   │   ├── 📂 Mapa/              # Mapa visual dos talhões
│   │   ├── 📂 Pragas/            # Lista e detalhe de pragas detectadas
│   │   ├── 📂 Insumos/           # Relatórios de consumo
│   │   ├── 📂 Vendas/            # Painel comercial de sensores
│   │   └── 📂 Configuracoes/     # Parâmetros do sistema
│   │
│   ├── 📂 services/
│   │   └── api.js                # Camada de dados — mock pronto para API C#
│   │
│   ├── App.jsx                   # Rotas da aplicação
│   ├── index.css                 # Variáveis CSS globais e tema
│   └── main.jsx                  # Entry point React
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🔌 Integração com API C\#

Todos os dados estão mockados em `src/services/api.js`, prontos para substituição pelas chamadas reais ao seu backend.

### Configuração

```js
// src/services/api.js
export const api = {
  baseUrl: "https://sua-api.com/v1", // ← altere aqui
  // ...
};
```

### Exemplo de substituição

```js
// ANTES (mock)
async getDashboardStats() {
  return {
    insumoHoje: 342.5,
    hectaresHoje: 48.3,
    // ...
  }
}

// DEPOIS (API C# real)
async getDashboardStats() {
  const res = await fetch(`${this.baseUrl}/dashboard/stats`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    }
  })
  return await res.json()
}
```

### Endpoints esperados

| Método | Endpoint                        | Usado em             |
| ------ | ------------------------------- | -------------------- |
| `GET`  | `/dashboard/stats`              | Dashboard — KPIs     |
| `GET`  | `/dashboard/consumo-semanal`    | Dashboard — Gráfico  |
| `GET`  | `/sensores`                     | Página de Sensores   |
| `GET`  | `/pragas`                       | Página de Pragas     |
| `GET`  | `/insumos/relatorio?periodo=7d` | Relatório de Insumos |
| `GET`  | `/vendas/sensores`              | Painel de Vendas     |
| `GET`  | `/campo/talhoes`                | Mapa do Campo        |

---

## 🧩 Componentes Reutilizáveis

Todos em `src/components/ui/index.jsx`:

```jsx
import { Card, StatCard, Badge, ProgressBar, SectionHeader } from '../../components/ui'

// Card base
<Card style={{ padding: 20 }}>conteúdo</Card>

// Cartão de KPI com ícone, valor e variação
<StatCard
  icon={Droplets}
  label="Insumo Hoje"
  value="342"
  unit="L"
  delta={4.2}
  color="var(--accent-blue)"
/>

// Badge de status
<Badge variant="success" label="Ativo" />
<Badge variant="warning" label="Alerta" />
<Badge variant="danger"  label="Crítico" />

// Barra de progresso
<ProgressBar value={75} max={100} color="var(--accent-green)" />
```

---

## 🛠️ Tecnologias

- **[React 18](https://reactjs.org/)** — UI declarativa com hooks
- **[Vite 5](https://vitejs.dev/)** — bundler ultrarrápido
- **[React Router 6](https://reactrouter.com/)** — roteamento SPA
- **[Recharts](https://recharts.org/)** — gráficos de área, barras e linhas
- **[Lucide React](https://lucide.dev/)** — ícones SVG
- **CSS Variables** — sistema de temas dark/light sem dependência externa

---

## 📋 Roadmap

- [ ] Autenticação JWT com a API C#
- [ ] Mapa real com Leaflet / Google Maps
- [ ] Notificações push de pragas em tempo real (WebSocket)
- [ ] Exportação de relatórios em PDF
- [ ] App mobile (React Native)

---

<div align="center">

Desenvolvido para o projeto **AgroFuturo** 🌱

</div>

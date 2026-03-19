# AgroFuturo — Sistema de Pulverização de Precisão

React + Vite frontend para monitoramento da pulverizadora John Deere R4045.

## Instalação

```bash
npm install
npm run dev
```

## Estrutura

```
agrofuturo/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── Sidebar.jsx
│   │   └── ui/
│   │       └── index.jsx
│   ├── context/
│   │   └── ThemeContext.jsx
│   ├── hooks/
│   ├── pages/
│   │   ├── Configuracoes/
│   │   ├── Dashboard/
│   │   ├── Insumos/
│   │   ├── Mapa/
│   │   ├── Pragas/
│   │   ├── Sensores/
│   │   └── Vendas/
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Conectar com API C#

Edite `src/services/api.js` e substitua os dados mockados:

```js
baseUrl: 'https://sua-api.com/v1'

async getDashboardStats() {
  const res = await fetch(`${this.baseUrl}/dashboard/stats`)
  return await res.json()
}
```

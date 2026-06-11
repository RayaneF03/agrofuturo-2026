# 🌱 AgroFuturo 2026

## 📖 Descrição do Projeto

O AgroFuturo 2026 é uma plataforma web desenvolvida para auxiliar produtores rurais e profissionais do agronegócio no acesso a informações relevantes para a gestão agrícola. O sistema foi construído utilizando React com Vite no frontend e uma API REST desenvolvida em C# (.NET) no backend.

O projeto integra uma API própria para gerenciamento de dados e também consome informações da BrasilAPI para fornecer dados externos de interesse aos usuários.

---

# 🎯 Objetivo

Desenvolver uma aplicação web moderna que integre um frontend em React com uma API desenvolvida em C# (.NET), aplicando conceitos de autenticação, consumo de APIs, integração com banco de dados e deploy em ambiente de produção.

---

# 🛠️ Tecnologias Utilizadas

## Frontend

- React
- Vite
- JavaScript
- HTML5
- CSS3
- Axios
- Vercel

## Backend

- C# (.NET)
- ASP.NET Core Web API
- Entity Framework Core
- JWT Authentication
- Scalar API Documentation

## Banco de Dados

- Supabase (PostgreSQL)

## APIs Externas

- BrasilAPI
  - https://brasilapi.com.br/docs

## Design

- Figma

---

# 📂 Repositórios e Links

## Frontend

### Repositório GitHub

https://github.com/RayaneF03/agrofuturo-2026

### Aplicação Hospedada (Vercel)

https://agrofuturo-2026.vercel.app/

---

## Backend

### Repositório GitHub

https://github.com/Ricci201/AGRObck

### Banco de Dados (Supabase)

https://dxmumysmaemstzdfeauv.supabase.co

### API Publicada

**Inserir URL da API publicada com Scalar habilitado**

Exemplo:
https://sua-api.com/scalar

---

## Protótipo

### Figma

https://www.figma.com/design/nmOvLwWQTnq0YGKOlNVxgc/Untitled?t=TFbOIi8jl7bHds0l-1

---

# ⚙️ Como Executar o Projeto Localmente

## Acesso de Demonstração

Para facilitar a avaliação do professor, use as credenciais abaixo no login:

- E-mail: admin2026@gmail.com
- Senha: 12345678

## 1. Clonar o Frontend

```bash
git clone https://github.com/RayaneF03/agrofuturo-2026.git
```

```bash
cd agrofuturo-2026
```

```bash
npm install
```

```bash
npm run dev
```

Aplicação disponível em:

```bash
http://localhost:5173
```

---

## 2. Clonar o Backend

```bash
git clone https://github.com/Ricci201/AGRObck.git
```

```bash
cd AGRObck
```

Restaurar dependências:

```bash
dotnet restore
```

Executar projeto:

```bash
dotnet run
```

A API será disponibilizada na porta configurada no projeto.

---

# 🚀 Deploy

## Frontend (Vercel)

1. Conectar o repositório GitHub à Vercel.
2. Selecionar o framework Vite.
3. Configurar as variáveis de ambiente.
4. Realizar o deploy.

---

## Backend (.NET)

1. Publicar a API em um serviço compatível com ASP.NET Core.
2. Configurar variáveis de ambiente.
3. Habilitar documentação Scalar.
4. Configurar conexão com o banco Supabase.
5. Realizar publicação.

---

# 🔐 Autenticação e Autorização

A API possui autenticação baseada em JWT (JSON Web Token), permitindo:

- Cadastro de usuários.
- Login seguro.
- Controle de acesso a rotas protegidas.
- Autorização baseada em permissões.

---

# 🔄 Consumo de APIs

## API Própria

O frontend realiza requisições para a API desenvolvida em C# para:

- Autenticação de usuários.
- Gerenciamento de dados agrícolas.
- Consulta e cadastro de informações.

## API Externa

O sistema também consome dados da BrasilAPI:

https://brasilapi.com.br/docs

Exemplos de utilização:

- Consulta de CEP.
- Informações regionais.
- Dados públicos disponibilizados pela API.

---

# 📋 Requisitos Funcionais

| ID   | Requisito Funcional                                                 | Prioridade |
| ---- | ------------------------------------------------------------------- | ---------- |
| RF01 | O sistema deve permitir cadastro de usuários.                       | Alta       |
| RF02 | O sistema deve permitir autenticação via login.                     | Alta       |
| RF03 | O sistema deve permitir atualização de dados do usuário.            | Média      |
| RF04 | O sistema deve permitir consulta de informações agrícolas.          | Alta       |
| RF05 | O sistema deve consumir dados da BrasilAPI.                         | Alta       |
| RF06 | O sistema deve permitir acesso a áreas protegidas por autenticação. | Alta       |
| RF07 | O sistema deve permitir integração com banco de dados Supabase.     | Alta       |
| RF08 | O sistema deve exibir informações em interface responsiva.          | Média      |
| RF09 | O sistema deve registrar dados através da API própria.              | Alta       |
| RF10 | O sistema deve permitir logout do usuário.                          | Média      |

---

# 🗄️ Diagrama DML

## Entidades Principais

### Usuário

| Campo        | Tipo     |
| ------------ | -------- |
| Id           | Integer  |
| Nome         | String   |
| Email        | String   |
| Senha        | String   |
| DataCadastro | DateTime |

### Propriedade

| Campo       | Tipo    |
| ----------- | ------- |
| Id          | Integer |
| Nome        | String  |
| Localizacao | String  |
| AreaCultivo | Decimal |

### Produção

| Campo         | Tipo     |
| ------------- | -------- |
| Id            | Integer  |
| Produto       | String   |
| Quantidade    | Decimal  |
| DataRegistro  | DateTime |
| PropriedadeId | Integer  |

---

# ✨ Funcionalidades Implementadas

- Cadastro de usuários.
- Login com autenticação JWT.
- Integração com API própria em C#.
- Integração com BrasilAPI.
- Interface responsiva.
- Consumo de banco Supabase.
- Deploy em produção utilizando Vercel.
- Documentação da API via Scalar.

---

# 📸 Evidências de Funcionamento

Adicionar capturas de tela do sistema em execução.

Exemplo:

- Tela inicial
- Login
- Dashboard
- Consumo da API
- Integração com BrasilAPI

---

# 👥 Equipe

Projeto desenvolvido para a disciplina de Desenvolvimento Web e APIs.

---

# 📅 Entrega

Prazo de entrega: 11/06/2025

Todos os links foram organizados neste README para facilitar a avaliação do projeto.

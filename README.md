# shrt.fun UI

UI de um encurtador de URLs com analytics em tempo real, geolocalização e geração de QR Codes.

Uma plataforma performática para criar links curtos, gerar QR Codes customizáveis e acompanhar o engajamento de cada acesso por localização, dispositivo e navegador. Ideal para campanhas de marketing, tracking de links e análise de audiência geográfica.

<div align="center">
  <img style="object-fit:contain" width="1920" height="auto" alt="Tela inicial do mv-app" src="https://github.com/user-attachments/assets/4a9f8df7-06e7-4475-aa85-3c1ef652d8ad" />
</div>

## ✨ Features

- 🔗 **Encurtamento de URLs** com slugs customizáveis
- 📈 **Analytics em tempo real**: hits, engajamentos e cliques por link
- 🌍 **Rastreamento geográfico** (país e cidade) com mapa de engajamentos
- 📱 **Detecção automática** de dispositivo (mobile/desktop), sistema operacional e navegador
- 🔍 **Distribuição de referrers**, evidenciando de onde vêm os acessos
- 🎯 **Geração e customização de QR Codes** (cores, estilos e opções avançadas)
- 🔐 **Autenticação completa** via Supabase (e-mail/senha + OAuth com Google e GitHub), incluindo cadastro, login, recuperação e redefinição de senha
- 👤 **Gerenciamento de conta**, com atualização de nome de usuário e logout seguro (invalidação de sessão e cache)
- 🔎 **Busca, filtros e ordenação** de links com paginação otimizada para grandes volumes de dados
- 📤 **Compartilhamento rápido de links** através de dialog dedicado
- 🌗 **Tema claro/escuro** com persistência de preferência
- 📊 **Dashboards visuais** construídos com gráficos interativos (Recharts) e tabelas headless (TanStack Table)

## 🛠️ Stack Técnico

| Categoria               | Tecnologia                                  |
| ----------------------- | -------------------------------------------- |
| Runtime                 | Node.js >= 24                                |
| Build tool               | Vite                                          |
| Framework                | React 19                                      |
| Linguagem                | TypeScript                                    |
| Estilização              | Tailwind CSS v4                               |
| Componentes primitivos   | Radix UI / Shadcn                             |
| Data fetching            | TanStack React Query                          |
| Tabelas headless         | TanStack React Table                          |
| Formulários e validação  | React Hook Form + Zod                         |
| Roteamento               | React Router                                  |
| Gráficos                 | Recharts                                      |
| Autenticação e backend   | Supabase                                      |
| HTTP client              | Axios                                         |
| Analytics de produto     | React GA4                                     |
| Deploy                   | Vercel                                        |

## 🚀 Rodando localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) >= 24
- [pnpm](https://pnpm.io/) como gerenciador de pacotes
- Um projeto criado no [Supabase](https://supabase.com/) (URL e chave anônima)
- A API do mv rodando localmente (ou uma URL de API acessível)

### Passo a passo

1. Clone o repositório

   ```bash
   git clone https://github.com/censuradho/shrt.fun-app.git
   cd shrt.fun-app
   ```

2. Instale as dependências

   ```bash
   pnpm install
   ```

3. Configure as variáveis de ambiente

   Copie o arquivo de exemplo e preencha com os seus valores:

   ```bash
   cp .env.exemple .env
   ```

   ```env
   VITE_APP_URL=http://localhost:5173
   VITE_API_URL=http://localhost:3333/v1
   VITE_APP_SUPABASE_ANON_KEY=
   VITE_SUPABASE_URL=
   ```

4. Rode o projeto em modo de desenvolvimento

   ```bash
   pnpm dev
   ```

   A aplicação estará disponível em `http://localhost:5173`.

### Outros scripts disponíveis

```bash
pnpm build     # gera o build de produção (type-check + bundle via Vite)
pnpm preview   # serve o build de produção localmente
pnpm lint      # roda o ESLint no projeto
```

## 🖼️ UI Preview

### Capa

<img style="object-fit:contain" width="1920" height="auto" alt="image" src="https://github.com/user-attachments/assets/4a9f8df7-06e7-4475-aa85-3c1ef652d8ad" />

### Design Token

<img style="object-fit:contain" width="1200" height="auto" alt="image" src="https://github.com/user-attachments/assets/5e0507a3-1625-4183-8dd6-9627f4c81d2f" />

### UI Exemplo (Tela de geração de QR Code)

<img style="object-fit:contain" width="1280" height="auto" alt="image" src="https://github.com/user-attachments/assets/4a8c03c1-eee0-4fd1-868f-525cf5fb424b" />

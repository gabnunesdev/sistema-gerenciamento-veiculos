# 🚗 Sistema de Gerenciamento de Veículos

![Status](https://img.shields.io/badge/status-conclu%C3%ADdo-brightgreen)
![Tecnologia](https://img.shields.io/badge/front--end-React-blue)
![Tecnologia](https://img.shields.io/badge/back--end-Node.js-informational)

![Demonstração Tela de Login](.github/assets/demo-login.png)
![Demonstração Dashboard](.github/assets/demo-login.png)

---

## 📖 Sobre o Projeto

Este é um sistema full-stack completo para gerenciamento de frotas de veículos. A aplicação permite a autenticação segura de usuários e o controle total sobre o cadastro de veículos, incluindo operações de criação, leitura, atualização, exclusão e arquivamento.

O projeto foi desenvolvido como resolução de um desafio técnico para a posição de Desenvolvedor(a) Full-stack Júnior, demonstrando habilidades em todo o ecossistema moderno de JavaScript, desde a criação da interface com **React** até a construção de uma API RESTful com **Node.js** e a integração com um banco de dados **PostgreSQL**.

---

## ✨ Funcionalidades

- [x] **Autenticação de Usuário:** Sistema de login seguro com e-mail e senha utilizando **JSON Web Tokens (JWT)**.
- [x] **Dashboard Interativo:** Painel de controle com cards que exibem estatísticas em tempo real (total de veículos, ativos e inativos).
- [x] **CRUD Completo de Veículos:**
  - **C**reate: Cadastro de novos veículos através de um modal.
  - **R**ead: Listagem de todos os veículos em uma tabela.
  - **U**pdate: Edição dos dados de um veículo em um modal pré-preenchido.
  - **D**elete: Exclusão permanente de veículos com diálogo de confirmação.
- [x] **Gerenciamento de Status:** Funcionalidade para "Arquivar" (marcar como inativo) e "Restaurar" (marcar como ativo) veículos.
- [x] **Interface Responsiva:** O layout se adapta de forma fluida para uma experiência de uso otimizada em desktops, tablets e celulares.
- [x] **Validação de Formulários:** Validação robusta e em tempo real nos formulários de login, cadastro e edição, utilizando `react-hook-form` e `zod`.

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes tecnologias:

| Tecnologia         | Descrição                                                                                 |
| ------------------ | ----------------------------------------------------------------------------------------- |
| **Front-End**      |                                                                                           |
| React              | Biblioteca principal para a construção da interface de usuário.                           |
| Vite               | Ferramenta de build extremamente rápida para o desenvolvimento front-end.                 |
| TypeScript         | Superset do JavaScript que adiciona tipagem estática ao código.                           |
| Tailwind CSS       | Framework CSS utility-first para estilização rápida e responsiva.                         |
| React Hook Form    | Gerenciamento de formulários performático e flexível.                                     |
| Zod                | Biblioteca de validação de esquemas com foco em TypeScript.                               |
| Axios              | Cliente HTTP para realizar requisições à API.                                             |
| Lucide React       | Biblioteca de ícones leve e customizável.                                                 |
| **Back-End**       |                                                                                           |
| Node.js            | Ambiente de execução JavaScript no servidor.                                              |
| Express            | Framework minimalista para a construção da API RESTful.                                   |
| Prisma             | ORM de próxima geração para Node.js e TypeScript, facilitando o acesso ao banco de dados. |
| JWT (jsonwebtoken) | Implementação de JSON Web Tokens para autenticação.                                       |
| bcrypt.js          | Biblioteca para hashing de senhas.                                                        |
| CORS               | Middleware para habilitar o Cross-Origin Resource Sharing.                                |
| **Banco de Dados** |                                                                                           |
| PostgreSQL         | Banco de dados relacional robusto e de código aberto.                                     |

---

## ▶️ Como Executar o Projeto

Siga os passos abaixo para executar a aplicação em seu ambiente local.

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- Uma instância do [PostgreSQL](https://www.postgresql.org/) rodando localmente ou em um container Docker.

### 1. Clonar o Repositório

```bash
git clone (https://github.com/gabnunesdev/sistema-gerenciamento-veiculos.git)
cd sistema-gerenciamento-veiculos
```

### 2. Configurar o Back-end

```bash
# Navegue até a pasta do back-end
cd backend

# Instale as dependências
npm install

# Crie um arquivo .env na raiz da pasta 'backend'
# e adicione as seguintes variáveis, substituindo pelos seus dados:
DATABASE_URL="postgresql://postgres:cbjr2025@localhost:5432/veiculos"
JWT_SECRET="SUA_CHAVE_SECRETA_PARA_O_JWT"

# Execute as migrações do Prisma para criar as tabelas no banco
npx prisma migrate dev

# (Opcional) Popule o banco com dados iniciais
npx prisma db seed
```

### 3. Configurar o Front-end

```bash
# Em um novo terminal, navegue até a pasta do front-end
cd frontend

# Instale as dependências
npm install
```

### 4. Executar a Aplicação

Com tudo configurado, você precisará de dois terminais abertos.

```bash
# No terminal 1 (dentro da pasta 'backend'):
# Inicie o servidor da API
npm run dev
```

```bash
# No terminal 2 (dentro da pasta 'frontend'):
# Inicie a aplicação React
npm run dev
```

Pronto! O front-end estará disponível em `http://localhost:5173` e o back-end em `http://localhost:3333`.

---

## 👨‍💻 Autor

Desenvolvido por **[Gabriel Nunes]**.

- **LinkedIn:** [https://www.linkedin.com/in/gabrielnunes-dev/](https://www.linkedin.com/in/gabrielnunes-dev/)
- **Email:** [gabrielnunesdev@outlook.com](mailto:gabrielnunesdev@outlook.com)

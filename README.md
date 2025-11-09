# 🎓 Portal do Professor

Aplicação desenvolvida como desafio técnico, com foco em boas práticas de **React**, **Context API**, **autenticação com JWT simulado**, **rotas protegidas**, **gerenciamento de estados** e **organização de arquitetura**.

---

## 🚀 Visão Geral

O **Portal do Professor** é um sistema de gerenciamento educacional onde o usuário (professor) pode:

- Fazer login com autenticação simulada (`fakeApi`);
- Acessar um **Dashboard** com informações resumidas;
- Gerenciar **alunos**, **turmas** e **avaliações**;
- Ver uma tabela centralizada e estilizada de **próximas avaliações**;
- Navegar entre páginas através de um menu lateral.

---

## 🧩 Funcionalidades

### 🔐 Autenticação
- Login simulado com e-mail e senha.
- Persistência de sessão via **localStorage**.
- Logout com limpeza automática do estado.
- Rotas protegidas (`/dashboard`, `/alunos`, `/turmas`, `/avaliacoes`).

### 📊 Dashboard
- Mostra total de alunos e turmas.
- Lista de próximas avaliações (dados simulados).
- Layout limpo, com tabela centralizada e cantos arredondados.

### 👩‍🏫 Alunos
- Busca e filtros por nome, turma e status.
- Feedbacks visuais: carregando, erro e lista vazia.

### 🏫 Turmas
- Listagem com nome, capacidade e quantidade de alunos.
- Criação e edição de turmas.
- Associação de alunos a turmas.
- Feedbacks de estado (carregando, erro, vazio).

### 🧾 Avaliações
- Configuração de critérios de avaliação com pesos (%).
- Soma total deve ser 100%.
- Adicionar, editar e remover critérios.
- Alertas quando regras são violadas.
- Salvamento no contexto (ou localStorage).

---

## 🧠 Tecnologias Utilizadas

| Tecnologia | Uso |
|-------------|-----|
| **React** | Biblioteca principal de UI |
| **React Router DOM** | Navegação e rotas protegidas |
| **Context API** | Controle global de autenticação e dados |
| **CSS Puro** | Estilização e responsividade |
| **Fake API (mock)** | Simulação de backend com validação de login |
| **LocalStorage** | Persistência de sessão do usuário |

---

## 🔧 Como Executar o Projeto

### 1️⃣ Clone o repositório
```bash
git clone https://github.com/seuusuario/portal-professor.git
cd portal-professor
npm install
npm start

Use o seguinte usuário para acessar o sistema:

E-mail: admin@email.com
Senha: 123456

🎨 Layout e Estilo

Layout responsivo e limpo.

Tabela de avaliações centralizada e com cantos arredondados.

Componentes com feedback de estado (carregando, erro, vazio).

💡 Conceitos Demonstrados

Estrutura modular e escalável.

Boas práticas de componentização.

Uso correto de hooks (useState, useEffect, useContext).

Autenticação baseada em Context API.

Armazenamento de sessão com localStorage.

Proteção de rotas e redirecionamento condicional.

Separação entre responsabilidades (API, contexto, interface).

🧭 Possíveis Melhorias

Implementar autenticação real com JWT e API REST.

Integrar banco de dados (ex.: PostgreSQL ou MongoDB).

Adicionar upload de notas e relatórios.

Criar sistema de permissões (ex.: professor/admin).

Implementar testes unitários com Jest.

👨‍💻 Autor

Thiago Gabriel
Desenvolvedor Full Stack | React • Node.js • MySQL
📧 thiagogabriel1904@gmail.com

💼 GitHub
 | LinkedIn
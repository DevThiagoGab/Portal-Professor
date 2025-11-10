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
- Layout limpo, com tabela centralizada.

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

## 🧱 Estrutura de Pastas

```
src/
 ├── api/
 │    └── api.js                 # Simulação de API (login)
 ├── context/
 │    ├── AuthContext.jsx        # Autenticação global
 │    └── DataContext.jsx        # Dados de alunos, turmas, etc.
 ├── pages/
 │    ├── Login/                 # Tela de login
 │    ├── Dashboard/             # Painel principal
 │    ├── Alunos/                # Gerenciamento de alunos
 │    ├── Turmas/                # Gerenciamento de turmas
 │    └── Avaliacoes/            # Configuração de avaliações
 ├── routes/
 │    └── PrivateRoute.jsx       # Proteção das rotas
 ├── App.js                      # Definição das rotas
 ├── index.css / App.css         # Estilos globais
 └── index.js                    # Ponto de entrada do React
```

---

## 🔧 Como Executar o Projeto

### 1️⃣ Clone o repositório
```bash
git clone https://github.com/seuusuario/portal-professor.git
cd portal-professor
```

### 2️⃣ Instale as dependências
```bash
npm install
```

### 3️⃣ Execute o projeto
```bash
npm start
```

O projeto rodará em:  
👉 **http://localhost:3000**

---

## 🔑 Login de Teste

Use o seguinte usuário para acessar o sistema:

```
E-mail: thiagogabriel1904@gmail.com
Senha: 123
```

---

## 🎨 Layout e Estilo

- Layout limpo.
- Tabela de avaliações centralizada.
- Componentes com feedback de estado (carregando, erro, vazio).

---

## 💡 Conceitos Demonstrados

- Estrutura modular e escalável.
- Boas práticas de componentização.
- Uso correto de **hooks** (`useState`, `useEffect`, `useContext`).
- Autenticação baseada em **Context API**.
- Armazenamento de sessão com **localStorage**.
- Proteção de rotas e redirecionamento condicional.
- Separação entre responsabilidades (API, contexto, interface).

---

## 🧭 Possíveis Melhorias

- Implementar autenticação real com **JWT e API REST**.
- Integrar banco de dados (ex.: PostgreSQL ou MongoDB).
- Adicionar upload de notas e relatórios.
- Criar sistema de permissões (ex.: professor/admin).
- Implementar testes unitários com Jest.

---

## 👨‍💻 Autor

**Thiago Gabriel**  
Desenvolvedor  
📧 [thiagogabriel1904@gmail.com](mailto:thiagogabriel1904@gmail.com)  
💼 [GitHub](https://github.com/DevThiagoGab) | [LinkedIn](https://linkedin.com/in/devthiagogabriel)

---
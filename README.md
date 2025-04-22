# 💼 Sistema de Gerenciamento Empresarial

> Um sistema completo, intuitivo e funcional para o gerenciamento de tarefas, funcionários e cargos.  
> Pensado para empresas que valorizam eficiência, clareza e controle total na palma da mão.

---

## 🚀 Funcionalidades Principais

### 🔐 Autenticação

- **Tela de Login**
  - Acesso seguro e prático ao sistema.
  - Validação de credenciais com feedback ao usuário.
  - Utilização de JWT (JSON Web Token) no processo de autenticação.

<p align="center">
  <img src="imagesreadme/login.png" alt="Tela de Login" width="600">
</p>

- **Tela de Registro**
  - Cadastro de novos usuários de forma rápida e eficiente.

<p align="center">
  <img src="imagesreadme/registrar.png" alt="Tela de Registro" width="600">
</p>

---

### 👨‍💼 Gestão de Cargos

- **Tela Inicial de Cargos**
  - Visualização de todos os cargos registrados.
  - Permite editar ou excluir cargos.
  - Exclusão somente permitida se o cargo não estiver vinculado a nenhum funcionário.

<p align="center">
  <img src="imagesreadme/CargosInicial.png" alt="Tela Inicial de Cargos" width="600">
</p>

- **Edição de Cargo**
  - Permite atualizar o nome e os dados de um cargo existente.

<p align="center">
  <img src="imagesreadme/editarCargo.png" alt="Editar Cargo" width="600">
</p>

---

### 👥 Gestão de Funcionários

- **Tela Inicial de Funcionários**
  - Lista completa de funcionários cadastrados.
  - Permite editar ou excluir funcionários.
  - Exclusão somente permitida caso o funcionário não tenha tarefas pendentes vinculadas.

<p align="center">
  <img src="imagesreadme/FuncionariosInicial.png" alt="Funcionários" width="600">
</p>

- **Edição de Funcionário**
  - Atualização de dados como nome, cargo e demais informações.

<p align="center">
  <img src="imagesreadme/editarFuncionarios.png" alt="Editar Funcionário" width="600">
</p>

---

### ✅ Gerenciamento de Tarefas

- **Tela Inicial de Tarefas**
  - Exibe todas as tarefas cadastradas com seus respectivos status.
  - Permite editar ou finalizar tarefas.

<p align="center">
  <img src="imagesreadme/tarefasInicial.png" alt="Tarefas" width="600">
</p>

- **Tarefas Pendentes**
  - Visualização filtrada das tarefas em andamento ou não concluídas.
  - As tarefas são exibidas com bordas coloridas de acordo com sua prioridade.

<p align="center">
  <img src="imagesreadme/tarefasPendentes.png" alt="Tarefas Pendentes" width="600">
</p>

- **Adicionar Nova Tarefa**
  - Interface simples e direta para criação de novas tarefas.

<p align="center">
  <img src="imagesreadme/adicionarTarefas.png" alt="Adicionar Tarefa" width="600">
</p>

- **Editar Tarefa**
  - Atualização das informações de uma tarefa existente.

<p align="center">
  <img src="imagesreadme/editartarefa.png" alt="Editar Tarefa" width="600">
</p>

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** HTML, CSS, JavaScript, Angular.js  
- **Backend:** Node.js, Express  
- **Banco de Dados:** MySQL  
- **Controle de Versão:** Git

---

## 📌 Considerações

Este projeto foi desenvolvido com foco em:

- **Usabilidade**: interfaces intuitivas e agradáveis.
- **Segurança**: autenticação com JWT e controle de acesso por rota.
- **Organização**: estrutura modular e escalável.
- **Responsividade**: adaptado para diferentes dispositivos (desktop, tablet e mobile).

Todas as rotas do sistema foram tratadas com autenticação obrigatória e redirecionamento para rotas inexistentes.

---

<p align="center"><strong>Um sistema desenvolvido com carinho, qualidade e paixão por código! 💙🚀</strong></p>

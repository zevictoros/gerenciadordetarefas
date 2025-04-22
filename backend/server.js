const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const loginRoutes = require('./routes/loginRoutes');
const funcionariosRoutes = require('./routes/funcionariosRoutes');
const cargoRoutes = require('./routes/cargosRoutes');
const tarefaRoutes = require('./routes/tarefasRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use('/login', loginRoutes);
app.use('/funcionarios', funcionariosRoutes);
app.use('/cargos', cargoRoutes);
app.use('/tarefas', tarefaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

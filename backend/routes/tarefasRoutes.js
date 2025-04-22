const express = require('express');
const router = express.Router();
const { getTarefas, deleteTarefa, updateTarefa, addTarefa  } = require('../controllers/tarefasController');

// Buscar todos os Tarefas
router.get('/getTarefas', getTarefas);

// Atualizar Tarefa (recomendado usar PUT com ID na URL)
router.put('/updateTarefa/:id', updateTarefa);

//Adiciona Tarefa
router.post('/addTarefa', addTarefa);

module.exports = router;

const express = require('express');
const router = express.Router();
const { getFuncionarios, deleteFuncionario, updateFuncionario, addFuncionario  } = require('../controllers/funcionariosController');

// Buscar todos os Funcionarios
router.get('/getFuncionarios', getFuncionarios);

// Deletar Funcionario por ID (recomendado usar DELETE com parâmetro na URL)
router.delete('/deleteFuncionario/:id', deleteFuncionario);

// Atualizar Funcionario (recomendado usar PUT com ID na URL)
router.put('/updateFuncionario/:id', updateFuncionario);

//Adiciona Funcionario
router.post('/addFuncionario', addFuncionario);

module.exports = router;

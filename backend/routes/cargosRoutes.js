const express = require('express');
const router = express.Router();
const { getCargos, deleteCargo, updateCargo, addCargo  } = require('../controllers/cargosController');

// Buscar todos os cargos
router.get('/getCargos', getCargos);

// Deletar cargo por ID (recomendado usar DELETE com parâmetro na URL)
router.delete('/deleteCargo/:id', deleteCargo);

// Atualizar cargo (recomendado usar PUT com ID na URL)
router.put('/updateCargo/:id', updateCargo);

//Adiciona Cargo
router.post('/addCargo', addCargo);

module.exports = router;

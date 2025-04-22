const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Função de cadastro de cargo
const registerCargo = (req, res) => {
    const { nome_cargo, descricao } = req.body;
  
    const sql = 'INSERT INTO cargo (nome_cargo, descricao) VALUES (?, ?)';
    const values = [nome_cargo, descricao];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'Erro ao cadastrar cargo' });
      }
      res.status(201).json({ message: 'Cargo cadastrado com sucesso!', id: result.insertId });
    });
  };
  

module.exports = {
    registerCargo,
};

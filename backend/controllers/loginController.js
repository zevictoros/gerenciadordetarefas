const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Função de cadastro de usuário
const registerUser = (req, res) => {
  const { nome, sobrenome, email, senha } = req.body;

  const sql = 'INSERT INTO login (nome, sobrenome, email, senha) VALUES (?, ?, ?, ?)';
  const values = [nome, sobrenome, email, senha];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao registrar usuário' });
    }
    res.status(201).json({ message: 'Usuário registrado com sucesso!', id: result.insertId });
  });
};

// Função de login de usuário
const loginUser = (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  const sql = 'SELECT * FROM login WHERE email = ? AND senha = ?';
  db.query(sql, [email, senha], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao autenticar usuário' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const usuario = results[0];

    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome, email: usuario.email },
      'seuSegredo',
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login bem-sucedido!',
      token: token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        sobrenome: usuario.sobrenome,
        email: usuario.email
      }
    });
  });
};

module.exports = {
  registerUser,
  loginUser
};

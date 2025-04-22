const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Buscar todos os funcionários
const getFuncionarios = (req, res) => {
    const sql = `
        SELECT funcionario.*, cargo.nome_cargo 
        FROM funcionario 
        LEFT JOIN cargo ON funcionario.cargo_id = cargo.id
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro MySQL:', err);
            return res.status(500).json({ error: 'Erro ao buscar funcionários' });
        }
        res.json(results);
    });
};

// Adicionar funcionário
const addFuncionario = (req, res) => {
    const { nome_funcionario, cpf, data_nascimento, cargo_id } = req.body;

    if (!nome_funcionario || !cpf || !data_nascimento) {
        return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
    }

    const query = 'INSERT INTO funcionario (nome_funcionario, cpf, data_nascimento, cargo_id) VALUES (?, ?, ?, ?)';
    db.query(query, [nome_funcionario, cpf, data_nascimento, cargo_id || null], (err, result) => {
        if (err) {
            console.error('Erro ao adicionar funcionário:', err); // <- log do erro
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'CPF já cadastrado' });
            }
            return res.status(500).json({ error: 'Erro ao adicionar funcionário', details: err.message });
        }
        res.status(201).json({ message: 'Funcionário adicionado com sucesso' });
    });
    
};

// Atualizar funcionário
const updateFuncionario = (req, res) => {
    const id = req.params.id;
    const { nome_funcionario, cpf, data_nascimento, cargo_id } = req.body;

    const query = 'UPDATE funcionario SET nome_funcionario = ?, cpf = ?, data_nascimento = ?, cargo_id = ? WHERE id = ?';
    db.query(query, [nome_funcionario, cpf, data_nascimento, cargo_id || null, id], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'CPF já cadastrado' });
            }
            return res.status(500).json({ error: 'Erro ao atualizar funcionário' });
        }
        res.json({ message: 'Funcionário atualizado com sucesso' });
    });
};

// Deletar funcionário
const deleteFuncionario = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM funcionario WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao deletar funcionário' });
        }
        res.json({ message: 'Funcionário deletado com sucesso' });
    });
};

module.exports = {
    getFuncionarios,
    addFuncionario,
    updateFuncionario,
    deleteFuncionario
};

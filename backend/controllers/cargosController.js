const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Listar todos os cargos
const getCargos = (req, res) => {
    db.query('SELECT * FROM cargo', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar cargos' });
        }
        res.json(results);
    });
};

// Deletar cargo
const deleteCargo = (req, res) => {
    const id = req.params.id;

    // Verificar se o cargo está vinculado a algum funcionário
    db.query('SELECT COUNT(*) AS funcionarioCount FROM funcionario WHERE cargo_id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao verificar vínculo com funcionários' });
        }

        const funcionarioCount = results[0].funcionarioCount;

        // Se houver funcionários vinculados, não permitir a exclusão
        if (funcionarioCount > 0) {
            return res.status(400).json({ error: 'Não é possível excluir este cargo, pois há funcionários vinculados.' });
        }

        // Caso contrário, prosseguir com a exclusão
        db.query('DELETE FROM cargo WHERE id = ?', [id], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao deletar cargo' });
            }
            res.json({ message: 'Cargo deletado com sucesso' });
        });
    });
};

// Editar cargo
const updateCargo = (req, res) => {
    const id = req.params.id;
    const { nome_cargo } = req.body;

    db.query('UPDATE cargo SET nome_cargo = ? WHERE id = ?', [nome_cargo, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao atualizar cargo' });
        }
        res.json({ message: 'Cargo atualizado com sucesso' });
    });
};

// Adicionar cargo
const addCargo = (req, res) => {
    const { nome_cargo } = req.body;

    if (!nome_cargo) {
        return res.status(400).json({ error: 'Nome do cargo é obrigatório' });
    }

    db.query('INSERT INTO cargo (nome_cargo) VALUES (?)', [nome_cargo], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao adicionar cargo' });
        }
        res.status(201).json({ message: 'Cargo adicionado com sucesso' });
    });
};

module.exports = {
    getCargos,
    deleteCargo,
    updateCargo,
    addCargo
};

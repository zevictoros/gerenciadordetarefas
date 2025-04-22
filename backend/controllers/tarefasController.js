const db = require('../config/db');

// Buscar todas as tarefas
const getTarefas = (req, res) => {
    const sql = `
        SELECT tarefas.*, funcionario.nome_funcionario 
        FROM tarefas 
        LEFT JOIN funcionario ON tarefas.responsavel_id = funcionario.id
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Erro MySQL:', err);
            return res.status(500).json({ error: 'Erro ao buscar tarefas' });
        }
        res.json(results);
    });
};

// Adicionar tarefa
const addTarefa = (req, res) => {
    const { descricao_tarefa, responsavel_id, prioridade, finalizada } = req.body;

    // Verifica se a descrição da tarefa e o responsável são informados
    if (!descricao_tarefa || !responsavel_id) {
        return res.status(400).json({ error: 'Descrição e responsável são obrigatórios' });
    }

    const query = 'INSERT INTO tarefas (descricao_tarefa, responsavel_id, prioridade, finalizada) VALUES (?, ?, ?, ?)';
    db.query(query, [descricao_tarefa, responsavel_id, prioridade || 'media', finalizada || false], (err, result) => {
        if (err) {
            console.error('Erro ao adicionar tarefa:', err); // <- log do erro
            return res.status(500).json({ error: 'Erro ao adicionar tarefa', details: err.message });
        }
        res.status(201).json({ message: 'Tarefa adicionada com sucesso' });
    });
};

// Atualizar tarefa
const updateTarefa = (req, res) => {
    const id = req.params.id;
    const { descricao_tarefa, responsavel_id, prioridade, finalizada } = req.body;

    const query = 'UPDATE tarefas SET descricao_tarefa = ?, responsavel_id = ?, prioridade = ?, finalizada = ? WHERE id = ?';
    db.query(query, [descricao_tarefa, responsavel_id, prioridade || 'media', finalizada || false, id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao atualizar tarefa' });
        }
        res.json({ message: 'Tarefa atualizada com sucesso' });
    });
};

module.exports = {
    getTarefas,
    addTarefa,
    updateTarefa
};

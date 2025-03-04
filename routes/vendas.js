const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Rota para obter vendas
// Se o parâmetro "data" for fornecido, filtra as vendas por data_venda; caso contrário, retorna todas as vendas.
router.get('/', (req, res) => {
  const { data } = req.query;
  let query;
  let params = [];
  if (data) {
    query = `
      SELECT id, data_venda, status, cliente, telefone, dia, periodo, pagamento, 
             endereco AS end, cpf, email, observacao, riscado, mensagem 
      FROM Vendas 
      WHERE data_venda = ? 
      ORDER BY id
    `;
    params.push(data);
  } else {
    query = `
      SELECT id, data_venda, status, cliente, telefone, dia, periodo, pagamento, 
             endereco AS end, cpf, email, observacao, riscado, mensagem 
      FROM Vendas 
      ORDER BY data_venda, id
    `;
  }
  db.all(query, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Rota para criar uma nova venda
router.post('/', (req, res) => {
  const { data_venda, status, cliente, telefone, dia, periodo, pagamento, end, cpf, email, observacao } = req.body;
  
  // mesmo que o frontend envie "end", aqui iremos inserir no campo "endereco"
  const sql = `
    INSERT INTO Vendas
      (data_venda, status, cliente, telefone, dia, periodo, pagamento, endereco, cpf, email, observacao)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [data_venda, status, cliente, telefone, dia, periodo, pagamento, end, cpf, email, observacao || null];
  
  db.run(sql, params, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

// Rota para atualizar uma venda existente
router.put('/:id', (req, res) => {
  const { id } = req.params;
  console.log('Atualizando venda:', id);
  console.log('Dados recebidos:', req.body);
  const { data_venda, status, cliente, telefone, dia, periodo, pagamento, end, cpf, email, observacao, riscado, mensagem } = req.body;
  const sql = `
    UPDATE Vendas
    SET data_venda = ?, status = ?, cliente = ?, telefone = ?, dia = ?, 
        periodo = ?, pagamento = ?, endereco = ?, cpf = ?, email = ?, observacao = ?, riscado = ?, mensagem = ?
    WHERE id = ?
  `;
  const params = [data_venda, status, cliente, telefone, dia, periodo, pagamento, end, cpf, email, observacao || null, riscado || 0, mensagem || null, id];
  
  db.run(sql, params, function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ updatedID: id });
  });
});

module.exports = router; 
const db = require('../config/database');

// Função para listar todas as campanhas
const listarCampanhas = (req, res) => {
  db.all('SELECT * FROM Campanhas', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

// Função para criar uma nova campanha
const criarCampanha = (req, res) => {
  const { 
    nome, 
    custo_por_cliente, 
    data_inicio,
    numero_clientes,      // novos campos para os dados adicionais
    numero_telefones,
    vendido_manual, 
    vendido_ia, 
    trocar_depois, 
    confirmar, 
    outros 
  } = req.body;

  // Inserindo os dados no banco (supondo que a tabela "Campanhas" tenha estas colunas)
  const sql = `
    INSERT INTO Campanhas 
      (nome, custo_por_cliente, data_inicio, numero_clientes, numero_telefones, vendido_manual, vendido_ia, trocar_depois, confirmar, outros)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [nome, custo_por_cliente, data_inicio, numero_clientes, numero_telefones, vendido_manual, vendido_ia, trocar_depois, confirmar, outros];
  
  db.run(sql, params, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
};

// Função para buscar uma campanha por ID
const buscarCampanhaPorId = (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM Campanhas WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (row) {
      res.json(row);
    } else {
      res.status(404).json({ error: 'Campanha não encontrada' });
    }
  });
};

module.exports = {
  listarCampanhas,
  criarCampanha,
  buscarCampanhaPorId,
};

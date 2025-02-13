const db = require('../config/database');

// Função para listar todas as campanhas
const listarCampanhas = (req, res) => {
  // Exemplo de consulta. Ajuste conforme a sua implementação.
  const sql = 'SELECT * FROM Campanhas ORDER BY id';
  db.all(sql, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

// Função para criar uma nova campanha
const criarCampanha = (req, res) => {
  // Definindo valores padrão para campos numéricos de status
  const {
    nome,
    custo_por_cliente,
    data_inicio,
    numero_clientes,
    numero_telefones,
    vendido_manual = 0,
    vendido_ia = 0,
    trocar_depois = 0,
    confirmar = 0,
    outros = 0
    // total_status = 0
  } = req.body;
  
  // Certifique-se que sua tabela 'Campanhas' possua essas colunas
  const sql = `INSERT INTO Campanhas 
    (nome, custo_por_cliente, data_inicio, numero_clientes, numero_telefones, vendido_manual, vendido_ia, trocar_depois, confirmar, outros)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  
  const params = [
    nome,
    custo_por_cliente,
    data_inicio,
    numero_clientes,
    numero_telefones,
    vendido_manual,
    vendido_ia,
    trocar_depois,
    confirmar,
    outros
    // total_status
  ];
  
  db.run(sql, params, function(err) {
    if (err) {
      console.error("Erro ao criar campanha:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
};

// Função para buscar uma campanha por ID
const buscarCampanhaPorId = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM Campanhas WHERE id = ?';
  db.get(sql, [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
};

// Atualiza uma campanha
const atualizarCampanha = (req, res) => {
  const { id } = req.params;
  const { nome, custo_por_cliente, data_inicio, numero_clientes, numero_telefones, vendido_manual, vendido_ia, trocar_depois, confirmar, outros } = req.body;
  const sql = `
    UPDATE Campanhas 
    SET nome = ?, custo_por_cliente = ?, data_inicio = ?, numero_clientes = ?, numero_telefones = ?, 
        vendido_manual = ?, vendido_ia = ?, trocar_depois = ?, confirmar = ?, outros = ?
    WHERE id = ?`;
  const params = [nome, custo_por_cliente, data_inicio, numero_clientes, numero_telefones, vendido_manual, vendido_ia, trocar_depois, confirmar, outros, id];
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ updatedID: id });
  });
};

// Apaga uma campanha
const apagarCampanha = (req, res) => {
  const { id } = req.params;
  console.log("Tentando apagar campanha com id:", id);
  const sql = 'DELETE FROM Campanhas WHERE id = ?';
  db.run(sql, [id], function(err) {
    if (err) {
      console.error("Erro ao deletar campanha:", err);
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) { 
      // Nenhuma linha foi afetada, ou seja, a campanha não foi encontrada.
      return res.status(404).json({ error: 'Campanha não encontrada ou já apagada' });
    }
    res.json({ deletedID: id });
  });
};

module.exports = {
  listarCampanhas,
  criarCampanha,
  buscarCampanhaPorId,
  atualizarCampanha,
  apagarCampanha,
};

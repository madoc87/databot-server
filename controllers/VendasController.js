// Atualiza uma venda
const atualizarVenda = (req, res) => {
  const { id } = req.params;
  console.log('Atualizando venda:', id);
  console.log('Dados recebidos:', req.body);
  const {
    data_venda,
    status,
    cliente,
    telefone,
    dia,
    periodo,
    pagamento,
    end, // será mapeado para endereco
    cpf,
    email,
    observacao,
    riscado,
    mensagem
  } = req.body;

  const sql = `
    UPDATE Vendas 
    SET data_venda = ?,
        status = ?,
        cliente = ?,
        telefone = ?,
        dia = ?,
        periodo = ?,
        pagamento = ?,
        endereco = ?,
        cpf = ?,
        email = ?,
        observacao = ?,
        riscado = ?,
        mensagem = ?
    WHERE id = ?
  `;

  const params = [
    data_venda,
    status,
    cliente,
    telefone,
    dia,
    periodo,
    pagamento,
    end, // usando o campo 'end' como endereco
    cpf,
    email,
    observacao,
    riscado || 0,
    mensagem,
    id
  ];

  db.run(sql, params, function(err) {
    if (err) {
      console.error("Erro ao atualizar venda:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ updatedID: id });
  });
};

// Busca vendas por data
const buscarVendasPorData = (req, res) => {
  const { data } = req.query;
  let sql = 'SELECT *, endereco as end FROM Vendas';
  let params = [];

  if (data) {
    sql += ' WHERE data_venda = ?';
    params.push(data);
  }

  sql += ' ORDER BY id DESC';

  db.all(sql, params, (err, rows) => {
    if (err) {
      console.error("Erro ao buscar vendas:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

// Cria uma nova venda
const criarVenda = (req, res) => {
  const {
    data_venda,
    status,
    cliente,
    telefone,
    dia,
    periodo,
    pagamento,
    end, // será mapeado para endereco
    cpf,
    email,
    observacao,
    riscado = 0,
    mensagem = null
  } = req.body;

  const sql = `
    INSERT INTO Vendas (
      data_venda, status, cliente, telefone, dia, periodo, 
      pagamento, endereco, cpf, email, observacao, riscado, mensagem
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const params = [
    data_venda,
    status,
    cliente,
    telefone,
    dia,
    periodo,
    pagamento,
    end, // usando o campo 'end' como endereco
    cpf,
    email,
    observacao,
    riscado,
    mensagem
  ];

  db.run(sql, params, function(err) {
    if (err) {
      console.error("Erro ao criar venda:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
}; 
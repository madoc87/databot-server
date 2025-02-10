const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, '../../database/databot.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco SQLite:', err.message);
  } else {
    console.log('Conectado ao banco de dados SQLite.');
  }
});

// Criação das tabelas, se não existirem
db.serialize(() => {
  // Tabela Campanhas
  db.run(`CREATE TABLE IF NOT EXISTS Campanhas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    custo_por_cliente REAL,
    data_inicio TEXT,
    numero_clientes INTEGER,
    numero_telefones INTEGER,
    vendido_manual INTEGER,
    vendido_ia INTEGER,
    trocar_depois INTEGER,
    confirmar INTEGER,
    outros INTEGER
  )`, (err) => {
    if (err) console.error("Erro criando Campanhas:", err.message);
    else console.log("Tabela Campanhas criada ou já existente.");
  });

  // Tabela Vendas (coluna "end" renomeada para "endereco", com novo campo "observacao")
  db.run(`CREATE TABLE IF NOT EXISTS Vendas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data_venda TEXT NOT NULL,
    status TEXT NOT NULL,
    cliente TEXT NOT NULL,
    telefone TEXT NOT NULL,
    dia TEXT NOT NULL,
    periodo TEXT NOT NULL,
    pagamento TEXT NOT NULL,
    endereco TEXT NOT NULL,
    cpf TEXT NOT NULL,
    email TEXT NOT NULL,
    observacao TEXT
  )`, (err) => {
    if (err) console.error("Erro criando Vendas:", err.message);
    else console.log("Tabela Vendas criada ou já existente.");
  });
});

module.exports = db;
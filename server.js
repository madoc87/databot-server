const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Configurações iniciais
app.use(cors());
app.use(bodyParser.json());

// ... (após as configurações iniciais)
const campanhasRouter = require('./routes/campanhas');
app.use('/api/campanhas', campanhasRouter);

// Rotas para vendas
const vendasRouter = require('./routes/vendas');
app.use('/api/vendas', vendasRouter);

// Rota de teste
app.get('/', (req, res) => {
  res.send('API do DataBot está funcionando! 🚀');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
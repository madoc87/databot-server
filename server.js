const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Configurações iniciais
app.use(bodyParser.json());

// Configuração de CORS
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? 'https://databot.rd1.app'
    : 'http://localhost:3000', // supondo que o frontend local rode na porta 3000
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

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
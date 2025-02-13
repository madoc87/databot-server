const express = require('express');
const router = express.Router();
const db = require('../config/database');
const CampanhaController = require('../controllers/CampanhaController');

// Listar todas as campanhas
router.get('/', CampanhaController.listarCampanhas);

// Listar todas as campanhas OLD Deepseek
// router.get('/', (req, res) => {
//   db.all('SELECT * FROM Campanhas', (err, rows) => {
//     if (err) res.status(500).json({ error: err.message });
//     else res.json(rows);
//   });
// });





// Criar nova campanha
router.post('/', CampanhaController.criarCampanha);

// Criar nova campanha - OLD Deepseek
// router.post('/', (req, res) => {
//   const { nome, custo_por_cliente, data_inicio } = req.body;
//   db.run(
//     'INSERT INTO Campanhas (nome, custo_por_cliente, data_inicio) VALUES (?, ?, ?)',
//     [nome, custo_por_cliente, data_inicio],
//     function (err) {
//       if (err) res.status(500).json({ error: err.message });
//       else res.json({ id: this.lastID });
//     }
//   );
// });



// Buscar uma campanha específica pelo ID
router.get('/:id', CampanhaController.buscarCampanhaPorId);

// Atualizar uma campanha
router.put('/:id', CampanhaController.atualizarCampanha);

// Apagar uma campanha
router.delete('/:id', CampanhaController.apagarCampanha);

module.exports = router;
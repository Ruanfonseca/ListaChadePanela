require('dotenv').config();
const express = require('express');
const app = express(); 
const sequelize = require('./config/database');
const giftRoutes = require('./routes/gift.routes');
const corsMiddleware = require('./middleware/cors.middleware');

// Middlewares
app.use(express.json());
app.use(corsMiddleware); 

// Rotas
app.use('/gifts', giftRoutes); 

// Conexão com o banco + sync
sequelize.authenticate()
  .then(() => sequelize.sync())
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Erro ao conectar com o banco de dados:', err);
  });

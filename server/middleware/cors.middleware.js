// middlewares/cors.middleware.js
module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // ou '*' no dev
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Para pré-verificações de CORS (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
};

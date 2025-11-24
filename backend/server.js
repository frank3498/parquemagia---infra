const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

// Servir frontend estático (asumiendo que frontend build está en ../frontend)
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Endpoints
app.post('/api/reservar', (req, res) => {
  const { name, age, attractionId } = req.body;
  if(!name || !attractionId) return res.status(400).json({ error: 'Campos incompletos' });
  // Simular lógica: crear reserva en memoria (o enviar a DB)
  // Aquí podrías integrar una DB o microservicio real. Este demo devuelve success.
  return res.json({ message: `Reserva creada para ${name} en ${attractionId}. Código: PM-${Date.now()%100000}`});
});

app.get('/api/health', (req, res) => res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' }));

// Fallback a index.html para rutas SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`API escuchando en puerto ${port}`));

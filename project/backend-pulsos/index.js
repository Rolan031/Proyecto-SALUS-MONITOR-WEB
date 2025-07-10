const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let registros = [];

app.post('/pulsos', (req, res) => {
  const { nombre, edad, pulso } = req.body;
  const fecha = new Date().toISOString();

  // Aquí puedes aplicar analizarPulsoPorEdad() si quieres
  registros.push({ id: registros.length + 1, nombre, edad, pulso, fecha });
  res.status(201).json({ mensaje: 'Registro guardado' });
});

app.get('/pulsos', (req, res) => {
  res.json(registros);
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});

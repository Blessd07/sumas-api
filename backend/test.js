const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

// Endpoint de prueba
app.get('/', (req, res) => {
    res.json({ mensaje: 'Servidor funcionando correctamente' });
});

app.post('/sumar', (req, res) => {
    const { num1, num2 } = req.body;
    const resultado = Number(num1) + Number(num2);
    res.json({ resultado });
});

app.listen(PORT, () => {
    console.log(`✅ Servidor en http://localhost:${PORT}`);
    console.log('Presiona Ctrl+C para detener');
});
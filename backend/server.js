const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint GET
app.get('/', (req, res) => {
    console.log('📍 GET / - Alguien conectado');
    res.json({ 
        mensaje: '¡Servidor funcionando correctamente!',
        timestamp: new Date().toISOString()
    });
});

// Endpoint POST - Sumar
app.post('/sumar', (req, res) => {
    console.log('📍 POST /sumar - Recibido:', req.body);
    const { num1, num2 } = req.body;

    if (num1 === undefined || num2 === undefined) {
        return res.status(400).json({ 
            error: 'Faltan parámetros num1 y num2' 
        });
    }

    const resultado = Number(num1) + Number(num2);
    
    const response = {
        num1: Number(num1),
        num2: Number(num2),
        resultado: resultado
    };
    
    console.log('📤 Respuesta:', response);
    res.json(response);
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log(`✅ SERVIDOR CORRIENDO EN http://localhost:${PORT}`);
    console.log('='.repeat(50));
    console.log(`📡 Prueba la API en: http://localhost:${PORT}`);
    console.log(`➕ Para sumar: POST a http://localhost:${PORT}/sumar`);
    console.log('='.repeat(50));
});
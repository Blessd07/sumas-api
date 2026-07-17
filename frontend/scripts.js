// Configuración
const API_URL = 'http://localhost:3000';

// Elementos
const num1Input = document.getElementById('num1');
const num2Input = document.getElementById('num2');
const sumarBtn = document.getElementById('sumarBtn');
const resultadoMensaje = document.getElementById('resultadoMensaje');
const resultadoContainer = document.getElementById('resultadoContainer');
const apiTitle = document.getElementById('apiTitle');

// Cargar mensaje de bienvenida
async function cargarBienvenida() {
    try {
        console.log('Intentando conectar a:', API_URL);
        const response = await fetch(API_URL);
        console.log('Respuesta:', response.status);
        const data = await response.json();
        console.log('Datos:', data);
        apiTitle.textContent = data.title || 'Sumas API';
    } catch (error) {
        console.error('Error:', error);
        apiTitle.textContent = '❌ No se pudo conectar al backend';
        apiTitle.style.color = 'red';
    }
}

// Función para sumar
async function realizarSuma() {
    const num1 = num1Input.value.trim();
    const num2 = num2Input.value.trim();

    if (num1 === '' || num2 === '') {
        resultadoMensaje.innerHTML = '❌ Ambos campos son obligatorios';
        resultadoContainer.className = 'resultado-container error';
        return;
    }

    try {
        sumarBtn.disabled = true;
        sumarBtn.textContent = '⏳ Procesando...';
        resultadoMensaje.innerHTML = 'Calculando...';
        resultadoContainer.className = 'resultado-container loading';

        const response = await fetch(`${API_URL}/sumar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ num1: Number(num1), num2: Number(num2) })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Error en el servidor');
        }

        resultadoMensaje.innerHTML = `✅ ${data.num1} + ${data.num2} = <strong>${data.resultado}</strong>`;
        resultadoContainer.className = 'resultado-container success';

    } catch (error) {
        console.error('Error:', error);
        resultadoMensaje.innerHTML = `❌ ${error.message}`;
        resultadoContainer.className = 'resultado-container error';
    } finally {
        sumarBtn.disabled = false;
        sumarBtn.textContent = '➕ Sumar';
    }
}

// Eventos
sumarBtn.addEventListener('click', realizarSuma);

num1Input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') realizarSuma();
});
num2Input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') realizarSuma();
});

// Iniciar
cargarBienvenida();
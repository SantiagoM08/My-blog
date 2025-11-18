// --- LÓGICA JAVASCRIPT ---

// Función helper para mostrar resultados de JS
const resultadoEl = document.getElementById('js-results');
function mostrarResultado(texto) {
    if (resultadoEl) {
        resultadoEl.value = texto;
    } else {
        console.warn("Elemento 'js-results' no encontrado.");
    }
}

// Ejercicio 1: Palíndromo
function ejercicio1() {
    const input = prompt("Ejercicio 1: Introduce una cadena:");
    if (input === null || input.trim() === "") {
        mostrarResultado("Ejercicio 1: Operacion cancelada o vacia.");
        return;
    }
    
    // Normalizar la cadena: minúsculas y quitar no alfanuméricos
    const normalizada = input.toLowerCase().replace(/[^a-z0-9áéíóúü]/g, '');
    if (normalizada.length === 0) {
         mostrarResultado("Ejercicio 1: La cadena solo contenia simbolos.");
         return;
    }
    
    // Invertir la cadena
    const invertida = normalizada.split('').reverse().join('');
    
    let resultado;
    if (normalizada === invertida) {
        resultado = `"${input}" SI es un palindromo.\n(Normalizado: ${normalizada})`;
    } else {
        resultado = `"${input}" NO es un palindromo.\n(Normalizado: ${normalizada} vs ${invertida})`;
    }
    mostrarResultado(`Ejercicio 1:\n${resultado}`);
}

// Ejercicio 2: Número Mayor
function ejercicio2() {
    const num1_input = prompt("Ejercicio 2: Introduce el primer numero:");
    const num2_input = prompt("Ejercicio 2: Introduce el segundo numero:");

    const num1 = parseFloat(num1_input);
    const num2 = parseFloat(num2_input);

    let resultado;
    if (isNaN(num1) || isNaN(num2)) {
        resultado = "Entrada invalida. Por favor, introduce numeros.";
    } else if (num1 > num2) {
        resultado = `${num1} es mayor que ${num2}.`;
    } else if (num2 > num1) {
        resultado = `${num2} es mayor que ${num1}.`;
    } else {
        resultado = `${num1} y ${num2} son iguales.`;
    }
    mostrarResultado(`Ejercicio 2:\n${resultado}`);
}

// Ejercicio 3: Mostrar Vocales (únicas)
function ejercicio3() {
    const frase = prompt("Ejercicio 3: Introduce una frase:");
    if (frase === null || frase.trim() === "") {
        mostrarResultado("Ejercicio 3: Operacion cancelada o vacia.");
        return;
    }
    
    const vocalesEncontradas = [];
    const vocales = "aeiouáéíóúü"; // Incluimos acentos y diéresis
    
    for (const char of frase.toLowerCase()) {
        // Si es una vocal y no está ya en el array
        if (vocales.includes(char) && !vocalesEncontradas.includes(char)) {
            vocalesEncontradas.push(char);
        }
    }
    
    let resultado;
    if (vocalesEncontradas.length > 0) {
        resultado = `Vocales encontradas: ${vocalesEncontradas.sort().join(', ')}`;
    } else {
        resultado = "No se encontraron vocales en la frase.";
    }
    mostrarResultado(`Ejercicio 3:\n${resultado}`);
}

// Ejercicio 4: Contar Vocales
function ejercicio4() {
    const frase = prompt("Ejercicio 4: Introduce una frase:");
    if (frase === null || frase.trim() === "") {
        mostrarResultado("Ejercicio 4: Operacion cancelada o vacia.");
        return;
    }

    // Objeto para usar como mapa de contadores
    const conteo = { a: 0, e: 0, i: 0, o: 0, u: 0, á: 0, é: 0, í: 0, ó: 0, ú: 0, ü: 0 };
    const vocales = "aeiouáéíóúü";

    for (const char of frase.toLowerCase()) {
        if (vocales.includes(char)) {
            conteo[char]++; // Incrementa el contador para esa vocal
        }
    }

    let resultado = "Conteo de vocales:\n";
    let encontradas = false;
    // Construir la cadena de resultado
    for (const vocal in conteo) {
        if (conteo[vocal] > 0) {
            resultado += `${vocal}: ${conteo[vocal]}\n`;
            encontradas = true;
        }
    }
    
    if (!encontradas) {
        resultado = "No se encontraron vocales en la frase.";
    }
    
    mostrarResultado(`Ejercicio 4:\n${resultado.trim()}`);
}


// --- LÓGICA AJAX ---

// Elementos del DOM
const urlInput = document.getElementById('recurso-url');
const btnMostrar = document.getElementById('btn-mostrar-contenido');
const estadoEl = document.getElementById('estado-peticion');
const codigoEl = document.getElementById('codigo-estado');
const cabecerasEl = document.getElementById('cabeceras-recurso');
const contenidoEl = document.getElementById('contenido-recurso');

// Instancia de XMLHttpRequest
let xhr = new XMLHttpRequest();

// Ejercicio AJAX 1: URL por Defecto al cargar
// Usamos DOMContentLoaded para asegurar que el script se ejecuta tras cargar el DOM
document.addEventListener('DOMContentLoaded', (event) => {
    if (urlInput) {
        // Usamos una URL relativa como placeholder más útil
        urlInput.value = "post1.html"; 
    }
    actualizarEstado(); // Estado inicial
});

// Asignar evento al botón
if (btnMostrar) {
    btnMostrar.addEventListener('click', solicitarContenido);
} else {
    console.warn("Botón 'btn-mostrar-contenido' no encontrado.");
}


// Ejercicio AJAX 2: Solicitar contenido
function solicitarContenido() {
    const url = urlInput.value;
    if (!url) {
        // No usamos alert()
        mostrarResultado("ERROR: Por favor, introduce una URL.");
        return;
    }
    
    // Limpiar resultados anteriores
    contenidoEl.textContent = "";
    cabecerasEl.textContent = "";
    codigoEl.textContent = "(esperando)";
    
    // Asignar el manejador de cambio de estado
    xhr.onreadystatechange = procesarCambioEstado;
    
    try {
        // Abrir y enviar la petición
        xhr.open('GET', url, true);
        xhr.send();
    } catch (e) {
        estadoEl.textContent = `Error al iniciar la peticion: ${e.message}`;
    }
}

// Ejercicio AJAX 3, 4, 5: Procesar estados, cabeceras y contenido
function procesarCambioEstado() {
    // Ejercicio AJAX 3: Mostrar estado
    actualizarEstado();
    
    // Cuando la petición se completa (readyState 4)
    if (xhr.readyState === 4) {
        
        // Ejercicio AJAX 5: Mostrar código y texto de estado
        mostrarCodigoEstado(xhr.status, xhr.statusText);
        
        // Ejercicio AJAX 4: Mostrar cabeceras
        mostrarCabeceras(xhr.getAllResponseHeaders());

        // Ejercicio AJAX 2: Mostrar contenido
        if (xhr.status === 200) {
            // Petición exitosa
            contenidoEl.textContent = xhr.responseText;
        } else if (xhr.status === 0) {
            // Error común (ej. CORS o recurso no encontrado localmente)
            contenidoEl.textContent = "Error: No se pudo cargar el recurso.\n";
            contenidoEl.textContent += "Si estas probando localmente ('file://'), ";
            contenidoEl.textContent += "es posible que el navegador bloquee la peticion por seguridad (CORS).";
        } else {
            // Otro error en la petición
            contenidoEl.textContent = `Error al cargar el recurso.\nCodigo: ${xhr.status} (${xhr.statusText})`;
        }
    }
}

// --- Funciones Helper AJAX ---

// Helper para Ejercicio 3
function actualizarEstado() {
    if (!xhr || !estadoEl) return;
    switch (xhr.readyState) {
        case 0:
            estadoEl.textContent = "0: UNSENT (No iniciada)";
            break;
        case 1:
            estadoEl.textContent = "1: OPENED (Abierta)";
            break;
        case 2:
            estadoEl.textContent = "2: HEADERS_RECEIVED (Cabeceras recibidas)";
            break;
        case 3:
            estadoEl.textContent = "3: LOADING (Cargando)";
            break;
        case 4:
            estadoEl.textContent = "4: DONE (Completada)";
            break;
        default:
            estadoEl.textContent = "Estado desconocido";
            break;
    }
}

// Helper para Ejercicio 4
function mostrarCabeceras(cabeceras) {
    if (!cabecerasEl) return;
    if (cabeceras) {
        cabecerasEl.textContent = cabeceras;
    } else {
        cabecerasEl.textContent = "(sin cabeceras)";
    }
}

// Helper para Ejercicio 5
function mostrarCodigoEstado(codigo, texto) {
    if (!codigoEl) return;
    if (codigo === 0) {
         codigoEl.textContent = `(peticion fallida o bloqueada)`;
    } else {
        codigoEl.textContent = `Codigo: ${codigo}, Texto: ${texto}`;
    }
}
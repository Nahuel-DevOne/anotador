
/********** Variables **********/ 
const formulario = document.querySelector('#formulario');
const listaNotas = document.querySelector('#lista-notas');
let notas = []

/********** Event Listeners **********/ 
const eventListeners = () => {
    formulario.addEventListener('submit', agregarNota);
}

/********** functions **********/
// agrega una nota
const agregarNota = (e) => {
    e.preventDefault();
    
    // Leer el textarea, donde el usuario escribe
    const nota = document.querySelector('#nota').value;
    
    // Validación...
    if(nota === '') {
        mostrarError('No se puede agregar una nota vacía');
        return; // este return previene que se ejecuten más líneas de código en el siguiente paso
        // si no se pone, se ejecuta el código de abajo. Funciona en un if, si está dentro de una función
    }
    // Crear un objeto con la nota
    const notaObj = {
        id: Date.now(),
        /** nota: nota se puede poner así, pero como el nombre de la variable es igual al nombre de la propiedad, se puede poner así: */ 
        nota // es una versión más reciente de js, para ahorrar notación
    }

    // agrega una nota al arreglo de notas
    notas = [...notas, notaObj];

    // una vez que se agrega la nota, se llama a la función que imprime el html
    crearHTML();

    // Reinicia el formulario
    formulario.reset();
    
}

// muestra un error en pantalla
const mostrarError = (error) => {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Inserta en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Elimina la alerta después de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

// Muestra las notas en el html
const crearHTML = () => {
    
    limpiaHTML();
    if(notas.length > 0) {
        notas.forEach(nota => {
            // Se crea el html
            const li = document.createElement('li');
            // Se agrega el texto
            li.textContent = nota.nota;
            // Se inserta en el html
            listaNotas.appendChild(li);

        });
    }
}

/** Limpiar el HTML */
// Elimina una nota
const limpiaHTML = () => {
    while(listaNotas.firstChild) {
        listaNotas.removeChild(listaNotas.firstChild);
    }
}


// ejecuta las funciones
eventListeners();
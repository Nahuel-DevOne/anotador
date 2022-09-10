
/********** Variables **********/ 
const formulario = document.querySelector('#formulario');
const listaNotas = document.querySelector('#lista-notas');
let notas = []

/********** Event Listeners **********/ 
const eventListeners = () => {
    // Cuando el usuario agrega una nota nueva
    formulario.addEventListener('submit', agregarNota);
    // Cuando el documento está listo
    document.addEventListener('DOMContentLoaded', () => {
        // Buscan las notas en el localStorage. 
        // Si no hay notas, se pone un arreglo vacío (porque sino el forEach no funciona, que sería null)
        notas = JSON.parse(localStorage.getItem('notas')) || []; 
        crearHTML();
    });
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
            // Agrega un botón de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-nota');
            btnEliminar.textContent = 'X';
            // Agrega la función de eliminar
            btnEliminar.onclick = () => {
                borrarNota(nota.id);
            }
            // Se crea el HTML
            const li = document.createElement('li');
            // Se agrega el texto
            li.textContent = nota.nota;
            // Se agrega el botón de eliminar
            li.appendChild(btnEliminar);
            // Se inserta en el html
            listaNotas.appendChild(li);

        });
    }
    sincronizarStorage();
}

// Agrega las notas al local storage
const sincronizarStorage = () => {
    localStorage.setItem('notas', JSON.stringify(notas));
}

// Elimina una nota
const borrarNota = (id) => {
    notas = notas.filter(nota => nota.id !== id);
    crearHTML();
}

/** Limpia el HTML */
const limpiaHTML = () => {
    while(listaNotas.firstChild) {
        listaNotas.removeChild(listaNotas.firstChild);
    }
}

// ejecuta las funciones
eventListeners();
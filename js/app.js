
/********** 1. Variables y Selectores **********/
// Inicializando un arreglo vacío para las notas 
let notas = []; // arreglo de notas
// Seleccionando elementos del DOM que voy a utilizar
const formulario = document.querySelector('#formulario');
const listaNotas = document.querySelector('#lista-notas');

/********** 2. Event Listeners **********/ 
const eventListeners = () => {
    // Cuando el usuario agrega una nota nueva
    formulario.addEventListener('submit', agregarNota);
    // Cuando el documento está listo
    document.addEventListener('DOMContentLoaded', () => {
        // 14. Buscando las notas en el localStorage. 
        // Si no hay notas, se pone un arreglo vacío (porque sino el forEach no funciona, ya que sería null, y no un arreglo)
        notas = JSON.parse(localStorage.getItem('notas')) || []; // 14. Buscando las notas en el localStorage. Si no hay nada, es un arreglo vacío. 
        // 9. una vez que se agrega la nota, se llama a la función que imprime el HTML
        crearHTML();
    });
}

/********** 3. Funciones **********/
// 4. agrega una nota
const agregarNota = (e) => {
    e.preventDefault();
    
    // Leer el textarea, donde el usuario escribe
    const nota = document.querySelector('#nota').value;
    
    // 5. Validación...
    if(nota === '') {
        // 6. muestra un error en pantalla
        mostrarError('No se puede agregar una nota vacía');
        return; // este return previene que se ejecuten más líneas de código en el siguiente paso
        // si no se pone, se ejecuta el código de abajo. Funciona en un if, si está dentro de una función
    }
    // 7. Crear un objeto con la nota
    const notaObj = {
        id: Date.now(),
        /** nota: nota se puede poner así, pero como el nombre de la variable es igual al nombre de la propiedad, se puede poner así: */ 
        nota // es una versión más reciente de js, para ahorrar notación
    }

    // 8. agrega una nota al arreglo de notas
    notas = [...notas, notaObj]; // notas va a ser un arreglo de objetos, conformado cada uno por el id y su nota

    // 9. una vez que se agrega la nota, se llama a la función que imprime el HTML
    crearHTML();

    // 12. Reinicia el formulario (para borrar la nota que se escribe en el input)
    formulario.reset();
    
}

// 6. muestra un error en pantalla
const mostrarError = error => {
    // Se crea un elemento de html, en este caso la etiqueta p
    const mensajeError = document.createElement('p');
    // Se agrega el contenido que se pasa por parámetro de la función
    mensajeError.textContent = error;
    // Se le agrega la clase error
    mensajeError.classList.add('error');

    // Inserta en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // Elimina la alerta después de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

// 9. Muestra las notas en el html
const crearHTML = () => {
    // 11. Para eliminar el código previo, y así evitar elementos duplicados
    limpiaHTML();
    // 10. Para evitar que se ejecute si no hay mensajes en el arreglo de notas
    if(notas.length > 0) {
        notas.forEach(nota => {
            // 15. Agregar un botón de eliminar
            const btnEliminar = document.createElement('a');
            // Agregando la clase borrar-nota, ya creada en el CSS, a btnEliminar
            btnEliminar.classList.add('borrar-nota');
            // Agregando el texto del botón
            btnEliminar.textContent = 'X';
            // Agregando la función de eliminar
            btnEliminar.onclick = () => {
                // 16. Agregando la función de eliminar
                borrarNota(nota.id);
            }
            // 9. Crear la nota etiqueta li que contiene la nota, para luego insertarla en el HTML
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
    // 13. Agrega las notas al local storage
    sincronizarStorage();
}

// 13. Agrega las notas al local storage
const sincronizarStorage = () => {
    localStorage.setItem('notas', JSON.stringify(notas));
}

// 16. Elimina una nota por su id (se lo pasa como parámetro)
const borrarNota = id => {
    // Filtrar las notas, para que queden todas las notas que no tengan el id que se pasa por parámetro
    notas = notas.filter(nota => nota.id !== id);
    // Se invoca a la función que crea el HTML, para volver a renderizarlo con las notas del arreglo
    crearHTML();
}

/** 11. Limpia el HTML */
const limpiaHTML = () => {
    while(listaNotas.firstChild) {
        listaNotas.removeChild(listaNotas.firstChild);
    }
}

// 17. Ejecuta las funciones invocando a evenListeners
eventListeners();
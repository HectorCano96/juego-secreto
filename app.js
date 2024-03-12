//Hasta este punto vemos cómo conectamos javascript con HTML trayendo
//el elemento título h1 a la variable titulo
//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Juego del número secreto';

//Disminuimos el código, comentamos esto para ver el proceso, pero lo anexamos a la función asignarTextoElemento
//let parrafo = document.querySelector('p');
//parrafo.innerHTML = 'Indica un número del 1 al ${numeroMaximo}';

//Reducimos código para automatizar el anexo de texto, se cambian h1 y el titulo por elemento y texto
//Es común que una función retorne algo, aunque no siempre, una buena práctica es aplicar return siempre
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 100;
let maximoIntentos = 6;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

//Vamos a definir intentoDeUsuario, se parte de la idea de que sólo hay un input
//function verificarIntento() {
//    let numeroDeUsuario = document.querySelector('input');
//    return;
//}

//Si se tienen más de un input, no lo haremos por el elemento solamente, sino por su identificador
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    //Verificando el tipo de dato

    if(numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('comenzar').setAttribute('disabled','true');
    } else{
        //El usuario no acertó.
        if(numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p','El número secreto es menor');
        } else {
            asignarTextoElemento('p','El número secreto es mayor');
        }
        intentos++;
        //Método de salida por máximos intentos
        if(intentos > maximoIntentos){
            asignarTextoElemento('p','Lo siento, perdiste. Puedes intentar jugar de nuevo.');
            document.getElementById('reiniciar').removeAttribute('disabled');
            document.getElementById('comenzar').setAttribute('disabled','true');
        }
        limpiarCaja();
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

//Poder retornar un valor; return nos ayuda a retornar el número Secreto, dice que cuando la función suceda, nos va a retornar un valor
// Puede funcionar:   
// let numeroSecreto = Math.floor(Math.random()*10)+1;
//     return numeroSecreto;
// }
//O puede declararse al inicio, como la tenemos y en la función no necesito declarar la variable
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

    //console.log(numeroGenerado);
    //console.log(listaNumerosSorteados); se utilizaron para comprobar

    //Si ya sorteamos todos los números | Esta salida sólo sucederá si quitamos el método por máximo número de intentos
    if(listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p','Ya se asignaron todos los números posibles') 
    } else {

        //Si el numeroGenerado está incluído en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    } 
}

function condicionesIniciales () {
    //Esto sólo se usa en eventos en HTML, y en JS siempre que esté fuera de un bloque, puedes llamar una función a través de otra función
    asignarTextoElemento('h1','Juego del Número Secreto!');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
    //Este disabled sólo es necesario cuando se utiliza el método de salida por máximoIntento
    document.getElementById('comenzar').removeAttribute('disabled');
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego() {
    //Necesitamos limpiar caja
    limpiarCaja();
    //Indicar mensaje de intervalo de números
    //Generar el número aleatorio
    //Inicializar el número de intentos
    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    

}

condicionesIniciales();
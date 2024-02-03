//Modificado por Kevin Castillo
//última modificación: 02/Febrero/2024

let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
let intentosMax = 3;



function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    if(intentos <= intentosMax){
        console.log("Número de intentos actual: " + intentos);
        if (numeroDeUsuario === numeroSecreto) {
            asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
            document.getElementById('reiniciar').removeAttribute('disabled');
            document.querySelector('#intentar').setAttribute('disabled','true');
              //Para salir del bucle while
              return;
        } else {
            //El usuario no acertó.
            if (numeroDeUsuario > numeroSecreto) {
                asignarTextoElemento('p','El número secreto es menor');
            } else {
                asignarTextoElemento('p','El número secreto es mayor');
            }
            intentos++;
            limpiarCaja();
            if(intentos> intentosMax){
                reiniciarBotonIntentar();
            }
        }
    } else  {
        reiniciarBotonIntentar();
    }
    return;
}

function reiniciarBotonIntentar(){
    asignarTextoElemento('p', 'Fallaste, se agotaron los ' + intentosMax + ' intentos permitidos');
    document.querySelector('#intentar').setAttribute('disabled','true');
    document.getElementById('reiniciar').removeAttribute('disabled');
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado =  Math.floor(Math.random()*numeroMaximo)+1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p','Ya se sortearon todos los números posibles. Fin del juego');
        //Asignamos un valor aleatorio a la lista para deshabilitar el botón de intentar
        listaNumerosSorteados.push(numeroGenerado);
        return;
    } else {
        //Si el numero generado está incluido en la lista 
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales() {
    asignarTextoElemento('h1','Juego del número secreto!');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    console.log(numeroSecreto);
}

function reiniciarJuego() {
    
        //limpiar caja
        limpiarCaja();
        //Indicar mensaje de intervalo de números 
        //Generar el número aleatorio
        //Inicializar el número intentos
        condicionesIniciales();
        //Deshabilitar el botón de nuevo juego
        document.querySelector('#reiniciar').setAttribute('disabled','true');

        if (listaNumerosSorteados.length <= numeroMaximo) {
            //Habilitar el botón de intentar
            document.querySelector('#intentar').removeAttribute('disabled');
        } else{
            //Deshabilitamos el botón de intentar
            document.querySelector('#intentar').setAttribute('disabled','true');
        }
    
    
}

condicionesIniciales();

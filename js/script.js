'use strict'

var tablero;
var score = 0;
var filas = 4;
var columnas = 4;

//cuando la pagina carge
window.onload = function() { iniciarJuego(); }

function iniciarJuego() {
    tablero = [ [0, 0, 0, 0], 
                [0, 0, 0, 0], 
                [0, 0, 0, 0],
                [0, 0, 0, 0]  ];
    
    for (let y = 0; y < filas; y++) {
        for (let x = 0; x < columnas; x++) {
           
            let ficha = document.createElement("div");
            ficha.id = y.toString() + "-" + x.toString();
            let num = tablero[y][x];
            actualizarFicha(ficha, num);
            document.getElementById("tablero").append(ficha);
        }
    }
    //Añadir las dos primeras fichas
    ponDos();
    ponDos();
}

function actualizarFicha(ficha, num) {
    ficha.innerText = "";
    ficha.classList.value = "";
    ficha.classList.add("ficha");
    if (num > 0) {
        ficha.innerText = num.toString();
        ficha.classList.add("x"+num.toString());           
    }
}

document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowLeft" || e.code == "KeyA") {
        deslizarIzq();
        ponDos();
    }
    else if (e.code == "ArrowRight" || e.code == "KeyD") {
        deslizarDch();
        ponDos();
    }
    else if (e.code == "ArrowUp" || e.code == "KeyW") {
        deslizarArriba();
        ponDos();
    }
    else if (e.code == "ArrowDown" || e.code == "KeyS" ) {
        deslizarAbajo();
        ponDos();
    }
    document.getElementById("score").innerText = score;
})

function filtrar0(fila){
    //create un nuevo array con los numeros que no sean cero
      //[0, 2, 2, 2]  --> //[2, 2, 2]
    return fila.filter(num => num != 0); 
}

function deslizar(fila) {
    fila = filtrar0(fila); 
    for (let i = 0; i < fila.length-1; i++){
        if (fila[i] == fila[i+1]) {
            fila[i] *= 2;
            fila[i+1] = 0;
            score += fila[i];
        }
    } 
    //filtrar los zeros que se quedan en medio al sumar fichas
    //[4, 0, 2] -->  //[4, 2]
    fila = filtrar0(fila);
    //añadir los ceros
    while (fila.length < columnas) {
        fila.push(0);
    }
    return fila;
}

function deslizarIzq() {
    for (let y = 0; y < filas; y++) {
        let fila = tablero[y];
        fila = deslizar(fila);
        tablero[y] = fila;
        for (let x = 0; x < columnas; x++){
            let ficha = document.getElementById(y.toString() + "-" + x.toString());
            let num = tablero[y][x];
            actualizarFicha(ficha, num);
        }
    }
}

function deslizarDch() {
    for (let y = 0; y < filas; y++) {
        let fila = tablero[y];
        fila.reverse();
        fila = deslizar(fila);
        fila.reverse();
        tablero[y] = fila;
        for (let x = 0; x < columnas; x++){
            let ficha = document.getElementById(y.toString() + "-" + x.toString());
            let num = tablero[y][x];
            actualizarFicha(ficha, num);
        }
    }
}

function deslizarArriba() {
    for (let x = 0; x < columnas; x++) {
        let fila = [tablero[0][x], tablero[1][x], tablero[2][x], tablero[3][x]];
        fila = deslizar(fila);
        for (let y = 0; y < filas; y++){
            tablero[y][x] = fila[y];
            let ficha = document.getElementById(y.toString() + "-" + x.toString());
            let num = tablero[y][x];
            actualizarFicha(ficha, num);
        }
    }
}

function deslizarAbajo() {
    for (let x = 0; x < columnas; x++) {
        let fila = [tablero[0][x], tablero[1][x], tablero[2][x], tablero[3][x]];
        fila.reverse();
        fila = deslizar(fila);
        fila.reverse();
        for (let y = 0; y < filas; y++){
            tablero[y][x] = fila[y];
            let ficha = document.getElementById(y.toString() + "-" + x.toString());
            let num = tablero[y][x];
            actualizarFicha(ficha, num);
        }
    }
}

function hayCeldadasVacias() {
    let count = 0;
    for (let y = 0; y < filas; y++) {
        for (let x = 0; x < columnas; x++) {
            //Comprobar existe al menos un zero
            if (tablero[y][x] == 0) {
                return true;
            }
        }
    }
    return false;
}

function ponDos() {
    if (!hayCeldadasVacias()) {
        return;
    }
    let found = false;
    while (!found) {
        //find random row and column to place a 2 in
        let y = Math.floor(Math.random() * filas);
        let x = Math.floor(Math.random() * columnas);
        if (tablero[y][x] == 0) {
            tablero[y][x] = 2;
            let ficha = document.getElementById(y.toString() + "-" + x.toString());
            ficha.innerText = "2";
            ficha.classList.add("x2");
            found = true;
        }
    }
}
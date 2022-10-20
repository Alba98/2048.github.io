'use strict'

var tablero;
var score = 0;
var rows = 4;
var columns = 4;

//cuando la pagina carge
window.onload = function() {iniciarJuego();}

function iniciarJuego() {
    tablero = [ [0, 0, 0, 0], 
                [0, 0, 0, 0], 
                [0, 0, 0, 0],
                [0, 0, 0, 0]  ];
    
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
           
            let ficha = document.createElement("div");
            ficha.id = y.toString() + "-" + x.toString();
            let num = tablero[y][x];
            actualizarFicha(ficha, num);
            document.getElementById("tablero").append(ficha);
        }
    }
    
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

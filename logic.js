"use strict";

function celula() {
    var vivo = false;
    var tiempo = 0;
    var vecinasVivas = 0;
}

function dibujo(mundo) {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    canvas.width = mundo.getAncho();
    canvas.height = mundo.getAlto();

    /**
     * Funcion para dibujar el grid en el que vamos a crear el juego
     */

    this.dibujarGrid = function () {
        context.clearRect(0, 0, 800, 800);
        context.fillStyle = "#24E711";
        context.fillRect(0, 0, mundo.getAncho(), mundo.getAlto());
        context.beginPath();
        for (var i = 10; i < mundo.getAlto(); i = i + 10) {
            context.moveTo(i, 0);
            context.lineTo(i, mundo.getAlto());
            context.moveTo(0, i);
            context.lineTo(mundo.getAlto(), i);
        }
        context.closePath();
        context.strokeStyle = "#000000";
        context.stroke();
    }
    /**
     * Metodo de redibujo del mundo
     */
    this.dibujarCelulas = function () {
        var arrayAux;

        arrayAux = mundo.getCelulas();
        for (var i = 0; i < mundo.getAncho() / 10; i++) {
            for (var j = 0; j < mundo.getAlto() / 10; j++) {
                if (arrayAux[i][j].vivo) {
                    context.fillStyle = "#FE0000";
                    context.fillRect(i * 10, j * 10, 10, 10);
                    context.strokeRect(i * 10, j * 10, 10, 10);
                } else {
                    context.fillStyle = "#24E711";
                    context.fillRect(i * 10, j * 10, 10, 10);
                    context.strokeRect(i * 10, j * 10, 10, 10);
                }
            }
        }
    }

}

function mundo(ancho, alto) {
    var celulas = [
        []
    ];

    //Devolvemos el array de celulas
    this.getCelulas = function () {
        return celulas;
    }

    this.getAncho = function () {
        return ancho;
    }
    this.getAlto = function () {
        return alto;
    }

    /**
     * Creamos el array de celulas para el mundo
     */
    for (var i = 0; i < alto / 10; i++) {
        celulas[i] = [];
        for (var j = 0; j < ancho / 10; j++) {
            celulas[i][j] = new celula();
            celulas[i][j].vecinasVivas = 0;
            celulas[i][j].tiempo = 0;
            celulas[i][j].vivo = false;
        }
    }
    /**
     * Pone el array de celulas a false
     */
    this.limpiaCelulas = function () {
        for (var i = 0; i < alto / 10; i++) {
            for (var j = 0; j < ancho / 10; j++) {
                celulas[i][j].vivo = false;
            }
        }
    }


    /**
     *  El metodo cambia el estado de la celula y la colorea
     * */
    this.crearCelula = function (posicion, forma) {
        var i = Math.trunc(posicion.x / 10);
        var j = Math.trunc(posicion.y / 10);
        if (i == (celulas.length - 1)) {
            var x1 = i - i; //devuelve 0
            var x2 = i - 1; //devuelve 78
        } else if (i == 0) {
            var x1 = i + 1; //devuelve 1
            var x2 = i + (celulas.length - 1); //devuelve 79
        } else {
            var x1 = i + 1;
            var x2 = i - 1;
        }
        if (j == celulas.length - 1) {
            var y1 = j - j;
            var y2 = j - 1;
        } else if (j == 0) {
            var y1 = j + 1;
            var y2 = j + (celulas.length - 1);
        } else {
            var y1 = j + 1;
            var y2 = j - 1;
        }
        switch (forma) {
            case "0":
                celulas[i][j].vivo = true;
                celulas[i][y2].vivo = true;
                celulas[i][y1].vivo = true;
                break;
            case "1":
                celulas[i][y1].vivo = true;
                celulas[i][y2].vivo = true;
                celulas[x1][y2].vivo = true;
                celulas[x2][y2].vivo = true;
                celulas[x2][j].vivo = true;
                break;
            case "2":
                celulas[i][y1].vivo = true;
                celulas[i][y2].vivo = true;
                celulas[x2][j].vivo = true;
                celulas[x1][j].vivo = true;
                celulas[x2][y2].vivo = true;
                break;
            case "3":
                var auxAc1;
                if (i - 2 == -2) {
                    auxAc1 = celulas.length - 2;
                } else if (i - 2 == -1) {
                    auxAc1 = celulas.length - 1;
                }
                else {
                    auxAc1 = i - 2;
                }

                celulas[auxAc1][y1].vivo = true;
                celulas[x2][y1].vivo = true;
                celulas[x2][y2].vivo = true;
                celulas[x1][j].vivo = true;

                var auxAc1;
                var auxAc2;
                var auxAc3;
                if (i+4==celulas.length+3) {
                    auxAc3=3;
                    auxAc2=2;
                    auxAc1=1;
                } else if (i + 4 == celulas.length + 2) {
                    auxAc3=2;
                    auxAc2=1;
                    auxAc1=0;
                } else if (i + 4 == celulas.length + 1) {
                    auxAc3=1;
                    auxAc2=0;
                    auxAc1=i+2;
                } else if(i+4==celulas.length){
                    auxAc3=0;
                    auxAc2=i+3;
                    auxAc1=i+2;
                }else{
                    auxAc3=i+4;
                    auxAc2=i+3;
                    auxAc1=i+2;
                }

                celulas[auxAc1][y1].vivo = true;
                celulas[auxAc2][y1].vivo = true;
                celulas[auxAc3][y1].vivo = true;
                break;
            default:
                if (!celulas[i][j].vivo) {
                    celulas[i][j].vivo = true;
                } else {
                    i
                    celulas[i][j].vivo = false;
                }
                break;
        }
    }

    /**
     * El metodo comprobará las celulas para cambiar su estado dependiendo de la lógica descrita:
     * Si la celula está viva...
     *  Si tiene menos de 2 celulas vecinas vivas o mas de tres, la celula morira
     *  Si existen 3 celulas vecinas vivas, la celula vivira
     * Si la celula está muerta...
     *  Si existen justo 3 celulas vecinas vivas, revivira
     */
    function compruebaCelula() {

        for (var i = 0; i < alto / 10; i++) {
            for (var j = 0; j < ancho / 10; j++) {
                if (celulas[i][j].vivo) {
                    if (celulas[i][j].vecinasVivas < 2 || celulas[i][j].vecinasVivas > 3) {
                        celulas[i][j].vivo = false;

                    } else if (celulas[i][j].vecinasVivas >= 2 && celulas[i][j].vecinasVivas <= 3) {
                        celulas[i][j].vivo = true;
                        celulas[i][j].tiempo++;
                    }
                } else {
                    if (celulas[i][j].vecinasVivas == 3) {
                        celulas[i][j].vivo = true;
                        celulas[i][j].tiempo++;
                    }
                }
            }
        }


    }

    /**
     * Ponemos el numero de vecinas vivas a 0 en todas
     */
    function ceros() {
        for (var i = 0; i < alto / 10; i++) {
            for (var j = 0; j < ancho / 10; j++) {
                celulas[i][j].vecinasVivas = 0;
            }
        }

    }

    /**
     * Función que cuenta el numero de celulas vecinas que tiene viva cada una
     */
    function sumaVivas() {
        for (var i = 0; i < alto / 10; i++) {
            for (var j = 0; j < ancho / 10; j++) {
                if (celulas[i][j].vivo) {
                    if (i == (alto / 10 - 1)) {
                        var x1 = i - i; //devuelve 0
                        var x2 = i - 1; //devuelve 78
                    } else if (i == 0) {
                        var x1 = i + 1; //devuelve 1
                        var x2 = i + (alto / 10 - 1); //devuelve 79
                    } else {
                        var x1 = i + 1;
                        var x2 = i - 1;
                    }
                    if (j == ancho / 10 - 1) {
                        var y1 = j - j;
                        var y2 = j - 1;
                    } else if (j == 0) {
                        var y1 = j + 1;
                        var y2 = j + (ancho / 10 - 1);
                    } else {
                        var y1 = j + 1;
                        var y2 = j - 1;
                    }

                    celulas[x1][j].vecinasVivas += 1; //Derecha
                    celulas[x1][y2].vecinasVivas += 1; //Derecha arriba
                    celulas[i][y2].vecinasVivas += 1; //Arriba
                    celulas[x2][y2].vecinasVivas += 1; //Arriba izquierda
                    celulas[x2][j].vecinasVivas += 1; //Izquierda
                    celulas[x2][y1].vecinasVivas += 1; //Izquierda abajo
                    celulas[i][y1].vecinasVivas += 1; //Abajo
                    celulas[x1][y1].vecinasVivas += 1; //Abajo Derecha
                }

            }
        }

    }

    /**
     * Funcion donde se ejecutan las funciones necesarias para la partida
     */
    this.play = function () {
        ceros();
        sumaVivas();
        compruebaCelula();
        ceros();
        sumaVivas();
    }


}

function eventos(mondo, debujo) {
    var intervalo;
    var isActive = false;
    var isClean = false;
    var mendo = mondo;
    var dibojo = debujo;
    var formaEspecial;
    /**
     * Funcion para añadir el evento de click al canvas para pintar celdas
     */
    this.activarClickCelulas = function (objeto, texto) {
        objeto.addEventListener("click", function (event) {
            mendo.crearCelula(posicionRaton(objeto, event), formaEspecial);
            dibojo.dibujarCelulas();
            formaEspecial = "-1";
            isClean = false;
            texto.innerHTML = "Forma actual: default";

        });
    }

    /**
     * Función para añadir el evento de inicio
     */
    this.activarPlay = function (objeto) {
        objeto.addEventListener("click", function fun() {
            if (!isActive) {
                intervalo = window.setInterval(function () {

                    mendo.play();
                    dibojo.dibujarCelulas();
                }, 100);
                isActive = true;
                isClean = false;
            }
        });

    }

    /**
     * Funcion para parar el intervalo
     */
    this.pararPlay = function (objeto) {
        objeto.addEventListener("click", function () {
            if (isActive) {
                window.clearInterval(intervalo);
                isActive = false;
            }

        });

    }

    /**
     * Limpiamos la pantalla, paramos el intervalo
     */

    this.limpiarMundo = function (objeto) {
        objeto.addEventListener("click", function () {
            if (isActive || !isClean) {
                mendo.limpiaCelulas();
                dibojo.dibujarCelulas();
                window.clearInterval(intervalo);
                isActive = false;
                isClean = true;
            }
        });

    }

    /**
     *  El metodo recogera la posicion del raton dentro del propio canvas
     *  Devuelve la posicion en X e Y
     */

    function posicionRaton(canvas, event) {
        var rectangulo = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rectangulo.left,
            y: event.clientY - rectangulo.top
        }
    }

    /**
     * Nos da la información de la célula
     */
    this.infoCelula = function (objeto, texto) {
        objeto.addEventListener("mousemove", function (event) {
            var raton = posicionRaton(objeto, event);
            var x = Math.trunc(raton.x / 10);
            var y = Math.trunc(raton.y / 10);
            var info = mendo.getCelulas();
            if (x < info.length && y < info.length && x >= 0 && y >= 0) {
                texto.innerHTML = "Viva: " + info[x][y].vivo + "\n" + "Tiempo: " +
                    info[x][y].tiempo + "\n" + "Vecinas: " + info[x][y].vecinasVivas, raton.x, raton.y;
            }
        });
    }

    /**
     * Función para reajustar el canvas
     */
    this.sizeCanvas = function (objeto) {
        objeto.addEventListener("change", function (event) {
            var size = objeto.value;
            mendo.limpiaCelulas();
            mendo = new mundo(size, size);
            dibojo = new dibujo(mendo);
           dibojo.dibujarGrid();
        });
    }

    this.generarFormas = function (objeto, texto) {
        objeto.addEventListener("click", function () {
            formaEspecial = objeto.value;
            texto.innerHTML = "Forma actual: " + objeto.name;

        });
    }

    this.about=function(objeto){
        objeto.addEventListener("click",function(){
            alert("Programa realizado por\n" +
                "Javier Albaráñez Martínez \n" +
                "Iago Cruz García\n" +
                "Entrega el día 16/12/2017");
        });
    }
}


window.onload = function () {
    var canvas = document.getElementById("myCanvas");
    var botonPlay = document.getElementById("play");
    var botonStop = document.getElementById("stop");
    var botonClear = document.getElementById("clean");
    var formaActual = document.getElementById("forma");
    var texto = document.getElementById("coordenadas");
    var barraSize = document.getElementById("barSize");
    var about=document.getElementById("about");
    //var eventar = new eventos();
    var size = barraSize.value;

    var mondo = new mundo(size, size);
    var dibujar = new dibujo(mondo);
    var eventar = new eventos(mondo, dibujar);

    var blinker = document.getElementById("blinker");
    var glider = document.getElementById("glider");
    var boat = document.getElementById("boat");
    var acorn = document.getElementById("acorn");

    eventar.activarClickCelulas(canvas, formaActual);
    eventar.activarPlay(botonPlay);
    eventar.pararPlay(botonStop);
    eventar.limpiarMundo(botonClear);

    eventar.infoCelula(canvas, texto);
    eventar.sizeCanvas(barraSize);

    eventar.generarFormas(blinker, formaActual);
    eventar.generarFormas(glider, formaActual);
    eventar.generarFormas(boat, formaActual);
    eventar.generarFormas(acorn, formaActual);
    eventar.about(about);
    dibujar.dibujarGrid();

}
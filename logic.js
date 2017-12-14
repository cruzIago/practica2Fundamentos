function celula() {
    vivo = false;
    tiempo = 0;
    vecinasVivas = 0;
}

function dibujo(mundo) {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    context.fillStyle = "#24E711";
    context.fillRect(0, 0, mundo.getAncho(), mundo.getAlto());

    /**
     * Funcion para dibujar el grid en el que vamos a crear el juego
     */
    this.dibujarGrid = function() {
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
    this.dibujarCelulas = function() {
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
    this.getCelulas = function() {
        return celulas;
    }

    this.getAncho = function() {
        return ancho;
    }
    this.getAlto = function() {
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
    this.limpiaCelulas = function() {
        for (var i = 0; i < alto / 10; i++) {
            for (var j = 0; j < ancho / 10; j++) {
                celulas[i][j].vivo = false;
            }
        }
    }


    /**
     *  El metodo cambia el estado de la celula y la colorea
     * */
    this.crearCelula = function(posicion) {
        if (!celulas[Math.trunc(posicion.x / 10)][Math.trunc(posicion.y / 10)].vivo) {
            celulas[Math.trunc(posicion.x / 10)][Math.trunc(posicion.y / 10)].vivo = true;

        } else {
            celulas[Math.trunc(posicion.x / 10)][Math.trunc(posicion.y / 10)].vivo = false;
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
        ceros();
        sumaVivas();

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
    this.play = function() {
        ceros();
        sumaVivas();
        compruebaCelula();
    }


}

function eventos() {
    var intervalo;
    /**
     * Funcion para añadir el evento de click al canvas para pintar celdas
     */
    this.activarClickCelulas = function(objeto, mundo, dibujo) {
        objeto.addEventListener("click", function(event) {
            mundo.crearCelula(posicionRaton(objeto, event));
            dibujo.dibujarCelulas();
        });
    }

    /**
     * Función para añadir el evento de inicio
     */
    this.activarPlay = function(objeto, mundo, dibujo) {
        objeto.addEventListener("click", function() {
            intervalo = window.setInterval(function() {
                mundo.play();
                dibujo.dibujarCelulas();
            }, 100);
        });
    }

    /**
     * Funcion para parar el intervalo
     */
    this.pararPlay = function(objeto) {
        objeto.addEventListener("click", function() {
            window.clearInterval(intervalo);
        });
    }

    /**
     * Limpiamos la pantalla, paramos el intervalo
     */

    this.limpiarMundo = function(objeto, mundo, dibujo) {
            objeto.addEventListener("click", function() {
                mundo.limpiaCelulas();
                dibujo.dibujarCelulas();
                window.clearInterval(intervalo);
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
    this.infoCelula = function(objeto, mundo, texto) {
        objeto.addEventListener("mousemove", function(event) {
            var raton = posicionRaton(objeto, event);
            var x = Math.trunc(raton.x / 10);
            var y = Math.trunc(raton.y / 10);
            var info = mundo.getCelulas();
            console.log("x: " + x + ", y: " + y);
            if (x < info.length && y < info.length && x >= 0 && y >= 0) {
                texto.innerHTML = "Viva: " + info[x][y].vivo + "\n" + "Tiempo: " +
                    info[x][y].tiempo + "\n" + "Vecinas: " + info[x][y].vecinasVivas, raton.x, raton.y;
            }
        });
    }
}


window.onload = function() {
    var canvas = document.getElementById("myCanvas");
    var botonPlay = document.getElementById("play");
    var botonStop = document.getElementById("stop");
    var botonClear = document.getElementById("clean");
    var texto = document.getElementById("coordenadas");

    var mondo = new mundo(canvas.height, canvas.width);
    var dibujar = new dibujo(mondo);
    var eventar = new eventos();

    eventar.activarClickCelulas(canvas, mondo, dibujar);
    eventar.activarPlay(botonPlay, mondo, dibujar);
    eventar.pararPlay(botonStop);
    eventar.limpiarMundo(botonClear, mondo, dibujar);
    eventar.infoCelula(canvas, mondo, texto);

    dibujar.dibujarGrid();

}
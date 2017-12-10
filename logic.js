function mundo() {
    var canvas = document.getElementById("myCanvas");
    var context = canvas.getContext("2d");
    context.fillStyle = "#24E711";
    context.fillRect(0, 0, 800, 800);
    var celulas = new celula().formarCelulas();

    canvas.addEventListener("click", function(evt){
        crearCelula(evt,celulas);

    }, false);
    this.getCelulas=function(){
        return celulas;

    }
    function celula() {
        vivo = false;
        tiempo = 0;
        vecinasVivas = 0;

        /**
         * Formamos el array de celulas
         */
        this.formarCelulas=function () {
            var celulas = [
                []
            ];
            for (var i = 0; i < 80; i++) {
                celulas[i] = [];
                for (var j = 0; j < 80; j++) {
                    celulas[i][j] = new celula();
                    celulas[i][j].vecinasVivas = 0;
                }
            }
            return celulas;
        }


    }

    /**
     * Funcion para dibujar el grid en el que vamos a crear el juego
     */
    this.dibujarGrid=function () {
        context.beginPath();
        for (var i = 10; i < 800; i=i + 10) {
            context.moveTo(i, 0);
            context.lineTo(i, 800);
            context.moveTo(0, i);
            context.lineTo(800, i);
        }
        context.closePath();
        context.strokeStyle = "#000000";
        context.stroke();

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
     *  El metodo cambia el estado de la celula y la colorea
     * */
    function crearCelula(event, celulas) {
        if (!celulas[(Math.trunc(posicionRaton(canvas, event).x / 10))][(Math.trunc(posicionRaton(canvas, event).y / 10))].vivo) {
            context.fillStyle = "#FE0000";
            context.fillRect((Math.trunc(posicionRaton(canvas, event).x / 10)) * 10, (Math.trunc(posicionRaton(canvas, event).y / 10)) * 10, 10, 10);
            context.strokeRect((Math.trunc(posicionRaton(canvas, event).x / 10)) * 10, (Math.trunc(posicionRaton(canvas, event).y / 10) ) * 10, 10, 10);

            celulas[(Math.trunc(posicionRaton(canvas, event).x / 10))][(Math.trunc(posicionRaton(canvas, event).y / 10))].vivo = true;

        } else {

            context.fillStyle = "#24E711";
            context.fillRect((Math.trunc(posicionRaton(canvas, event).x / 10)) * 10, (Math.trunc(posicionRaton(canvas, event).y / 10) ) * 10, 10, 10);
            context.strokeRect((Math.trunc(posicionRaton(canvas, event).x / 10)) * 10, (Math.trunc(posicionRaton(canvas, event).y / 10) ) * 10, 10, 10);
            celulas[(Math.trunc(posicionRaton(canvas, event).x / 10))][(Math.trunc(posicionRaton(canvas, event).y / 10))].vivo = false;

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
    function compruebaCelula(celulas) {

        for (var i = 0; i < 80; i++) {
            for (var j = 0; j < 80; j++) {
                if (celulas[i][j].vivo) {
                    if (celulas[i][j].vecinasVivas < 2 || celulas[i][j].vecinasVivas > 3) {
                        celulas[i][j].vivo = false;
                        context.fillStyle = "#24E711";
                        context.fillRect(10 * i, 10 * j, 10, 10);
                        context.strokeRect(10 * i, 10 * j, 10, 10);
                    } else if (celulas[i][j].vecinasVivas >= 2 && celulas[i][j].vecinasVivas <= 3) {
                        celulas[i][j].vivo = true;
                        context.fillStyle = "#FE0000";
                        context.fillRect(10 * i, 10 * j, 10, 10);
                        context.strokeRect(10 * i, 10 * j, 10, 10);
                    }
                } else {
                    if (celulas[i][j].vecinasVivas == 3) {
                        celulas[i][j].vivo = true;
                        context.fillStyle = "#FE0000";
                        context.fillRect(10 * i, 10 * j, 10, 10);
                        context.strokeRect(10 * i, 10 * j, 10, 10);
                    }
                }
            }
        }


    }

    /**
     * Ponemos el numero de vecinas vivas a 0 en todas
     */
    function ceros(celulas) {
        for (var i = 0; i < 80; i++) {
            for (var j = 0; j < 80; j++) {
                celulas[i][j].vecinasVivas = 0;
            }
        }

    }

    /**
     * Función que cuenta el numero de celulas vecinas que tiene viva cada una
     */
    function sumaVivas(celulas){
        for (var i = 0; i < 80; i++) {
            for (var j = 0; j < 80; j++) {
                if (celulas[i][j].vivo) {
                    if (i == 79) {
                        var x1 = i - i; //devuelve 0
                        var x2 = i - 1; //devuelve 78
                    } else if (i == 0) {
                        var x1 = i + 1; //devuelve 1
                        var x2 = i + 79; //devuelve 79
                    } else {
                        var x1 = i + 1;
                        var x2 = i - 1;
                    }
                    if (j == 79) {
                        var y1 = j - j;
                        var y2 = j - 1;
                    } else if (j == 0) {
                        var y1 = j + 1;
                        var y2 = j + 79;
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
     * Funcion donde se ejecutan las funciones necesarias para comenzar la partida
     */
    this.play=function(celulas) {
        ceros(celulas);
        sumaVivas(celulas);
        compruebaCelula(celulas);
    }
}

window.onload = function () {
    var mondo=new mundo();
    mondo.dibujarGrid();

    var intervalo;

    document.getElementById("play").addEventListener("click", function () {
        intervalo = window.setInterval(function(){
            mondo.play(mondo.getCelulas());

        }, 100);

    });
    document.getElementById("stop").addEventListener("click",function(){
        window.clearInterval(intervalo);
    });




}
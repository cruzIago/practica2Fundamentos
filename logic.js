var celulas = [
    []
];

window.onload = function () {

    function celula() {
        vivo = false;
        tiempo = 0;
        vecinasVivas = 0;
    }

    for (var i = 0; i < 80; i++) {
        celulas[i] = [];
        for (var j = 0; j < 80; j++) {
            celulas[i][j] = new celula();
            celulas[i][j].vecinasVivas = 0;
        }
    }
    var x1 = document.getElementById("myCanvas");
    var c1 = x1.getContext("2d");
    c1.fillStyle = "#24E711";
    c1.fillRect(0, 0, 800, 800);


    x1.addEventListener("click", crearCelula, false);

    c1.beginPath();
    for (var i = 10; i < 800; i = i + 10) {
        c1.moveTo(i, 0);
        c1.lineTo(i, 800);
        c1.moveTo(0, i);
        c1.lineTo(800, i);
    }
    c1.closePath();

    c1.strokeStyle = "#000000";
    c1.stroke();


    function crearCelula(event) {
        if (!celulas[(Math.trunc(event.clientX / 10) - 1)][(Math.trunc(event.clientY / 10) - 1)].vivo) {
            c1.fillStyle = "#FE0000";
            c1.fillRect((Math.trunc(event.clientX / 10) - 1) * 10, (Math.trunc(event.clientY / 10) - 1) * 10, 10, 10);
            c1.strokeRect((Math.trunc(event.clientX / 10) - 1) * 10, (Math.trunc(event.clientY / 10) - 1) * 10, 10, 10);

            celulas[(Math.trunc(event.clientX / 10) - 1)][(Math.trunc(event.clientY / 10) - 1)].vivo = true;

        } else {

            c1.fillStyle = "#24E711";
            c1.fillRect((Math.trunc(event.clientX / 10) - 1) * 10, (Math.trunc(event.clientY / 10) - 1) * 10, 10, 10);
            c1.strokeRect((Math.trunc(event.clientX / 10) - 1) * 10, (Math.trunc(event.clientY / 10) - 1) * 10, 10, 10);
            celulas[(Math.trunc(event.clientX / 10) - 1)][(Math.trunc(event.clientY / 10) - 1)].vivo = false;

        }
    }


    function compruebaCelula() {

        for (var i = 0; i < 80; i++) {
            for (var j = 0; j < 80; j++) {
                if (celulas[i][j].vivo) {
                    if (celulas[i][j].vecinasVivas < 2 || celulas[i][j].vecinasVivas > 3) {
                        celulas[i][j].vivo = false;
                        c1.fillStyle="#24E711";
                        c1.fillRect(10*i,10*j,10,10);
                        c1.strokeRect(10*i,10*j,10,10);
                    } else if (celulas[i][j].vecinasVivas >= 2 && celulas[i][j].vecinasVivas <= 3) {
                        celulas[i][j].vivo = true;
                        c1.fillStyle="#FE0000";
                        c1.fillRect(10*i,10*j,10,10);
                        c1.strokeRect(10*i,10*j,10,10);
                    }
                } else {
                    if (celulas[i][j].vecinasVivas == 3) {
                        celulas[i][j].vivo = true;
                        c1.fillStyle="#FE0000";
                        c1.fillRect(10*i,10*j,10,10);
                        c1.strokeRect(10*i,10*j,10,10);
                    }
                }
            }
        }





    }
    var intervalo;
    //intervalo= window.setInterval(compruebaCelula, 100);

    document.getElementById("play").addEventListener("click", function () {
        intervalo= window.setInterval(play, 100);



    });

    function ceros(){
        for(var i=0;i<80;i++){
            for(var j=0;j<80;j++){
                celulas[i][j].vecinasVivas = 0;
            }
        }

    }
    function play(){
        ceros();
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

        compruebaCelula();
        console.log("funciona");

/*
        for (var i = 0; i < 80; i++) {
            for (var j = 0; j < 80; j++) {
                if(celulas[i][j].vecinasVivas>0) {
                    console.log("Hay " + celulas[i][j].vecinasVivas + " vecinas vivas" + " i=" + i + ", j=" + j);
                }
            }
        }*/
    }

    document.getElementById("stop").addEventListener("click",function parar() {
        window.clearInterval(intervalo);

    });


    /*
    for(var i=0;i<80;i++){
        for(var j=0;j<80;j++){
            compruebaCelula(i,j);
        }
    }
*/


}
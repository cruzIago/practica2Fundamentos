var celulas = [[]];

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
            celulas[i][j].vecinasVivas=0;
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

    function play(){
        for(var i=0;i<80;i++){
            for(var j=0;j<80;j++){
                if(celulas[i][j].vivo){
                    celulas[i+1][j].vecinasVivas+=1;//Derecha
                    celulas[i+1][j-1].vecinasVivas+=1;//Derecha arriba
                    celulas[i][j-1].vecinasVivas+=1; //Arriba
                    celulas[i-1][j-1].vecinasVivas+=1;//Arriba izquierda
                    celulas[i-1][j].vecinasVivas+=1;//Izquierda
                    celulas[i-1][j+1].vecinasVivas+=1;//Izquierda abajo
                    celulas[i][j+1].vecinasVIvas+=1;//Abajo
                    celulas[i+1][j+1].vecinasVivas+=1;//Abajo Derecha
                }
            }
        }

    }

    function compruebaCelula(i, j) {
        if (celulas[i][j].vivo) {
            if (celulas[i][j].vecinasVivas < 2 || celulas[i][j].vecinasVivas > 3) {
                celulas[i][j].vivo=false;

            } else if (celulas[i][j].vecinasVivas >= 2 && celulas[i][j].vecinasVivas <= 3) {
                celulas[i][j].vivo=true;
            }
        } else {
            if (celulas[i][j].vecinasVivas == 3) {
                celulas[i][j].vivo=true;
            }
        }
    }

    document.getElementById("play").addEventListener("click",function(){
        for(var i=0;i<80;i++){
            for(var j=0;j<80;j++){
                if(celulas[i][j].vivo){
                    console.log("Hay "+celulas[i][j].vecinasVivas);
                    celulas[i+1][j].vecinasVivas+=1;//Derecha
                    celulas[i+1][j-1].vecinasVivas+=1;//Derecha arriba
                    celulas[i][j-1].vecinasVivas+=1; //Arriba
                    celulas[i-1][j-1].vecinasVivas+=1;//Arriba izquierda
                    celulas[i-1][j].vecinasVivas+=1;//Izquierda
                    celulas[i-1][j+1].vecinasVivas+=1;//Izquierda abajo
                    celulas[i][j+1].vecinasVIvas+=1;//Abajo
                    celulas[i+1][j+1].vecinasVivas+=1;//Abajo Derecha
                }

            }
        }

    });

    /*
    for(var i=0;i<80;i++){
        for(var j=0;j<80;j++){
            compruebaCelula(i,j);
        }
    }
*/



}
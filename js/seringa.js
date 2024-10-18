class Seringa {

    constructor(px, py) {

        //offsets para a seringa ficar mais ou menos na mão
        this.offsetX = 55;
        this.offsetY = 10;

        //para depois as colisões
        this.diamX = 100;
        this.diamY = 30;

        this.seringaX = px + this.offsetX;
        this.seringaY = py + this.offsetY;;

        this.maxDist = 25;  // Distância máxima que a seringa pode viajar antes de voltar
        this.distPercorrida = 0;  // Distância percorrida pela seringa
        this.retornando = false;  // Controle para saber se está voltando

        //velocidade da seringa
        this.vel = 2;

        //velocidade de ataque ( velocidade no qual percorre)
        this.velATK = 5;

        //this.img;

        //tipo de seringa
        this.nr = 1;

        // Carrega as imagens todas, para depois não estar sempre a carregar, fazia com que ás vezes desaparece-se a personagem
        this.seringa1 = loadImage("assets/img/Seringas/seringa1.png");
        this.seringa2 = loadImage("assets/img/Seringas/seringa2.png");
        this.seringa3 = loadImage("assets/img/Seringas/seringa3.png");
        this.seringa1V = loadImage("assets/img/Seringas/seringa1V.png");
        this.seringa2V = loadImage("assets/img/Seringas/seringa2V.png");
        this.seringa3V = loadImage("assets/img/Seringas/seringa3V.png");
        this.seringa = this.seringa1;
    }

    // Função para mudar a imagem da seringa
    mudaImagem(nrA) {
        switch (nrA) {
            case 1:
                this.seringa = this.seringa1;
                this.nr = 1;
                break;
            case 2:
                this.seringa = this.seringa2;
                this.nr = 2;
                break;
            case 3:
                this.seringa = this.seringa2;
                this.nr = 3;
                break;
        }
    }

    atacaSeringa() {

        if (!this.retornando) {
            // Movimento de avanço
            if (dir) {
                this.seringaX += this.velATK;
            } else {
                this.seringaX -= this.velATK;
            }
            this.distPercorrida += this.velATK;

            for (let inim of inimigos) {

                if (this.rectRect(this.seringaX, this.seringaY, this.diamX, this.diamY, inim.inimigoX, inim.inimigoY, inim.diamX, inim.diamY)) {

                    if(inim.tipoDoenca == "R" && this.nr == 1){


                        if(!inim.morreu){

                            
                            this.pontuacaoDoença(inim.intervalo);
                            console.log("TOCU DIRE");
                            inim.nivelDoente = 0;
                            inim.inimigo = inim.inimigoGeral;
                            inim.mudarDoenca();
                            

                        }


                    }
                    else if(inim.tipoDoenca == "G" && this.nr == 2){

                        if(!inim.morreu){
                            this.pontuacaoDoença(inim.intervalo);

                        console.log("TOCU DIRE VERDE");
                        inim.nivelDoente = 0;
                        inim.inimigo = inim.inimigoGeral;
                        inim.mudarDoenca();

                        }
                    }

                    else if(inim.tipoDoenca == "P" && this.nr == 3){

                        if(!inim.morreu){
                            this.pontuacaoDoença(inim.intervalo);
                        console.log("TOCU DIRE ROXOOO");
                        inim.nivelDoente = 0;
                        inim.inimigo = inim.inimigoGeral;
                        inim.mudarDoenca();

                        }
                    }
    
    
                   
                }
            }

            // Verifica se atingiu a distância máxima
            if (this.distPercorrida >= this.maxDist) {
                this.retornando = true;
            }
        } else {
            // Movimento de retorno
            if (dir) {
                this.seringaX -= this.velATK;
            } else {
                this.seringaX += this.velATK;
            }
            this.distPercorrida -= this.velATK;

            // Verifica se retornou ao jogador
            if (this.distPercorrida <= 0) {
                this.retornando = false;
                atacando = false;  // Termina o ataque
                
            }
        }
    }

    rectRect(x1, y1, w1, h1, x2, y2, w2, h2) {

        // test for collision
        if (x1 + w1 / 2 >= x2 - w2 / 2 && x1 - w1 / 2 <= x2 + w2 / 2 && y1 + h1 / 2 >= y2 - h2 / 2 && y1 - h1 / 2 <= y2 + h2 / 2) {
            return true;    // if a hit, return true
        }
        else {            // if not, return false
            return false;
        }
    }
   
    moveSeringa(x, y) {
        // Atualiza a posição com base na direção
        if (!dir) {
            this.seringaX = x - this.offsetX;
        } else {
            this.seringaX = x + this.offsetX;
        }
        this.seringaY = y + this.offsetY;
    }


    mudaImagemV() {

        if(!dir){

            switch(this.nr){

                case 1:

                this.seringa = this.seringa1V;

                    break;
                case 2:

                this.seringa = this.seringa2V;

                    break;
                case 3:

                this.seringa = this.seringa3V;

                    break;

            }


        }else{

            switch(this.nr){

                case 1:

                this.seringa = this.seringa1;

                    break;
                case 2:

                this.seringa = this.seringa2;

                    break;
                case 3:

                this.seringa = this.seringa3;

                    break;

            }
        }


    }

    pontuacaoDoença(intervalo){

        
        pontuacao += (Math.round(intervalo)/10);

    }

    
    iniciarSeringa() {

        push();
            imageMode(CENTER);
            this.img = image(this.seringa, this.seringaX , this.seringaY);
            imageMode(CORNER);
        pop();
    }


}

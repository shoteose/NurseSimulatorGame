class Seringa {

    constructor(px, py) {

        //offsets para a seringa ficar mais ou menos na mão
        this.offsetX = 55;
        this.offsetY = 10;

        //para depois as colisões
        this.diam = 100;

        this.seringaX = px + this.offsetX;
        this.seringaY = py + this.offsetY;;

        this.maxDist = 100;  // Distância máxima que a seringa pode viajar antes de voltar
        this.distPercorrida = 0;  // Distância percorrida pela seringa
        this.retornando = false;  // Controle para saber se está voltando

        //velocidade da seringa
        this.vel = 2

        //velocidade de ataque ( velocidade no qual percorre)
        this.velATK = 2

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

    
    iniciarSeringa() {

        push();
            imageMode(CENTER);
            this.img = image(this.seringa, this.seringaX , this.seringaY);
            imageMode(CORNER);
        pop();
    }


}

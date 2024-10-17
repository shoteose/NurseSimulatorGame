class Seringa {

    constructor(px, py) {

        this.offsetX = 55;
        this.offsetY = 10;

        this.diam = 100;


        this.seringaX = px + this.offsetX;
        this.seringaY = py + this.offsetY;;

        this.vel = 2

        this.img;

        this.nr = 1;

        // Carrega a imagem inicial da seringa
        this.seringa = loadImage("assets/img/seringa1.png");
    }

    // Função para mudar a imagem da seringa
    mudaImagem(nrA) {
        switch (nrA) {
            case 1:
                this.seringa = loadImage("assets/img/seringa1.png");
                break;
            case 2:
                this.seringa = loadImage("assets/img/seringa2.png");
                break;
            case 3:
                this.seringa = loadImage("assets/img/seringa3.png");
                break;
        }
    }

/*
    // Função para orientar a seringa em direção ao rato (mouse)
    orientaSeringaMouse() {

        let dx = mouseX - this.seringaX; // Diferença entre o rato e a posição X da seringa
        let dy = mouseY - this.seringaY; // Diferença entre o rato e a posição Y da seringa
        let angulo = atan2(dy, dx); // Calcula o ângulo em radianos

        // Move o ponto de origem para a posição da seringa e gira-a
        translate(this.seringaX, this.seringaY);
//        rotate(angulo);

        // Desenha a seringa na posição correta após rotação
        image(this.seringa, 0, 0); // O ponto de origem está agora na seringa
    }
*/
   
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

            this.seringa = loadImage("assets/img/seringa"+this.nr+"V.png");

        }else{

            this.seringa = loadImage("assets/img/seringa"+this.nr+".png");

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

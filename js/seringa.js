class Seringa {

    constructor(px, py) {
        this.seringaX = px;
        this.seringaY = py;

        this.vel = 2


        // Carrega a imagem inicial da seringa
        this.seringa = loadImage("assets/img/seringa1.png");
    }

    // Função para mudar a imagem da seringa
    mudaImagem(nr) {
        switch (nr) {
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
    moveSeringa(x,y,dirx,diry) {

        this.seringaX = x;
        this.seringaY = y;

        image(this.seringa, this.seringaX, this.seringaY);
        
    }


}

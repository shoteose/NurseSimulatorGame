class Player {

    constructor(px, py) {

        this.playerX = px;
        this.playerY = py;

        this.vel = 1.5;

        this.diamX = 92;
        this.diamY = 104;




        this.playerImg = loadImage("assets/img/Player/player.png");
        this.playerImgT = loadImage("assets/img/Player/playerT.png");
        this.playerImgL = loadImage("assets/img/Player/playerL.png");
        this.playerImgR = loadImage("assets/img/Player/playerR.png");

        this.player = this.playerImg;

    }

    movePlayer() {
        if (atacando) {
            // não te mexas desgraçado
            return;
        }

        if (estado_keyUp) {
            this.mudaImagem("C");
            this.playerY -= this.vel;
        }

        if (estado_keyDown) {
            this.mudaImagem("T");
            this.playerY += this.vel;
        }

        if (estado_keyLeft) {
            this.mudaImagem("L");
            this.playerX -= this.vel;
        }

        if (estado_keyRight) {
            this.mudaImagem("R");
            this.playerX += this.vel;
        }


        // Reflete nas paredes
        this.refleteParedes();


       // this.refleteInimigos();
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

/*
    refleteInimigos() {

        // Verifica colisão com todos os inimigos

        for (let inim of inimigos) {

            if (this.rectRect(this.playerX, this.playerY, this.diamX, this.diamY, inim.inimigoX, inim.inimigoY, inim.diamX, inim.diamY)) {


                if (this.playerX + (this.player.diamX /2) > inim.inimigoX - inim.diamX / 2) {
                    this.playerX = inim.inimigoX - inim.diamX / 2;
                    this.playerVelX = -this.playerVelX;
                }

                
                if (this.playerX < inim.inimigoX + inim.diamX / 2) {
                    this.playerX = inim.inimigoX - inim.diamX / 2;
                    this.playerVelX = -this.playerVelX;
                }

                if (this.playerY > inim.inimigoY + inim.diamY / 2) {
                    this.playerY = inim.inimigoY + inim.diamY / 2;
                    this.playerVelY = -this.playerVelY;
                }

                if (this.playerY < inim.inimigoY - inim.diamY / 2) {
                    this.playerY = inim.inimigoY - inim.diamY / 2;
                    this.playerVelY = -this.playerVelY;
                }
            }
        }
    }
*/

    refleteParedes() {

        if (this.playerX > width - this.player.width / 2 || this.playerX < 0 + this.player.width / 2 || this.playerY > height - this.player.height / 2 || this.playerY < 50 + this.player.height / 2) {

            // -- reflecte nas paredes
            if (this.playerX > width - this.player.width / 2) {
                this.playerX = width - this.player.width / 2;
                this.playerVelX = - this.playerVelX;
            }

            if (this.playerY > height - this.player.height / 2) {
                this.playerY = height - this.player.height / 2;
                this.playerVelY = - this.playerVelY;
            }

            if (this.playerX < 0 + this.player.width / 2) {
                this.playerX = 0 + this.player.width / 2;
                this.playerVelX = - this.playerVelX;
            }

            if (this.playerY < 50 + this.player.height / 2) {
                this.playerY = 50 + this.player.height / 2;
                this.playerVelY = - this.playerVelY;
            }
        }

    }

    eliminaplayer() {

        removeplayer(this);

    }

    mudaImagem(direcao) {

        switch (direcao) {

            case "C":

                this.player = this.playerImg;
                break;

            case "T":

                this.player = this.playerImgT;
                break;

            case "L":
                this.player = this.playerImgL;

                break;

            case "R":

                this.player = this.playerImgR;
                break;

        }


    }

    iniciarPlayer() {


        imageMode(CENTER);
        image(this.player, this.playerX, this.playerY);
        imageMode(CORNER);

    }
}
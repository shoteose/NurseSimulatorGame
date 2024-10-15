class Player {

    constructor(px, py) {

        this.playerX = px;
        this.playerY = py;

        this.vel = 1;



        this.player = loadImage("assets/img/player.png");

    }

    movePlayer() {

        /*
                if(this.playerX > width - this.player.width/2 || this.playerX < 0 + this.player.width/2 || this.playerY > height - this.player.height/2 || this.playerY < 0 + this.player.height/2){
        
                    if (this.playerX > width) {
                        //this.playerX = width - this.diam/2;
                        this.playerVelX = -this.playerVelX;
                        console.log("bateu??");
                    }
            
                    if (this.playerX < 0 ) {
                       // this.playerX = 0 + this.diam/2;
                        this.playerVelX = -this.playerVelX;
                    }
            
                    if (this.playerY > height) {
                      //  this.playerY = height - this.diam/2;
                        this.playerVelY = -this.playerVelY;
                    }
            
                    if (this.playerY < 0 ) {
                      //  this.playerY = 0 + this.diam/2;
                        this.playerVelY = -this.playerVelY;
                    }
        
                }*/

        if (this.playerX > width - this.player.width / 2 || this.playerX < 0 + this.player.width / 2 || this.playerY > height - this.player.height / 2 || this.playerY < 0 + this.player.height / 2) {

            // -- reflecte nas paredes
            if (this.playerX > width - this.player.width / 2) {
                this.playerX = width - this.player.width / 2 ;
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

            if (this.playerY < 0 + this.player.height / 2) {
                this.playerY = 0 + this.player.height / 2;
                this.playerVelY = - this.playerVelY;
            }
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

    }







    eliminaplayer() {

        removeplayer(this);

    }

    mudaImagem(direcao) {

        switch (direcao) {

            case "C":

                this.player = loadImage("assets/img/player.png");
                break;

            case "T":

                this.player = loadImage("assets/img/playerT.png");
                break;

            case "L":
                this.player = loadImage("assets/img/playerL.png");

                break;

            case "R":

                this.player = loadImage("assets/img/playerR.png");
                break;

        }


    }

    iniciarPlayer() {


        imageMode(CENTER);
        image(this.player, this.playerX, this.playerY);
        imageMode(CORNER);

    }
}
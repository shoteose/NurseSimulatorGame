class Player {

    constructor(px, py) {

        this.playerX = px;
        this.playerY = py;

        this.vel = 2;

        this.velX = 0;
        this.velY = 0;

        this.player = loadImage("assets/img/player.png");

    }

    movePlayer() {

        this.velX = 0;
        this.velY = 0;


        if (estado_keyUp) {
            this.mudaImagem("C");
            this.velY = -this.vel;
        }

        if (estado_keyDown) {
            this.mudaImagem("T");
            this.velY = this.vel;
        }

        if (estado_keyLeft) {
            this.mudaImagem("L");
            this.velX = -this.vel;
        }

        if (estado_keyRight) {
            this.mudaImagem("R");
            this.velX = this.vel;
        }

        // -- Verificar se está a andar tanto no eixo x como y
        //if (velX !== 0 && velY !== 0) {

            // Normaliza a velocidade usando o teorema de pitágoras pq a velocidade na diagonal é igual a v*sqrt(2), logo temos que dividir por sqrt(2)

           // velX /= Math.sqrt(2);
           // velY /= Math.sqrt(2);
        //}
        const {x,y} = this.VectorWithNorm(this.vel,this.velX,this.velY);
        this.playerX += x;
        this.playerY += y;
        console.log("player: " + this.playerX + "   sad" +  this.playerY);


        // seringa.moveSeringa(velX,velY);

        if (this.playerX > width - this.player.width / 2 || this.playerX < 0 + this.player.width / 2 || this.playerY > height - this.player.height / 2 || this.playerY < 0 + this.player.height / 2) {

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

            if (this.playerY < 0 + this.player.height / 2) {
                this.playerY = 0 + this.player.height / 2;
                this.playerVelY = - this.playerVelY;
            }
        }

    }

    GetNorma(x,y) {
        let value = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        return value;
    }
    
    VectorWithNorm(norma, px,py) {
    
        var h = this.GetNorma(px,py) / norma;
        var vetorX = px;
        var vetorY = py;
        if (h != 0) {
            vetorX = px / h;
            vetorY = py/h;
        }
    
        return {
            x:vetorX,
            y:vetorY
        };
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
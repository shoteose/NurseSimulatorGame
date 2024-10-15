class Player{

    constructor(px,py){

        this.playerX=px;
        this.playerY=py;

        this.vel= random(20);
        this.dir= random(0,1) * 2 * PI;

        this.playerVelX = this.vel * cos(this.dir);
        this.playerVelY = this.vel * sin (this.dir);

        this.diam = 37;

        this.player = loadImage("assets/player.png");
    }

    moveplayer(){

        this.playerX += this.playerVelX;
        this.playerY += this.playerVelY;
        
        imageMode(CENTER);
        image(this.player,this.playerX,this.playerY);
        imageMode(CORNER);

        if(this.playerX > width - this.diam/2 || this.playerX < 0 + this.diam/2 || this.playerY > height - this.diam/2 || this.playerY < 0 + this.diam/2){

            if (this.playerX > width) {
                //this.playerX = width - this.diam/2;
                this.playerVelX = -this.playerVelX;
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

        }
        

    }

    eliminaplayer(){

        removeplayer(this);

    }


}
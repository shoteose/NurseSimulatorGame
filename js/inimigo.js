class Inimigo{

    constructor(px,py){

        this.inimigoX=px;
        this.inimigoY=py;

        this.vel= 2;
        this.dir= random(0,1) * 2 * PI;

        this.inimigoVelX = this.vel * cos(this.dir);
        this.inimigoVelY = this.vel * sin (this.dir);

        this.diam = 37;

        this.nivelDoente = 0

        this.intervalo = random(5000,10000);
        this.tempo = 0;
        this.inicio= millis();

        this.inimigoGeral = loadImage("assets/img/Inimigos/inimigo.png");
        this.inimigoR2 = loadImage("assets/img/Inimigos/inimigoR2.png");
        this.inimigoR3 = loadImage("assets/img/Inimigos/inimigoR3.png");

        this.inimigo = this.inimigoGeral;
    }

    moveInimigo(){

        this.adoeceu()

        this.inimigoX += this.inimigoVelX;
        this.inimigoY += this.inimigoVelY;
        
        imageMode(CENTER);
        image(this.inimigo,this.inimigoX,this.inimigoY);  // Corrigido para this.inimigo
        imageMode(CORNER);
    
        if (this.inimigoX > width - this.inimigo.width / 2 || this.inimigoX < 0 + this.inimigo.width / 2 || this.inimigoY > height - this.inimigo.height / 2 || this.inimigoY < 100 + this.inimigo.height / 2) {
    
            // -- reflecte nas paredes
            if (this.inimigoX > width - this.inimigo.width / 2) {
                this.inimigoX = width - this.inimigo.width / 2 ;
                this.inimigoVelX = - this.inimigoVelX;
            }
    
            if (this.inimigoY > height - this.inimigo.height / 2) {
                this.inimigoY = height - this.inimigo.height / 2;
                this.inimigoVelY = - this.inimigoVelY;
            }
    
            if (this.inimigoX < 0 + this.inimigo.width / 2) {
                this.inimigoX = 0 + this.inimigo.width / 2;
                this.inimigoVelX = - this.inimigoVelX;
            }
    
            if (this.inimigoY < 100 + this.inimigo.height / 2) {
                this.inimigoY = 100 + this.inimigo.height / 2;
                this.inimigoVelY = - this.inimigoVelY;
            }
        }
    }
    

    adoeceu(){
/*
        console.log("Imagem atual:", this.inimigo);
        console.log("millis():", millis());
        console.log("this.tempo:", this.tempo);
        console.log("this.intervalo:", this.intervalo);
*/
        if(millis() - this.tempo > this.intervalo){

            switch(this.nivelDoente){

                case 0:
                this.inimigo = this.inimigoR2;
                this.tempo = millis();
                console.log(this.nivelDoente);
                this.nivelDoente++;
                    break;
                case 1:
                this.inimigo = this.inimigoR3;
                this.tempo = millis();
                console.log(this.nivelDoente);
                this.nivelDoente++;
                    break;
                case 2:
                    console.log(this.nivelDoente);
                this.eliminaInimigo();
                    break;

            }

        }

    }


    eliminaInimigo(){

        removeInimigo(this);

    }


}
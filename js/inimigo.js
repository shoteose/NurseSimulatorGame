class Inimigo{

    constructor(px,py){

        this.inimigoX=px;
        this.inimigoY=py;

        this.vel= 2;
        this.dir= random(0,1) * 2 * PI;

        this.inimigoVelX = this.vel * cos(this.dir);
        this.inimigoVelY = this.vel * sin (this.dir);

        this.diamX = 95;
        this.diamY = 104;

        this.nivelDoente = 0
        this.tipoDoenca;
        this.morreu = false;
        this.nrRandom = random(0,3);

        if(this.nrRandom<1){
            this.tipoDoenca = "R";
        }

        if(this.nrRandom < 2 && this.nrRandom >1){
            this.tipoDoenca = "G";

        }

        if(this.nrRandom < 3 && this.nrRandom >2){
            this.tipoDoenca = "P";

        }

        this.intervalo = random(5000,10000);
        this.tempo = 0;
        this.inicio= millis();

        this.inimigoGeral = loadImage("assets/img/Inimigos/inimigo.png");
        this.inimigo2 = loadImage("assets/img/Inimigos/inimigo" + this.tipoDoenca + "2.png");
        this.inimigo3 = loadImage("assets/img/Inimigos/inimigo" + this.tipoDoenca + "3.png");
        this.inimigo4 = loadImage("assets/img/Inimigos/inimigo" + this.tipoDoenca + "4.png");

        this.inimigo = this.inimigoGeral;
    }

    moveInimigo(){

        

        this.adoeceu()

        this.inimigoX += this.inimigoVelX;
        this.inimigoY += this.inimigoVelY;
        
        imageMode(CENTER);
        image(this.inimigo,this.inimigoX,this.inimigoY); 
        imageMode(CORNER);

        this.refleteParede();
    
    }
    

    adoeceu(){

        if(millis() - this.tempo > this.intervalo){

            switch(this.nivelDoente){

                case 0:
                this.inimigo = this.inimigo2;
                this.tempo = millis();
                this.nivelDoente++;
                    break;
                case 1:
                this.inimigo = this.inimigo3;
                this.tempo = millis();
                this.nivelDoente++;
                    break;
                case 2:
                    this.inimigo = this.inimigo4;
                   
                    this.morreu=true;

                    this.vel=0;
                    this.dir=0;
                    this.inimigoVelX = 0;
                    this.inimigoVelY = 0;

                    break;

            }

        }

    }


    refleteParede(){

        if (this.inimigoX > width - this.inimigo.width / 2 || this.inimigoX < 0 + this.inimigo.width / 2 || this.inimigoY > height - this.inimigo.height / 2 || this.inimigoY < 50 + this.inimigo.height / 2) {
    
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
    
            if (this.inimigoY < 50 + this.inimigo.height / 2) {
                this.inimigoY = 50 + this.inimigo.height / 2;
                this.inimigoVelY = - this.inimigoVelY;
            }
        }
    

    }

    queDoencaTenho(){

        return this.tipoDoenca;

    }

    mudarDoenca(nova){

        this.tipoDoenca = nova;
        this.inimigo2 = loadImage("assets/img/Inimigos/inimigo" + this.tipoDoenca + "2.png");
        this.inimigo3 = loadImage("assets/img/Inimigos/inimigo" + this.tipoDoenca + "3.png");
        this.inimigo4 = loadImage("assets/img/Inimigos/inimigo" + this.tipoDoenca + "4.png");


    }

    eliminaInimigo(){

        removeInimigo(this);

    }


}
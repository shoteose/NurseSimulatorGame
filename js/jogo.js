
// Saber em que parte do menu está
let menuI = 0;

// saber se já está em jogo ou não
let jogo = false;

let inimigo;

let balas = [];
let inimigos = [];

let nrInimigos = 5;
let nrInimigosT = 5;

// estados para saber se foi clicado ou não para andar a personagem
let estado_keyUp = false;
let estado_keyDown = false;
let estado_keyLeft = false;
let estado_keyRight = false;

// Para asaber a direção para qual está virado ( Esquerda = false // direita = true)
let dir = true;

//Para saber quando está a atacar ou não
let atacando = false;


// preload ao player e á seringa
function preload() {

    carregaMedia();
    player = new Player(windowWidth / 2, windowHeight - 20);
    seringa = new Seringa(player.playerX, player.playerY);


}

function setup() {

    createCanvas(windowWidth - 20, windowHeight - 20);
    frameRate(60);
    smooth();





}

function draw() {

    if (menuI == 0) {

        menuInicial();
    }

    if (menuI == 2) {

        menuComoJogar();

    }

    if (jogo) {

        noCursor();

        background(20, 200, 178);

        seringa.iniciarSeringa();
        player.iniciarPlayer();


        // caso atacar seja verdade, chama a função para atacar
        if (atacando) {

            seringa.atacaSeringa();

        } else {

        // se não está a atacar, a pesonagem pode andar
            detetaKeys();  

        //muda a direção da seringa (imagem)
            seringa.mudaImagemV();

        // a seringa anda sempre com o player
            seringa.moveSeringa(player.playerX,player.playerY);
            player.movePlayer();
        }

        mostraInim();





    }


}

function initInimigos() {
    for (let j = 0; j < nrInimigos; j++) {
        let pInicialX = random(width);
        let pInicialY = random(height);

        inim = new Inimigo(pInicialX, pInicialY);
        inimigos.push(inim);
    }
}


// -- Quando clicado e largado 
function mouseClicked() {

    if (menuI == 0) {

        // Verifica o primeiro retângulo ("Jogar")
        if (mouseX > windowWidth / 2 - 150 && mouseX < windowWidth / 2 + 150) {
            if (mouseY > windowHeight / 2 - 215 && mouseY < windowHeight / 2 - 115) {
                menuI = 1;

                jogo = true;
                initInimigos();

            }
        }

        // Verifica o segundo retângulo ("Como Jogar")
        if (mouseX > windowWidth / 2 - 150 && mouseX < windowWidth / 2 + 150) {
            if (mouseY > windowHeight / 2 - 65 && mouseY < windowHeight / 2 + 35) {
                menuI = 2; // Como Jogar
                console.log("tou a ver 2");
            }
        }
    }
}

function menuInicial() {

    background(175);


    //primeiro "botao" jogar
    fill(0, 255, 0);
    rect(windowWidth / 2 - 150, windowHeight / 2 - 215, 300, 100);

    //segundo "botao" como jogar
    fill(255, 0, 255);
    rect(windowWidth / 2 - 150, windowHeight / 2 - 65, 300, 100);


    textSize(40);
    textAlign(CENTER);

    fill(255);
    text('Jogar', windowWidth / 2, windowHeight / 2 - 150);
    text('Como Jogar', windowWidth / 2, windowHeight / 2);


}

function detetaKeys() {

    if (estado_keyUp) {

        player.movePlayer();

    }

    if (estado_keyDown) {
        player.movePlayer();
    }

    if (estado_keyLeft) {
        player.movePlayer();
    }

    if (estado_keyRight) {
        player.movePlayer();
    }

}

function keyPressed() {



    if(!atacando){



        if (key == "f") {  
            if (!atacando) {
                atacando = true;
                seringa.distPercorrida = 0;  // Reseta a distância percorrida
            }
        }
    
        if(key == "q"){

            seringa.mudaImagem(1);
            seringa
    
        }

        if(key == "e"){

            seringa.mudaImagem(2);
            seringa
    
        }

        if(key == "r"){

            seringa.mudaImagem(3);
            seringa
    
        }
    
        if (key == "w") {
            estado_keyUp = true;
        }
        if (key == "s") {
            estado_keyDown = true;
        }
        if (key == "d") {
            estado_keyRight = true;
            dir = true;
        }
        if (key == "a") {
            estado_keyLeft = true;
            dir = false;
        }
    
        switch (keyCode) {
    
            case UP_ARROW:
                estado_keyUp = true;
                break;
    
            case DOWN_ARROW:
                estado_keyDown = true;
                break;
    
            case LEFT_ARROW:
                estado_keyLeft = true;
                dir = false;
                break;
    
            case RIGHT_ARROW:
                estado_keyRight = true;
                dir = true;
                break;
    
    
        }

    }

    

}

function keyReleased() {

    if (key == "w") {
        estado_keyUp = false;
    }
    if (key == "s") {
        estado_keyDown = false;
    }
    if (key == "d") {
        estado_keyRight = false;
    }
    if (key == "a") {
        estado_keyLeft = false;
    }

    switch (keyCode) {

        case UP_ARROW:
            estado_keyUp = false;
            break;

        case DOWN_ARROW:
            estado_keyDown = false;
            break;

        case LEFT_ARROW:
            estado_keyLeft = false;
            break;

        case RIGHT_ARROW:
            estado_keyRight = false;
            break;
    }

}

function menuComoJogar() {

    background(255, 0, 255)
    textSize(20)
    text('Right Click para voltares para o Menu', windowWidth / 2, 100)
    textSize(30)
    text('blablabla', windowWidth / 2, windowHeight / 2)
    text('2. Move a tua personagem usando as setinhas ou o WASD', windowWidth / 2, windowHeight / 2 + 100)
    text('blablabla', windowWidth / 2, windowHeight / 2 + 150)
    text('balaval', windowWidth / 2, windowHeight / 2 + 200)
    if (mouseButton == RIGHT) {
        menuI = 0
    }

}

function carregaMedia(){
}

function mostraInim() {

    if (inimigos.length > 0) {

        for (let j = 0; j < inimigos.length; j++) {

            inimigos[j].moveInimigo();

            inimigoT = inimigos[j];
        }
    } 



}

function removeInimigo(obj) {
    let index = inimigos.indexOf(obj);

    if (index > -1) {
        inimigos.splice(index, 1);
    }
}
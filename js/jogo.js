
// Saber em que parte do menu está
let menuI = 0;

// saber se já está em jogo ou não
let jogo = false;

let inimigo;

let inimigos = [];

let nrInimigos = 5;

// estados para saber se foi clicado ou não para andar a personagem
let estado_keyUp = false;
let estado_keyDown = false;
let estado_keyLeft = false;
let estado_keyRight = false;

let DeadCounter = 0;

let pontuacao = 0;

// Para asaber a direção para qual está virado ( Esquerda = false // direita = true)
let dir = true;


//Para saber quando está a atacar ou não
let atacando = false;

let gameover = false;


// preload ao player e á seringa
function preload() {

    carregaMedia();
    player = new Player(windowWidth / 2, windowHeight - 20);
    seringa = new Seringa(player.playerX, player.playerY);

    back = loadImage("assets/img/backgroundTeste.png");



}

function setup() {

    createCanvas(windowWidth - 20, windowHeight - 20);
    frameRate(60);
    smooth();





}

function draw() {

    if (menuI == 0) {

        cursor();
        background(20, 200, 178);

        menuInicial();
    }

    if (menuI == 2) {
        cursor();

        background(20, 200, 178);

        menuComoJogar();

    }



    if (jogo) {

        noCursor();


        // image(this.back, 0, 0);
        back.resize(windowWidth - 20, windowHeight - 20);
        image(this.back, 0, 0);

        if (gameover) {

            text("GAME OVER", 500, 500);

            if (mouseButton == RIGHT) {
                menuI = 0
                gameover = false;
                player = new Player(windowWidth / 2, windowHeight - 20);
                seringa = new Seringa(player.playerX, player.playerY);
                pontuacao = 0;
                inimigos = [];
                jogo = false;
            }


        } else {

            DeadCounter = 0;

            for (let inim of inimigos) {

                if (inim.morreu == true) {
                    DeadCounter++;


                    if (DeadCounter == nrInimigos) {

                        gameover = true;

                    }
                }

            }

            textSize(15);
            text("Pontuacao: " + pontuacao, 200, 100);

            mostraInim();
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
                seringa.moveSeringa(player.playerX, player.playerY);
                player.movePlayer();
            }


        }








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

function colide(x1, y1, w1, h1, x2, y2, w2, h2) {

    // test for collision
    if (x1 + w1 / 2 >= x2 - w2 / 2 && x1 - w1 / 2 <= x2 + w2 / 2 && y1 + h1 / 2 >= y2 - h2 / 2 && y1 - h1 / 2 <= y2 + h2 / 2) {
        return true;    // if a hit, return true
    }
    else {            // if not, return false
        return false;
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



    if (!atacando) {



        if (key == "f") {
            if (!atacando) {
                atacando = true;
                seringa.distPercorrida = 0;  // Reseta a distância percorrida
            }
        }

        if (key == "q") {

            seringa.mudaImagem(1);
            // fazer mudar 

        }

        if (key == "e") {

            seringa.mudaImagem(2);


        }

        if (key == "r") {

            seringa.mudaImagem(3);


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

function carregaMedia() {
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
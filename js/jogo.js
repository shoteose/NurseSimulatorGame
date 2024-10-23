
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

let musica;
let somClick;
//Para saber quando está a atacar ou não
let atacando = false;

let gameover = false;

let input;

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
    textFont(fonteTexto);

    input = new p5.AudioIn();
    input.start();

}

function draw() {

    initMusica();

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

            telaGameover();


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

            textSize(30);
            fill(0);
            text("Pontuacao: " + pontuacao.toFixed(0), windowWidth /2, 100);

            mostraInim();
            seringa.iniciarSeringa();
            player.iniciarPlayer();


            let volume = input.getLevel() * 3;
            let threshold = 0.1;


            if (volume > threshold) {

                if (!atacando) {
                    atacando = true;
                    seringa.distPercorrida = 0;  // Reseta a distância percorrida
                }
            }

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

// -- Quando clicado e largado 
function mouseClicked() {

    if (menuI == 0) {

        // Verifica o Jogar
        if (mouseX > windowWidth / 2 - 160 && mouseX < windowWidth / 2 + 160) {
            if (mouseY > windowHeight / 2 - 115  && mouseY < windowHeight / 2 - 15) {
                menuI = 1;
                somClick.play();
                jogo = true;
                initInimigos();

            }
        }

        // Verifica o Como Jogar
        if (mouseX > windowWidth / 2 - 160 && mouseX < windowWidth / 2 + 160) {
            if (mouseY > windowHeight / 2 + 35 && mouseY < windowHeight / 2 + 135) {
                menuI = 2; // Como Jogar
                somClick.play();
                console.log("tou a ver 2");
            }
        }
    }
}

function menuInicial() {

    

    back.resize(windowWidth - 20, windowHeight - 20);
    image(this.back, 0, 0);
    textSize(70);
    text("Nurse Simulator Game", windowWidth/2, 225);
    

    //primeiro "botao" jogar
    //fill(0, 255, 0);
    //rect(windowWidth / 2 - 150, windowHeight / 2 - 215, 300, 100);
    imagemBotao.resize(320,100);
    image(imagemBotao, windowWidth / 2 - 160, windowHeight / 2 - 115);

    //segundo "botao" como jogar
    //fill(255, 0, 255);
    //rect(windowWidth / 2 - 150, windowHeight / 2 - 65, 300, 100);
    image(imagemBotao, windowWidth / 2 - 160, windowHeight / 2 + 35);

    textSize(35);
    textAlign(CENTER);

    fill(255);
    text('Jogar', windowWidth / 2, windowHeight / 2 - 50);
    text('Como Jogar', windowWidth / 2, windowHeight / 2 +100);

    textSize(25);
    text("João Paulo Martins Novo", windowWidth -300, windowHeight - 100);
    text("nº 25968 ECGM - SM ", windowWidth -300, windowHeight - 70);


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

        if(key =="f"){

            atacando = true;
            seringa.distPercorrida = 0;  // Reseta a distância percorrida

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

    back.resize(windowWidth - 20, windowHeight - 20);
    image(this.back, 0, 0);
    imagemInfoSeringa.resize(500,0);
    image(imagemInfoSeringa,(windowWidth / 2 ) - 250 ,275);

    
    textSize(20);
    fill(255);
    text('1. O objetivo do jogo é curares os utentes.', windowWidth / 2, 200);
    text('2. Cada utente mostra a sua doença com cor correspondente e seringa que cura', windowWidth / 2, 250);
    text('3. Consegues atacar fazendo barulho.', windowWidth / 2, windowHeight / 2 + 200);
    text('4. Move a tua personagem usando as setinhas ou o WASD', windowWidth / 2, windowHeight / 2 + 250);
    //fill(0,255,0);
    text('----> Right Click para voltares para o Menu <----', windowWidth / 2, windowHeight / 2 + 310);


    if (mouseButton == RIGHT) {
        somClick.play();
        menuI = 0;
    }

}

function carregaMedia() {

    fonteTexto = loadFont("assets/font/joystix_monospace.otf");
    back = loadImage("assets/img/backgroundTesteFinal.png");
    imagemInfoSeringa = loadImage("assets/img/HUI/escolherSeringasInfo.png");
    imagemBotao = loadImage("assets/img/HUI/botao.png");
    musica = createAudio("assets/sound/A_Bit_Of_Hope_David_Fesliyan.mp3");
    somClick = createAudio("assets/sound/retro-click.mp3");
    

}

function initMusica(){

    musica.volume(0.4);
    musica.autoplay();
    musica.loop();
    
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

function telaGameover(){

    textSize(40);
    fill(255);
    text("GAME OVER", windowWidth/2, 250);
    textSize(30);
    text("Tiveste uma pontuação de " + pontuacao + " !", windowWidth/2, 350);
    text("Faz Right Click para voltar para o menu Principal.", windowWidth/2, 400);

    if (mouseButton == RIGHT) {
        menuI = 0
        gameover = false;
        player = new Player(windowWidth / 2, windowHeight - 20);
        seringa = new Seringa(player.playerX, player.playerY);
        pontuacao = 0;
        inimigos = [];
        jogo = false;
    }

}

function touchStarted() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
    }
}

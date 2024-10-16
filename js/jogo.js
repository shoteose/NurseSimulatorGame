let menuI = 0;
let botaoJogar;
let botaoInfo;

let jogo = false;

let estado_keyUp = false;
let estado_keyDown = false;
let estado_keyLeft = false;
let estado_keyRight = false;

let seringa;

let dirSeringa; // Para armazenar o ângulo da direção

let atacando = false; // Para verificar se a seringa está em ataque
let tempoInicial = 0; // Para guardar o tempo inicial do ataque
let intervaloAtaque = 500; // 500ms de intervalo para o ataque

let pxS, pyS; // Posição atual da seringa
let pxS_inicial, pyS_inicial; // Posição inicial da seringa

var input;



function preload() {

    carregaMedia();
    player = new Player(windowWidth / 2, windowHeight - 20);


}

function setup() {

    createCanvas(windowWidth - 20, windowHeight - 20);
    frameRate(60);
    smooth();

    // -- Criar um Audio input
    input = new p5.AudioIn();
    input.start();


}

function draw() {

    if (menuI === 0) {

        menuInicial();

    } else if (menuI === 2) {

        menuComoJogar();

    }

    if (jogo) {

        noCursor();

        background(20, 200, 178);

        pxS = player.playerX;
        pyS = player.playerY;

        push();
        orientaSeringaMouse();
        pop();

        player.iniciarPlayer();

        detetaKeys();
        player.movePlayer();

        // Só tenta buscar o nível se o input foi inicializado
        if (input) {
            let volume = input.getLevel(); // vai buscar o nivel de volume
            atacaVacina(volume);
        }
    }
}

function atacaVacina(volume) {

    let velocidade = volume * 10; // Multiplica o volume para ajustar a velocidade

    if (!atacando) {
        // Inicia o ataque
        pxS += cos(dirSeringa) * velocidade; // Avança na direção X
        pyS += sin(dirSeringa) * velocidade; // Avança na direção Y
        atacando = true; // Marca como atacando
        tempoInicial = millis(); // Guarda o tempo inicial do ataque
    } else {
        // Verifica se o intervalo de ataque já passou
        if (millis() - tempoInicial > intervaloAtaque) {
            // Volta para a posição original
            pxS = pxS_inicial;
            pyS = pyS_inicial;
            atacando = false; // Reseta o estado de ataque
        }
    }


}

function orientaSeringaMouse() {

    let dx = mouseX - pxS; // Diferença entre o rato e a posição X da seringa
    let dy = mouseY - pyS; // Diferença entre o rato e a posição Y da seringa
    let angulo = atan2(dy, dx); // Calcula o ângulo em radianos

    dirSeringa = angulo;

    // Move o ponto de origem para a posição da seringa e gira-a
    translate(pxS, pyS);
    rotate(angulo);

    // Desenha a seringa na posição correta após rotação

    image(seringa, 0, 0); // O ponto de origem está agora na seringa


}
// -- Quando clicado e largado 
function mouseClicked() {

    if (menuI == 0) {

        // Verifica o primeiro retângulo ("Jogar")
        if (mouseX > windowWidth / 2 - 150 && mouseX < windowWidth / 2 + 150) {
            if (mouseY > windowHeight / 2 - 215 && mouseY < windowHeight / 2 - 115) {
                menuI = 1;

                jogo = true;

            }
        }

        // Verifica o segundo retângulo ("Como Jogar")
        if (mouseX > windowWidth / 2 - 150 && mouseX < windowWidth / 2 + 150) {
            if (mouseY > windowHeight / 2 - 65 && mouseY < windowHeight / 2 + 35) {
                menuI = 2; // Como Jogar

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

        player.movePlayer(estado_keyUp);

    }

    if (estado_keyDown) {
        player.movePlayer(estado_keyDown);
    }

    if (estado_keyLeft) {
        player.movePlayer(estado_keyLeft);
    }

    if (estado_keyRight) {
        player.movePlayer(estado_keyRight);
    }

}

function keyPressed() {

    if (key == "w") {
        estado_keyUp = true;
    }
    if (key == "s") {
        estado_keyDown = true;
    }
    if (key == "d") {
        estado_keyRight = true;
    }
    if (key == "a") {
        estado_keyLeft = true;
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
            break;

        case RIGHT_ARROW:
            estado_keyRight = true;
            break;


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

    seringa = loadImage("assets/img/seringa1.png");

}

function touchStarted() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
    }
}
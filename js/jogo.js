let menuI = 0;
let botaoJogar;
let botaoInfo;


let vX = 5;
let posX = 0;
let vY = 5;
let posY = 0;

let estado_keyUp = false;
let estado_keyDown = false;
let estado_keyLeft = false;
let estado_keyRight = false;



function preload(){




}

function setup(){

    createCanvas(windowWidth,windowHeight);
    frameRate(30);
    smooth();


}

function draw(){

    if(menuI == 0){
     menuInicial();
    }


}

function botoesMenu( bool ){

    if(bool){



    }

}


function mouseClicked() {

if (menuI == 0) {
  if (mouseX < 200 && mouseX > 50) {
    if (mouseY < 125 && mouseY > 50) {
      MENU = 1
    }
    if (mouseY < 275 && mouseY > 200) {
      MENU = 2
    }
    if (mouseY < 425 && mouseY > 350) {
      MENU = 3
    }
  }
}
}

function menuInicial(){

    background(255);
    fill(0, 255, 0);
    rect(windowWidth/2, windowHeight/2 - 100, 200, 75);
    
    fill(255, 0, 255);
    rect(windowWidth/2, windowHeight/2, 200, 75);
    
    fill(255, 0, 0);
    rect(windowWidth/2, windowHeight/2 + 100, 200, 75);
    
    textAlign(CENTER);

    fill(255);
    text('Jogar', windowWidth,  windowHeight/2 - 100);

    text('Como Jogar', windowWidth/2, windowHeight/2);

    text('Sair', windowWidth/2,  windowHeight/2 + 100);

    
    if (MENU == 1) {
    background(0, 255, 0)
    fill(0)
    textSize(20)
    text('Right Click to return to MENU', 525, 30)
    if (mouseButton == RIGHT) {
      MENU = 0
    }
    } // START GAME
    if (MENU == 2) {
    background(255, 0, 255)
    textSize(20)
    text('Right Click to return to MENU', 525, 30)
    textSize(30)
    text('1. Rocks will fall from the top of the screen.', 50, 150)
    text('2. Move your character using arrow keys', 50, 200)
    text('<- and -> to avoid being crushed.', 80, 240)
    text('3. The game is over when a rock hits you.', 50, 290)
    if (mouseButton == RIGHT) {
      MENU = 0
    }
    } // INSTRUCTIONS
    if (MENU == 3) {
    background(255, 0, 0)
    textSize(75)
    text('COME AGAIN SOON!', 25, height / 2)
    }
    
    

}

function detetaKeys() {

    if (estado_keyUp) {
        posY -= vY;
    }

    if (estado_keyDown) {
        posY += vY;
    }

    if (estado_keyLeft) {
        posX -= vX;
    }

    if (estado_keyRight) {
        posX += vX;
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

function iniciarPlayer(){


    
}
/*
Name: Jose Orantes
Rocket Patrol
It took me about 8 hours to do the entire modding.
Mods I chose:

5-point tier
High score tracking
FIRE UI 
copyright free implementation
Speed increase after 30 seconds

10-Point tier
Display time remaining.
Parallax scrolling

15-Point tier
New enemy spaceship (Arwing.png)
Two player mode: Press down key to activate 2nd player and use W to Fire and A and D keys to move
Time increases per collision detected
Mouse controls added: Click and drag the ship and press right click to shoot.


*/ 
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: { debug: false}
    },
    scene: [Menu, Play]
}

let game = new Phaser.Game(config);

//reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT; //Player 1 keys
let keyDOWN, twoPlayer;             //Add Player 2
let keyW, keyA, keyD;              //Player 2

//Additional Variables
let highScore = 0;
let timeRemaining;

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;



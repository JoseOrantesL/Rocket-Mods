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



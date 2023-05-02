class Play extends Phaser.Scene { 
    constructor(){
        super("playScene");
    }

    preload(){
        // load images/tile sprites
        this.load.image("rocket", "./assets/rocket.png");
        this.load.image("spaceship", "./assets/spaceship.png");
        this.load.image("starfield", "./assets/starfield.png");
        this.load.image("crosshair", "./assets/aim.png");
        //load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});

    }


    create(){

        twoPlayer = false;
        this.starfield = this.add.tileSprite(0,0, 640, 480, 'starfield').setOrigin(0, 0);
        //green UI Background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0);

        //white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);


        //add rocket(player1);
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket', 0, 'R1').setOrigin(0.5, 0);
        //Add player cursor
        const cursor = this.add.image(0, 0, 'crosshair').setVisible(false);

        //add spaceships(x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderUISize * 4, 'spaceship', 0, 10).setOrigin(0,0);

        //define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        //Add 2P 
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        //Player 2 Keys
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);


        this.p1Rocket.update();

        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        });

        this.p1Score = 0;
        highScore = highScore;


          // display score
        let scoreConfig1 = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }

          //Display high Score
          let scoreConfigHigh = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreHigh = this.add.text(borderUISize + borderPadding * 12, borderUISize + borderPadding*2, 'High: ' + highScore, scoreConfigHigh);
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, 'P1: ' + this.p1Score, scoreConfig1);

        this.gameOver = false;
        scoreConfig1.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {

            this.add.text(game.config.width/2, game.config.height/2, 'Game Over', scoreConfig1).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for menu', 
            scoreConfig1).setOrigin(0.5)

            this.gameOver = true;
        }, null, this);
        


        /*
        let timer = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 100
        }

        this.timeGame = this.add.text(borderUISize * 7.5, borderUISize + borderPadding*2, game.settings.gameTimer, timer);*/
    }
    
    update(){
        //check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        //go back to menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        if(!this.gameOver){
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }
        this.starfield.tilePositionX -= 4;

        if(Phaser.Input.Keyboard.JustDown(keyDOWN)){
            twoPlayer = true;
            this.p2Score = 0;
            this.p2Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket', 0, 'R2').setOrigin(0.5, 0);
            
            let scoreConfig02 = {
                fontFamily: 'Courier',
                fontSize: '28px',
                backgroundColor: '#F3B141',
                color: '#843605',
                align: 'right',
                padding: {
                top: 5,
                bottom: 5,
                },
                fixedWidth: 100
            }
            this.scoreRight = this.add.text(borderUISize * 15, borderUISize + borderPadding*2, 'P2: ' + this.p2Score, scoreConfig02);
        }
        
        if(twoPlayer && !this.gameOver){

            this.p2Rocket.update();

            if(this.checkCollision(this.p2Rocket, this.ship03)){

                this.p2Rocket.reset();
                this.shipExplode(this.ship03, this.p2Rocket.ID);
    
            } 
            if(this.checkCollision(this.p2Rocket, this.ship02)){
    
                this.p2Rocket.reset();
                this.shipExplode(this.ship02, this.p2Rocket.ID);
            } 
            if(this.checkCollision(this.p2Rocket, this.ship01)){
    
                this.p2Rocket.reset();
                this.shipExplode(this.ship01, this.p2Rocket.ID);
            }
        }



        //Check if any collisions have happened
        if(this.checkCollision(this.p1Rocket, this.ship03)){

            this.p1Rocket.reset();
            this.shipExplode(this.ship03, this.p1Rocket.ID);

        } 
        if(this.checkCollision(this.p1Rocket, this.ship02)){

            this.p1Rocket.reset();
            this.shipExplode(this.ship02, this.p1Rocket.ID);

        } 
        if(this.checkCollision(this.p1Rocket, this.ship01)){

            this.p1Rocket.reset();
            this.shipExplode(this.ship01, this.p1Rocket.ID);

        }
        
        if(this.gameOver && this.p1Score > highScore){

            highScore = this.p1Score;

        }

    }

    checkCollision(rocket, ship){
        //Simple AABB checking (Axis-Aligned Bounding Boxes)
        if(rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.y + rocket.height > ship.y) {

            return true;
            game.settings.gameTimer += 5000;
        } else {
            return false;
        }
    }

    shipExplode(ship, ID){

        //temporarily hide ship
        ship.alpha = 0;
        //create explosion sprite at ship's collision
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
          ship.reset();                         // reset ship position
          ship.alpha = 1;                       // make ship visible again
          boom.destroy();                       // remove explosion sprite
        });
        
        if(ID == 'R1'){

            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score;

        } else if(ID == 'R2'){

            this.p2Score += ship.points;
            this.scoreRight.text = this.p2Score; 

        }

        this.sound.play('sfx_explosion');
    }

}

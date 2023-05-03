class Play extends Phaser.Scene { 
    constructor(){
        
        super("playScene");
    }

    
    timedEvent;
    
    preload(){
        // load images/tile sprites
        this.load.image("rocket", "./assets/rocket.png");
        this.load.image("spaceship", "./assets/spaceship.png");
        this.load.image("starfield", "./assets/starfield.png");
        this.load.image("arwing", "./assets/arwing.png");
        //load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.audio('song', './assets/Song.mp3');

    }


    create(){
        this.input.mouse.disableContextMenu();
        this.timedEvent = this.time.delayedCall(30000, this.onEvent, [], this);
        twoPlayer = false;
        let playSong = this.sound.add('song');
        playSong.play();
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

        this.p1Rocket.setInteractive({
            draggable: true,
            useHandCursor: true
        });

        //Ask about how to create walls or detect wall in order to not lose the player
        this.p1Rocket.on('drag', (pointer, dragX) => {
            this.p1Rocket.x = dragX;
            //Wall check
        });

        //fire button 2 (Right click)   
        this.input.on('pointerdown', function (pointer) {

            if(pointer.rightButtonDown()){

                this.p1Rocket.isFiring = true;
                this.p1Rocket.sfxRocket.play();

            }
        }, this);

        //Timer setup
        let timer = {
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

        //add spaceships(x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 6, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 8, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderUISize * 4, 'spaceship', 0, 10).setOrigin(0,0);
        this.ship04 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'arwing', 0, 100, "Arwing").setOrigin(0,0);
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
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
            top: 5,
            bottom: 5,
            },
            fixedWidth: 0
        }

        this.scoreHigh = this.add.text(borderUISize + borderPadding * 12, borderUISize + borderPadding*2, 'High: ' + highScore, scoreConfig);
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, 'P1: ' + this.p1Score, scoreConfig);
        this.fire = this.add.text(borderUISize + borderPadding * 21, borderUISize + borderPadding*2, 'FIRE', scoreConfig);
        scoreConfig.fixedWidth = 0;

        this.countdown = this.add.text(borderUISize + borderPadding * 30, borderUISize + borderPadding*2, `Time:${game.settings.gameTimer/1000}`, scoreConfig);
        this.clock = this.time.addEvent({delay: 1000, callback:this.timeRemaining, callbackScope: this, loop: true});

    }
    
    update(){

        const pointer = this.input.activePointer;
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
            this.ship04.update();
        }
        
        this.starfield.tilePositionX -= 4;

        if(keyLEFT.isDown){

            this.starfield.tilePositionX -= 2;

        }
        if(keyRIGHT.isDown){

            this.starfield.tilePositionX -= 6;

        }

        if(Phaser.Input.Keyboard.JustDown(keyDOWN)){
            twoPlayer = true;
            this.p2Score = 0;
            this.p2Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket', 0, 'R2').setOrigin(0.5, 0);
            let scoreConfig2 = {
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
            this.scoreRight = this.add.text(borderUISize * 15, borderUISize + borderPadding*2, 'P2: ' + this.p2Score, scoreConfig2);
        }
        
        if(twoPlayer && !this.gameOver){

            this.p2Rocket.update();

            if(this.checkCollision(this.p2Rocket, this.ship04)){

                this.p2Rocket.reset();
                this.shipExplode(this.ship04, this.p2Rocket.ID);
    
            }
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

        //Check if any collisions have happened for player 1
        if(this.checkCollision(this.p1Rocket, this.ship04)){

            this.p1Rocket.reset();
            
            this.shipExplode(this.ship04, this.p1Rocket.ID);

        }
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
        
        if(this.gameOver){

            if(this.p1Score > highScore){
                highScore = this.p1Score;
            }
            

        }

    }

    checkCollision(rocket, ship){
        //Simple AABB checking (Axis-Aligned Bounding Boxes)
        if(rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.y + rocket.height > ship.y) {

            game.settings.gameTimer += 5000;
            return true;
            
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

    onEvent(){
        this.ship01.moveSpeed += 4;
        this.ship02.moveSpeed += 4;
        this.ship03.moveSpeed += 4;
    }

    timeRemaining(){

        game.settings.gameTimer -=1000;
        this.countdown.setText(`Time:${game.settings.gameTimer/1000}`);

        if(game.settings.gameTimer < 0){
            
            this.add.text(game.config.width/2, game.config.height/2, 'Game Over', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for menu', 
            scoreConfig).setOrigin(0.5)
            playSong.stop();
            this.gameOver = true;

        }
    }

}

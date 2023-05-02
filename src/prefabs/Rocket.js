//Rocket Prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, ID){

        super(scene, x, y, texture, frame);

        //add object to existing scene
        this.ID = ID;
        scene.add.existing(this);   //add to existing, displayList, updateList
        this.isFiring = false;      //track rocket's firing status
        this.moveSpeed = 2;         //Pixels per frame

        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update() {
        //left and right movement player 1
        if(this.ID == 'R1' && !this.isFiring){
            if(keyLEFT.isDown && this.x >= borderUISize + this.width) {

                this.x -= this.moveSpeed;

            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){

                this.x += this.moveSpeed;

            } 
        }
        //fire button
        if(Phaser.Input.Keyboard.JustDown(keyF)){

            this.isFiring = true;
            this.sfxRocket.play();
        }
        //if fired move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding){

            this.y -= this.moveSpeed;

        }
        //reset on miss
        if(this.y <= borderUISize * 3 + borderPadding){

            this.reset();   

        }
        //Player 2
        if(this.ID == 'R2' && !this.isFiring){
            if(keyA.isDown && this.x >= borderUISize + this.width) {

                this.x -= this.moveSpeed;

            } else if (keyD.isDown && this.x <= game.config.width - borderUISize - this.width){

                this.x += this.moveSpeed;

            } 
        }
        if(this.ID == 'R2' && Phaser.Input.Keyboard.JustDown(keyW)){

            this.isFiring = true;
            this.sfxRocket.play();
        }
        //if fired move up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding){

            this.y -= this.moveSpeed;

        }
        //reset on miss
        if(this.ID == 'R2' && this.y <= borderUISize * 3 + borderPadding){

            this.reset();   

        }
    }

    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }

}


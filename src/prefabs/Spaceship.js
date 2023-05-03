class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, ID){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);       //Add to existing scene
        this.points = pointValue;       //store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed;             //Pixels per frame
        if(ID == 'Arwing'){
            this.moveSpeed = 9;
        }

    }

    update(){
        
        //move Spaceship to the left
        this.x -= this.moveSpeed;
        //Wrap around from left to right edge
        if(this.x <= 0 - this.width){
            
            this.reset();

        }
    }

    reset(){
        this.x = game.config.width;
    }

    setSpeed(number){
        this.moveSpeed = number;
    }
}
import { Scoreboard } from "./componentes/Scoreboard.js";

export class Game extends Phaser.Scene {

    constructor() {
      super({ key: 'game' });
    }
    
    init() {
      this.scoreboard = new Scoreboard(this);
    }
  
    preload() {
      this.load.image('background', 'img/background.png');
      this.load.image('gameover', 'img/gameover.png');
      this.load.image('platform', 'img/platform.png');
      this.load.image('ball', 'img/ball.png');
    }
  
    create() {
        this.physics.world.setBoundsCollision(true, true, true, false);
    
        this.add.image(410, 250, 'background');
        this.gameoverImage = this.add.image(400, 90, 'gameover');
        this.gameoverImage.visible = false;

        this.scoreboard.create();
        
        this.platform = this.physics.add.image(400, 460, 'platform').setImmovable();
        this.platform.body.allowGravity = false;
        
        this.ball = this.physics.add.image(385, 430, 'ball');
        this.ball.setData('glue', true);
        this.ball.setCollideWorldBounds(true);
      
        this.physics.add.collider(this.ball, this.platform, this.platformImpact, null, this);

        this.ball.setBounce(1);

        this.cursors = this.input.keyboard.createCursorKeys();

      }

      platformImpact(ball, platform) {
        this.scoreboard.incrementPoints(10);
        let relativeImpact = ball.x - platform.x;
        if (relativeImpact < 0.1 && relativeImpact > -0.1) {
          ball.setVelocityX(Phaser.Math.Between(-10, 10))
        } else {
          ball.setVelocityX(10 * relativeImpact);
        }
        
      }
    
      update() {
        if (this.cursors.left.isDown) {
          this.platform.setVelocityX(-500);
          if (this.ball.getData('glue')) {
            this.ball.setVelocityX(-500);
          }
          
        }
        else if (this.cursors.right.isDown) {
          this.platform.setVelocityX(500);
          if (this.ball.getData('glue')) {
            this.ball.setVelocityX(500);
          }
        }
        else {
          this.platform.setVelocityX(0);
          if (this.ball.getData('glue')) {
            this.ball.setVelocityX(0);
          }
        }
    
        if (this.ball.y > 500) {
          console.log('fin');
          this.gameoverImage.visible = true;
          this.scene.pause();
        }

        if (this.cursors.up.isDown) {
          this.ball.setVelocity(-75, -300);
          this.ball.setData('glue', false);
        }
      }
  
  }
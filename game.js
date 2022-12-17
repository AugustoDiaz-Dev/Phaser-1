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
        this.platform.setCollideWorldBounds(true)
        
        this.ball = this.physics.add.image(400, 30, 'ball');
        
        this.ball.setCollideWorldBounds(true);
    
        let velocity = 100 * Phaser.Math.Between(1.3, 2);
        if (Phaser.Math.Between(0, 10) > 5) {
          velocity = 0 - velocity;
        }
        this.ball.setVelocity(velocity, 10);
      
        this.physics.add.collider(this.ball, this.platform, this.platformImpact, null, this);

        this.ball.setBounce(1);

        this.cursors = this.input.keyboard.createCursorKeys();

      }

      platformImpact() {
        this.scoreboard.incrementPoints(1);
      }
    
      update() {
        if (this.cursors.left.isDown) {
          this.platform.setVelocityX(-500);
        }
        else if (this.cursors.right.isDown) {
          this.platform.setVelocityX(500);
        }
        else {
          this.platform.setVelocityX(0);
        }
    
        if (this.ball.y > 500) {
          console.log('fin');
          this.gameoverImage.visible = true;
          this.scene.pause();
        }
      }
  
  }
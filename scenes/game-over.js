import { RestartButton } from '../componentes/restart-button.js'

export class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'gameover' });
        this.RestartButton = new RestartButton(this);
      }

      preload() {
        this.load.image('gameover', 'img/gameover.png');
        this.RestartButton.preload();
      }

      create() {
        this.add.image(410, 250, 'background');
        this.RestartButton.create();
        this.gameoverImage = this.add.image(400, 90, 'gameover');
      }
}
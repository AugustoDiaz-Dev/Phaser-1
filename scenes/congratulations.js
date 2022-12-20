import { RestartButton } from '../componentes/restart-button.js'

export class Congratulations extends Phaser.Scene {
    constructor() {
        super({ key: 'congratulations' });
        this.RestartButton = new RestartButton(this);
      }

      preload() {
        this.load.image('congratulations', 'img/congratulations.png');
        this.RestartButton.preload();
      }

      create() {
        this.add.image(410, 250, 'background');
        this.RestartButton.create();
        this.congratsImage = this.add.image(400, 90, 'congratulations');
      }

}
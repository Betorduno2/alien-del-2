export default class Preload extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  preload() {
    this.load.path = 'assets/';
    this.load.image('logo', 'gsuscode.png');
  }

  create() {
    this.scene.start('Boot');
  }
}
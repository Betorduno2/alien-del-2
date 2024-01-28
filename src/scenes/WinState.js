import Background from "../components/Background";

export default class WinState extends Phaser.Scene {
  constructor() {
    super('WinState');
  }

  create() {
    this.background = new Background(this);

    this.add.text(
      this.game.config.width / 2,
      (this.game.config.height / 2) - 200,
      'Siiii!!',
      {
        fontFamily: 'Arial',
        strokeThickness: 5,
        stroke: '#ffffff',
        fontSize: 80,
        color: '#000000'
      }
    ).setOrigin(0.5);


    const tryAgain = this.add.text(
      this.game.config.width / 2,
      (this.game.config.height / 2) - 80,
      'try again',
      {
        fontFamily: 'Arial',
        strokeThickness: 5,
        stroke: '#ffffff',
        fontSize: 40,
        color: '#000000'
      }
    ).setOrigin(0.5);

    tryAgain.on('pointerdown', () => {
      const mainScene = this.scene.get('Play');
      mainScene.randomSymbol();

      this.scene.start('Play');
      this.scene.start('GUI');
    });

    this.playerContainer = new PlayerContainer(this, this.game.config.width / 2,
      this.game.config.height);

    this.playerContainer.player.setScale(2);
  }
}
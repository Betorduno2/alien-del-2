import Background from "../components/Background";
import PlayerContainer from "../components/Player";
import Play from '../scenes/Play.js';
import GUI from '../scenes/GUI.js';

const frases = [
  'Siuuuuuu!',
  'A seguir\ncagandola',
  'Cagamos!!',
  'A seguir cagandola..\nen tu vida'
];

export default class WinState extends Phaser.Scene {
  constructor() {
    super('WinState');
  }

  create() {
    const rndId = Phaser.Math.Between(0, frases.length - 1);
    const frase = frases[rndId];
    this.scene.add('Play', Play);
    this.scene.add('GUI', GUI);

    this.background = new Background(this);

    const congratulations = this.add.text(
      this.game.config.width / 2,
      150,
      'congratulations!!',
      {
        fontFamily: 'Alien',
        strokeThickness: 10,
        stroke: '#000000',
        fontSize: 40,
        color: '#FFC90E'
      }
    ).setOrigin(0.5);

    this.add.text(
      this.game.config.width / 2,
      (this.game.config.height / 2) - 100,
      frase,
      {
        fontFamily: 'Alien',
        strokeThickness: 5,
        stroke: '#ffffff',
        fontSize: 40,
        color: '#000000'
      }
    ).setOrigin(0.5);

    this.tweens.add({
      targets: congratulations,
      duration: 800,
      ease: 'Linear',
      scale: 1.3,
      yoyo: true,
      repeat: -1
    });

    const tryAgain = this.add.text(
      this.game.config.width / 2,
      (this.game.config.height / 2) + 50,
      'Play again',
      {
        fontFamily: 'Alien',
        strokeThickness: 10,
        stroke: '#000000',
        fontSize: 40,
        color: '#FFC90E'
      }
    ).setOrigin(0.5);

    this.tweens.add({
      targets: tryAgain,
      alpha: 0,
      duration: 800,
      ease: 'Linear',
      yoyo: true,
      repeat: -1
    });

    tryAgain.on('pointerdown', () => {
      this.scene.start('Play');
      this.scene.start('GUI');
    });

    this.playerContainer = new PlayerContainer(this, this.game.config.width / 2,
    this.game.config.height);

    this.playerContainer.animationPause();
    this.playerContainer.player.body.setAllowGravity(false);
    this.playerContainer.player.setScale(2);
    this.playerContainer.animationWin();
  }
}
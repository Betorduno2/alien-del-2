import Background from "../components/Background";
import PlayerContainer from "../components/Player";

const frases = [
  'El pantalon\nnuevo',
  'Pipipi pipipi',
  'que cagada',
  'Nooo dignidad',
  'Y ahora que?',
  'No! pero esto\nno puede ser',
  'Oficialmente\ntoy cagado',
];

export default class FailState extends Phaser.Scene {
    constructor() {
      super('FailState');
    }
  
    create() {
      this.background = new Background(this);
      const rndId = Phaser.Math.Between(0, frases.length - 1);
      const frase = frases[rndId];
      this.add.text(
        this.game.config.width / 2,
        ( this.game.config.height / 2) - 200, 
        frase,
        {
            fontFamily: 'Alien',
            strokeThickness: 5,
            stroke: '#ffffff',
            fontSize: 60,
            color: '#000000'
        }
      ).setOrigin(0.5);

      const tryAgain = this.add.text(
        this.game.config.width / 2,
       ( this.game.config.height / 2) - 80, 
        'try again',
        {
            fontFamily: 'Alien',
            strokeThickness: 5,
            stroke: '#ffffff',
            fontSize: 40,
            color: '#000000'
        }
      ).setOrigin(0.5).setInteractive();
      
      
      tryAgain.on('pointerdown', () => {
        const Play = this.scene.get('Play');
        const GUI = this.scene.get('GUI');

        if (Play && GUI) {
          Play.initializeGame();
          GUI.initializeGUI();
          this.scene.start('Play');
          this.scene.start('GUI');
        }
      });

      this.playerContainer = new PlayerContainer(this, this.game.config.width / 2,
      this.game.config.height);
      
      this.playerContainer.animationPause();
      this.playerContainer.player.setScale(2);

      this.tweens.add({
        targets: this.playerContainer.player,
        tint: 0x592a15, // Set the target tint (white, indicating no tint)
        duration: 20000, // Duration of the transition in milliseconds
        onComplete: () => {
            this.playerContainer.player.clearTint(); // Clear the tint to ensure no residual tint is left
        }
      });

      this.playerContainer.animationFail();
    }
}
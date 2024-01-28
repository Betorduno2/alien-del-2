import Background from "../components/Background";
import PlayerContainer from "../components/Player";

export default class Menu extends Phaser.Scene {
    constructor() {
      super('Menu');
    }
  
    create() {
      this.background = new Background(this);
      const mainScene = this.scene.get('Play');
      this.add.text(
        this.game.config.width / 2,
        ( this.game.config.height / 2) - 200, 
        'SHIT ETERNAL',
        {
            fontFamily: 'Alien',
            strokeThickness: 10,
            stroke: '#000000',
            fontSize: 65,
            color: '#FFC90E'
        }
      ).setOrigin(0.5);

      const tryAgain = this.add.text(
        this.game.config.width / 2,
       ( this.game.config.height / 2) - 80, 
        'Start',
        {
            fontFamily: 'Alien',
            strokeThickness: 10,
            stroke: '#000000',
            fontSize: 55,
            color: '#FFC90E'
        }
      ).setOrigin(0.5).setInteractive();

      tryAgain.on('pointerdown', () => {
        this.scene.start('Play');
        this.scene.start('GUI');
      });

      this.playerContainer = new PlayerContainer(this, this.game.config.width / 2,
      this.game.config.height);
      
      this.playerContainer.animationPause();
      this.playerContainer.player.setScale(4);

      this.tweens.add({
        targets: this.playerContainer.player,
        tint: 0x592a15, // Set the target tint (white, indicating no tint)
        duration: 20000, // Duration of the transition in milliseconds
        onComplete: () => {
            // Callback function after the transition is complete
            this.playerContainer.player.clearTint(); // Clear the tint to ensure no residual tint is left
        }
      });

      this.playerContainer.animationFail();
    }
}


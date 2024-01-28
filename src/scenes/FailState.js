import Background from "../components/Background";
import PlayerContainer from "../components/Player";

export default class FailState extends Phaser.Scene {
    constructor() {
      super('FailState');
    }
  
    create() {
      this.background = new Background(this);
      this.add.text(
        this.game.config.width / 2,
        ( this.game.config.height / 2) - 200, 
        'Ohhh no!!',
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
       ( this.game.config.height / 2) - 80, 
        'try again',
        {
            fontFamily: 'Arial',
            strokeThickness: 5,
            stroke: '#ffffff',
            fontSize: 40,
            color: '#000000'
        }
      ).setOrigin(0.5).setInteractive();

      tryAgain.on('pointerdown', () => {
        const mainScene = this.scene.get('Play');
        mainScene.randomSymbol();

        this.scene.start('Play');
        this.scene.start('GUI');
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
            // Callback function after the transition is complete
            sprite.clearTint(); // Clear the tint to ensure no residual tint is left
        }
      });

      this.playerContainer.animationFail();
    }
}
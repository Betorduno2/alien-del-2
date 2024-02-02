import Background from "../components/Background";
import PlayerContainer from "../components/Player";

export default class Menu extends Phaser.Scene {
    constructor() {
      super('Menu');
    }
  
    create() {
      this.background = new Background(this);
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
      
      this.playerContainer.player.body.setAllowGravity(false);
      this.playerContainer.animationPause();
      this.playerContainer.player.setScale(4);
      
      this.playerContainer.animationShit();
    }
}


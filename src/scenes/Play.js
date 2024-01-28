import Doors from "../components/Doors";
import Background from "../components/Background";
import Enemies from "../components/Enemies";
import PlayerContainer from "../components/Player";
import SymbolContainer from "../components/Symbol";
export default class Boot extends Phaser.Scene {
    isDoorStep = false;
    constructor() {
      super('Play');
    }

    create() {
      // Create the soundtrack
      this.backgroundMusic = this.sound.add('soundtrack', { loop: true, volume: 0.4 });
      // Play the soundtrack
      this.backgroundMusic.play();
      this.enemies = new Enemies(this);
      this.playerContainer = new PlayerContainer(this, this.game.config.width / 2,
      this.game.config.height);
      
      this.enemies = new Enemies(this);
      const GUIScene = this.scene.get('GUI');
      this.symbolContainer = new SymbolContainer(this,GUIScene);
      this.background = new Background(this);
      this.eventsMobile();

      this.events.on('change-door-step', () => {
        if (!this.isDoorStep) {
          this.doors = new Doors(this);
          this.playerContainer.animationPause();
          this.isDoorStep = true;
        }
      });

    }
    
    update() {
      this.enemies.update();
      this.playerContainer.checkPlayerByObject(this.enemies);
      this.playerContainer.update();
      this.symbolContainer.update();
      if (!this.isDoorStep) {
        this.background.update();
      }
    }

    eventsMobile() {
      this.input.on('pointerdown', (pointer) => {
        if (pointer.x > this.game.config.width / 2) {
          this.playerContainer.setIsDownMobile('right');
        }

        if (pointer.x < this.game.config.width / 2) {
          this.playerContainer.setIsDownMobile('left');
        }
      });

      this.input.on('pointerup', (pointer) => {
        this.playerContainer.setIsDownMobile('stop');
      });
    }
}
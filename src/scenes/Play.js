import Doors from "../components/Doors";
import Background from "../components/Background";
import Enemies from "../components/Enemies";
import PlayerContainer from "../components/Player";
import SymbolContainer from "../components/Symbol";
export default class Boot extends Phaser.Scene {
    constructor() {
      super('Play');
    }

    create() {
      this.playerContainer = new PlayerContainer(this, this.game.config.width / 2,
      this.game.config.height);
      
      this.enemies = new Enemies(this);
      const GUIScene = this.scene.get('GUI');
      this.symbolContainer = new SymbolContainer(this,GUIScene);
      this.background = new Background(this);
      this.eventsMobile();

      this.events.on('change-door-step', () => {
        this.doors = new Doors(this);
      });
    }
    
    update() {
      this.enemies.update();
      this.playerContainer.checkPlayerByObject(this.enemies);
      this.playerContainer.update();
      this.symbolContainer.update();
      this.background.update();
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
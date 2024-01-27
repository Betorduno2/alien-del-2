import Enemies from "../components/Enemies";
import PlayerContainer from "../components/Player";
export default class Boot extends Phaser.Scene {
    constructor() {
      super('Play');
    }

    create() {
      this.enemies = new Enemies(this);
      this.playerContainer = new PlayerContainer(this, this.game.config.width / 2,
      this.game.config.height);

      this.eventsMobile();
    }
    
    update() {
      this.enemies.update();
      this.playerContainer.checkPlayerByObject(this.enemies);
      this.playerContainer.update();
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
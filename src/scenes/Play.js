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

      this.events.on('damage', () => {
        console.log('daño de enemigo ');
      });
    }
    
    update() {
      this.enemies.update();
      this.playerContainer.checkPlayerByObject(this.enemies);
      this.playerContainer.update();
    }
}
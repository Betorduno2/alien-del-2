import Background from "../components/Background";

export default class WinState extends Phaser.Scene {
    constructor() {
      super('WinState');
    }
  
    create() {
        this.background = new Background(this);

        this.playerContainer = new PlayerContainer(this, this.game.config.width / 2,
        this.game.config.height);
    }
}
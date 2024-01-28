import Background from "../components/Background";
import PlayerContainer from "../components/Player";

export default class FailState extends Phaser.Scene {
    constructor() {
      super('FailState');
    }
  
    create() {
        this.background = new Background(this);

        this.playerContainer = new PlayerContainer(this, this.game.config.width / 2,
        this.game.config.height / 2).setScale(2);

        this.playerContainer.animationFail();
    }
}
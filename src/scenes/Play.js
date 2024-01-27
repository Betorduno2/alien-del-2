import Enemies from "../components/Enemies";

export default class Boot extends Phaser.Scene {
    constructor() {
      super('Play');
    }

    create() {
      this.player = this.physics.add.sprite(
        this.game.config.width / 2,
        this.game.config.height - 50,
        'player'
      ).setOrigin(.5,1);
      this.player.setCollideWorldBounds(true);
      this.player.body.setAllowGravity(false);
      this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
      if (this.cursors.right.isDown) {
          this.player.setVelocityX(200); // Mueve el jugador hacia la derecha
      } else if (this.cursors.left.isDown) {
          this.player.setVelocityX(-200); // Mueve el jugador hacia la izquierda
      } else {
          this.player.setVelocityX(0); // Detén el jugador si no se presiona ninguna tecla de dirección
      }
    }
}
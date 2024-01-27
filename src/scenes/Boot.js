export default class Boot extends Phaser.Scene {
    constructor() {
      super('Boot');
    }

    preload() {
      this.load.path = 'assets/';

      this.load.spritesheet('fullscreen', 'fullscreen.png', { 
        frameWidth: 64, 
        frameHeight: 64 
      });

      this.load.spritesheet('pause', 'pause.png', { 
        frameWidth: 128, 
        frameHeight: 128 
      });

      this.load.spritesheet('sound', 'sound.png', { 
        frameWidth: 128, 
        frameHeight: 128 
      });

      this.load.image('xs-logo', 'xslogo.png');
<<<<<<< HEAD
      this.load.image('xs-logo', 'xslogo.png');

      this.load.image('enemy', 'enemies/enemy.png');
      this.load.image('bigBoss', 'enemies/bigBoss.png');
=======
      this.load.image('player', 'player/player.png');
>>>>>>> 8bcd49b0b64269c14f654d8fa905bcbca1af0656

      let logo = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, 'logo')
      .setAlpha(0);

      const progressBar = this.add.graphics();
      progressBar.x = (this.game.config.width / 2) - 300;
      progressBar.y = (this.game.config.height / 2) - 20;
      
      this.load.on('progress', (value) => {
          logo.setAlpha(value);
          progressBar.clear();
          if (value >= 0.9) {
              progressBar.fillStyle(0xE3D028, 1);
          } else {
              progressBar.fillStyle(0xE3D028, 1);
          }
          progressBar.fillRect(150, 150, 300 * value, 25);
      });

      this.load.on('complete', () => {
        logo.destroy();
        this.scene.start('GUI');
        this.scene.start('Play');
      });
    }
}
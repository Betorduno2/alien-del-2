export default class Boot extends Phaser.Scene {
    constructor() {
      super('Boot');
    }

    preload() {
      this.load.path = 'assets/';
      this.load.image('background', 'backgroundBlocks.png');
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

      this.load.spritesheet('chicharo', 'enemies/chicharo.png', { 
        frameWidth: 130, 
        frameHeight: 130 
      });

      this.load.spritesheet('tarro', 'enemies/tarro.png', { 
        frameWidth: 130, 
        frameHeight: 130 
      });

      this.load.spritesheet('player-win', 'player/baileVictoria.png', { 
        frameWidth: 130, 
        frameHeight: 130 
      });

      this.load.spritesheet('player-fail', 'player/leaducenculito.png', { 
        frameWidth: 130, 
        frameHeight: 130 
      });

      this.load.image('door1', 'doors/door1.png');
      this.load.image('door2', 'doors/door2.png');
      this.load.image('door3', 'doors/door3.png');

      this.load.spritesheet('player_sp', 'player/spritesheetProta.png', {frameWidth:130, frameHeight:130});
      this.load.spritesheet('shit_icon_sp', 'spriteShitIcon.png', {frameWidth:130, frameHeight:130});

      this.load.image('xs-logo', 'xslogo.png');
      this.load.image('enemy', 'enemies/enemy.png');
      this.load.image('bigBoss', 'enemies/bigboss.png');
      this.load.image('player', 'player/player.png');
      this.load.image('symbol', 'symbol.png');
      this.load.image('shit_icon', 'shitIcon.png');
      this.load.audio('farts_00','fart-noises-00.mp3');
      this.load.audio('fart_00','fart_00.mp3');
      this.load.audio('fart_01','fart_01.mp3');
      this.load.audio('fart_sss','fart_sss.mp3');
      this.load.audio('soundtrack','litz_hungarian_rapsody.mp3');

      this.load.image('symbol1', 'symbols/symbol1.png');
      this.load.image('symbol2', 'symbols/symbol2.png');
      this.load.image('symbol3', 'symbols/symbol3.png');

      this.cameras.main.setBackgroundColor('#A05043');

      const progressBar = this.add.graphics();
      progressBar.x = (this.game.config.width / 2) - 300;
      progressBar.y = (this.game.config.height / 2) - 20;
      
      this.load.on('progress', (value) => {
          progressBar.clear();
          if (value >= 0.9) {
              progressBar.fillStyle(0x592a15, 1);
          } else {
              progressBar.fillStyle(0x592a15, 1);
          }
          progressBar.fillRect(150, 150, 300 * value, 25);
      });

      this.load.on('complete', () => {
        this.scene.start('GUI');
        this.scene.start('Play');
      });
    }
}
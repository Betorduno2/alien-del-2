import Background from "../components/Background";
import PlayerContainer from "../components/Player";

const frases = [
  'El pantalon\nnuevo',
  'Pipipi pipipi',
  'que cagada',
  'Nooo mi dignidad',
  'Y ahora que?',
  'No! pero esto\nno puede ser',
  'Oficialmente\ntoy cagado',
];

const animationsKey = [
  "alien-shit",
  "shit-happens",
  "postshit",
  "leaducenculito-sheet"
];

export default class FailState extends Phaser.Scene {
    constructor() {
      super('FailState');
    }
  
    create() {
      this.background = new Background(this);
      const rndId = Phaser.Math.Between(0, frases.length - 1);
      const frase = frases[rndId];

      const Play = this.scene.get('Play');
      const GUI = this.scene.get('GUI');

      this.add.text(
        this.game.config.width / 2,
        ( this.game.config.height / 2) - 200, 
        frase,
        {
            fontFamily: 'Alien',
            strokeThickness: 5,
            stroke: '#ffffff',
            fontSize: 60,
            color: '#000000'
        }
      ).setOrigin(0.5);

      const tryAgain = this.add.text(
        this.game.config.width / 2,
       ( this.game.config.height / 2) - 80, 
        'try again',
        {
            fontFamily: 'Alien',
            strokeThickness: 5,
            stroke: '#ffffff',
            fontSize: 40,
            color: '#000000'
        }
      ).setOrigin(0.5).setInteractive();
      
      tryAgain.on('pointerdown', () => {
        if (Play && GUI) {
          Play.initializeGame();
          GUI.initializeGUI();
          this.scene.switch('Play');
          this.scene.switch('GUI');
        }
      });

      const idxRandom = Phaser.Math.Between(0, animationsKey.length - 1);
      this.initializeAnimations(animationsKey[idxRandom]);
     
    }
  
    initializePlayer() {
      this.playerContainer = new PlayerContainer(this, this.game.config.width / 2,
      this.game.config.height);
      
      this.playerContainer.animationPause();
      this.playerContainer.player.body.setAllowGravity(false);
      this.playerContainer.player.setScale(2);

      this.playerContainer.animationFail();
    }

    initializeAnimations(texture) {
      if (texture != 'leaducenculito-sheet') {
        const sprite = this.add.sprite( this.game.config.width / 2,
        this.game.config.height, texture).setOrigin(.5,1);
        
        let frameConfig;
        switch (texture) {
          case 'alien-shit':
            frameConfig = {
              start: 0,
              end: 5
            };
            break;
          case 'shit-happens':
            frameConfig = {
              start: 0,
              end: 2
            };
            break;
          case 'postshit':
            frameConfig = {
              start: 0,
              end: 2
            };            
            break;
        }

        sprite.setScale(3);

        this.anims.create({
          target: sprite,
          key: texture + '-anim',
          frames: this.anims.generateFrameNames(texture, frameConfig),
          frameRate: 7,
          repeat: -1
        });

        sprite.play(texture + '-anim');
      } else {
        this.initializePlayer();
      }
    }
}
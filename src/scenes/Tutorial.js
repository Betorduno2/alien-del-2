export default class Tutorial extends Phaser.Scene {
    constructor() {
      super('Tutorial');
    }
  
    create() {
        const playScene = this.scene.get('Play');
        const GUIScene = this.scene.get('GUI');

        const spaceKey = this.add.sprite(150, 160, 'spacing', 0)
        .setDepth(100)
        .setScale(1.5)
        .setAlpha(0);
  
        const textSpace = this.add.text(
          150,
          155, 
          'Space',
          {
              fontFamily: 'Alien',
              strokeThickness: 5,
              stroke: '#ffffff',
              fontSize: 20,
              color: '#000000'
          }
        ).setDepth(100)
        .setAlpha(0)
        .setOrigin(0.5);

        const symbolText = this.add.text(
            this.game.config.width / 2,
            this.game.config.height / 2, 
            'The sign show you\nthe bathroom.',
            {
                fontFamily: 'Alien',
                strokeThickness: 5,
                stroke: '#ffffff',
                fontSize: 20,
                color: '#000000'
            }
        ).setDepth(100)
        .setAlpha(0)
        .setOrigin(0.5);
  
        const rightKey = this.add.sprite(
          (this.game.config.width / 2) - 80,
          this.game.config.height - 50,
          'arrows',
          2
        ).setOrigin(1)
        .setScale(1.5)
        .setAlpha(0);
  
        const leftKey = this.add.sprite(
         (this.game.config.width / 2) + 140,
          this.game.config.height - 50,
          'arrows',
          4
        ).setOrigin(1)
        .setScale(1.5)
        .setAlpha(0);
        
        this.anims.create({
          target: spaceKey,
          key: 'space-anim',
          frames: this.anims.generateFrameNames('spacing', {
              start: 0,
              end: 1
          }),
          frameRate: 4,
          repeat: -1
        });
  
        this.anims.create({
          target: rightKey,
          key: 'right-anim',
          frames: this.anims.generateFrameNames('arrows', {
              start: 2,
              end: 3
          }),
          frameRate: 2,
          repeat: -1
        });
  
        this.anims.create({
          target: leftKey,
          key: 'left-anim',
          frames: this.anims.generateFrameNames('arrows', {
              start: 0,
              end: 1
          }),
          frameRate: 2,
          repeat: -1
        });
  
        rightKey.play('right-anim');
        spaceKey.play('space-anim');
        leftKey.play('left-anim');

        const symbolTween = this.tweens.add({
            targets: [playScene.symbolContainer, spaceKey, textSpace],
            scale: 1.5,
            ease: 'Linear',
            duration: 1000,
            yoyo: true,
            paused: true,
            repeat: 1,
            onStart: () => {
                spaceKey.setAlpha(1);
                textSpace.setAlpha(1);
                symbolText.setAlpha(1);
                playScene.symbolContainer.fx.amount = 0;
                playScene.symbolContainer.fx2.amount = 0;
            },
            onComplete: () => {
                spaceKey.setAlpha(0);
                textSpace.setAlpha(0);
                symbolText.setAlpha(0);
                playScene.scene.resume();
                GUIScene.scene.resume();
            }
          });
  
        const spaceTween = this.tweens.add({
          targets: [spaceKey, textSpace, GUIScene.holdShitBar, GUIScene.shitIcon],
          scale: 2,
          ease: 'Linear',
          duration: 1000,
          yoyo: true,
          paused: true,
          repeat: 1,
          onStart: () => {
            spaceKey.setAlpha(1);
            textSpace.setAlpha(1);

            playScene.scene.pause();
            GUIScene.scene.pause();
          },
          onComplete: () => {
            spaceKey.setAlpha(0);
            textSpace.setAlpha(0);

            symbolTween.play();
          }
        });
        
  
        this.tweens.add({
          targets: [rightKey, leftKey, playScene.playerContainer.player],
          scale: 2,
          ease: 'Linear',
          duration: 1000,
          yoyo: true,
          repeat: 1,
          onStart: () => {
            rightKey.setAlpha(1);
            leftKey.setAlpha(1);

            playScene.scene.pause();
            GUIScene.scene.pause();
          },
          onComplete: () => {
            rightKey.setAlpha(0);
            leftKey.setAlpha(0);
            
            playScene.scene.resume();
            GUIScene.scene.resume();
            this.time.addEvent({ 
                delay: 3000, 
                callback:() => {
                    spaceTween.play();
                }
            });
          }
        });
    }
}
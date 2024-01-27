export default class GUI extends Phaser.Scene {
    constructor() {
      super('GUI');
    }

    create() {
        this.initializeSoundButton();
        this.initializeFullscreenButton();
        this.initializePauseButton();
    }

    initializeSoundButton() {
        this.soundButton = this.add.image(
        this.game.config.width - 135, 45, 'sound', 1)
        .setOrigin(0.5)
        .setScale(0.6)
        .setInteractive();
        
        const mainScene = this.scene.get('Play');
        this.soundButton.on('pointerdown', () => {
            if (this.soundButton.frame.name === 1) {
                mainScene.sound.mute = true;
                this.soundButton.setFrame(0);
            } else {
                mainScene.sound.mute = false;
                this.soundButton.setFrame(1);
            }
        });
    }

    initializeFullscreenButton() {
        if (!this.sys.game.device.os.opera) {
            this.fullscreenButton = this.add.image(this.game.config.width - 16, 16, 'fullscreen', 0).setOrigin(1, 0).setInteractive();
            this.fullscreenButton.on('pointerdown', () => {
                if (this.scale.isFullscreen) {
                  this.fullscreenButton.setFrame(0);
                  this.scale.stopFullscreen();
                } else {
                  this.fullscreenButton.setFrame(1);
                  this.scale.startFullscreen();
                }
      
            });
        }
    }

    initializePauseButton() {
        const pauseButton = this.add.image(
            this.game.config.width - 235, 45, 
            'pause', 
            1
        ).setOrigin(0.5)
        .setScale(0.6)
        .setInteractive();
        
        const mainScene = this.scene.get('Play');
    
        pauseButton.on('pointerdown', () => {
            if (pauseButton.frame.name === 1) {
                mainScene.sound.mute = true;
                mainScene.scene.pause();
                pauseButton.setFrame(0);
            } else {
                mainScene.sound.mute = false;
                mainScene.scene.resume();
                pauseButton.setFrame(1);
            }
        });
    }

    update() {
        if (this.fullscreenButton) {
            if (this.scale.isFullscreen) {
              this.fullscreenButton.setFrame(1);
            } else {
              this.fullscreenButton.setFrame(0);
            }
        }

        if (this.soundButton) {
            if (this.sound.mute) {
                this.soundButton.setFrame(0);
            } else {
                this.soundButton.setFrame(1);
            }
        }
    }
}
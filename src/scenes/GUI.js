export default class GUI extends Phaser.Scene {
    constructor() {
      super('GUI');
      this.holdShit = 100; // Initial value
      this.decreaseRate = 2; // Amount to decrease per second
      this.lastKeyPressTime = 0;
      this.keyInterval = 20;
      this.holdShitBar;
      this.spaceKey;
    }

    create() {
        this.initializeSoundButton();
        this.initializeFullscreenButton();
        this.initializePauseButton();
        this.holdShitBar = this.initializeLifeBar();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
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

    initializeLifeBar() {
        let healthBar=this.makeBar(16,25,0x592a15);
        this.setBarValue(healthBar,100);

        const PlayScene = this.scene.get('Play');
        PlayScene.events.on('damage', () => {
            this.holdShit -= 20;
        });

        return healthBar;
    }
    makeBar(x, y,color) {
        //draw the bar
        let bar = this.add.graphics();

        //color the bar
        bar.fillStyle(color, 1);

        //fill the bar with a rectangle
        bar.fillRect(0, 0, 200, 50);
        
        //position the bar
        bar.x = x;
        bar.y = y;

        //return the bar
        return bar;
    }
    setBarValue(bar,percentage) {
        //scale the bar
        bar.scaleX = percentage/100;
    }

    update(time, delta) {
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

        // Update the value based on the elapsed time
        if (!this.scene.isPaused('Play')) {
            this.holdShit -= this.decreaseRate * (delta / 1000); // Convert delta to seconds
            this.setBarValue(this.holdShitBar,this.holdShit);
            if (this.spaceKey.isDown) {
                // Check if enough time has passed since the last key press
                if (time - this.lastKeyPressTime > this.keyInterval) {
                        if(this.holdShit<100){
                            this.holdShit++;
                        }
    
                        this.setBarValue(this.holdShitBar,this.holdShit);
                        this.lastKeyPressTime = time;
                }
            }
            this.lastKeyPressTime = time;
        }
        // Check if the value has reached a minimum threshold
        if (this.holdShit < 0) {
            this.holdShit = 0;
            console.log("shit happens");
        }
    }
}
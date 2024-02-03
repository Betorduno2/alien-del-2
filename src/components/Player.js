const frases = [
    'Ay mi c*lo',
    'Ay me cago',
    'Quiten!!',
    'un baño!',
    'Uy gonorrea!',
    'jueputa'
];

export default class PlayerContainer extends Phaser.GameObjects.Container {
    isDownLeftMobile = false;
    isDownRightMobile = false;
    isUpMobile = false;
    constructor(scene, x, y) {
        super(scene, x, y);
        this.scene = scene;
        this.initializePlayer();
        this.initializeBubble();
        this.initializeTimerDialog(true);
        this.cursors = this.scene.input.keyboard.createCursorKeys();
       
        // Agrega el contenedor al escenario
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        // this.body.setAllowGravity(false);
        const newWidth = 50;
        const newHeight = 100;

        this.body.setSize(newWidth, newHeight);
        this.body.setOffset(-newWidth / 2, -newHeight);
    }

    initializePlayer() {
        // Agrega el jugador al contenedor
        this.player = this.scene.physics.add.sprite(0, 0, 'player_sp', 0)
        .setOrigin(.5,1);
        this.player.setScale(1.5);
        this.player.setCollideWorldBounds(true);
        this.player.body.setSize(50, 80);
        // this.player.body.setAllowGravity(false);
        this.player.name = 'player_sp';
        this.initializeAnimation();
        this.fartSound = this.scene.sound.add('fart_00');
        this.fartSSound = this.scene.sound.add('fart_sss');
        this.add(this.player);
    }

    initializeAnimation() {
        this.scene.anims.create({
            target: this.player,
            key: 'idle-' + this.player.name,
            frames: this.scene.anims.generateFrameNames(this.player.name, {
                start: 12,
                end: 21
            }),
            frameRate: 15,
            repeat: -1
        });

        this.scene.anims.create({
            target: this.player,
            key: 'start-' + this.player.name,
            frames: this.scene.anims.generateFrameNames(this.player.name, {
                start: 0,
                end: 11
            }),
            frameRate: 15
        });

        this.scene.anims.create({
            target: this.player,
            key: 'gas-' + this.player.name,
            frames: this.scene.anims.generateFrameNames(this.player.name, {
                start: 32,
                end: 44
            }),
            frameRate: 10
        });

        this.scene.anims.create({
            target: this.player,
            key: 'win-' + this.player.name,
            frames: this.scene.anims.generateFrameNames('player-win', {
                start: 0,
                end: 51
            }),
            frameRate: 15,
            repeat: -1
        });

        this.scene.anims.create({
            target: this.player,
            key: 'shit-' + this.player.name,
            frames: this.scene.anims.generateFrameNames('player-shit', {
                start: 0,
                end: 51
            }),
            frameRate: 15,
            repeat: -1
        });


        this.scene.anims.create({
            target: this.player,
            key: 'fail-' + this.player.name,
            frames: this.scene.anims.generateFrameNames('player-fail', {
                start: 0,
                end: 31
            }),
            frameRate: 10,
            repeat: -1
        });

        this.player.play('start-' + this.player.name);

        this.player.on('animationcomplete', (animation) => {
            if (animation.key === 'start-' + this.player.name
            || animation.key === 'gas-' + this.player.name) {
                this.player.play('idle-' + this.player.name);
            }
        });
    }

    initializeBubble() {
        this.bubble = this.scene.add.graphics();
        this.bubble.fillStyle(0xffffff, 1); // Color gris, opacidad 0.7
        this.bubble.fillRoundedRect(40, -130, 210, 50, 10); // Rectángulo redondeado
        this.bubble.setAlpha(0);
        this.add(this.bubble);
        this.initTextDialog();
    }

    initTextDialog() {
        this.textbox = this.scene.add.text(0, 0, '', {
            font: 'bold 26px Arial',
            fill: '#000',
            align: 'center',
            wordWrap: { width: 200, useAdvancedWrap: true } // Ajusta el ancho según el fondo de burbuja
        });

        // Ajusta la posición del texto para centrarlo en la burbuja
        this.textbox.setPosition((this.textbox.width / 4) + 80,( -this.textbox.height * 4));
        
        this.textbox.setAlpha(0);
        // Alinea el cuadro de texto en el centro de la burbuja
        this.textbox.setOrigin(0);
        this.add(this.textbox);

        this.setRndTextDialog();
    }

    initializeTimerDialog() {
        this.timerDialog = this.scene.time.addEvent({ 
            delay: 12000, 
            callback:() => {
                this.setRndTextDialog();
                this.fartSSound.play();
                this.bubble.setAlpha(1);
                this.textbox.setAlpha(1);
                this.scene.time.addEvent({ 
                    delay: 2000, 
                    callback:() => {
                        this.bubble.setAlpha(0);
                        this.textbox.setAlpha(0);
                    }, 
                    callbackScope: this.scene
                });
            }, 
            callbackScope: this.scene, 
            loop: true 
        });
    }

    setRndTextDialog() {
        const rndId = Phaser.Math.Between(0, frases.length - 1);
        const frase = frases[rndId];
        this.textbox.setText(frase);
    }

    setTextCustomDialog(text) {
        this.textbox.setText(text);
        this.scene.tweens.add({
            targets: [this.bubble, this.textbox],
            alpha: 1,
            duration: 1000,
            ease: 'Linear',
            yoyo: true
        });
    }

    moveLeft() {
        this.body.setVelocityX(-400);
    }

    moveRight() {
        this.body.setVelocityX(500);
    }

    gasScape() {
        this.body.setVelocityY(-10);
    }

    stop() {
        this.body.setVelocityX(0);
    }

    checkPlayerByObject(object) {
        this.scene.physics.world.overlap(this.player, object, (player, enemy) => {
            this.player.play('gas-' + this.player.name);
            this.scene.tweens.add({
                targets: [this.player],
                alpha: 0,
                repeat: 2,
                duration: 100,
                yoyo: true,
                onComplete: () => {
                    this.player.setAlpha(1);
                }
            });
            enemy.destroy();
            this.scene.events.emit('damage');
            this.fartSound.setVolume(3);
            this.fartSound.play();
        });
    }

    setIsDownMobile(direction = 'left') {
        if (direction === 'left') {
            this.isDownLeftMobile = true;
        } else if (direction === 'right') {
            this.isDownRightMobile = true;
        } else if (direction === 'stop') {
            this.isUpMobile = true;
        }
    }

    animationPause() {
        this.player.stop();
        this.timerDialog.remove();
    }

    animationResume() {
        this.player.play('idle-' + this.player.name);
    }

    animationWin() {
        this.player.play('win-' + this.player.name);
    }

    animationShit() {
        this.player.play('shit-' + this.player.name);
    }

    animationFail() {
        this.player.play('fail-' + this.player.name);
    }

    update() {
        if (this.cursors.right.isDown) {
            this.moveRight(); // Mueve el jugador hacia la izquierda
        } else if (this.cursors.up.isDown) { // test pedo
            this.gasScape(); // Mueve el jugador hacia la izquierda
        } else if (this.cursors.left.isDown) {
            this.moveLeft(); // Mueve el jugador hacia la derecha
        } else {
            this.stop(); // Detén el jugador si no se presiona ninguna tecla de dirección
        }
    }
}
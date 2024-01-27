const frases = [
    'Ay mi c*lo',
    'Ay me cago',
    'Quiten!!',
    'un baño!'
];

export default class PlayerContainer extends Phaser.GameObjects.Container {
    constructor(scene, x, y) {
        super(scene, x, y);
        this.scene = scene;
        this.initializePlayer();
        this.initializeBubble();
        this.initializeTimerDialog();
        this.cursors = this.scene.input.keyboard.createCursorKeys();
       
        // Agrega el contenedor al escenario
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);
        this.body.setAllowGravity(false);
        const newWidth = this.player.width;
        const newHeight = this.player.height;

        this.body.setSize(newWidth, newHeight);
        this.body.setOffset(-newWidth / 2, -newHeight);
    }

    initializePlayer() {
        // Agrega el jugador al contenedor
        this.player = this.scene.physics.add.sprite(0, 0, 'player').setOrigin(.5,1);
        this.player.setCollideWorldBounds(true);
        this.player.body.setAllowGravity(false);
        this.add(this.player);
    }

    initializeBubble() {
        this.initTextDialog();
        this.bubble = this.scene.add.graphics();
        this.bubble.fillStyle(0x333333, 0.6); // Color gris, opacidad 0.7
        this.bubble.fillRoundedRect(this.textbox.x - 10, this.textbox.y - 10, 200, 50, 10); // Rectángulo redondeado
        this.bubble.setAlpha(0);
        this.add(this.bubble);
    }

    initTextDialog() {
        this.textbox = this.scene.add.text(0, 0, '', {
            fontSize: '30px',
            fill: '#fff',
            align: 'center',
            wordWrap: { width: 200, useAdvancedWrap: true } // Ajusta el ancho según el fondo de burbuja
        });

        // Ajusta la posición del texto para centrarlo en la burbuja
        this.textbox.setPosition((this.textbox.width / 4) + 50,( -this.textbox.height * 4));
        
        this.textbox.setAlpha(0);
        // Alinea el cuadro de texto en el centro de la burbuja
        this.textbox.setOrigin(0);
        this.add(this.textbox);

        this.setRndTextDialog();
    }

    initializeTimerDialog() {
        this.scene.time.addEvent({ 
            delay: 3000, 
            callback:() => {
                this.setRndTextDialog();
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

    moveLeft() {
        this.body.setVelocityX(-300);
    }

    moveRight() {
        this.body.setVelocityX(300);
    }

    gasScape() {
        this.body.setVelocityY(-100);
    }

    stop() {
        this.body.setVelocityY(0);
        this.body.setVelocityX(0);
    }

    checkPlayerByObject(object) {
        this.scene.physics.world.overlap(this.player, object, (enemy) => {
          this.scene.events.emit('damage');
        });
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
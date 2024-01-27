export default class Doors extends Phaser.GameObjects.Group {
    positions = [];
    constructor(scene) {
        super(scene, []);
        this.scene = scene;
        this.gameWidth = this.scene.game.config.width;
        this.gameHeight = this.scene.game.config.height;
        this.scene.add.existing(this);
        this.physicsBodyType = Phaser.Physics.Arcade;
        this.scene.physics.world.enable(this);
        this.initializeDoors();
        this.randomPositions();
    }


    randomPositions() {
        let usedPos = [];
        for (let index = 0; index < 3; index++) {
            let randomPosition;    
            let randomIndex = Phaser.Math.Between(0, this.positions.length - 1);
            do {
                randomIndex = Phaser.Math.Between(0, this.positions.length - 1);
            } while(
                usedPos.indexOf(this.positions[randomIndex]) !== -1
            ); 
            
            usedPos.push(this.positions[randomIndex]);
            randomPosition = this.positions[randomIndex];
            const door = this.getChildren()[index];
            // Configurar la animación
            this.scene.tweens.add({
                targets: door,
                x: randomPosition,
                duration: 800,  // Duración de la animación en milisegundos
                ease: 'Cubic.easeInOut',
                yoyo: true,
                repeat: 3,
                onComplete: () => {
                    console.log('Animación completada');
                }
            });
        }
    }

    initializeDoors() {
        const totalSpacing = this.gameWidth / 3;
        for (let index = 0; index < 3; index++) {
            const x = index * totalSpacing;
            const door = this.scene.physics.add.sprite(x + 100, 128, 'door' + (index + 1)).setOrigin(0.5, 0);
            this.positions.push(x + 100);
            door.body.setAllowGravity(false);
            this.add(door);
        }
    }
}
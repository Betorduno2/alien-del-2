export default class Doors extends Phaser.GameObjects.Group {
    positions = [];
    activeSelection = false;
    constructor(scene, symbolSelected) {
        super(scene, []);
        this.scene = scene;
        this.symbolSelected = symbolSelected;
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
                yoyo: true,
                repeat: 1,
                ease: 'Cubic.easeInOut',
                onComplete: () => {
                    this.activeSelection = true;
                }
            });
        }
    }

    initializeDoors() {
        const totalSpacing = this.gameWidth / 3;
        for (let index = 0; index < 3; index++) {
            const x = index * totalSpacing;
            const container = this.scene.add.container(x + 100, 256);
            const door = this.scene.add.sprite(0, 0, 'door' + (index + 1));
            this.positions.push(x + 100);
            const symbol = this.scene.add.sprite(25, 0, 'symbol' + (index + 1))
            .setScale(1.5);
            container.answer = this.symbolSelected === 'symbol' + (index + 1);

            container.setInteractive();
            
            container.on('pointerdown', () => {
                if (this.activeSelection) {
                    if (container.answer) {
                        console.log('correct');
                    } else {
                        console.log('incorrect');
                    }
                }
            });
            container.add(door);
            container.add(symbol);
            this.add(container);
        }
    }
}
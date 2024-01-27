export default class Doors extends Phaser.GameObjects.Group {
    constructor(scene) {
        super(scene, []);
        this.scene = scene;
        this.gameWidth = this.scene.game.config.width;
        this.gameHeight = this.scene.game.config.height;
        this.scene.add.existing(this);
        this.physicsBodyType = Phaser.Physics.Arcade;
        this.scene.physics.world.enable(this);
        this.initializeDoors();
    }

    initializeDoors() {
        const totalSpacing = this.gameWidth / 3;
        for (let index = 0; index < 3; index++) {
            const x = index * totalSpacing;
            const door = this.scene.physics.add.sprite(x + 100, 128, 'door' + (index + 1)).setOrigin(0.5, 0);
            door.body.setAllowGravity(false);
            this.add(door);
        }
    }
}

export default class Enemies extends Phaser.GameObjects.Group {
    limitY;
    timer;
    delay = 4000;
    constructor(scene) {
        super(scene, []);
        this.scene = scene;
        this.gameWidth = this.scene.game.config.width;
        this.gameHeight = this.scene.game.config.height;
        this.scene.add.existing(this);
        this.physicsBodyType = Phaser.Physics.Arcade;
        this.scene.physics.world.enable(this, 0);
        this.createBullet();
        this.setTimer();
    }

    createBullet() {
        const numRandom = Phaser.Math.Between(1, 4);
        const x = numRandom * 128;
        const enemy = this.scene.physics.add.sprite(x, 0, 'chicharo', 0);
        this.scene.physics.world.enable(enemy);
        this.add(enemy);
        
        enemy.name = 'chicharo';
        this.moveX(enemy, x);
        this.initializeAnimation(enemy);
    }

    moveX(child, x) {
        let finalX = x + 128;
        if (x + 128 > this.gameWidth) {
            finalX = x - 128;
        }

        this.scene.tweens.add({
            targets: child,
            x: finalX,
            duration: 2000,
            ease: 'Linear',
            yoyo: true,
            repeat: -1
        });
    }

    setTimer() {
        setInterval(() => {
            this.createBullet();
        }, this.delay);
    }

    onCompleteAnimation(child) {
        child.on('animationcomplete', (animation) => {
            if (animation.key === 'bullet-enemy-explotion') {
              child.destroy();
            }
        });       
    }

    initializeAnimation(child) {
        this.scene.anims.create({
            target: child,
            key: 'idle-' + child.name,
            frames: this.scene.anims.generateFrameNames(child.name, {
                start: 0,
                end: 15
            }),
            frameRate: 10,
            repeat: -1
        });

        child.play('idle-' + child.name);
    }

    update() {
        this.getChildren().forEach(enemy => {
            if (this.gameHeight && enemy.y >= this.gameHeight) {
                enemy.destroy();
            }
        });
    }
}
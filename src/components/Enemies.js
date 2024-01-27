
export default class Enemies extends Phaser.GameObjects.Group {
    limitY;
    timer;
    delay = 2000;
    enemiesByLevel = 10;
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
        const x = this.getRndX();
        const enemy = this.scene.physics.add.sprite(x, 0, 'chicharo', 0);
        this.scene.physics.world.enable(enemy);
        this.add(enemy);

        enemy.body.setSize(100, 100);
        
        enemy.name = 'chicharo';
        this.moveX(enemy, x);
        this.initializeAnimation(enemy);
    }

    getRndX() {
        const numRandom = Phaser.Math.Between(1, 4);
        return numRandom * 128;
    }

    moveX(child) {
        this.scene.tweens.add({
            targets: child,
            x: this.gameWidth - 64,
            duration: 2000,
            ease: 'Linear',
            yoyo: true,
            repeat: -1
        });
    }

    setTimer() {
        this.timer = setInterval(() => {
            this.enemiesByLevel -=1;
            if (this.enemiesByLevel > 0) {
                if (!this.scene.scene.isPaused('Play')) {
                    this.createBullet();
                }
            } else {
                clearInterval(this.timer);
            }
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
            frameRate: 15,
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

        if (this.getChildren().length === 0) {
            this.scene.events.emit('change-door-step');
        }
    }
}
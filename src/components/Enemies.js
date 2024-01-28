
export default class Enemies extends Phaser.GameObjects.Group {
    limitY;
    timer;
    delay = 800;
    enemiesByLevel = 20;
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
        const numberEnemy = Phaser.Math.Between(0, 1)
        let texture;
        switch (numberEnemy) {
            case 0:
                texture = 'tarro';
                break;
        
            default:
                texture = 'chicharo';
                break;
        }

        let enemy = this.scene.physics.add.sprite(x, 0, texture, 0);
        enemy.name = texture;
        enemy.setScale(1.5);
        enemy.body.setSize(50, 80);
        this.add(enemy);
        this.scene.physics.world.enable(enemy);

        
        
        this.moveX(enemy, x);
        this.initializeAnimation(enemy);
    }

    getRndX() {
        const numRandom = Phaser.Math.Between(1, 4);
        return numRandom * 128;
    }

    moveX(child) {
        const duration = Phaser.Math.Between(this.delay, this.delay + 2000);
        const buffer = 50; // Puedes ajustar el valor del búfer según sea necesario
    
        const newX = Phaser.Math.Between(buffer, this.gameWidth - buffer);
        const newY = Phaser.Math.Between(0, this.gameHeight / 2);
    
        this.scene.tweens.add({
            targets: child,
            x: Math.max(buffer, Math.min(newX, this.gameWidth - buffer)),
            duration: duration,
            ease: 'Linear',
            onComplete: () => {
                this.moveX(child);
            }
        });
    }

    enemyChasePlayer(enemy) {
        const speed = Phaser.Math.Between(100, 200);
        const angle = Phaser.Math.Angle.Between(enemy.x, enemy.y, this.player.x, this.player.y);
        const velocityX = Math.cos(angle) * speed;
        const velocityY = Math.sin(angle) * speed;

        enemy.setVelocity(velocityX, velocityY);
    }

    setTimer() {
        this.timer = this.scene.time.addEvent({ 
            delay: this.delay, 
            callback:() => {
                this.enemiesByLevel -=1;
                if (this.enemiesByLevel > 0) {
                    if (!this.scene.scene.isPaused('Play')) {
                        this.createBullet();
                    }
                } else {
                    this.timer.remove();
                }
            },
            loop: true
        });
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
                end: 17
            }),
            frameRate: 17,
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
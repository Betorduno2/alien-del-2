
export default class Enemies extends Phaser.GameObjects.Group {
    limitY;
    timer;
    delay = 1000;
    constructor(scene) {
        super(scene, [], {
            quantity: 3
        });
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.timer = this.scene.time.addEvent({ delay: this.delay, callback: this.createBullet, callbackScope: this.scene, loop: true });
    }

    createBullets() {
        for (let index = 0; index < this.quantity; index++) {
            this.create(this.randomPositionX(), - 128, 'enemy')
            .setScale(1.5).setDepth(3);
      
            /*this.initializeAnimations(bullet);

            this.onCompleteAnimation(bullet);*/
        }
    }

    onCompleteAnimation(child) {
        child.on('animationcomplete', (animation) => {
            if (animation.key === 'bullet-enemy-explotion') {
              child.destroy();
            }
        });       
    }

    initializeAnimations(child) {
        this.scene.anims.create({
            target: child,
            key: 'bullet-enemy-fire',
            frames: this.scene.anims.generateFrameNames('bullet-enemy', {
                start: 0,
                end: 12
            }),
            frameRate: 10,
            repeat: -1
        });
    
        this.scene.anims.create({
            target: child,
            key: 'bullet-enemy-explotion',
            frames: this.scene.anims.generateFrameNames('bullet-enemy', {
                start: 13,
                end: 42
            }),
            frameRate: 10
        });

        child.play('bullet-enemy-fire');
    }

    randomPositionX (){
        const lastX = this?.scene.game.config.width / 128;
        return Phaser.Math.Between(1, lastX) * 128;
    }

    update() {
        this.getChildren().forEach(enemy => {
            /* if (bullet.anims.currentAnim.key === 'bullet-enemy-fire') {
                bullet.setVelocityY(0);
                bullet.body.setAllowGravity(false);
            } */
        });
    }

    
}
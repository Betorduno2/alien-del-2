export default class Background extends Phaser.GameObjects.GameObject{
    constructor(scene){
        super(scene);
        this.scene = scene;
        this.gameWidth = this.scene.game.config.width;
        this.gameHeight = this.scene.game.config.height;
        this.background = this.scene.add.tileSprite(0, 0, this.gameWidth, this.gameHeight, 'background').setOrigin(0, 0).setDepth(-1);
    }

    update(){
        this.background.tilePositionY -= 1;
    }
}
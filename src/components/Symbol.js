export default class SymbolContainer extends Phaser.GameObjects.Container {
    symbolsTextures = ['symbol1', 'symbol2', 'symbol3'];
    currentTexture = 'symbol1';
    constructor(scene, GUIScene) {
        super(scene);
        this.scene = scene;
        this.GUIScene = GUIScene;
        this.gameWidth = this.scene.game.config.width;
        this.gameHeight = this.scene.game.config.height;
        // Agrega el contenedor al escenario
        this.scene.add.existing(this);
        this.fx;
        this.initializeSymbol();
       
    }

    initializeSymbol() {
        // Agrega el simbolo al contenedor
        this.currentTexture = this.randomTexture();
        this.symbol = this.scene.physics.add.sprite(0, 0, this.currentTexture)
        .setOrigin(0.5,1).setScale(2);
        //this.symbol.setCollideWorldBounds(true);
        this.symbol.body.setSize(25, 25);
        this.symbol.x = 100;
        this.fx = this.symbol.preFX.addPixelate(-1);
        this.add(this.symbol);

    }

    randomTexture() {
        const indexRandom = Phaser.Math.Between(0, this.symbolsTextures.length - 1);
        const selectedTexture = this.symbolsTextures[indexRandom];
        return selectedTexture;
    }

    update() {
        const GUIScene = this.GUIScene;
        this.fx.amount =  100 - GUIScene.holdShit;
        if (this.gameHeight && this.symbol.y >= this.gameHeight) {
            this.symbol.destroy();
        }
    }
}
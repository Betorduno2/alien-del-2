export default class SymbolContainer extends Phaser.GameObjects.Container {
    symbolsTextures = ['symbol1B', 'symbol2B', 'symbol3B'];
    currentTexture = 'symbol1B';
    constructor(scene, GUIScene) {
        super(scene);
        this.scene = scene;
        this.GUIScene = GUIScene;
        this.gameWidth = this.scene.game.config.width;
        this.gameHeight = this.scene.game.config.height;
        // Agrega el contenedor al escenario
        this.scene.add.existing(this);
        this.fx;
        this.x = -100;
        this.initializeSymbol();
       
    }

    initializeSymbol() {
        // Agrega el simbolo al contenedor
        this.currentTexture = this.randomTexture();
        this.toiletBackgroud = this.scene.physics.add.sprite(0, 0, 'sign');
        this.symbol = this.scene.physics.add.sprite(0, 0, this.currentTexture)
        .setOrigin(-2,3).setScale(1);
        this.toiletBackgroud.setOrigin(0.5,1).setScale(1)
        //this.symbol.setCollideWorldBounds(true);
        this.symbol.body.setSize(10, 10);
        this.symbol.body.setSize(25, 25);
        this.symbol.x = 100;
        this.toiletBackgroud.x = 180;
        this.fx = this.symbol.preFX.addPixelate(-1);
        this.fx2 = this.toiletBackgroud.preFX.addPixelate(-1);
        this.add(this.toiletBackgroud);
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
        this.fx2.amount =  100 - GUIScene.holdShit;
        if (this.gameHeight && this.symbol.y >= this.gameHeight) {
            this.destroy();
        }
    }
}
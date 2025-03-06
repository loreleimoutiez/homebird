class StartScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'StartScene'
        });
    }
  
    preload() {
        this.load.spritesheet('startScreen', 'images/sitting.png', {
            frameWidth: 700,
            frameHeight: 700
        });
    }

    create() {

        const style = {
            font: '30px',
            fill: '#000000',
        }

        // Adds in the background image
        this.add.sprite(310, 459, 'startScreen');
        this.add.text(240, 100, '- homebird -', style);
        this.add.text(225, 150, 'click to start', style);
  
        // Transition from StartScene to GameScene on a click
        this.input.on('pointerup', () => {
            this.scene.stop('StartScene');
            this.scene.start('GameScene');
        });
    }
  } // end StartScene 
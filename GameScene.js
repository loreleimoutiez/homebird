const gameState = {};

class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: 'GameScene'
        });
    }

    preload() {

        this.load.image('clouds', 'images/clouds.png')
        this.load.image('house', 'images/house.png');

        this.load.spritesheet('cat', 'images/spriteCat.png', {
            frameWidth: 510,
            frameHeight:510,
            endFrame: 20
        });

        this.load.spritesheet('bird', 'images/spriteBird.png', {
            frameWidth: 510,
            frameHeight: 510,
            endFrame: 4
        });

        this.load.image('platform', 'images/platform.png');
        this.load.image('brown', 'images/brown.png');
        this.load.image('white', 'images/white.png');

        this.load.image('radio', 'images/radio.jpg');
        this.load.image('tree', 'images/tree.jpg');

        this.load.audio('music', 'sounds/music.mp3');
        this.load.audio('scratch', 'sounds/scratch.mp3');
        this.load.audio('meow', 'sounds/meow.mp3');

    } // end preload 

    create() {

        // ABOUT SOUNDS AND INTERACTIONS 

        gameState.radio = this.add.sprite(350, 348, 'radio').setScale(0.12);
        gameState.music = this.sound.add('music');
        gameState.radio.setInteractive();
        gameState.radio.on('pointerup', () => {
            gameState.music.play()
        }); 

        gameState.tree = this.add.sprite(314, 648, 'tree').setScale(0.09);
        gameState.scratch = this.sound.add('scratch');
        gameState.tree.setInteractive();

        gameState.meow = this.sound.add('meow'); 
    
        // ABOUT THE BACKGROUND

        gameState.sky = this.add.image(30, 0, 'clouds').setScale(1.7);
        gameState.sky.setOrigin(0, 0);
        gameState.house = this.add.image(0, 0, 'house').setScale(.228);
        gameState.house.setOrigin(0, 0);

        // ABOUT THE CAT 

        gameState.cat = {
            name: 'cat',
            frames: [{
                key: 'catSittingRight',
                start: 0,
                end: 1
            },
            {
                key: 'catStandingUpRight',
                start: 2,
                end: 3
            },
            {
                key: 'catWalkRight',
                start: 4,
                end: 5
            },
            {
                key: 'catJumpRight',
                start: 6,
                end: 7
            },
            {
                key: 'catScratchingRight',
                start: 8,
                end: 9
            },
            {
                key: 'catWalkLeft',
                start: 14,
                end: 15
            }]
        };
        gameState.cat.sprite = this.physics.add.sprite(130, 630, 'cat').setScale(.12);

        // CAT ANIMATION + INIT 

        gameState.cat.frames.forEach(frame => {
            this.anims.create({
                key: frame.key,
                frames: this.anims.generateFrameNumbers(gameState.cat.name, {
                    start: frame.start,
                    end: frame.end,
                }),
                frameRate: 2,
                repeat: -1,
                yoyo: true
            });
        });
        gameState.cat.sprite.anims.play('catSittingRight');

        //ABOUT THE BIRD

        gameState.bird = {
            name: 'bird',
            frames: [{
                key: 'birdStanding',
                start: 0,
                end: 0
            },
            {
                key: 'birdFly',
                start: 1,
                end: 3
            }]
        };
        gameState.bird.sprite = this.add.sprite(610, 160, 'bird').setScale(.12); 

        // BIRD ANIMATION + INIT 

        gameState.bird.frames.forEach(frame => {
            this.anims.create({
                key: frame.key,
                frames: this.anims.generateFrameNumbers(gameState.bird.name, {
                    start: frame.start,
                    end: frame.end,
                }),
                frameRate: 10,
                repeat: -1,
                yoyo: true
            });
        });

        // this.physics.add.collider(gameState.cat.sprite, gameState.bird.sprite, () => {
        //     gameState.bird.sprite.anims.play('birdFly');
        //     gameState.bird.sprite.y -= 5;
            
        //         // this.scene.stop('GameScene');
        //         // this.scene.start('EndScene');
        //   });

        // ABOUT PRESSED KEYS

        gameState.cursors = this.input.keyboard.createCursorKeys(); 
        
        // ABOUT PHYSICS AND PLATFORMS 

        gameState.cat.sprite.body.collideWorldBounds = true; 
        gameState.cat.sprite.setBounce(0.2); 

        const platforms = this.physics.add.staticGroup();
        this.physics.add.collider(gameState.cat.sprite, platforms); 

        // grounds     ->     x y width height 

        platforms.create(351, 698, 'platform').setScale(6.26, .19).refreshBody(); // ground
        platforms.create(320, 465, 'platform').setScale(5, .19).refreshBody(); // 1st floor / left side 
        platforms.create(688, 465, 'platform').setScale(0.1, .19).refreshBody(); // 1st floor / right side 
        platforms.create(10, 230, 'platform').setScale(0.06, .19).refreshBody(); // 2nd floor / left side 
        platforms.create(383, 230, 'platform').setScale(5.2, .19).refreshBody(); // 2nd floor / right side 

        // on the walls - lvl 0 

        platforms.create(605, 637, 'platform').setScale(0.02, .05).refreshBody(); 
        platforms.create(630, 575, 'platform').setScale(0.02, .05).refreshBody();  
        platforms.create(663, 510, 'platform').setScale(0.02, .05).refreshBody();  
        
        // on the walls - lvl 1

        platforms.create(30, 330, 'platform').setScale(0.2, .19).refreshBody();  
        platforms.create(59, 356, 'platform').setScale(0.2, .19).refreshBody();  
        platforms.create(85, 381, 'platform').setScale(0.2, .19).refreshBody();  
        platforms.create(110, 406, 'platform').setScale(0.2, .19).refreshBody();  
        platforms.create(138, 433, 'platform').setScale(0.2, .19).refreshBody();  

        platforms.create(590, 375, 'platform').setScale(0.1, .19).refreshBody();  
        platforms.create(600, 422, 'platform').setScale(0.1, .19).refreshBody();  

        // others 

        platforms.create(330, 610, 'white').setScale(1.5, .19).refreshBody();  
        platforms.create(310, 550, 'white').setScale(0.8, .19).refreshBody();  
        platforms.create(350, 376, 'white').setScale(2.4, .05).refreshBody();  
        platforms.create(610, 178, 'white').setScale(2.2, .05).refreshBody();  
        platforms.create(290, 184, 'brown').setScale(0.9, .05).refreshBody();  
        platforms.create(410, 153, 'white').setScale(2.3, .05).refreshBody();

    } // end create 

    update() {
        
        if(gameState.cursors.right.isDown) {
            gameState.cat.sprite.anims.play('catWalkRight').setVelocity(50, 0);
        } else if(gameState.cursors.space.isDown) {
            gameState.cat.sprite.anims.play('catJumpRight').setVelocity(0, 0);
            gameState.cat.sprite.y -= 3;
        } else if(gameState.cursors.down.isDown) {
            gameState.cat.sprite.anims.play('catSittingRight').setVelocity(0, 0);
        } else if(gameState.cursors.left.isDown) {
            gameState.cat.sprite.anims.play('catWalkLeft').setVelocity(-50, 0);
        } else if(gameState.cursors.up.isDown) {
            gameState.cat.sprite.anims.play('catScratchingRight').setVelocity(0, 0);
            gameState.scratch.play();
        } 

        this.input.keyboard.on('keydown-M', function() {
            gameState.meow.play()
        });

    } // end update 

} // end GameScene 

// sérieux y'en a qui ont lu jusqu'ici ? 
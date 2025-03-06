const config = {
    type: Phaser.AUTO,
    width: 700,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 200 },
          debug: false,
        }
    },
    scene: [ StartScene, GameScene, EndScene ],
    backgroundColor: "b9eaff"
  };
  
  const game = new Phaser.Game(config); 

  // le jeu n'est clairement pas terminé, il manque les interactions avec l'oiseau (j'essaye de le faire s'envoler si le chat entre en collision avec)
  // ainsi que la scène finale, pour cette V1.

  // merci d'avoir jeté un oeil !
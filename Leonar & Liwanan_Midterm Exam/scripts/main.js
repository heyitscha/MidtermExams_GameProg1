// Imports
import MenuScene from "./scenes/MenuScene.js";
import GameScene from "./scenes/GameScene.js";

// Preload scenes
let menuScene = new MenuScene();
let gameScene = new GameScene();

// Scene

var config = {
    type: Phaser.AUTO,
    parent: 'game-parent',
    width: 800,
    height: 640,
    scale: {  
      autoCenter: Phaser.Scale.CENTER_BOTH  
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 250 },
      }
    }
};

let game = new Phaser.Game(config);

// Load Scenes
game.scene.add('MenuScene', menuScene);
game.scene.add('GameScene', gameScene);

// Start Menu
game.scene.start('MenuScene');


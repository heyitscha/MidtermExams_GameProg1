export default class GameScene extends Phaser.Scene {

    constructor() {
        super('GameScene');
        
    }

init (){
    this.speed = 5;
    this.coins;
    this.coinScore = 0
    this.player;
    this.enemies;
    this.platforms;
    this.width = this.scale.width
    this.height = this.scale.height
    this.camera = this.cameras.main
    this.finishText;
    this.coincollectSound;
    this.gameOverText;
}


preload (){
    //Preloading assets
    this.load.image('sky', './assets/images/sky.png');
    this.load.image('mountain', './assets/images/mountains.png');
    this.load.image('plant', './assets/images/plant.png');
    this.load.image('trees', './assets/images/trees-1.png');
    this.load.image('ground', './assets/images/platform-1.png');
    this.load.image('platform-small', './assets/images/mini-platform.png');
    this.load.image('platform-large', './assets/images/large-platform.png');
    this.load.image('finish', './assets/images/house.png');
    this.load.image('coins', './assets/images/gold.png');
    this.load.audio('coinCollect', './assets/audio/coinCollect.mp3');
    this.load.audio('music', './assets/audio/bgMusic.mp3');
    this.load.image('obstacle', './assets/images/monster.png');
    this.load.image('game-over', './assets/images/gameover.png')
    this.load.image('level', './assets/images/levelup.png')
    this.load.spritesheet('owlet', './assets/images/owlet.png', { frameWidth: 32, frameHeight: 32 });
   
}

create (){
    //Adding assets to the game
    this.coincollectSound = this.sound.add('coinCollect');

    this.add.image(this.width, this.height = 0.5, 'sky')
        .setScrollFactor(0)

    this.add.image(0, 0, 'mountain')
        .setOrigin(0,0)
        .setScrollFactor(0.25)

    this.add.image(0, 0, 'trees')
        .setOrigin(0,0)
        .setScrollFactor(0.5)

    this.add.image(0, 0, 'plant')
        .setOrigin(0,-2.4)

    //Adding enemy sprites
    this.enemies = this.physics.add.sprite(400, 440, 'obstacle');
    this.enemies.setScale(0.7);
    //Background Music
    this.backgroundMusic= this.sound.add('music');
    this.backgroundMusic.play();
    
 
    //Player's properties and physics
    this.player = this.physics.add.sprite(50, 440, 'owlet', 0);
    this.player.setBounce(0.2);
    this.player.setScale(2);
    this.player.setCollideWorldBounds(true);
    //World bounds
    this.physics.world.bounds.width = this.width*5.8;
    //Adding platforms + non-fatal obstacles
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(0,0, 'ground')
        .setOrigin(0,-2.5)
        .refreshBody();
    this.platforms.create(400,350, 'platform-small')
       
    this.platforms.create(800,250, 'platform-large')

    this.platforms.create(1200,360, 'platform-small')

    this.platforms.create(1400,240, 'platform-small')

    this.platforms.create(1650,300, 'platform-large')

    this.platforms.create(1950,220, 'platform-large')

    this.platforms.create(2195,240, 'platform-small')

    this.platforms.create(2450,210, 'platform-small')

    this.platforms.create(2760,300, 'platform-small')

    this.platforms.create(3100,270, 'platform-large')

    this.platforms.create(3500,210, 'platform-large')

    this.platforms.create(3860,300, 'platform-small')

    this.platforms.create(4100,250, 'platform-small')
      
     
    //Arrow keys functionality
    this.cursors = this.input.keyboard.createCursorKeys();

    //Finish Line Sprite
    this.finish = this.physics.add.sprite(4500, 180, 'finish').setScale(3);
    this.finish.setCollideWorldBounds(true);
   
    //Finish Line Text Properties
    this.finishText = this.add.image(405, 150, 'level');
    this.finishText.setVisible(false);
    this.finishText.setScrollFactor(0);

    //Sets bounds
    this.cameras.main.setBounds(0, 0, this.width * 5.8, this.height);
    this.cameras.main.startFollow(this.player); 

    //Collision
    this.physics.add.collider(this.player, this.platforms);
    //this.physics.add.collider(this.player, this.finish);
    this.physics.add.collider(this.finish, this.platforms);
    this.physics.add.collider(this.enemies, this.platforms);
    this.physics.add.collider(this.enemies, this.player, this.hitEnemy, null, this); 
    
    //Player movement animation

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('owlet', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'owlet', frame: 5 } ],
        frameRate: 15
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('owlet', { start: 6, end: 10 }),
        frameRate: 10,
        repeat: -1
    })
    this.coins = this.physics.add.group({
        key: 'coins',
        repeat: 11,
        setXY: { x: 750, y: 0, stepX: 280 }
    });
    //Collectables Functionality
    this.coins.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        
    });
    //Enemies
    this.obstacle = this.physics.add.group({
        collideWorldBounds: true,
        key: 'obstacle',
        repeat: 4,
        setXY: { x: 1200, y: 0, stepX: 550 }
    });
    this.obstacle.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    //Score text
    this.scoreText = this.add.text(10, 16, 'Gold: 0', { fontSize: '35px', fill: '#000' });
    this.scoreText.setVisible(true);
    this.scoreText.setScrollFactor(0);

    //More colliders and overlaps
    this.physics.add.collider(this.coins, this.platforms);
    this.physics.add.collider(this.enemies, this.platforms);
    this.physics.add.collider(this.obstacle, this.platforms);
    this.physics.add.collider(this.obstacle, this.player, this.hitEnemy, null, this); 
    this.physics.add.overlap(this.coins, this.player, this.collectGold, null, this); 
    this.physics.add.overlap(this.player, this.finish, this.finishLine, null, this); 

    //Death Text
    this.gameOverText = this.add.image(405, 150, 'game-over');
    this.gameOverText.setVisible(false);
    this.gameOverText.setScrollFactor(0);

}


update (){


 if (this.cursors.left.isDown)
 {
    this.camera.scrollX -= this.speed
    this.player.setVelocityX(-300);
    this.player.anims.play('left', true);
 } 
 
else if (this.cursors.right.isDown)
 {
    this.camera.scrollX += this.speed
    this.player.setVelocityX(300);
    this.player.anims.play('right', true);
 }
 else
 {
    this.player.setVelocityX(0);
    this.player.anims.play('turn');
 }

 if (this.cursors.up.isDown && this.player.body.touching.down)
 {
    this.player.setVelocityY(-330);  
 }
  //Restart game with spacebar
  this.spaceKey= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  if (this.gameOver==true)
{ 
    this.gameOverText.setVisible(true);
    if (this.spaceKey.isDown)
  {
    this.scene.restart();
    this.gameOver = false;
  }
}
}
//Collectibles 
collectGold (filler, coins)
{  

    coins.disableBody(true, true);
    this.coincollectSound.play();
    //Add and update the score
    this.coinScore += 10;
    this.scoreText.setText('Gold: ' + this.coinScore);
    if (this.coins.countActive(true) === 0)
    {
        //  A new batch of stars to collect
        this.coins.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });
    }
   
} 
//Level Finished
finishLine(player, finish){
    this.physics.pause();
    this.scoreText.setVisible(false);
    this.finishText.setVisible(true);
}
hitEnemy (filler, player)
{
    this.physics.pause();
    this.player.setTint(0xff0000);
    this.player.anims.play('turn');
    this.gameOver = true;

}
}
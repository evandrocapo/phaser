
import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: { y: 200 }
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

new Phaser.Game(config);

const VELOCITY = 200;

let bird = null;
let flapVelocity = 150;
let totalDelta = null;
const initialBirdPosition = {x: config.width * 0.10, y: config.height/2}

function preload () {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
}

function create () {
  this.add.image(0, 0, 'sky').setOrigin(0);
  bird = this.physics.add.sprite(initialBirdPosition.x, initialBirdPosition.y, 'bird').setOrigin(0);

  this.input.on('pointerdown', flap)
}

function update (time, delta) {
  if (bird.y > config.height || bird.y < -bird.height){
    restartPlayerPosition()
  }
}

function restartPlayerPosition () {
  bird.x = initialBirdPosition.x;
  bird.y = initialBirdPosition.y;
  bird.body.velocity.y = 200;
}

function flap (){
  bird.body.velocity.y = -flapVelocity;
}
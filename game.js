const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 400,
  parent: 'game-container',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: {
    preload,
    create,
    update
  }
};

let player, ai, ball;
let playerScore = 0;
let aiScore = 0;
let playerScoreText, aiScoreText;

const game = new Phaser.Game(config);

function preload() {
  this.load.image('paddle', 'https://i.imgur.com/IaUrttj.png');
  this.load.image('ball', 'https://i.imgur.com/WP8dJDp.png');
}

function create() {
  player = this.physics.add.image(300, 380, 'paddle').setImmovable();
  ai = this.physics.add.image(300, 20, 'paddle').setImmovable();
  ball = this.physics.add.image(300, 200, 'ball');
  ball.setCollideWorldBounds(true);
  ball.setBounce(1);
  this.physics.world.setBoundsCollision(true, true, true, true);

  this.physics.add.collider(ball, player);
  this.physics.add.collider(ball, ai);

  this.input.on('pointermove', pointer => {
    player.x = Phaser.Math.Clamp(pointer.x, 50, 550);
  });

  launchBall();

  playerScoreText = document.getElementById("playerScore");
  aiScoreText = document.getElementById("aiScore");
}

function update() {
  if (ball.y < 0) {
    playerScore++;
    playerScoreText.textContent = playerScore;
    resetBall();
  } else if (ball.y > 400) {
    aiScore++;
    aiScoreText.textContent = aiScore;
    resetBall();
  }

  ai.x = Phaser.Math.Clamp(ball.x, 50, 550);
}

function launchBall() {
  const angle = Phaser.Math.Between(-60, 60);
  const speed = 200;
  const radian = Phaser.Math.DegToRad(angle);
  ball.setPosition(300, 200);
  ball.setVelocity(speed * Math.cos(radian), speed * Math.sin(radian));
}

function resetBall() {
  ball.setVelocity(0);
  ball.setPosition(300, 200);
  setTimeout(() => launchBall(), 1000);
}

function restartGame() {
  playerScore = 0;
  aiScore = 0;
  playerScoreText.textContent = playerScore;
  aiScoreText.textContent = aiScore;
  resetBall();
}

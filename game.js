const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let playerScore = 0;
let aiScore = 0;

const paddleWidth = 10, paddleHeight = 80;
let playerY = canvas.height / 2 - paddleHeight / 2;
let aiY = playerY;
const ballSize = 10;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 4, ballSpeedY = 4;

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Player paddle
  ctx.fillRect(0, playerY, paddleWidth, paddleHeight);

  // AI paddle
  ctx.fillRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight);

  // Ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
  ctx.fill();

  // Move ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Bounce off top/bottom
  if (ballY < 0 || ballY > canvas.height) ballSpeedY = -ballSpeedY;

  // Bounce off player paddle
  if (ballX < paddleWidth && ballY > playerY && ballY < playerY + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  }

  // Bounce off AI paddle
  if (ballX > canvas.width - paddleWidth &&
      ballY > aiY && ballY < aiY + paddleHeight) {
    ballSpeedX = -ballSpeedX;
  }

  // Score check
  if (ballX < 0) {
    aiScore++;
    updateScore();
    resetBall();
  } else if (ballX > canvas.width) {
    playerScore++;
    updateScore();
    resetBall();
  }

  // AI movement (simple)
  aiY += (ballY - (aiY + paddleHeight / 2)) * 0.05;
}

function updateScore() {
  document.getElementById('playerScore').textContent = playerScore;
  document.getElementById('aiScore').textContent = aiScore;
}

function resetBall() {
  ballX = canvas.width / 2;
  ballY = canvas.height / 2;
  ballSpeedX = -ballSpeedX;
}

function resetGame() {
  playerScore = 0;
  aiScore = 0;
  updateScore();
  resetBall();
}

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  playerY = e.clientY - rect.top - paddleHeight / 2;
});

setInterval(draw, 1000 / 60);

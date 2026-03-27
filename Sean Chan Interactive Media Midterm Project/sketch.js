
let playerX = 100;
let playerY = 300;
let playerSize = 30;

let velocityY = 0;
let gravity = 0.8;
let jumpForce = -12;

let groundY = 350;

let obstacles = [];

let speed = 5;
let score = 0;
let gameOver = false;

function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(30);

  if (gameOver) {
    showGameOver();
    return;
  }

  
  fill(100);
  rect(0, groundY, width, height - groundY);

  updatePlayer();
  updateObstacles();

  displayScore();
}


function updatePlayer() {
  
  velocityY += gravity;
  playerY += velocityY;

  
  if (playerY + playerSize > groundY) {
    playerY = groundY - playerSize;
    velocityY = 0;
  }

  
  fill(0, 255, 255);
  rect(playerX, playerY, playerSize, playerSize);
}

function keyPressed() {
  
  if (playerY + playerSize == groundY) {
    velocityY = jumpForce;
  }

  
  if (gameOver && key === 'r') {
    restartGame();
  }
}


function updateObstacles() {

  
  if (frameCount % 90 == 0) {
    let obstacle = {
      x: width,
      y: groundY - 40,
      w: 30,
      h: 40
    };

    obstacles.push(obstacle);
  }

  
  for (let i = 0; i < obstacles.length; i++) {

    let obs = obstacles[i];

    obs.x -= speed;

    fill(255, 50, 50);
    rect(obs.x, obs.y, obs.w, obs.h);

    
    if (playerX < obs.x + obs.w &&
        playerX + playerSize > obs.x &&
        playerY < obs.y + obs.h &&
        playerY + playerSize > obs.y) {

      gameOver = true;
    }
  }

  
  if (obstacles.length > 0 &&
      obstacles[0].x < -50) {

    obstacles.shift();
    score++;
  }
}


function displayScore() {
  fill(255);
  textSize(20);
  text("Score: " + score, 10, 25);
}


function showGameOver() {
  fill(255);
  textSize(40);
  textAlign(CENTER);
  text("Game Over", width / 2, height / 2);

  textSize(20);
  text("Press R to Restart",
       width / 2,
       height / 2 + 40);
}


function restartGame() {
  playerY = 300;
  velocityY = 0;

  obstacles = [];

  score = 0;
  gameOver = false;
}
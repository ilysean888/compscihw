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

let gameState = "start";

let angle = 0;
let rotationSpeed = 8;

let nextObstacleTime = 0;

function setup() {
  createCanvas(800, 400);

  nextObstacleTime = frameCount + int(random(60, 140));
}

function draw() {

  background(30);

  if (gameState === "start") {
    showStartScreen();
    return;
  }

  if (gameOver) {
    showGameOver();
    return;
  }

  fill(100);
  rect(0, groundY, width, height - groundY);

  updatePlayer();
  updateObstacles();
  updateCoins();
  
  displayScore();
}

function updatePlayer() {

  velocityY += gravity;
  playerY += velocityY;

  
  if (playerY + playerSize > groundY) {
    playerY = groundY - playerSize;
    velocityY = 0;

    
    angle = 0;
  }


  if (playerY + playerSize < groundY) {
    angle += rotationSpeed;
  }

  push();

  translate(
    playerX + playerSize / 2,
    playerY + playerSize / 2
  );

  rotate(radians(angle));

  fill(0, 255, 255);

  rect(
    -playerSize / 2,
    -playerSize / 2,
    playerSize,
    playerSize
  );

  pop();
}

function keyPressed() {

  if (gameState === "start" && key === ' ') {
    gameState = "play";
    return;
  }

  if (playerY + playerSize == groundY) {
    velocityY = jumpForce;
  }

  if (gameOver && key === 'r') {
    restartGame();
  }
}

function updateObstacles() {

  if (frameCount >= nextObstacleTime) {

    let obstacle = {
      x: width,
      y: groundY - 40,
      w: random(25, 40),
      h: random(30, 50)
    };

    obstacles.push(obstacle);

    nextObstacleTime =
      frameCount + int(random(60, 140));
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
  text("Score: " + score, 40, 25);
}

function showStartScreen() {

  fill(255);

  textAlign(CENTER);

  textSize(40);
  text(
    "Geometry Dash Lite",
    width / 2,
    height / 2 - 40
  );

  textSize(20);
  text(
    "Press SPACE to Start",
    width / 2,
    height / 2
  );

  text(
    "Press SPACE to Jump",
    width / 2,
    height / 2 + 40
  );
}

function showGameOver() {

  fill(255);

  textSize(40);
  textAlign(CENTER);

  text(
    "Game Over",
    width / 2,
    height / 2
  );

  textSize(20);

  text(
    "Press R to Restart",
    width / 2,
    height / 2 + 40
  );
}

function restartGame() {

  playerY = 300;
  velocityY = 0;

  obstacles = [];

  score = 0;
  gameOver = false;

  angle = 0;

  nextObstacleTime =
    frameCount + int(random(60, 140));
}

function displayScore() {

  speed = 5 + score * 0.2;

  fill(255);
  textSize(20);
  text("Score: " + score, 40, 25);

}

let coins = [];
let nextCoinTime = 0;


function updateCoins() {

  if (frameCount >= nextCoinTime) {

    let coin = {
      x: width,
      y: random(groundY - 120, groundY - 40),
      size: 15
    };

    coins.push(coin);

    nextCoinTime =
      frameCount + int(random(120, 200));
  }

  for (let i = 0; i < coins.length; i++) {

    let c = coins[i];

    c.x -= speed;

    fill(255, 215, 0);
    circle(c.x, c.y, c.size);

    if (
      playerX < c.x + c.size &&
      playerX + playerSize > c.x &&
      playerY < c.y + c.size &&
      playerY + playerSize > c.y
    ) {

      score += 5;

      c.x = -100;
    }
  }

  while (
    coins.length > 0 &&
    coins[0].x < -50
  ) {

    coins.shift();
  }

}
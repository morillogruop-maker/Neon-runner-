const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 50, y: 300, w: 30, h: 30, dy: 0, jump: false };
let gravity = 1.2;
let obstacles = [];
let score = 0;
let speed = 4;
let gameOver = false;

document.addEventListener("keydown", e => {
  if (e.code === "Space" && !player.jump) {
    player.dy = -15;
    player.jump = true;
  }
});

function spawnObstacle() {
  obstacles.push({ x: 800, y: 320, w: 30, h: 30 });
}

setInterval(spawnObstacle, 1500);

function update() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Player physics
  player.dy += gravity;
  player.y += player.dy;

  if (player.y >= 300) {
    player.y = 300;
    player.dy = 0;
    player.jump = false;
  }

  // Draw player
  ctx.fillStyle = "#0ff";
  ctx.fillRect(player.x, player.y, player.w, player.h);

  // Obstacles
  for (let i = 0; i < obstacles.length; i++) {
    let o = obstacles[i];
    o.x -= speed;

    ctx.fillStyle = "#f0f";
    ctx.fillRect(o.x, o.y, o.w, o.h);

    // Collision
    if (
      player.x < o.x + o.w &&
      player.x + player.w > o.x &&
      player.y < o.y + o.h &&
      player.y + player.h > o.y
    ) {
      gameOver = true;
      alert("Game Over | Score: " + score);
      location.reload();
    }
  }

  score++;
  speed += 0.0005;

  ctx.fillStyle = "#0f0";
  ctx.fillText("Score: " + score, 10, 20);

  requestAnimationFrame(update);
}

update();

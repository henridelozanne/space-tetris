var g;

var width = [1, 2, 3];
var height = [1, 2];
var color = ["red", "blue", "green", "yellow", "orange", "pink", "cyan"];

window.onload = function() {
  var c = document.getElementById("canvas");
  var ctx = c.getContext("2d");
  var sc = document.getElementById("score");

  g = new Game(ctx);

  document.getElementById("start-game").onclick = function() {
    g.generateNewRandomBlock();
  };

  ctx.strokeStyle = "white";
  ctx.lineWidth = 1;

  for (i = 0; i <= 600; i = i + 60) {
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 600);
    ctx.stroke();
  }

  for (j = 0; j <= 600; j = j + 60) {
    ctx.moveTo(0, j);
    ctx.lineTo(600, j);
    ctx.stroke();
  }
};

window.onkeydown = function(event) {
  switch (event.keyCode) {
    case LEFT_KEY:
      event.preventDefault();
      console.log("left was called");
      Block.prototype.goLeft();
      break;
    case RIGHT_KEY:
      event.preventDefault();
      console.log("right was called");
      Block.prototype.goRight();
      break;
    case SPACE_KEY:
      event.preventDefault();
      console.log("drop was called");
      Block.prototype.dropBlock();
      break;
  }
};

function displayScore() {
  intervalID = setInterval(updateScore, 1000);
}

function updateScore() {
  sc = g.score;
}

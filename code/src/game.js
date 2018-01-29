var Game = function(ctx) {
  this.score = 0;
  this.turn = 1;
  this.currentBlock;
  this.positionedBlocks = [];
  this.newTurn();
  this.colors = ["red", "blue", "green", "yellow", "orange", "pink", "cyan"];
  this.width = 10;
  this.height = 10;
  this.ctx = ctx;
  this.setTimeout;
};

Game.prototype.generateNewRandomBlock = function() {
  // if (!g.gameOver()) {
  // g.setTimer();
  clearTimeout(this.setTimeout);
  this.setTimeout = setTimeout(function() {
    Block.prototype.dropBlock();
  }, 1500);
  document.getElementById("score").innerHTML = g.score;

  var randomWidth = Math.floor(Math.random() * 2) + 1;
  this.currentBlock = new Block(
    this.turn,
    Math.floor(Math.random() * (10 - randomWidth + 1)),
    0,
    randomWidth,
    Math.floor(Math.random() * 3) + 1,
    this.colors[Math.floor(Math.random() * this.colors.length)],
    this.gravity,
    0,
    0
  );
  g.displayInDOM();
  return this.currentBlock;
  // var leTimer = g.setTimeout(g.timer, 1000);
  // g.setTimeout()
};

// Game.prototype.setTimer = function() {
//   var timeleft = 10;
//   var downloadTimer = setInterval(function() {
//     document.getElementById("timer").value = 10 - timeleft;
//     if (timeleft <= 0) clearInterval(downloadTimer);
//     Block.prototype.dropBlock();
//   }, 2000);
// };

Game.prototype.displayInConsole = function() {
  for (var y = 0; y < this.height; y++) {
    var line = "";
    for (var x = 0; x < this.width; x++) {
      if (
        x <= this.currentBlock.x &&
        this.currentBlock.x < x + this.currentBlock.width &&
        this.currentBlock.y <= y &&
        y < this.currentBlock.y + this.currentBlock.height
      ) {
        line += this.currentBlock.color.slice(0, 1);
      } else {
        line += ".";
      }
    }
    console.log(line);
  }
};

Game.prototype.displayInDOM = function() {
  for (var y = 0; y < this.height; y++) {
    for (var x = 0; x < this.width; x++) {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(x * 60 + 1, y * 60 + 1, 60 - 2, 60 - 2);
      if (
        x >= this.currentBlock.x &&
        x < this.currentBlock.x + this.currentBlock.width &&
        this.currentBlock.y <= y &&
        y < this.currentBlock.y + this.currentBlock.height
      ) {
        this.ctx.fillStyle = this.currentBlock.color;
        this.ctx.fillRect(x * 60 + 1, y * 60 + 1, 60 - 2, 60 - 2);
      }
      for (var i = 0; i < g.positionedBlocks.length; i++) {
        if (
          x >= this.positionedBlocks[i].x &&
          x < this.positionedBlocks[i].x + this.positionedBlocks[i].width &&
          this.positionedBlocks[i].y <= y &&
          y < this.positionedBlocks[i].y + this.positionedBlocks[i].height
        ) {
          this.ctx.fillStyle = this.positionedBlocks[i].color;
          this.ctx.fillRect(x * 60 + 1, y * 60 + 1, 60 - 2, 60 - 2);
        }
      }
    }
  }
};

Game.prototype.newTurn = function() {
  // this.turn += 1;
  // this.generateNewRandomBlock();
  // this.gameOver();
};

Game.prototype.gameOver = function() {
  var gameOverSound = new Audio("./sounds/gameOverSound.wav");
  for (i = 0; i < g.positionedBlocks.length; i++) {
    if (g.positionedBlocks[i].y <= 1) {
      gameOverSound.play();
      window.alert("GAME OVER ! Your score is " + g.score + ".");

      // ("your final score is + score");
    }
  }
};

Game.prototype.setTimeout = function() {
  console.log("message");
};

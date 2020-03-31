/*
 * idNumber: the index of the block in the game
 * x: coordinates in the grid (between 0 and 9)
 * y: coordinates in the grid (between 0 and 9)
 * width: width in the grid (min: 1, max: 3)
 * height: height in the grid (min: 1, max: 3)
 */

function Block(
  idNumber,
  x,
  y,
  width,
  height,
  color,
  gravity,
  gravitySpeed,
  speedY
) {
  this.idNumber = idNumber;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.gravity = 0.3;
  this.gravitySpeed = 0;
  this.speedY = 0;
}

Block.prototype.goLeft = function() {
  var temp = g.currentBlock.color;

  g.currentBlock.color = "black";
  g.displayInDOM();

  g.currentBlock.x -= 1;

  g.currentBlock.color = temp;

  g.displayInDOM();
};

Block.prototype.goRight = function() {
  var temp = g.currentBlock.color;

  g.currentBlock.color = "black";
  g.displayInDOM();

  g.currentBlock.x += 1;
  g.currentBlock.color = temp;
  g.displayInDOM();
};

var LEFT_KEY = 37;
var RIGHT_KEY = 39;
var SPACE_KEY = 32;

var keysPressed = {
  left: false,
  right: false,
  space: false
};

document.onkeydown = function(event) {
  switch (event.keyCode) {
    case LEFT_KEY:
      keysPressed.left = true;
      break;
    case RIGHT_KEY:
      keysPressed.right = true;
      break;
    case SPACE_KEY:
      keysPressed.space = true;
      break;
  }
};

document.onkeyup = function(event) {
  switch (event.keyCode) {
    case LEFT_KEY:
      keysPressed.left = false;
      break;
    case RIGHT_KEY:
      keysPressed.right = false;
      break;
    case SPACE_KEY:
      keysPressed.space = false;
      break;
  }
};

Block.prototype.dropBlock = function() {
  var temp = g.currentBlock.color;

  g.currentBlock.color = "black";
  g.displayInDOM();

  g.currentBlock.y = 10 - g.currentBlock.height;

  var dropSound = new Audio("./sounds/dropSound.wav");
  dropSound.play();

  // The for loop while look if we need to put the "g.currentBlock.y" at higher level
  for (var i = 0; i < g.positionedBlocks.length; i++) {
    if (
      g.currentBlock.x + g.currentBlock.width - 1 >= g.positionedBlocks[i].x &&
      g.currentBlock.x <=
        g.positionedBlocks[i].x + g.positionedBlocks[i].width - 1
    ) {
      g.currentBlock.y = Math.min(
        g.currentBlock.y,
        g.positionedBlocks[i].y - g.currentBlock.height
      );
    }
  }

  g.currentBlock.color = temp;
  g.displayInDOM();
  g.positionedBlocks.push(g.currentBlock);

  Block.prototype.deleteBlocks();
  g.generateNewRandomBlock();
  g.gameOver();
};

Block.prototype.deleteBlocks = function() {
  for (var a = 0; a < g.positionedBlocks.length; a++) {
    for (var b = a + 1; b < g.positionedBlocks.length; b++) {
      if (
        ((g.positionedBlocks[b].x <= g.positionedBlocks[a].x &&
          g.positionedBlocks[a].x <=
            g.positionedBlocks[b].x + g.positionedBlocks[b].width &&
          (g.positionedBlocks[b].y <= g.positionedBlocks[a].y &&
            g.positionedBlocks[a].y <=
              g.positionedBlocks[b].y + g.positionedBlocks[b].height)) ||
          (g.positionedBlocks[b].x <=
            g.positionedBlocks[a].x + g.positionedBlocks[a].width &&
            g.positionedBlocks[a].x + g.positionedBlocks[a].width <=
              g.positionedBlocks[b].x + g.positionedBlocks[b].width &&
            g.positionedBlocks[b].y <=
              g.positionedBlocks[a].y + g.positionedBlocks[a].height &&
            g.positionedBlocks[a].y + g.positionedBlocks[a].height <=
              g.positionedBlocks[b].y + g.positionedBlocks[b].height)) &&
        g.positionedBlocks[a].color === g.positionedBlocks[b].color
      ) {
        var deleteSound = new Audio("./sounds/deleteSound.wav");
        deleteSound.play();
        g.score +=
          (g.positionedBlocks[a].width * g.positionedBlocks[a].height +
            g.positionedBlocks[b].width * g.positionedBlocks[b].height) *
          100;

        g.positionedBlocks.splice(b, 1); // b first because b > a
        g.positionedBlocks.splice(a, 1);

        g.displayInDOM();
      }
    }
  }
};

Block.prototype.clearedGameZone = function() {
  if (g.positionedBlocks.length === 0) {
    g.score += 1000;
  }
};

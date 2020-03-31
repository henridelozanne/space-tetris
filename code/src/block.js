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
) {
  this.idNumber = idNumber;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
}

Block.prototype.goLeft = function() {
  var temp = g.currentBlock.color;
  g.currentBlock.color = "black";
  g.displayInDOM();
  if (g.currentBlock.x > 0) {
    g.currentBlock.x -= 1;
  }
  g.currentBlock.color = temp;
  g.displayInDOM();
};

Block.prototype.goRight = function() {
  var temp = g.currentBlock.color;
  g.currentBlock.color = "black";
  g.displayInDOM();
  if (g.currentBlock.x + g.currentBlock.width - 1 < 9) {
    g.currentBlock.x += 1;
  }
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

  // The for loop checks if we need to put the "g.currentBlock.y" at higher level
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
  const currentBlock = g.currentBlock;
  const yToLook = currentBlock.y + currentBlock.height;
  const xIntervalToLook = [];
  const xToLook = [currentBlock.x - 1, currentBlock.x+currentBlock.width];
  const yIntervalToLook = [];
  for (i=currentBlock.y; i<currentBlock.y+currentBlock.height; i++) {
      yIntervalToLook.push(i);
  }

  // Par-dessus
  for (i=currentBlock.x; i<currentBlock.x+currentBlock.width; i++) {
      xIntervalToLook.push(i);
  }

  const filteredBlocks = g.positionedBlocks.filter((block) => block.color === currentBlock.color && block.y === yToLook);
  let hasBeenDeleted = false;

  filteredBlocks.forEach((block) => {
    for (i=block.x; i<block.x+block.width; i++) {
      if (xIntervalToLook.includes(i)) {
        // update score
        g.score += (currentBlock.width * currentBlock.height + block.width * block.height) * 100;
        // sound
        const deleteSound = new Audio("./sounds/deleteSound.wav");
        deleteSound.play();
        // delete blocks
        g.positionedBlocks.pop();
        g.positionedBlocks.splice(g.positionedBlocks.indexOf(block), 1);
        hasBeenDeleted = true;
        return;
      }
    }
  });

  // Sur les côtés
  const rightColorBlocks = g.positionedBlocks.filter((block) => block.color === currentBlock.color);
  rightColorBlocks.forEach((block) => {
    // validate x
    if (block.x+block.width-1 === xToLook[0] || block.x === xToLook[1]) {
      // validate y
      for (i=block.y; i<block.y+block.height; i++) {
        let oneSideDeleted = false;
        if (yIntervalToLook.includes(i) && !oneSideDeleted) {
          // update score
          g.score += (currentBlock.width * currentBlock.height + block.width * block.height) * 100;
          // sound
          const deleteSound = new Audio("./sounds/deleteSound.wav");
          deleteSound.play();
          // delete blocks
          if (!hasBeenDeleted) {
            g.positionedBlocks.pop();
          }
          g.positionedBlocks.splice(g.positionedBlocks.indexOf(block), 1);
          oneSideDeleted = true;
          return;
        }
      }
    }
  });
};

Block.prototype.clearedGameZone = function() {
  if (g.positionedBlocks.length === 0) {
    g.score += 1000;
  }
};

var c = document.getElementById("map");
var ctx = c.getContext("2d");

//draw snake
var snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 },
  { x: 150, y: 200 },
  { x: 140, y: 200 }
];
function drawSnake(coordinate) {
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(coordinate.x, coordinate.y, 10, 10);
  /*console.log(coordinate.x, coordinate.y, 10, 10);*/
}
function keepDrawing() {
  snake.forEach(drawSnake);
}
keepDrawing();

//move
var dx = 10,dy = 0;
document.addEventListener("keydown", changeDirection);
function changeDirection(event) {
  if (event.keyCode === 37 /*left*/ && dx !== 10) {
    /*not going right*/
    dx = -10;
    dy = 0;
  }
  if (event.keyCode === 38 && dy !== 10) {
    //up
    dx = 0;
    dy = -10;
  }
  if (event.keyCode === 39 && dx !== -10) {
    //right
    dx = 10;
    dy = 0;
  }
  if (event.keyCode === 40 && dy !== -10) {
    //down
    dx = 0;
    dy = 10;
  }
}

//generate and draw food
function random(min,max) {
  return Math.floor((Math.random()*(max-min) + min) / 10) * 10;
}
var foodX, foodY;
function generateFood() {
  foodX = random(0, c.width);
  foodY = random(0,c.height);
  drawFood();
}
generateFood();
function drawFood() {
  ctx.fillStyle = "#00ff00";
  ctx.fillRect(foodX,foodY,10,10);
  var clash;
  snake.forEach(newFood);
  function newFood(coordinate) {
    clash = coordinate.x === foodX && coordinate.y === foodY;
    if (clash) {
      generateFood();
    }
  }
}

//create and remove snake every interval
//"add tail" when eat food
var budOff;
function newHead() {
  var head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  var eaten;
  eaten = snake[0].x === foodX && snake[0].y === foodY;
  if (eaten) { //if eat food no need remove tail
    generateFood();
    //console.log(snake.length)
    } else {
    budOff = snake.pop();
    ctx.clearRect(budOff.x, budOff.y, 10, 10);
  }
}

//lose game
function endGame() {
  var i, collide;
  for (i = 4; i < snake.length; i++) {
    //check if collide with body
    collide = snake[0].x === snake[i].x && snake[0].y === snake[i].y;
    if (collide) {
      clearInterval(t);
    }
  }
  //check if hit border
  if (snake[0].x < 0 || //hit left border
    snake[0].x > c.width - 10 || //hit right border
    snake[0].y < 0 || // hit top border
    snake[0].y > c.height - 10){ //hit bottom border
    clearInterval(t);
  }
  /*if (snake.length===9){
    clearInterval(t);
    document.getElementById("start").innerHTML="yay";
  }*/
}
//run function every interval
function repeat() {
  newHead();
  keepDrawing();
  endGame();
}

//buttons
var t;
function run() {
  t = setInterval(repeat, 500);//settimeout to add delay
  document.getElementById("start").innerHTML="Start";
}
function stop() {
  clearInterval(t);
  document.getElementById("start").innerHTML="Resume";
}



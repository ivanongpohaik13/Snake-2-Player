var c = document.getElementById("map");
var ctx = c.getContext("2d");

//draw snake
var snake = [
  { x: 80, y: 140 },
  { x: 70, y: 140 },
  { x: 60, y: 140 },
  { x: 50, y: 140 },
  { x: 40, y: 140 },
  { x: 30, y: 140 },
  { x: 20, y: 140 }
];
function drawSnake(coordinate) {
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(coordinate.x, coordinate.y, 10, 10);
  /*console.log(coordinate.x, coordinate.y, 10, 10);*/
}
var snake2 = [
  { x: 210, y: 140 },
  { x: 220, y: 140 },
  { x: 230, y: 140 },
  { x: 240, y: 140 },
  { x: 250, y: 140 },
  { x: 260, y: 140 },
  { x: 270, y: 140 }
];
function drawSnake2(coordinate) {
  ctx.fillStyle = "#0000ff";
  ctx.fillRect(coordinate.x, coordinate.y, 10, 10);
  //ctx.globalCompositeOperation = "lighter";
  /*console.log(coordinate.x, coordinate.y, 10, 10);*/
}
function keepDrawing() {
  snake.forEach(drawSnake);
  snake2.forEach(drawSnake2);
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
var dx2 = -10,dy2 = 0;
document.addEventListener("keydown", changeDirection2);
function changeDirection2(event) {
  if (event.keyCode === 65 /*left*/ && dx2 !== 10) { //control using asdw
    /*not going right*/
    dx2 = -10;
    dy2 = 0;
  }
  if (event.keyCode === 87 && dy2 !== 10) {
    //up
    dx2 = 0;
    dy2 = -10;
  }
  if (event.keyCode === 68 && dx2 !== -10) {
    //right
    dx2 = 10;
    dy2 = 0;
  }
  if (event.keyCode === 83 && dy2 !== -10) {
    //down
    dx2 = 0;
    dy2 = 10;
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
  /*ctx.fillStyle = "#00ff00";
  ctx.fillRect(foodX,foodY,10,10);*/
  var clash;
  snake.forEach(newFood);
  function newFood(coordinate) {
    clash = coordinate.x === foodX && coordinate.y === foodY;
    if (clash) {
      generateFood();
    } else {
      ctx.fillStyle = "#00ff00";
      ctx.fillRect(foodX,foodY,10,10);
    }
  }
  var clash2;
  snake2.forEach(newFood2);
  function newFood2(coordinate) {
    clash2 = coordinate.x === foodX && coordinate.y === foodY;
    if (clash2) {
      generateFood();
    } else {
      ctx.fillStyle = "#00ff00";
      ctx.fillRect(foodX,foodY,10,10);
    }
  }
}

//create and remove snake every interval
//"add tail" when eat food
var budOff,budOff2;
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
  var head2 = { x: snake2[0].x + dx2, y: snake2[0].y + dy2 };
  snake2.unshift(head2);
  var eaten2;
  eaten2 = snake2[0].x === foodX && snake2[0].y === foodY;
  if (eaten2) { //if eat food no need remove tail
    generateFood();
    //console.log(snake.length)
    } else {
    budOff2 = snake2.pop();
    ctx.clearRect(budOff2.x, budOff2.y, 10, 10);
  }
}

//lose game
function endGame() {
  var i,i2, collideSelf,collideByOther,collideSelf2,collideByOther2;
  for (i = 1; i < snake.length; i++) {
    //check if collide with body
    collideSelf = snake[0].x === snake[i].x && snake[0].y === snake[i].y;
    collideByOther = snake2[0].x === snake[i].x && snake2[0].y === snake[i].y;
    if (collideSelf) {
      clearInterval(t);
      snake2win();
    }
    if (collideByOther) {
      clearInterval(t);
      snake1win();
    }
  }
  //check if hit border
  if (snake[0].x < 0 || //hit left border
    snake[0].x > c.width - 10 || //hit right border
    snake[0].y < 0 || // hit top border
    snake[0].y > c.height - 10){ //hit bottom border
    clearInterval(t);
    snake2win();
  }
  for (i2 = 1; i2 < snake2.length; i2++) {
    //check if collide with body
    collideSelf2 = snake2[0].x === snake2[i2].x && snake2[0].y === snake2[i2].y;
    collideByOther2 = snake[0].x === snake2[i2].x && snake[0].y === snake2[i2].y;
    if (collideSelf2) {
      clearInterval(t);
      snake1win();
    }
    if (collideByOther2) {
      clearInterval(t);
      snake2win();
    }
  }
  //check if hit border
  if (snake2[0].x < 0 || //hit left border
    snake2[0].x > c.width - 10 || //hit right border
    snake2[0].y < 0 || // hit top border
    snake2[0].y > c.height - 10){ //hit bottom border
    clearInterval(t);  
    snake1win();
  }
  if (snake[0].x === snake2[0].x && snake[0].y === snake2[0].y){//head to head collide
    clearInterval(t);
  }
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
  t = setInterval(repeat, 100);//settimeout to add delay
}
function newGame() {
  document.getElementById("start").style.display= "none";
  ctx.clearRect(0,0,c.width,c.height);
  snake = [
    { x: 80, y: 140 },
    { x: 70, y: 140 },
    { x: 60, y: 140 },
    { x: 50, y: 140 },
    { x: 40, y: 140 },
    { x: 30, y: 140 },
    { x: 20, y: 140 }
  ];
  snake2 = [
    { x: 210, y: 140 },
    { x: 220, y: 140 },
    { x: 230, y: 140 },
    { x: 240, y: 140 },
    { x: 250, y: 140 },
    { x: 260, y: 140 },
    { x: 270, y: 140 }
  ];
  dx= 10;
  dy= 0;
  dx2= -10;
  dy2= 0;
  document.getElementById("stop-btn").style.display= "inline-block";
  run();
  generateFood();
}

function stop() {
   /* if (document.getElementById("stop-btn").innerHTML==="Resume"){
      run();
      document.getElementById("stop-btn").innerHTML="Pause";
    } else {
    clearInterval(t);
    document.getElementById("stop-btn").innerHTML="Resume";      
    }*/
  if (document.getElementById("pause").innerHTML==="Pause"){
    clearInterval(t);
    document.getElementById("pause").innerHTML="Resume";
  } else {
    run();
    document.getElementById("pause").innerHTML="Pause";
  }
}


var s1=0,s2=0;
function snake1win(){
  s1 = s1 + 1;
  document.getElementById("score").innerHTML = s1;
  document.getElementById("start").style.display= "inline-block";
  document.getElementById("stop-btn").style.display= "none";
  ctx.fillStyle = "purple";
  ctx.fillRect(snake2[0].x,snake2[0].y,10,10);
}
function snake2win(){
  s2 = s2 + 1;
  document.getElementById("score2").innerHTML = s2;
  document.getElementById("start").style.display= "inline-block";
  document.getElementById("stop-btn").style.display= "none";
  ctx.fillStyle = "purple";
  ctx.fillRect(snake[0].x,snake[0].y,10,10);
}

function reset() {
   s1 = 0;
   s2 = 0;
   document.getElementById("score").innerHTML = s1;
   document.getElementById("score2").innerHTML = s2;
}
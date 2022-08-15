
let canvas = document.getElementById('canvas');
console.log('hello');
let ROWS = 30, COLS = 50, PIXEL = 10;

let Pixels = new Map();
function initCanvas() {
  for(let i = 0; i < ROWS; i++){
    for(let j = 0;j < COLS; j++){
      let pixel = document.createElement('div');
      let position = i + '_' + j;
      pixel.id = position;
      pixel.style.width = '10px';
      pixel.style.height = '10px';
      pixel.style.border = '1px solid grey';
      pixel.style.left = (j*10) + 'px';
      pixel.style.top = (i * 10) + 'px';
      pixel.style.position = 'absolute';
      canvas.appendChild(pixel);
      Pixels.set(position, pixel);
    }
  }
}
initCanvas();
let currentSnake = [
  [0,0], [0,1], [0,2], [0,3], [0,4]
];
let currentDirection = 0;
let breaker = setInterval(step, 200);
setTimeout(turnRight, 1000);
setTimeout(turnLeft, 2000);
setTimeout(turnRight, 3000);
setTimeout(turnRight, 5000);
setTimeout(turnRight, 6000);
setTimeout(turnRight, 7000);
function turnRight(){
  let dir = currentDirection;
  dir++;
  currentDirection = (dir < 4)? dir:0;
}
function turnLeft(){
  let dir = currentDirection;
  dir--;
  currentDirection = (dir < 0)? 3:dir;
}
function move(head){
  switch(currentDirection){
    case 0: return [head[0], head[1]+1];
    case 1: return [head[0]+1, head[1]];
    case 2: return [head[0], head[1]-1];
    case 3: return [head[0]-1, head[1]];    
    default:return;
  }
}
function step(){
  drawSnake(currentSnake);
  currentSnake.shift();
  let head = currentSnake[currentSnake.length - 1];
  currentSnake.push(move(head));
  console.log('new head', head[1]);
  if(head[1] >= COLS - 1)clearInterval(breaker);
}

function drawSnake(snake) {
  let snakePositions = new Set();
  for(let [x,y] of snake){
    let position = x + '_' + y;
    snakePositions.add(position);
  }
  for(let i = 0; i < ROWS; i++){
    for(let j = 0;j < COLS; j++){
      let position = i + '_' + j;
      let pixel = Pixels.get(position);
      pixel.style.backgroundColor = snakePositions.has(position) ? 'black': 'white';
    }
  }
}

let canvas = document.getElementById('canvas');
console.log('Let\'s S___/\\__N__/\\____A K E');
let ROWS = 15, COLS = 25, PIXEL = 20;
let COLORS = {
  GROUND: 'DarkOliveGreen',
  SNAKE: 'DodgerBlue',
  FOOD: 'DarkSalmon'
}

let Pixels = new Map();
function initCanvas() {
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      let pixel = document.createElement('div');
      let position = i + '_' + j;
      pixel.id = position;
      pixel.style.width = PIXEL + 'px';
      pixel.style.height = PIXEL + 'px';
      pixel.style.border = '1px solid grey';
      pixel.style.left = (j * PIXEL) + 'px';
      pixel.style.top = (i * PIXEL) + 'px';
      pixel.style.position = 'absolute';
      canvas.appendChild(pixel);
      Pixels.set(position, pixel);
    }
  }
}
initCanvas();

let currentSnake = [
  [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
  // [0, 5], [0, 6], [0, 7], [0, 8], [0, 9]
];
function placeSnakeCenter(){
  let centerRow = ROWS / 2;
}
let currentFood = [];
let currentDirection = 0;
drawSnake(currentSnake);
let breaker = setInterval(step, 200);
setTimeout(placeFood, 2000);
document.addEventListener('click', turnRight);

function pause() {
  clearInterval(breaker);
}
function turnRight() {
  let dir = currentDirection;
  dir++;
  currentDirection = (dir < 4) ? dir : 0;
}
function turnLeft() {
  let dir = currentDirection;
  dir--;
  currentDirection = (dir < 0) ? 3 : dir;
}
function move(head) {
  switch (currentDirection) { // dir changes clock wise ; initially towards right
    case 0: return [head[0], head[1] + 1]; // right
    case 1: return [head[0] + 1, head[1]]; // down
    case 2: return [head[0], head[1] - 1]; // left
    case 3: return [head[0] - 1, head[1]]; // up
    default: return head;
  }
}
function randomPlace(){
  let row = Math.floor(Math.random() * ROWS);
  let col = Math.floor(Math.random() * COLS);
  return [row, col];
}
function placeFood(){
  let max = 10;
  let i = 0;
  do{
    let newPlace = randomPlace();
    let isOnSnake = currentSnake.some(bodypart => bodypart[0] === newPlace[0] && bodypart[1] === newPlace[1]);
    if(!isOnSnake){
      currentFood = newPlace;
      colorThePixel(currentFood, COLORS.FOOD);
      return;
    }
  }while(i++<max);
}
function wallHit(intervalId) {
  clearInterval(intervalId);
  console.log("Wall is hit!!!");
}
function selfHit(head, intervalId) {
  // console.log('currentSnake', currentSnake.slice(0, currentSnake.length - 3));
  // console.log('head', head);
  let touched = currentSnake.slice(0, currentSnake.length - 3).some(bodypart => bodypart[0] === head[0] && bodypart[1] === head[1]);
  // console.log('touched', touched);
  if (touched) {
    clearInterval(intervalId);
    console.log('Don\'t eat yourself!');
  }
  return touched;
}
function foodTouched(head){
  return head[0] === currentFood[0] && head[1] === currentFood[1];
}
function step() {
  
  let head = currentSnake[currentSnake.length - 1];
  let nextHeadPosition = move(head);
  let tail;
  if (selfHit(nextHeadPosition, breaker)) return;
  if (!foodTouched(nextHeadPosition)) {
    tail = currentSnake.shift();
  }
  else {
    console.log("Grown to ", currentSnake.length + 1);
    currentFood = [];
    setTimeout(placeFood, 1000);
  }
  currentSnake.push(nextHeadPosition);

  if ((currentDirection === 0 && head[1] >= COLS - 1) 
  || (currentDirection === 2 && head[1] === 0) 
  || (currentDirection === 3 && head[0] === 0) 
  || (currentDirection === 1 && head[0] >= ROWS - 1)) {
    wallHit(breaker);
    return;
  }
  // console.log(nextHeadPosition, tail);
  colorThePixel(nextHeadPosition, COLORS.SNAKE);
  if(tail)colorThePixel(tail, COLORS.GROUND);
}
function colorThePixel(pixel, color){
  let position = pixel[0] + '_' + pixel[1];
  let pixelElement = Pixels.get(position);
  if(pixelElement) pixelElement.style.backgroundColor = color;
}
function drawSnake(snake) {
  let snakePositions = new Set();
  for (let [x, y] of snake) {
    let position = x + '_' + y;
    snakePositions.add(position);
  }
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      let position = i + '_' + j;
      let pixel = Pixels.get(position);
      pixel.style.backgroundColor = snakePositions.has(position) ? COLORS.SNAKE :COLORS.GROUND;
    }
  }
}

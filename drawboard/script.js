// || Initial Data
const selector = (e) => document.querySelector(e);
const selectorAll = (e) => document.querySelectorAll(e);
let currentColor = 'black';
let canDraw = false;
const screen = selector('#tela');
const context = screen.getContext('2d');
let mouseX;
let mouseY;
// || Events
selectorAll('.colorArea .color').forEach((item) => {
  item.addEventListener('click', colorClickEvent);
});
screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);
selector('.clear').addEventListener('click', () => {
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, context.canvas.width, context.canvas.width);
});

// || Functions
function colorClickEvent(e) {
  const color = e.target.getAttribute('data-color');
  currentColor = color;
  selector('.color.active').classList.remove('active');
  e.target.classList.add('active');
}

function mouseDownEvent(e) {
  canDraw = true;
  mouseX = e.pageX - screen.offsetLeft;
  mouseY = e.pageY - screen.offsetTop;
}
function mouseMoveEvent(e) {
  if (canDraw) {
    draw(e.pageX, e.pageY);
  }
}
function mouseUpEvent() {
  canDraw = false;
}
function draw(x, y) {
  const pointX = x - screen.offsetLeft;
  const pointY = y - screen.offsetTop;

  context.beginPath();
  context.lineWidth = 5;
  context.lineJoin = 'round';
  context.moveTo(mouseX, mouseY);
  context.lineTo(pointX, pointY);
  context.closePath();
  context.strokeStyle = currentColor;
  context.stroke();
  mouseX = pointX;
  mouseY = pointY;
}

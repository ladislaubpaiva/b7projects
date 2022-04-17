const selector = (e) => document.querySelector(e);
// || Initial Data
const square = {
  a1: '',
  a2: '',
  a3: '',
  b1: '',
  b2: '',
  b3: '',
  c1: '',
  c2: '',
  c3: '',
};

let player = '';
let warning = '';
let playing = false;

reset();
// || Events
selector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach((e) => {
  e.addEventListener('click', itemClick);
});

// || Functions
function reset() {
  warning = '';
  const random = Math.floor(Math.random() * 2);
  player = random === 0 ? 'x' : 'o';
  for (const i in square) {
    square[i] = '';
  }
  playing = true;
  renderSquare();
  renderInfo();
}

function renderSquare() {
  for (const i in square) {
    const item = selector(`div[data-item=${i}]`);
    item.innerHTML = square[i];
  }
  checkGame();
}
function renderInfo() {
  selector('.vez').innerText = player;
  selector('.resultado').innerText = warning;
}
function itemClick(e) {
  const item = e.target.getAttribute('data-item');
  if (playing && square[item] === '') {
    square[item] = player;
    renderSquare();
    togglePlayer();
  }
}
function togglePlayer() {
  player = player === 'x' ? 'o' : 'x';
  renderInfo();
}
function checkGame() {
  if (checkWinner('x')) {
    warning = '"x" ganhou';
    playing = false;
  } else if (checkWinner('o')) {
    warning = '"o" ganhou';
    playing = false;
  } else if (isFull()) {
    warning = 'empate';
    playing = false;
  }
}
function checkWinner(playerWin) {
  const pos = ['a1,a2,a3', 'b1,b2,b3', 'c1,c2,c3', 'a1,b1,c1', 'a2,b2,c2', 'a3,b3,c3', 'a1, b2,c3', 'a3,b2,c1'];
  for (const w in pos) {
    const posArray = pos[w].split(',');
    const hasWon = posArray.every((option) => square[option] === playerWin);
    if (hasWon) {
      return true;
    }
  }
  return false;
}
function isFull() {
  for (const i in square) {
    if (square[i] === '') {
      return false;
    }
  }
  return true;
}

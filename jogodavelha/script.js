const selector = (e) => document.querySelector(e);
// || Initial Data
const square = {
  a1: '', a2: '', a3: '', b1: '', b2: '', b3: '', c1: '', c2: '', c3: ''
};

let player = '';
let warning = '';
let playing = false;

// || Events
selector('.reset').addEventListener('click', reset);
// || Functions
function reset () {
  warning = '';
  const random = Math.floor(Math.random() * 2);
  player = (random === 0) ? 'x' : 'o';
  for (const i of square) {
    square[i] = '';
  }
  playing = true;
  renderSquare();
  renderInfo();
}

function renderSquare () {



  
}
function renderInfo () {}

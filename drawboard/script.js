const canvas = document.querySelector('#screen');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

window.addEventListener('resize', () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

let currentOption = 'pencil';
window.addEventListener('load', () => {
  const screen = canvas.getContext('2d');
  const sizeButton = document.querySelector('.bx-font-size.option');
  const rangeArea = document.querySelector('.rangeArea');

  let canDraw = false;
  let currentColor = 'black';
  let pencilSize = 1;
  let eraserSize = 1;

  document.querySelectorAll('.colorArea .color').forEach((item) => {
    item.addEventListener('click', (e) => {
      const color = e.target.getAttribute('data-color');
      currentColor = color;
      document.querySelector('.color.active').classList.remove('active');
      e.target.classList.add('active');
    });
  });
  document.querySelectorAll('.optionsArea .option.type').forEach((item) => {
    item.addEventListener('click', (e) => {
      const opt = e.currentTarget.getAttribute('data-opt');
      currentOption = opt;
      document.querySelector('.option.active').classList.remove('active');
      e.target.classList.add('active');
    });
  });

  document.querySelector('#pencilSize').addEventListener('change', (e) => {
    pencilSize = e.currentTarget.value;
  });
  document.querySelector('#eraserSize').addEventListener('change', (e) => {
    eraserSize = e.currentTarget.value;
  });

  document.querySelector('.clear').addEventListener('click', () => {
    screen.setTransform(1, 0, 0, 1, 0, 0);
    screen.clearRect(0, 0, screen.canvas.width, screen.canvas.width);
  });

  function startDraw(e) {
    canDraw = true;
    if (currentOption === 'pencil') {
      draw(e, currentColor, pencilSize);
    } else {
      draw(e, 'white', eraserSize);
    }
  }
  function draw(e, color, size) {
    if (!canDraw) return;
    screen.lineWidth = size;
    screen.lineCap = 'round';
    screen.lineTo(e.clientX, e.clientY);
    screen.stroke();
    screen.beginPath();
    screen.strokeStyle = color;
    screen.moveTo(e.clientX, e.clientY);
  }
  function finishDraw() {
    canDraw = false;
    screen.closePath();
    screen.beginPath();
  }

  function sizeOptions(e) {
    const el = e.currentTarget;
    const state = el.getAttribute('data-state') === 'close';
    if (!state) {
      el.style.color = '';
      el.setAttribute('data-state', 'close');
    } else {
      el.style.color = 'blue';
      el.setAttribute('data-state', 'open');
    }
    rangeArea.classList.toggle('show');
  }
  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mouseup', finishDraw);
  canvas.addEventListener('mousemove', draw);

  sizeButton.addEventListener('click', sizeOptions);
});

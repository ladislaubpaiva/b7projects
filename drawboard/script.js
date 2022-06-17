window.addEventListener('DOMContentLoaded', () => {
  const sizeButton = document.querySelector('.bx-font-size.option');
  const rangeArea = document.querySelector('.rangeArea');

  let canvas;
  let ctx;
  let canDraw = false;
  let currentOption = 'pencil';
  let currentColor = 'black';
  let pencilSize = 1;
  let eraserSize = 2;
  let tabs = document.querySelectorAll('.canvas');
  let tabsBtn = document.querySelectorAll('.tabs .tab:not(.create)');
  const templates = document.querySelector('template');

  tabsBtn[0].querySelector('i').style.display = 'none';

  function drawPoint() {
    ctx.lineWidth = 0;
    ctx.lineCap = 'round';
    ctx.lineTo(1, 1);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = '#fff';
    ctx.moveTo(1, 1);
    ctx.closePath();
    ctx.beginPath();
  }

  function openBoard(actualTab, canva) {
    const key = actualTab.getAttribute('data-tab');
    canva.forEach((element) => {
      if (element.getAttribute('data-canvas') === key) {
        canvas = element;
        ctx = canvas.getContext('2d');
        listeners();
        drawPoint();
        element.style.display = 'block';
      }
    });
  }

  function canvasSize() {
    canvas.height = window.innerHeight - 40;
    canvas.width = window.innerWidth;
  }

  function listeners() {
    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mouseup', finishDraw);
    canvas.addEventListener('mousemove', draw);
  }

  function tabsToggle() {
    document.querySelectorAll('.tabs .tab:not(.create)').forEach((item) => {
      item.addEventListener('click', (e) => {
        const el = e.currentTarget;
        if (document.querySelector('.tab.active')) {
          document.querySelector('.tab.active').classList.remove('active');
        }
        el.classList.add('active');
        tabs.forEach((tab) => {
          tab.style.display = 'none';
        });
        openBoard(el, tabs);
        item.querySelector('i').addEventListener('click', (closeIcon) => {
          closeIcon.currentTarget.parentNode.remove();
          canvas.remove();
        });
        if (!document.querySelector('.tab.active')) {
          document.getElementById('default').click();
        }
      });
    });
  }

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
    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.lineTo(e.clientX, e.clientY - 40);
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(e.clientX, e.clientY - 40);
  }
  function finishDraw() {
    canDraw = false;
    ctx.closePath();
    ctx.beginPath();
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

  tabs.forEach((tab) => {
    tab.style.display = 'none';
  });

  document.querySelector('.tab.create').addEventListener('click', (e) => {
    const tabTemplate = templates.content.querySelector('.tab').cloneNode(true);
    tabTemplate.setAttribute('data-tab', tabsBtn.length + 1);
    const canvasTemplate = templates.content.querySelector('.canvas').cloneNode(true);
    canvasTemplate.setAttribute('data-canvas', tabs.length + 1);

    document.querySelector('.tabs').insertBefore(tabTemplate, e.currentTarget);
    document.querySelector('.canvasTabs').append(canvasTemplate);
    tabsToggle();
    tabs = document.querySelectorAll('.canvas');
    tabsBtn = document.querySelectorAll('.tabs .tab:not(.create)');

    e.currentTarget.previousElementSibling.click();
    canvasSize();
  });
  tabsToggle();
  document.getElementById('default').click();
  canvasSize();
  window.addEventListener('resize', () => {
    canvasSize();
  });

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
      if (opt === 'pencil') {
        canvas.style.cursor = '';
      } else {
        canvas.style.cursor = "url('imgs/cursor.svg'), auto";
      }
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
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.width);
  });
  listeners();

  sizeButton.addEventListener('click', sizeOptions);
});

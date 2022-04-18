const areas = { a: null, b: null, c: null };

document.querySelectorAll('.item').forEach((item) => {
  item.addEventListener('dragstart', dragStart);
  item.addEventListener('dragend', dragEnd);
});
const area = document.querySelectorAll('.area');

area.forEach((a) => {
  a.addEventListener('dragover', dragOver);
  a.addEventListener('dragleave', dragLeave);
  a.addEventListener('drop', drop);
});

const neutralArea = document.querySelector('.neutralArea');
neutralArea.addEventListener('dragover', dragOverNeutral);
neutralArea.addEventListener('dragleave', dragLeaveNeutral);
neutralArea.addEventListener('drop', dropNeutral);

// || Functions Item
function dragStart(e) {
  e.currentTarget.classList.add('dragging');
}
function dragEnd(e) {
  e.currentTarget.classList.remove('dragging');
}

// || Functions Area
function dragOver(e) {
  e.preventDefault();
  if (e.currentTarget.querySelector('.item') !== null) {
    e.currentTarget.style.borderColor = '#f00';
  } else {
    e.currentTarget.classList.add('hover');
    e.currentTarget.style.borderColor = '#ff0';
  }
}
function dragLeave(e) {
  e.currentTarget.style.borderColor = 'inherit';
  e.currentTarget.classList.remove('hover');
}
function drop(e) {
  dragLeave(e);
  if (e.currentTarget.querySelector('.item') === null) {
    const itemDrag = document.querySelector('.item.dragging');
    e.currentTarget.appendChild(itemDrag);
  }
  updateAreas();
}

// || Functions Neutral Area
function dragOverNeutral(e) {
  e.preventDefault();
  e.currentTarget.classList.add('hover');
  e.currentTarget.style.borderColor = '#ff0';
}
function dragLeaveNeutral(e) {
  e.currentTarget.classList.remove('hover');
  e.currentTarget.style.borderColor = '#fff';
}
function dropNeutral(e) {
  dragLeaveNeutral(e);
  const itemDrag = document.querySelector('.item.dragging');
  e.currentTarget.appendChild(itemDrag);
  updateAreas();
}

// || Logic Functions
function updateAreas() {
  area.forEach((item) => {
    const name = item.getAttribute('data-name');
    if (item.querySelector('.item') !== null) {
      areas[name] = item.querySelector('.item').textContent;
    } else {
      areas[name] = null;
    }
  });
  if (areas.a === '1' && areas.b === '2' && areas.c === '3') {
    document.querySelector('.areas').classList.add('correct');
  } else {
    document.querySelector('.areas').classList.remove('correct');
  }
}

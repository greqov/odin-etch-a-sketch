'use strict';

(function () {
  // TODO: get grid size in px
  const gridSize = 480;
  const grid = document.querySelector('.js-grid');

  function generateCells(num) {
    const cells = [];
    const size = (gridSize / num).toFixed(2);

    for (let i = 0; i < num * num; i++) {
      const cell = document.createElement('div');
      cell.classList.add('grid__cell');
      cell.setAttribute('style', `width: ${size}px; height: ${size}px;`);
      cells.push(cell);
    }

    return cells;
  }

  function renderGrid(size) {
    const cells = generateCells(size);
    grid.innerHTML = '';
    grid.append(...cells);
  }

  // init actions
  renderGrid(3);

  const clearBtn = document.querySelector('.js-clear-btn');
  const grid4Btn = document.querySelector('.js-grid4-btn');
  const grid6Btn = document.querySelector('.js-grid6-btn');

  clearBtn.addEventListener('click', () => {
    // TODO: how to select cells only one time?
    const cells = document.querySelectorAll('.grid__cell');
    cells.forEach((cell) => {
      const c = cell;
      c.style.backgroundColor = 'transparent';
    });
  });
  grid4Btn.addEventListener('click', () => renderGrid(4));
  grid6Btn.addEventListener('click', () => renderGrid(6));

  grid.addEventListener('mouseover', (ev) => {
    const cell = ev.target;
    const color = 'rgba(255, 255, 255, 0.5)';
    cell.style.backgroundColor = color;
  });
})();

(function () {
  'use strict';

  // TODO: get grid size in px
  const gridSize = 480;
  const grid = document.querySelector('.js-grid');

  function generateCells(num) {
    let cells = [];
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

  clear3.addEventListener('click', () => renderGrid(3));
  size4.addEventListener('click', () => renderGrid(4));
  size6.addEventListener('click', () => renderGrid(6));
})();

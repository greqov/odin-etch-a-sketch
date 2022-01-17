'use strict';

(function () {
  // TODO: get grid size in px
  const gridSize = 480;
  const grid = document.querySelector('.js-grid');

  function getRandomColor() {
    // TODO: generate random color
    return 'skyblue';
  }

  const state = {
    eraserMode: false,
    rainbowMode: false,
    color: 'pink',
    getColor: function () {
      if (this.eraserMode) return 'transparent';
      if (this.rainbowMode) return getRandomColor();
      return this.color;
    },
  };

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
  renderGrid(16);

  function clearGrid() {
    // TODO: how to select cells only one time?
    const cells = document.querySelectorAll('.grid__cell');
    cells.forEach((cell) => {
      const c = cell;
      c.style.backgroundColor = 'transparent';
    });
  }

  const clearBtn = document.querySelector('.js-clear-btn');
  clearBtn.addEventListener('click', clearGrid);

  grid.addEventListener('mouseover', (ev) => {
    const cell = ev.target;
    const color = state.getColor();
    cell.style.backgroundColor = color;
  });

  // change grid size
  const sizeInput = document.querySelector('.js-size-input');
  sizeInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const size = e.target.value;
      if (size < 1 || size > 100) return;
      renderGrid(size);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      clearGrid();
    }
  });

  function toggleEraserMode() {
    state.eraserMode = !state.eraserMode;
  }

  function toggleRainbowMode() {
    state.rainbowMode = !state.rainbowMode;
    if (state.rainbowMode) {
      state.eraserMode = false;
    }
  }

  const eraserLabel = document.querySelector('.js-eraser-mode-label');
  const rainbowLabel = document.querySelector('.js-rainbow-mode-label');

  function updateUI() {
    eraserLabel.style.opacity = state.eraserMode ? '1' : '0';
    rainbowLabel.style.opacity = state.rainbowMode ? '1' : '0';
  }

  document.addEventListener('keydown', (e) => {
    // [C]lear/[E]raser
    if (e.key === 'c' || e.key === 'e') {
      toggleEraserMode();
      updateUI();
    }
  });

  document.addEventListener('keydown', (e) => {
    // [R]ainbow
    if (e.key === 'r') {
      toggleRainbowMode();
      updateUI();
    }
  });
})();

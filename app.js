'use strict';

(function () {
  // TODO: get grid size in px
  const gridSize = 480;
  const grid = document.querySelector('.js-grid');

  function getRandomColor() {
    const num = () => Math.floor(Math.random() * 256);
    return `rgb(${num()},${num()},${num()})`;
  }

  function getGrayColor(cell) {
    let opacity = Number(cell.dataset.opacity) || 0;
    if (opacity < 1) {
      opacity += 0.25;
    }
    cell.setAttribute('data-opacity', opacity);
    return `rgba(0,0,0,${opacity})`;
  }

  const state = {
    eraserMode: false,
    rainbowMode: false,
    grayMode: false,
    color: 'pink',
    getColor: function (cell) {
      if (this.eraserMode) return 'transparent';
      if (this.rainbowMode) return getRandomColor();
      if (this.grayMode && !this.eraserMode) return getGrayColor(cell);
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

  grid.addEventListener('mouseover', (e) => {
    const cell = e.target;
    const color = state.getColor(cell);
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
      state.grayMode = false;
    }
  }

  function toggleGrayMode() {
    state.grayMode = !state.grayMode;
    if (state.grayMode) {
      state.eraserMode = false;
      state.rainbowMode = false;
    }
  }

  const eraserLabel = document.querySelector('.js-eraser-mode-label');
  const rainbowLabel = document.querySelector('.js-rainbow-mode-label');
  const grayLabel = document.querySelector('.js-gray-mode-label');

  function updateUI() {
    eraserLabel.style.opacity = state.eraserMode ? '1' : '0';
    rainbowLabel.style.opacity = state.rainbowMode ? '1' : '0';
    grayLabel.style.opacity = state.grayMode ? '1' : '0';
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

  document.addEventListener('keydown', (e) => {
    // [G]ray
    if (e.key === 'g') {
      toggleGrayMode();
      updateUI();
    }
  });
})();

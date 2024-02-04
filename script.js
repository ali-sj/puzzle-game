class PuzzleGame {
  constructor(rowsInput, columnsInput, puzzleBoard) {
    this.rowsInput = rowsInput;
    this.columnsInput = columnsInput;
    this.puzzleBoard = puzzleBoard;

    this.totalTiles = 4;
    this.puzzleState = [];
    this.isAnimating = false;
    this.init();
  }
  //trigger create in first time
  init() {
    this.createPuzzle();
  }

  //create puzzle
  createPuzzle() {
    const container = this.puzzleBoard;
    container.style.gridTemplateColumns = `repeat(${parseInt(
      this.columnsInput.value
    )},${500 / +this.columnsInput.value}px)`;
    container.style.gridTemplateRows = `repeat(${parseInt(
      this.rowsInput.value
    )},${500 / +this.rowsInput.value}px)`;

    const rows = parseInt(this.rowsInput.value);
    const columns = parseInt(this.columnsInput.value);

    // check valid inputs

    if (isNaN(rows) || isNaN(columns) || rows < 1 || columns < 1) {
      alert("Please enter the correct and positive number of rows and columns");
      return;
    }

    this.totalTiles = rows * columns;

    this.puzzleState = [];
    while (!this.isSolvable()) {
      this.shuffleTiles();
    }
    this.drawPuzzle();
  }

  //method for shuffle rendering
  shuffleTiles() {
    this.puzzleState = Array.from(
      { length: this.totalTiles },
      (_, index) => index + 1
    );

    for (let i = this.puzzleState.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.puzzleState[i], this.puzzleState[j]] = [
        this.puzzleState[j],
        this.puzzleState[i],
      ];
    }
  }

  drawPuzzle() {
    this.puzzleBoard.innerHTML = "";
    for (let i = 0; i < this.totalTiles; i++) {
      const tile = document.createElement("div");
      tile.className = "puzzle-tile";

      const widthTile = `${500 / +this.columnsInput.value}px`;
      const heightTitle = `${500 / +this.rowsInput.value}px`;
      tile.style.width = widthTile;
      tile.style.height = heightTitle;

      tile.textContent =
        this.puzzleState[i] === this.totalTiles ? "" : this.puzzleState[i];
      if (this.puzzleState[i] === this.totalTiles) {
        tile.style.backgroundColor = "transparent";
      } else {
        tile.textContent = this.puzzleState[i];
        tile.addEventListener("click", () => this.tileClickHandler(i));
      }
      this.puzzleBoard.appendChild(tile);
    }
  }

  //method for checking win

  checkWin() {
    for (let i = 0; i < this.totalTiles - 1; i++) {
      if (this.puzzleState[i] !== i + 1) {
        return false;
      }
    }
    return true;
  }

  showSuccessMessage() {
    setTimeout(() => {
      alert("puzzle solved!");
    }, 1000);
  }

  //method for click on tiles

  tileClickHandler(index) {
    const emptyIndex = this.puzzleState.indexOf(this.totalTiles);
    const adjacentIndices = this.getAdjacentIndices(index);

    if (!this.isAnimating && adjacentIndices.includes(emptyIndex)) {
      this.animateTileMove(index, emptyIndex);
      [this.puzzleState[index], this.puzzleState[emptyIndex]] = [
        this.puzzleState[emptyIndex],
        this.puzzleState[index],
      ];

      setTimeout(() => {
        this.drawPuzzle();
        this.isAnimating = false;
        if (this.checkWin()) {
          this.showSuccessMessage();
        }
      }, 500);
    }
  }
  //method for implement animation
  animateTileMove(fromIndex, toIndex) {
    if (this.isAnimating) {
      return;
    }

    this.isAnimating = true;

    const fromTile = document.querySelector(
      `.puzzle-tile:nth-child(${fromIndex + 1})`
    );
    const toTile = document.querySelector(
      `.puzzle-tile:nth-child(${toIndex + 1})`
    );

    const fromRect = fromTile.getBoundingClientRect();
    const toRect = toTile.getBoundingClientRect();

    const deltaX = fromRect.left - toRect.left;
    const deltaY = fromRect.top - toRect.top;

    fromTile.style.transform = `translate(-${deltaX}px, -${deltaY}px)`;
    toTile.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    setTimeout(() => {
      fromTile.style.transition = "none";
      toTile.style.transform = "none";
    }, 500);
  }

  // check if puzzle is solvable
  isSolvable() {
    if (!this.puzzleState || this.puzzleState.length !== this.totalTiles) {
      return false;
    }

    let inversions = 0;
    for (let i = 0; i < this.puzzleState.length - 1; i++) {
      for (let j = i + 1; j < this.puzzleState.length; j++) {
        if (
          this.puzzleState[i] > this.puzzleState[j] &&
          this.puzzleState[j] !== this.totalTiles
        ) {
          inversions++;
        }
      }
    }

    return inversions % 2 === 0;
  }

  // get adjacent indices
  getAdjacentIndices(index) {
    const row = Math.floor(index / parseInt(this.columnsInput.value));
    const col = index % parseInt(this.columnsInput.value);
    const adjacentIndices = [];

    if (row > 0)
      adjacentIndices.push(index - parseInt(this.columnsInput.value));
    if (row < parseInt(this.rowsInput.value) - 1)
      adjacentIndices.push(index + parseInt(this.columnsInput.value));
    if (col > 0) adjacentIndices.push(index - 1);
    if (col < parseInt(this.columnsInput.value) - 1)
      adjacentIndices.push(index + 1);

    return adjacentIndices;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const rowsInput = document.getElementById("rows");
  const columnsInput = document.getElementById("columns");
  const puzzleBoard = document.getElementById("puzzle-container");
  const puzzleGame = new PuzzleGame(rowsInput, columnsInput, puzzleBoard);
  const startGameButton = document.getElementById("start-game-button");
  startGameButton.addEventListener("click", () => puzzleGame.createPuzzle());
});

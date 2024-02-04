document.addEventListener('DOMContentLoaded', function () {
    const puzzleBoard = document.getElementById('puzzle-container');
    const successMessage = document.getElementById('success-message');
  
    const puzzleSize = 2;
    const totalTiles = puzzleSize * puzzleSize;
    const emptyTile = totalTiles;
  
    let puzzleState = Array.from({ length: totalTiles }, (_, index) => index + 1);
  
    // تابع برای ترتیب تایل‌ها
    function shuffleTiles() {
      for (let i = puzzleState.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [puzzleState[i], puzzleState[j]] = [puzzleState[j], puzzleState[i]];
      }
    }
  
    // تابع برای رسم تایل‌ها در صفحه
    function drawPuzzle() {
      puzzleBoard.innerHTML = '';
      for (let i = 0; i < totalTiles; i++) {
        const tile = document.createElement('div');
        tile.className = 'puzzle-tile';
        tile.textContent = puzzleState[i] === emptyTile ? '' : puzzleState[i];
        tile.addEventListener('click', () => tileClickHandler(i));
        puzzleBoard.appendChild(tile);
      }
    }
  
    // تابع برای بررسی حالت پیروزی
    function checkWin() {
      for (let i = 0; i < totalTiles - 1; i++) {
        if (puzzleState[i] !== i + 1) {
          return false;
        }
      }
      alert('hhh')
      return true;
    }
  
    // تابع برای رسم پیغام موفقیت آمیز
    function showSuccessMessage() {
      successMessage.style.display = 'block';
    }
  
    // تابع برای کلیک بر روی تایل
    function tileClickHandler(index) {
      const emptyIndex = puzzleState.indexOf(emptyTile);
      const adjacentIndices = getAdjacentIndices(index);
      animateTileMove(index, emptyIndex);
      alert('tgrg')
  
      if (adjacentIndices.includes(emptyIndex)) {
     
        [puzzleState[index], puzzleState[emptyIndex]] = [puzzleState[emptyIndex], puzzleState[index]];
        drawPuzzle();
  
        if (checkWin()) {
          showSuccessMessage();
        }
      }
    }
  
    // تابع برای اعمال انیمیشن جابجایی تایل
    function animateTileMove(fromIndex, toIndex) {
      alert('rgr')
     
      const fromTile = document.querySelector(`.puzzle-tile:nth-child(${fromIndex + 1})`);
      console.log(fromTile);
      const toTile = document.querySelector(`.puzzle-tile:nth-child(${toIndex + 1})`);
      // console.log(document.getElementsByClassName("puzzle-tile")[1]);
    // document.getElementsByClassName("puzzle-tile")[fromIndex + 1].style.color = "red";
  
  
      const fromRect = fromTile.getBoundingClientRect();
      console.log('from',fromRect.left);
      const toRect = toTile.getBoundingClientRect();
      console.log('to',toRect.left);
  
      const deltaX = fromRect.left - toRect.left;
      console.log(
        'x',deltaX
      );
      
      const deltaY = fromRect.top - toRect.top;
      toTile.style.color='red'
  
      fromTile.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      toTile.style.transform = `translate(-${deltaX}px, -${deltaY}px)`;
  
      // setTimeout(() => {
      //   fromTile.style.transform = '';
      //   toTile.style.transform = '';
      // }, 300);
    }
  
    // تابع برای گرفتن اندیس‌های مجاور
    function getAdjacentIndices(index) {
      const row = Math.floor(index / puzzleSize);
      const col = index % puzzleSize;
      const adjacentIndices = [];
  
      if (row > 0) adjacentIndices.push(index - puzzleSize);
      if (row < puzzleSize - 1) adjacentIndices.push(index + puzzleSize);
      if (col > 0) adjacentIndices.push(index - 1);
      if (col < puzzleSize - 1) adjacentIndices.push(index + 1);
  
      return adjacentIndices;
    }
  
    // اجرای توابع ابتدایی
    shuffleTiles();
    drawPuzzle();
  });
  
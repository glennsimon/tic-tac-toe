const cells = document.querySelectorAll('.cell');
let yourTurn = true;
const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const dialog = document.querySelector('.dialog');
const dialogYes = document.querySelector('.dialogYes');
const dialogNo = document.querySelector('.dialogNo');
dialogYes.addEventListener('click', () => {
  replay(true);
});
dialogNo.addEventListener('click', () => {
  replay(false);
});

const turnIndicator = document.querySelector('.turn');
turnIndicator.innerText = yourTurn ? 'YOUR TURN' : 'THEIR TURN';

for (const cell of cells) {
  cell.addEventListener('click', playTurn);
}

function playTurn(event) {
  const element = event.target;
  if (element.innerText !== '') return;
  element.innerText = yourTurn ? 'X' : 'O';
  const status = checkResult();
  if (status.gameOver) {
    endGame(status);
  } else {
    yourTurn = !yourTurn;
    turnIndicator.innerText = yourTurn ? 'YOUR TURN' : 'THEIR TURN';
    console.log(yourTurn);
  }
}

function checkResult() {
  console.log(cells);
  const gameStatus = {};
  gameStatus.gameOver = true;
  for (const win of wins) {
    const value = cells[win[0]].innerText;
    if (
      value !== '' &&
      value === cells[win[1]].innerText &&
      value === cells[win[2]].innerText
    ) {
      // current player has won the game
      gameStatus.win = win;
      return gameStatus;
    }
  }
  for (const cell of cells) {
    // if there are any empty cells and no winner, game continues
    if (!cell.innerText) {
      gameStatus.gameOver = false;
      return gameStatus;
    }
  }
  // game is over, and result is a tie
  return gameStatus;
}

function endGame(status) {
  if (status.win) {
    turnIndicator.innerText = yourTurn ? 'X WON!' : 'O WON!';
  } else {
    turnIndicator.innerText = 'TIE GAME';
  }
  const cellKeys = cells.keys();
  let delay = 0.25;
  for (const index of cellKeys) {
    if (status.win && status.win.includes(index)) {
      cells.item(
        index
      ).style = `color: red; animation: 0.25s ease-in-out ${delay}s pop;`;
      delay += 0.125;
    } else {
      cells.item(index).style = 'color: gray;';
    }
    cells.item(index).removeEventListener('click', playTurn);
  }
  setTimeout(() => {
    dialog.style = 'position: absolute; display: flex;';
  }, 1000);
}

function replay(playAgain) {
  dialog.removeAttribute('style');
  if (playAgain) location.reload();
}

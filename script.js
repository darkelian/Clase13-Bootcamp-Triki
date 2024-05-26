document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById('board');
    const vsPlayerButton = document.getElementById('vsPlayer');
    const vsAIButton = document.getElementById('vsAI');
    const player1WinsDisplay = document.getElementById('player1Wins');
    const player2WinsDisplay = document.getElementById('player2Wins');
    const tiesDisplay = document.getElementById('ties');

    const player1 = 'X';
    const player2 = 'O';
    let currentPlayer = player1;
    let gameMode = 'player'; // 'player' or 'ai'
    let gameActive = true;
    let boardState = ['', '', '', '', '', '', '', '', ''];

    let player1Wins = 0;
    let player2Wins = 0;
    let ties = 0;

    vsPlayerButton.addEventListener('click', () => startGame('player'));
    vsAIButton.addEventListener('click', () => startGame('ai'));

    function startGame(mode) {
        gameMode = mode;
        gameActive = true;
        currentPlayer = player1;
        boardState = ['', '', '', '', '', '', '', '', ''];
        board.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }

    function handleCellClick(event) {
        const index = event.target.dataset.index;
        if (boardState[index] === '' && gameActive) {
            boardState[index] = currentPlayer;
            event.target.textContent = currentPlayer;
            if (checkWin()) {
                gameActive = false;
                if (currentPlayer === player1) {
                    player1Wins++;
                    player1WinsDisplay.textContent = `Jugador 1: ${player1Wins} victorias`;
                } else {
                    player2Wins++;
                    player2WinsDisplay.textContent = `Jugador 2: ${player2Wins} victorias`;
                }
            } else if (boardState.every(cell => cell !== '')) {
                ties++;
                tiesDisplay.textContent = `Empates: ${ties}`;
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === player1 ? player2 : player1;
                if (gameMode === 'ai' && currentPlayer === player2) {
                    makeAIMove();
                }
            }
        }
    }

    function makeAIMove() {
        let availableCells = boardState.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
        let move = availableCells[Math.floor(Math.random() * availableCells.length)];
        boardState[move] = player2;
        document.querySelector(`.cell[data-index='${move}']`).textContent = player2;
        if (checkWin()) {
            gameActive = false;
            player2Wins++;
            player2WinsDisplay.textContent = `Jugador 2: ${player2Wins} victorias`;
        } else if (boardState.every(cell => cell !== '')) {
            ties++;
            tiesDisplay.textContent = `Empates: ${ties}`;
            gameActive = false;
        } else {
            currentPlayer = player1;
        }
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
        });
    }
});

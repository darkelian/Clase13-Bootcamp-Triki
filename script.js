// Espera a que todo el contenido del DOM esté cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", () => {
    // Referencias a los elementos del DOM
    const startScreen = document.getElementById('blackhole');
    const gameScreen = document.getElementById('gameScreen');
    const centerHover = document.querySelector('.centerHover');
    const board = document.getElementById('board');
    const vsPlayerButton = document.getElementById('vsPlayer');
    const vsAIButton = document.getElementById('vsAI');
    const player1WinsDisplay = document.getElementById('player1Wins');
    const player2WinsDisplay = document.getElementById('player2Wins');
    const tiesDisplay = document.getElementById('ties');
    const resultCard = document.getElementById('resultCard');
    const resultMessage = document.getElementById('resultMessage');
    const retryButton = document.getElementById('retryButton');

    // Constantes y variables del juego
    const player1 = 'X';
    const player2 = 'O';
    let currentPlayer = player1;
    let gameMode = 'player'; // 'player' or 'ai'
    let gameActive = true;
    let boardState = ['', '', '', '', '', '', '', '', ''];

    let player1Wins = 0;
    let player2Wins = 0;
    let ties = 0;

    // Maneja el evento de clic en el botón de inicio (centerHover)
    centerHover.addEventListener('click', () => {
        centerHover.classList.add('open');
        setTimeout(() => {
            startScreen.classList.add('hidden');
            gameScreen.classList.add('active');
            startGame('player');
        }, 2000); // Tiempo de espera para la animación antes de iniciar el juego
    });

    // Maneja el evento de clic en los botones de selección de modo de juego
    vsPlayerButton.addEventListener('click', () => startGame('player'));
    vsAIButton.addEventListener('click', () => startGame('ai'));
    retryButton.addEventListener('click', resetGame);

    // Inicializa el juego en el modo seleccionado
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
        resultCard.classList.add('hidden');
    }

    // Maneja el evento de clic en una celda del tablero
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
                    showResult(`¡Jugador 1 gana!`);
                } else {
                    player2Wins++;
                    player2WinsDisplay.textContent = `Jugador 2: ${player2Wins} victorias`;
                    showResult(`¡Jugador 2 gana!`);
                }
            } else if (boardState.every(cell => cell !== '')) {
                ties++;
                tiesDisplay.textContent = `Empates: ${ties}`;
                showResult(`¡Es un empate!`);
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === player1 ? player2 : player1;
                if (gameMode === 'ai' && currentPlayer === player2) {
                    makeAIMove();
                }
            }
        }
    }

    // Realiza el movimiento de la IA
    function makeAIMove() {
        const bestMoveProbability = 0.7; // 70% de tomar el mejor movimiento
        let move;
        if (Math.random() < bestMoveProbability) {
            move = getBestMove(); // Tomar el mejor movimiento
        } else {
            move = getRandomMove(); // Tomar un movimiento aleatorio
        }
        boardState[move] = player2;
        document.querySelector(`.cell[data-index='${move}']`).textContent = player2;
        if (checkWin()) {
            gameActive = false;
            player2Wins++;
            player2WinsDisplay.textContent = `Jugador 2: ${player2Wins} victorias`;
            showResult(`¡Jugador 2 gana!`);
        } else if (boardState.every(cell => cell !== '')) {
            ties++;
            tiesDisplay.textContent = `Empates: ${ties}`;
            showResult(`¡Es un empate!`);
            gameActive = false;
        } else {
            currentPlayer = player1;
        }
    }

    // Calcula el mejor movimiento para la IA
    function getBestMove() {
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < boardState.length; i++) {
            if (boardState[i] === '') {
                boardState[i] = player2;
                let score = minimax(boardState, 0, false);
                boardState[i] = '';
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        return move;
    }

    // Obtiene un movimiento aleatorio
    function getRandomMove() {
        let availableMoves = boardState.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
        return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    // Algoritmo Minimax para calcular el mejor movimiento
    function minimax(board, depth, isMaximizing) {
        let scores = {
            'X': -1,
            'O': 1,
            'tie': 0
        };
        let result = checkWinner(board);
        if (result !== null) {
            return scores[result];
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = player2;
                    let score = minimax(board, depth + 1, false);
                    board[i] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === '') {
                    board[i] = player1;
                    let score = minimax(board, depth + 1, true);
                    board[i] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    // Verifica si hay un ganador
    function checkWinner(board) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        if (board.every(cell => cell !== '')) {
            return 'tie';
        }
        return null;
    }

    // Verifica si hay un ganador en el estado actual del tablero
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

    // Muestra el resultado del juego
    function showResult(message) {
        resultMessage.textContent = message;
        resultCard.classList.remove('hidden');
    }

    // Reinicia el juego
    function resetGame() {
        startGame(gameMode);
    }

    // Función para la animación del agujero negro
    blackhole('#blackhole');

    function blackhole(element) {
        var h = window.innerHeight,
            w = window.innerWidth,
            cw = w,
            ch = h,
            maxorbit = 255, // distancia desde el centro
            centery = ch / 2,
            centerx = cw / 2;

        var startTime = new Date().getTime();
        var currentTime = 0;

        var stars = [],
            collapse = false, // si está en hover
            expanse = false; // si está en clic

        var canvas = $('<canvas/>').attr({ width: cw, height: ch }).appendTo(element),
            context = canvas.get(0).getContext("2d");

        context.globalCompositeOperation = "multiply";

        // Configuración de DPI para el canvas
        function setDPI(canvas, dpi) {
            if (!canvas.get(0).style.width)
                canvas.get(0).style.width = canvas.get(0).width + 'px';
            if (!canvas.get(0).style.height)
                canvas.get(0).style.height = canvas.get(0).height + 'px';

            var scaleFactor = dpi / 96;
            canvas.get(0).width = Math.ceil(canvas.get(0).width * scaleFactor);
            canvas.get(0).height = Math.ceil(canvas.get(0).height * scaleFactor);
            var ctx = canvas.get(0).getContext('2d');
            ctx.scale(scaleFactor, scaleFactor);
        }

        // Función de rotación para las estrellas
        function rotate(cx, cy, x, y, angle) {
            var radians = angle,
                cos = Math.cos(radians),
                sin = Math.sin(radians),
                nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
                ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
            return [nx, ny];
        }

        setDPI(canvas, 192);

        // Clase de estrella
        var star = function () {
            var rands = [];
            rands.push(Math.random() * (maxorbit / 2) + 1);
            rands.push(Math.random() * (maxorbit / 2) + maxorbit);

            this.orbital = (rands.reduce(function (p, c) {
                return p + c;
            }, 0) / rands.length);

            this.x = centerx;
            this.y = centery + this.orbital;

            this.yOrigin = centery + this.orbital;

            this.speed = (Math.floor(Math.random() * 2.5) + 1.5) * Math.PI / 180;
            this.rotation = 0;
            this.startRotation = (Math.floor(Math.random() * 360) + 1) * Math.PI / 180;

            this.id = stars.length;

            this.collapseBonus = this.orbital - (maxorbit * 0.7);
            if (this.collapseBonus < 0) {
                this.collapseBonus = 0;
            }

            stars.push(this);
            this.color = 'rgba(255,255,255,' + (1 - ((this.orbital) / 255)) + ')';

            this.hoverPos = centery + (maxorbit / 2) + this.collapseBonus;
            this.expansePos = centery + (this.id % 100) * -10 + (Math.floor(Math.random() * 20) + 1);

            this.prevR = this.startRotation;
            this.prevX = this.x;
            this.prevY = this.y;
        }

        // Dibuja la estrella en el canvas
        star.prototype.draw = function () {
            if (!expanse) {
                this.rotation = this.startRotation + (currentTime * this.speed);
                if (!collapse) {
                    if (this.y > this.yOrigin) {
                        this.y -= 2.5;
                    }
                    if (this.y < this.yOrigin - 4) {
                        this.y += (this.yOrigin - this.y) / 10;
                    }
                } else {
                    this.trail = 1;
                    if (this.y > this.hoverPos) {
                        this.y -= (this.hoverPos - this.y) / -5;
                    }
                    if (this.y < this.hoverPos - 4) {
                        this.y += 2.5;
                    }
                }
            } else {
                this.rotation = this.startRotation + (currentTime * (this.speed / 2));
                if (this.y > this.expansePos) {
                    this.y -= Math.floor(this.expansePos - this.y) / -140;
                }
            }

            context.save();
            context.fillStyle = this.color;
            context.strokeStyle = this.color;
            context.beginPath();
            var oldPos = rotate(centerx, centery, this.prevX, this.prevY, -this.prevR);
            context.moveTo(oldPos[0], oldPos[1]);
            context.translate(centerx, centery);
            context.rotate(this.rotation);
            context.translate(-centerx, -centery);
            context.lineTo(this.x, this.y);
            context.stroke();
            context.restore();

            this.prevR = this.rotation;
            this.prevX = this.x;
            this.prevY = this.y;
        }

        // Maneja el evento de mouseover en el centro del hover
        $('.centerHover').on('mouseover', function () {
            if (expanse == false) {
                collapse = true;
            }
        });

        // Maneja el evento de mouseout en el centro del hover
        $('.centerHover').on('mouseout', function () {
            if (expanse == false) {
                collapse = false;
            }
        });

        // Maneja el evento de clic en el centro del hover
        $('.centerHover').on('click', function () {
            collapse = false;
            expanse = true;

            $(this).addClass('open');
            setTimeout(function () {
                startScreen.classList.add('hidden');
                gameScreen.classList.add('active');
                startGame('player');
            }, 2000);
        });

        // Función de animación
        window.requestFrame = (function () {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        })();

        // Bucle de animación
        function loop() {
            var now = new Date().getTime();
            currentTime = (now - startTime) / 50;

            context.fillStyle = 'rgba(25,25,25,0.2)';
            context.fillRect(0, 0, cw, ch);

            for (var i = 0; i < stars.length; i++) {
                if (stars[i] != stars) {
                    stars[i].draw();
                }
            }

            requestFrame(loop);
        }

        // Inicializa la animación
        function init(time) {
            context.fillStyle = 'rgba(25,25,25,1)';
            context.fillRect(0, 0, cw, ch);
            for (var i = 0; i < 2500; i++) {
                new star();
            }
            loop();
        }
        init();
    }
});

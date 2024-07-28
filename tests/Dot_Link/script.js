document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    const restartButton = document.getElementById('restartButton');

    const colors = ['red', 'green', 'blue'];
    const positions = [
        [0, 0], [4, 0], // Red dots
        [1, 4], [3, 4], // Green dots
        [0, 3], [4, 3]  // Blue dots
    ];
    let dots = [];
    let selectedDot = null;
    let lines = [];

    function initializeGame() {
        gameBoard.innerHTML = '';
        dots = [];
        lines = [];
        for (let y = 0; y < 5; y++) {
            for (let x = 0; x < 5; x++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.dataset.x = x;
                cell.dataset.y = y;
                gameBoard.appendChild(cell);
            }
        }
        placeDots();
    }

    function placeDots() {
        positions.forEach((pos, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.style.backgroundColor = colors[Math.floor(index / 2)];
            dot.dataset.color = colors[Math.floor(index / 2)];
            dot.dataset.x = pos[0];
            dot.dataset.y = pos[1];
            const cell = getCell(pos[0], pos[1]);
            cell.appendChild(dot);
            dots.push(dot);
            dot.addEventListener('mousedown', onDotMouseDown);
        });
    }

    function getCell(x, y) {
        return gameBoard.querySelector(`.cell[data-x="${x}"][data-y="${y}"]`);
    }

    function onDotMouseDown(event) {
        selectedDot = event.target;
        document.addEventListener('mousemove', onDotMouseMove);
        document.addEventListener('mouseup', onDotMouseUp);
    }

    function onDotMouseMove(event) {
        if (!selectedDot) return;
        const { clientX, clientY } = event;
        const { left, top } = gameBoard.getBoundingClientRect();
        const x = clientX - left;
        const y = clientY - top;

        drawTemporaryLine(selectedDot, x, y);
    }

    function onDotMouseUp(event) {
        document.removeEventListener('mousemove', onDotMouseMove);
        document.removeEventListener('mouseup', onDotMouseUp);

        const { clientX, clientY } = event;
        const { left, top } = gameBoard.getBoundingClientRect();
        const x = Math.floor((clientX - left) / 60);
        const y = Math.floor((clientY - top) / 60);
        const targetCell = getCell(x, y);
        const targetDot = targetCell.querySelector('.dot');

        if (targetDot && targetDot.dataset.color === selectedDot.dataset.color && targetDot !== selectedDot) {
            drawLine(selectedDot, targetDot);
        }

        selectedDot = null;
    }

    function drawTemporaryLine(dot, x, y) {
        const line = document.createElement('div');
        line.classList.add('line');
        const startX = dot.dataset.x * 60 + 30;
        const startY = dot.dataset.y * 60 + 30;
        const length = Math.hypot(x - startX, y - startY);
        const angle = Math.atan2(y - startY, x - startX) * (180 / Math.PI);
        line.style.width = `${length}px`;
        line.style.transform = `rotate(${angle}deg)`;
        line.style.top = `${startY}px`;
        line.style.left = `${startX}px`;
        if (lines.length > 0) {
            gameBoard.removeChild(lines.pop());
        }
        gameBoard.appendChild(line);
        lines.push(line);
    }

    function drawLine(dot1, dot2) {
        const line = document.createElement('div');
        line.classList.add('line');
        const startX = dot1.dataset.x * 60 + 30;
        const startY = dot1.dataset.y * 60 + 30;
        const endX = dot2.dataset.x * 60 + 30;
        const endY = dot2.dataset.y * 60 + 30;
        const length = Math.hypot(endX - startX, endY - startY);
        const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
        line.style.width = `${length}px`;
        line.style.transform = `rotate(${angle}deg)`;
        line.style.top = `${startY}px`;
        line.style.left = `${startX}px`;
        gameBoard.appendChild(line);
        lines.push(line);

        checkWinCondition();
    }

    function checkWinCondition() {
        if (lines.length === 3) {
            alert('You win!');
        }
    }

    restartButton.addEventListener('click', initializeGame);

    initializeGame();
});

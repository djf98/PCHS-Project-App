const grid = document.getElementById('grid');
const readyButton = document.getElementById('readyButton');
const submitButton = document.getElementById('submitButton');
const message = document.getElementById('message');
const resultMessage = document.getElementById('resultMessage');

let sequence = [];
let userSequence = [];
let phase = 1;
const maxPhase = 16;
const totalTiles = 36;

// Initialize grid
for (let i = 0; i < totalTiles; i++) {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.dataset.index = i;
    tile.addEventListener('click', () => handleTileClick(tile));
    grid.appendChild(tile);
}

readyButton.addEventListener('click', startGame);
submitButton.addEventListener('click', checkSequence);

function startGame() {
    readyButton.style.display = 'none';
    resultMessage.textContent = '';
    message.textContent = 'Memorize the sequence...';
    userSequence = [];
    lightUpTiles(phase);
}

function lightUpTiles(num) {
    sequence = generateUniqueRandomNumbers(num, totalTiles);
    console.log('Sequence to light up:', sequence); // Log the sequence to be lit up
    const tiles = document.querySelectorAll('.tile');

    sequence.forEach((index, i) => {
        setTimeout(() => {
            console.log('Lighting up tile:', index); // Log the tile being lit
            tiles[index].classList.add('lit');
        }, i * 500); // stagger lighting up by 250ms
    });

    setTimeout(() => {
        tiles.forEach(tile => tile.classList.remove('lit'));
        enableTileSelection();
    }, 500 + (num - 1) * 500); // Adjust timeout to ensure all tiles light up
}

function generateUniqueRandomNumbers(num, max) {
    const numbers = new Set();
    while (numbers.size < num) {
        numbers.add(Math.floor(Math.random() * max));
    }
    return Array.from(numbers);
}

function enableTileSelection() {
    message.textContent = 'Select the tiles you remember...';
    submitButton.style.display = 'block';
    userSequence = [];
}

function handleTileClick(tile) {
    if (submitButton.style.display === 'block') {
        const index = parseInt(tile.dataset.index);
        if (userSequence.includes(index)) {
            userSequence = userSequence.filter(i => i !== index);
            tile.classList.remove('lit');
        } else {
            userSequence.push(index);
            tile.classList.add('lit');
        }
    }
}

function checkSequence() {
    const tiles = document.querySelectorAll('.tile');
    tiles.forEach(tile => tile.classList.remove('lit'));
    submitButton.style.display = 'none';

    if (arraysEqual(sequence, userSequence)) {
        resultMessage.textContent = 'Correct!';
        phase++;
        if (phase > maxPhase) {
            phase = maxPhase;
        }
        setTimeout(startGame, 2000);
    } else {
        resultMessage.textContent = `Incorrect. Score: ${phase}`;
        readyButton.style.display = 'block';
        phase = 1;
    }
}

function arraysEqual(a, b) {
    return a.length === b.length && a.every((value, index) => value === b[index]);
}

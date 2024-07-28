const gameBoard = document.getElementById('game-board');
const congratsScreen = document.getElementById('congrats-screen');
const timeTakenDisplay = document.getElementById('time-taken');
const incorrectMatchesDisplay = document.getElementById('incorrect-matches');
const restartButton = document.getElementById('restart-button');

const cardsArray = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
    'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];
let cards = [];
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let incorrectMatches = 0;
let startTime, endTime;

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    shuffle(cardsArray);
    cardsArray.forEach((char) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.char = char;

        const front = document.createElement('div');
        front.classList.add('front');
        front.textContent = char;

        const back = document.createElement('div');
        back.classList.add('back');

        card.appendChild(front);
        card.appendChild(back);

        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
        cards.push(card);
    });
    startTime = new Date().getTime();
}

function flipCard() {
    if (lockBoard || this === firstCard) return;
    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.dataset.char === secondCard.dataset.char;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
    if (cards.every(card => card.classList.contains('flip'))) {
        endTime = new Date().getTime();
        showCongratsScreen();
    }
}

function unflipCards() {
    incorrectMatches++;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function showCongratsScreen() {
    const timeTaken = (endTime - startTime) / 1000;
    timeTakenDisplay.textContent = timeTaken.toFixed(2);
    incorrectMatchesDisplay.textContent = incorrectMatches;
    gameBoard.classList.add('hidden');
    congratsScreen.classList.remove('hidden');
}

restartButton.addEventListener('click', () => {
    congratsScreen.classList.add('hidden');
    gameBoard.classList.remove('hidden');
    gameBoard.innerHTML = '';
    cards = [];
    incorrectMatches = 0;
    createBoard();
});

// Initialize the game
createBoard();

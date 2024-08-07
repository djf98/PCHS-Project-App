class MemoryGame {
    /**
     * Initializes the Memory Game
     * Sets up DOM elements, game variables, and loads settings from localStorage
     */
    constructor() {
        // DOM element references
        this.numberDisplay = document.getElementById('number-display');
        this.userInput = document.getElementById('user-input');
        this.startButton = document.getElementById('start-button');
        this.submitButton = document.getElementById('submit-button');
        this.result = document.getElementById('result');
        this.scoreDisplay = document.getElementById('score');
        this.roundDisplay = document.getElementById('round-display');

        // Game state variables
        this.sequence = [];
        this.userSequence = '';
        this.incorrectNumbers = 0;
        this.currentRound = 0;

        // Game settings (loaded from localStorage or set to default values)
        this.totalRounds = parseInt(localStorage.getItem('gameRounds')) || 5;
        this.sequenceLength = parseInt(localStorage.getItem('sequenceLength')) || 5;
        this.displayTime = parseFloat(localStorage.getItem('displayTime')) || 1;
        this.gameMode = localStorage.getItem('gameMode') || 'normal';

        this.updateRoundDisplay();
        this.bindEvents();
    }

    /**
     * Binds event listeners to game buttons and user input
     */
    bindEvents() {
        this.startButton.addEventListener('click', () => this.startGame());
        this.submitButton.addEventListener('click', () => this.checkSequence());
        this.userInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                this.checkSequence();
            }
        });
    }

    /**
     * Generates a random sequence of numbers based on the current sequence length
     */
    generateSequence() {
        this.sequence = Array.from({length: this.sequenceLength}, () => Math.floor(Math.random() * 10));
    }

    /**
     * Displays the generated sequence to the user
     * @param {number} index - The current index in the sequence being displayed
     */
    displaySequence(index = 0) {
        if (index < this.sequence.length) {
            this.numberDisplay.textContent = this.sequence[index];
            setTimeout(() => {
                this.numberDisplay.textContent = '';
                setTimeout(() => this.displaySequence(index + 1), 100); // 0.1 second pause
            }, this.displayTime * 1000);
        } else {
            this.numberDisplay.textContent = this.gameMode === 'normal' ? 'Your turn!' : 'Enter reverse order!';
            this.userInput.disabled = false;
            this.submitButton.disabled = false;
            this.userInput.focus();
        }
    }

    /**
     * Starts a new game or round
     */
    startGame() {
        if (this.currentRound === 0) {
            this.incorrectNumbers = 0;
            this.updateScoreDisplay();
            // Reload settings from localStorage in case they were changed
            this.totalRounds = parseInt(localStorage.getItem('gameRounds')) || 5;
            this.sequenceLength = parseInt(localStorage.getItem('sequenceLength')) || 5;
            this.displayTime = parseFloat(localStorage.getItem('displayTime')) || 1;
            this.gameMode = localStorage.getItem('gameMode') || 'normal';
        }
        this.currentRound++;
        this.updateRoundDisplay();
        this.generateSequence();
        this.startButton.disabled = true;
        this.userInput.value = '';
        this.result.textContent = '';
        this.displaySequence();
    }

    /**
     * Checks the user's input against the correct sequence
     */
    checkSequence() {
        this.userSequence = this.userInput.value;
        let incorrectInThisRound = 0;
        const compareSequence = this.gameMode === 'normal' ? this.sequence : this.sequence.slice().reverse();
        
        for (let i = 0; i < this.sequence.length; i++) {
            if (this.userSequence[i] !== compareSequence[i].toString()) {
                incorrectInThisRound++;
            }
        }
        this.incorrectNumbers += incorrectInThisRound;
        this.updateScoreDisplay();

        if (incorrectInThisRound === 0) {
            this.result.textContent = 'Correct! Well done!';
            this.result.style.color = 'green';
        } else {
            const correctSequence = this.gameMode === 'normal' ? this.sequence.join('') : this.sequence.slice().reverse().join('');
            this.result.textContent = `You got ${incorrectInThisRound} number(s) wrong. The correct sequence was ${correctSequence}.`;
            this.result.style.color = 'red';
        }
        
        this.userInput.disabled = true;
        this.submitButton.disabled = true;

        if (this.currentRound < this.totalRounds) {
            setTimeout(() => this.startGame(), 3000);
        } else {
            this.endGame();
        }
    }

    /**
     * Updates the score display with the current number of incorrect answers
     */
    updateScoreDisplay() {
        this.scoreDisplay.textContent = this.incorrectNumbers;
    }

    /**
     * Updates the round display with the current round number and total rounds
     */
    updateRoundDisplay() {
        this.roundDisplay.textContent = `Round: ${this.currentRound} / ${this.totalRounds}`;
    }

    /**
     * Ends the game and displays the final score
     */
    endGame() {
        this.numberDisplay.textContent = 'Game Over!';
        this.result.textContent = `You got a total of ${this.incorrectNumbers} number(s) wrong out of ${this.totalRounds * this.sequenceLength} numbers.`;
        this.result.style.color = 'black';
        this.startButton.disabled = false;
        this.startButton.textContent = 'Play Again';
        this.currentRound = 0;
    }
}

// Create an instance of the game
const game = new MemoryGame();
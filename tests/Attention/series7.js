/**
 * Represents a Serial 7s Test implementation
 */
class Serial7sTest {
    /**
     * Initializes the Serial 7s Test
     * Sets up DOM elements, test variables, and loads settings from localStorage
     */
    constructor() {
        // DOM element references
        this.startButton = document.getElementById('start');
        this.submitButton = document.getElementById('submit');
        this.answerInput = document.getElementById('answer');
        this.answersDisplay = document.getElementById('answers');
        this.scoreDisplay = document.getElementById('score');
        this.inputArea = document.getElementById('input-area');

        // Test state variables
        this.answers = [];
        this.currentNumber = 100;
        this.subtractionCount = 0;
        
        // Test settings (loaded from localStorage or set to default value)
        this.calculationCount = parseInt(localStorage.getItem('calculationCount')) || 5;

        this.bindEvents();
        this.initialize();
    }

    /**
     * Binds event listeners to test buttons
     */
    bindEvents() {
        this.startButton.addEventListener('click', () => this.startTest());
        this.submitButton.addEventListener('click', () => this.submitAnswer());
    }

    /**
     * Initializes the test UI
     */
    initialize() {
        this.inputArea.style.display = 'none';
    }

    /**
     * Starts a new test
     */
    startTest() {
        this.answers = [];
        this.currentNumber = 100;
        this.subtractionCount = 0;
        this.calculationCount = parseInt(localStorage.getItem('calculationCount')) || 5;
        this.answersDisplay.textContent = '';
        this.scoreDisplay.textContent = '';
        this.startButton.style.display = 'none';
        this.inputArea.style.display = 'block';
        this.answerInput.focus();
    }

    /**
     * Submits and processes the user's answer
     */
    submitAnswer() {
        const userAnswer = parseInt(this.answerInput.value);
        if (isNaN(userAnswer)) return;

        this.answers.push(userAnswer);
        this.answersDisplay.textContent = this.answers.join(' - ');
        this.answerInput.value = '';

        this.subtractionCount++;
        if (this.subtractionCount === this.calculationCount) {
            this.endTest();
        } else {
            this.answerInput.focus();
        }
    }

    /**
     * Ends the test and displays the final score
     */
    endTest() {
        this.inputArea.style.display = 'none';
        this.startButton.style.display = 'inline-block';
        this.startButton.textContent = 'Restart Test';

        const score = this.calculateScore();
        this.scoreDisplay.textContent = score + ' out of 3';
    }
    
    /**
     * Calculates the score based on the user's answers
     * @returns {number} The calculated score (0-3)
     */
    calculateScore() {
        let correctSubtractions = 0;
        let incorrectSubtractions = 0;
        let previousNumber = 100;

        for (let i = 0; i < this.answers.length; i++) {
            if (this.answers[i] === previousNumber - 7) {
                correctSubtractions++;
            } else {
                incorrectSubtractions++;
            }
            previousNumber = this.answers[i];
        }

        if (correctSubtractions === 0) return 0;
        if (correctSubtractions === 1) return 1;
        if (correctSubtractions == 2 || correctSubtractions == 3) return 2;
        if (correctSubtractions >= this.calculationCount - 1) return 3;
    }
}

// Create an instance of the test when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Serial7sTest();
});
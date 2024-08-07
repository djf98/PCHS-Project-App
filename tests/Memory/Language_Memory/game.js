class VerbalMemoryTest {
    constructor() {
        this.subjects = {
            "Animals": ["Cat", "Dog", "Elephant", "Lion", "Tiger", "Bear", "Giraffe", "Monkey", "Zebra", "Kangaroo"],
            "Colors": ["Red", "Blue", "Green", "Yellow", "Purple", "Orange", "Pink", "Brown", "Black", "White"],
            "Fruits": ["Apple", "Banana", "Orange", "Grape", "Strawberry", "Pineapple", "Mango", "Kiwi", "Peach", "Cherry"],
            "Countries": ["USA", "Canada", "Brazil", "France", "Germany", "Japan", "Australia", "India", "China", "Russia"],
            "Sports": ["Football", "Basketball", "Tennis", "Soccer", "Golf", "Swimming", "Volleyball", "Baseball", "Cricket", "Hockey"],
            "Professions": ["Doctor", "Teacher", "Engineer", "Chef", "Lawyer", "Artist", "Pilot", "Nurse", "Scientist", "Actor"],
            "Vehicles": ["Car", "Bicycle", "Bus", "Train", "Airplane", "Motorcycle", "Boat", "Helicopter", "Truck", "Scooter"],
            "Furniture": ["Chair", "Table", "Bed", "Sofa", "Desk", "Bookshelf", "Wardrobe", "Mirror", "Lamp", "Dresser"],
            "Instruments": ["Guitar", "Piano", "Violin", "Drums", "Flute", "Trumpet", "Saxophone", "Cello", "Clarinet", "Harp"],
            "Weather": ["Sunny", "Rainy", "Cloudy", "Windy", "Snowy", "Foggy", "Stormy", "Hail", "Hurricane", "Tornado"]
        };

        this.currentSubject = null;
        this.currentWords = null;
        this.selectedTiles = [];
        this.currentRound = 1;
        this.totalRounds = 2;
        this.score = 0;
        this.maxScore = 4;
        this.correctClicks = 0;

        this.gridElement = document.getElementById("grid");
        this.startButton = document.getElementById("start-button");
        this.submitButton = document.getElementById("submit-button");
        this.resultElement = document.getElementById("result");
        this.roundDisplay = document.getElementById("round-display");
        this.scoreElement = document.getElementById("score");

        this.startButton.addEventListener("click", () => this.startGame());
        this.submitButton.addEventListener("click", () => this.submitAnswer());
    }

    startGame() {
        this.startButton.style.display = "none";
        this.submitButton.disabled = true;
        this.resultElement.textContent = "";
        this.selectedTiles = [];
        this.correctClicks = 0;
        this.score = 0;
        this.currentRound = 1;

        this.startRound();
    }

    startRound() {
        this.currentSubject = this.getRandomSubject();
        this.currentWords = this.subjects[this.currentSubject];
        
        this.createGrid(2, this.currentWords.slice(0, 4));
        this.updateRoundDisplay();
        
        setTimeout(() => {
            this.createGrid(6, [...this.currentWords, ...this.getRandomWords(26)]);
            this.submitButton.disabled = false;
        }, 10000);
    }

    createGrid(size, words) {
        this.gridElement.innerHTML = "";
        this.gridElement.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

        this.shuffleArray(words);

        words.forEach(word => {
            const tile = document.createElement("div");
            tile.className = "tile";
            tile.textContent = word;
            tile.addEventListener("click", () => this.toggleTile(tile, word));
            this.gridElement.appendChild(tile);
        });
    }

    toggleTile(tile, word) {
        tile.classList.toggle("selected");
        const index = this.selectedTiles.indexOf(word);
        if (index === -1) {
            this.selectedTiles.push(word);
            if (this.currentWords.includes(word)) {
                this.correctClicks++;
            }
        } else {
            this.selectedTiles.splice(index, 1);
            if (this.currentWords.includes(word)) {
                this.correctClicks--;
            }
        }
    }

    submitAnswer() {
        const correctWords = new Set(this.currentWords);
        const selectedWords = new Set(this.selectedTiles);

        const wrongSelections = this.selectedTiles.filter(word => !correctWords.has(word));
        const missedWords = this.currentWords.filter(word => !selectedWords.has(word));

        let message = "";

        if (wrongSelections.length === 0 && missedWords.length === 0) {
            message = "Congratulations! You found all the correct words!";
        } else {
            if (wrongSelections.length > 0) {
                message += `Wrong selections: ${wrongSelections.join(", ")}\n`;
            }
            if (missedWords.length > 0) {
                message += `Missed words: ${missedWords.join(", ")}`;
            }
        }

        // Update score based on correct clicks
        this.score += this.correctClicks;

        this.resultElement.textContent = message;
        this.updateScore();

        this.submitButton.disabled = true;

        if (this.currentRound < this.totalRounds) {
            this.currentRound++;
            this.startRound();
        } else {
            this.endGame();
        }
    }

    getRandomSubject() {
        const subjectKeys = Object.keys(this.subjects);
        return subjectKeys[Math.floor(Math.random() * subjectKeys.length)];
    }

    getRandomWords(count) {
        const allWords = Object.values(this.subjects).flat();
        const randomWords = [];
        for (let i = 0; i < count; i++) {
            const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
            if (!this.currentWords.includes(randomWord) && !randomWords.includes(randomWord)) {
                randomWords.push(randomWord);
            } else {
                i--;
            }
        }
        return randomWords;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    updateRoundDisplay() {
        this.roundDisplay.textContent = `Round: ${this.currentRound} / ${this.totalRounds}`;
    }

    updateScore() {
        this.scoreElement.textContent = `${this.score} / ${this.maxScore * this.totalRounds}`;
    }

    endGame() {
        this.startButton.style.display = "inline-block";
        this.startButton.textContent = "Play Again";
        this.resultElement.textContent = `Game Over! Final Score: ${this.score} / ${this.maxScore * this.totalRounds}`;
    }
}

// Initialize the game
const game = new VerbalMemoryTest();
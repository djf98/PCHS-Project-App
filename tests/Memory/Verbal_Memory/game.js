


class VerbalMemoryTest {
    constructor() {
        this.words = ['bear', 'wolf', 'lion', 'tiger', 'frog', 'duck', 'goat', 'pig', 'cow', 'horse', 'sheep', 'deer', 'fox', 'owl', 
            'bee', 'ant', 'spider', 'snake', 'worm', 'rabbit', 'mouse', 'rat', 'whale', 'shark', 'seal', 'crab', 'ship', 'boat', 'train', 
            'plane', 'bike', 'truck', 'bus', 'taxi', 'mall', 'bank', 'cafe', 'farm', 'beach', 'forest', 'garden', 'bridge', 'tower', 'hotel', 
            'church', 'temple', 'mosque', 'jail', 'court', 'king', 'queen', 'prince', 'judge', 'actor', 'nurse', 'chef', 'pilot', 'agent', 'clerk', 
            'farmer', 'doctor', 'lawyer', 'artist', 'singer', 'floor', 'wall', 'roof', 'window', 'sofa', 'table', 'clock', 'phone', 'radio', 'oven', 
            'sink', 'bath', 'toilet', 'brush', 'soap', 'towel', 'sheet', 'pillow', 'blanket', 'coat', 'pants', 'skirt', 'sock', 'boot', 'glove', 'scarf',
            'belt', 'ring', 'watch', 'necklace', 'fork', 'spoon', 'knife', 'plate', 'bowl', 'glass', 'cup', 'bottle', 'jug', 'pot', 'pan', 'bowl', 'bucket',
            'rope', 'wire', 'tape', 'glue', 'tape', 'nail', 'screw', 'bolt', 'wheel', 'tire', 'pipe', 'brick', 'beam', 'wood', 'metal', 'glass', 'stone',
            'cave', 'cliff', 'mud', 'dust', 'ashes', 'steam', 'fog', 'dawn', 'dusk', 'night', 'noon', 'spring', 'summer', 'fall', 'winter', 'north',
            'south', 'east', 'west', 'map', 'flag', 'team', 'club', 'group', 'crowd', 'file', 'list', 'note', 'card', 'letter', 'story', 'poem',
            'joke', 'game', 'song', 'film', 'show', 'news', 'gift', 'tax', 'bill', 'loan', 'debt', 'cash', 'check', 'sale', 'rent', 'fine',
            'crime', 'law', 'rule', 'war', 'peace', 'death', 'birth', 'health', 'rush', 'rest', 'plan', 'goal', 'task', 'risk', 'deal',
            'test', 'race', 'trip', 'tour', 'date', 'party', 'prom', 'fair', 'vote', 'poll', 'pray', 'bless', 'curse', 'save', 'spend',
            'earn', 'pay', 'owe', 'lend', 'borrow', 'trade', 'hire', 'train', 'learn', 'teach', 'study', 'solve', 'count', 'add', 'join',
            'mix', 'pour', 'stir', 'beat', 'chop', 'slice', 'grate', 'fry', 'boil', 'bake', 'burn', 'shine', 'glow', 'fade', 'melt', 'freeze',
            'bloom', 'wilt', 'plant', 'dig', 'spray', 'water', 'trim', 'shape', 'bend', 'twist', 'wrap', 'pack', 'sort', 'hang', 'hide', 'seek',
            'chase', 'catch', 'throw', 'kick', 'hit', 'punch', 'hug', 'kiss', 'touch', 'taste', 'smell', 'hear', 'see', 'watch', 'look', 'stare',
            'glare', 'frown', 'grin', 'wink', 'nod', 'wave', 'point', 'tap', 'pat', 'rub', 'scratch', 'pinch', 'squeeze', 'shake', 'blow', 'suck',
            'spit', 'cough', 'sneeze', 'yawn', 'snore', 'sweat', 'bleed', 'heal', 'alive', 'dead', 'sick', 'well', 'safe', 'hurt', 'free', 'stuck',
            'lost', 'found', 'alone', 'fun', 'dull', 'easy', 'hard', 'rough', 'smooth', 'sharp', 'dull', 'deep', 'shallow', 'thick', 'thin', 'heavy',
            'light', 'shiny', 'dull', 'clear', 'fuzzy', 'plain', 'fancy', 'neat', 'messy', 'early', 'late', 'quick', 'slow', 'brave', 'scared', 'bold',
            'shy', 'wise', 'silly', 'wild', 'tame', 'odd', 'even', 'fair', 'unfair', 'real', 'fake', 'true', 'false', 'right', 'wrong', 'sure', 'vague',
            'same', 'different', 'whole', 'half', 'much', 'less', 'more', 'few', 'main', 'minor', 'top', 'bottom', 'front', 'back', 'left', 'right',
            'near', 'far', 'inner', 'outer', 'upper', 'lower', 'past', 'present', 'future'];
 
        this.grid = document.getElementById('grid');
        this.roundDisplay = document.getElementById('round-display');
        this.startButton = document.getElementById('start-button');
        this.submitButton = document.getElementById('submit-button');
        this.result = document.getElementById('result');
        this.score = document.getElementById('score');
        this.selectedWords = [];
        this.correctWords = [];
        this.isInitialGrid = true;
        this.isTestSubmitted = false;
        this.currentRound = 1;

        this.gridSize = parseInt(localStorage.getItem('gridSize') || '6');
        this.subjectTiles = parseInt(localStorage.getItem('subjectTiles') || '10');
        this.totalWords = this.gridSize * this.gridSize;
        this.totalCorrectTiles = this.subjectTiles;

        this.totalRounds = parseInt(localStorage.getItem('rounds')) || 2;
        this.gridSize = parseInt(localStorage.getItem('gridSize')) || 6;
        this.wordsToRemember = Math.min(4, Math.floor(this.gridSize * this.gridSize / 4));

        this.updateRoundDisplay();

        this.startButton.addEventListener('click', () => this.startGame());
        this.submitButton.addEventListener('click', () => this.checkAnswers());
    }

    startRound() {
        this.currentSubject = this.getRandomSubject();
        this.currentWords = this.subjects[this.currentSubject].slice(0, this.subjectTiles);
        
        this.createGrid(2, this.currentWords.slice(0, 4));
        this.updateRoundDisplay();
        
        setTimeout(() => {
            this.createGrid(this.gridSize, [...this.currentWords, ...this.getRandomWords(this.totalWords - this.subjectTiles)]);
            this.submitButton.disabled = false;
        }, 10000);
    }

    updateRoundDisplay() {
        this.roundDisplay.textContent = `Round: ${this.currentRound} / ${this.totalRounds}`;
    }

    startGame() {
        this.showInitialGrid();
        this.startButton.disabled = true;
        this.submitButton.disabled = true;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
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

    createGrid(size, words) {
        this.grid.innerHTML = '';
        this.grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
        this.grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
        words.forEach(word => {
            const div = document.createElement('div');
            div.textContent = word;
            div.classList.add('word');
            if (!this.isInitialGrid) {
                div.addEventListener('click', () => this.toggleSelection(div));
            }
            this.grid.appendChild(div);
        });
    }

    toggleSelection(div) {
        if (!this.isInitialGrid && !this.isTestSubmitted) {
            div.classList.toggle('clicked');
        }
    }

    showInitialGrid() {
        this.isInitialGrid = true;
        this.shuffleArray(this.words);
        this.correctWords = this.words.slice(0, this.wordsToRemember);
        this.createGrid(Math.ceil(Math.sqrt(this.wordsToRemember)), this.correctWords);
        this.result.textContent = 'Remember these words';
        this.roundDisplay.textContent = `Round: ${this.currentRound} / 2`;

        setTimeout(() => {
            this.grid.innerHTML = '';
            this.result.textContent = 'Memorizing...';
        }, 5000);

        setTimeout(() => this.showFinalGrid(), 6000);
    }

    showFinalGrid() {
        this.isInitialGrid = false;
        this.isTestSubmitted = false;
        this.shuffleArray(this.words);
        
        const totalWords = this.gridSize * this.gridSize;
        let testWords = [...this.correctWords];
        let remainingWords = this.words.filter(word => !this.correctWords.includes(word));
        this.shuffleArray(remainingWords);
        testWords = testWords.concat(remainingWords.slice(0, totalWords - this.wordsToRemember));
        
        this.shuffleArray(testWords);
        
        this.createGrid(this.gridSize, testWords);
        this.result.textContent = 'Click on the words you saw before';
        this.submitButton.disabled = false;
    }

    checkAnswers() {
        this.isTestSubmitted = true;
        const clickedDivs = this.grid.querySelectorAll('.clicked');
        this.selectedWords = Array.from(clickedDivs).map(div => div.textContent);
        
        clickedDivs.forEach(div => {
            if (this.correctWords.includes(div.textContent)) {
                div.classList.add('correct');
            } else {
                div.classList.add('incorrect');
            }
            div.classList.remove('clicked');
        });

        this.grid.querySelectorAll('.word').forEach(div => {
            if (this.correctWords.includes(div.textContent) && !div.classList.contains('correct')) {
                div.classList.add('correct');
            }
        });

        const correctCount = this.selectedWords.filter(word => this.correctWords.includes(word)).length;
        const incorrectCount = this.selectedWords.length - correctCount;
        
        this.result.textContent = `Correct: ${correctCount}, Incorrect: ${incorrectCount}`;
        this.score.textContent = `${correctCount} / 4`;

        if (this.currentRound < this.totalRounds) {
            this.currentRound++;
            this.startButton.textContent = 'Next Round';
            this.startButton.disabled = false;
            this.submitButton.disabled = true;
        } else {
            this.startButton.textContent = 'Start New Game';
            this.startButton.disabled = false;
            this.submitButton.disabled = true;
            this.currentRound = 1;
        }

        this.updateRoundDisplay();
    }
}

// Initialize the test
const test = new VerbalMemoryTest();
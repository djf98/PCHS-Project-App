document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const startGameButton = document.getElementById('start-game');
    const instructionsModal = document.getElementById('start-screen');
    const messageModal = document.getElementById('message-modal');
    const messageText = document.getElementById('message-text');
    const messageOkButton = document.getElementById('message-ok');
    const congratsModal = document.getElementById('congrats-modal');
    const timeTakenElement = document.getElementById('time-taken');
    const playAgainButton = document.getElementById('play-again');
    const completedGroupsContainer = document.getElementById('completed-groups');
    const homeButton = document.getElementById('home-button');

    const words = [
        "Forest", "Mint", "Lime", "Olive",
        "Coffee", "Tea", "Red Bull", "Coca-Cola",
        "Plane", "Eagle", "Rocket", "Helicopter",
        "Gouda", "Mozzarella", "Cheddar", "Swiss"
    ];

    const correctGroups = {
        'Shades of Green': ["Forest", "Mint", "Lime", "Olive"],
        'Drinks that have caffeine': ["Coffee", "Tea", "Red Bull", "Coca-Cola"],
        'Things that fly': ["Plane", "Eagle", "Rocket", "Helicopter"],
        'Types of Cheese': ["Gouda", "Mozzarella", "Cheddar", "Swiss"]
    };

    let selectedButtons = [];
    let correctSelections = new Set();
    let startTime;

    startGameButton.addEventListener('click', () => {
        instructionsModal.style.display = 'none';
        initializeGame();
        homeButton.style.display = 'block';
        startTime = new Date();
    });

    messageOkButton.addEventListener('click', () => {
        messageModal.style.display = 'none';
        selectedButtons.forEach(button => button.classList.remove('incorrect', 'selected'));
        selectedButtons = [];
    });

    playAgainButton.addEventListener('click', () => {
        location.reload();
    });

    homeButton.addEventListener('click', () => {
        window.location.href = 'index.html';
});

    function initializeGame() {
        shuffle(words);
        words.forEach(word => {
            const button = document.createElement('button');
            button.textContent = word;
            button.addEventListener('click', () => handleButtonClick(button));
            gameContainer.appendChild(button);
        });
    }

    function handleButtonClick(button) {
        if (correctSelections.has(button)) return;

        if (selectedButtons.includes(button)) {
            button.classList.remove('selected');
            selectedButtons = selectedButtons.filter(btn => btn !== button);
        } else {
            button.classList.add('selected');
            selectedButtons.push(button);
        }

        if (selectedButtons.length === 4) {
            checkSelection();
        }
    }

    function checkSelection() {
        const selectedWords = selectedButtons.map(btn => btn.textContent);
        let isCorrect = false;
        let theme = '';

        for (const [groupTheme, groupWords] of Object.entries(correctGroups)) {
            if (arrayEquals(selectedWords, groupWords)) {
                isCorrect = true;
                theme = groupTheme;
                break;
            }
        }

        if (isCorrect) {
            selectedButtons.forEach(button => {
                button.classList.add('correct');
                button.classList.remove('selected');
                correctSelections.add(button);
                button.removeEventListener('click', handleButtonClick);
            });

            const groupElement = document.createElement('div');
            groupElement.classList.add('group');
            groupElement.innerHTML = `<strong>${theme}</strong>: ${selectedWords.join(', ')}`;
            completedGroupsContainer.appendChild(groupElement);

            selectedButtons.forEach(button => gameContainer.removeChild(button));
            selectedButtons = [];

            if (correctSelections.size === 16) {
                const endTime = new Date();
                const timeTaken = Math.floor((endTime - startTime) / 1000);
                timeTakenElement.textContent = `${timeTaken} seconds`;
                congratsModal.style.display = 'flex';
                homeButton.style.display = 'none';
            }
        } else {
            selectedButtons.forEach(button => button.classList.add('incorrect'));
            messageText.textContent = 'Try Again!';
            messageModal.style.display = 'flex';
        }
    }

    function arrayEquals(arr1, arr2) {
        return arr1.sort().join(',') === arr2.sort().join(',');
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
});

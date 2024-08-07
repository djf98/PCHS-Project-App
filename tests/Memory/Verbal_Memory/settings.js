document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('settings-form');
    const roundsInput = document.getElementById('rounds');
    const gridSizeSelect = document.getElementById('grid-size');

    // Load saved settings
    const savedRounds = localStorage.getItem('rounds');
    const savedGridSize = localStorage.getItem('gridSize');

    if (savedRounds) roundsInput.value = savedRounds;
    if (savedGridSize) gridSizeSelect.value = savedGridSize;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const rounds = roundsInput.value;
        const gridSize = gridSizeSelect.value;

        // Save settings to localStorage
        localStorage.setItem('rounds', rounds);
        localStorage.setItem('gridSize', gridSize);

        alert('Settings saved!');
    });
});
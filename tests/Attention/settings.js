/**
 * Event listener for when the DOM content is fully loaded.
 * This sets up the settings page functionality.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const roundsInput = document.getElementById('rounds');
    const sequenceLengthInput = document.getElementById('sequence-length');
    const displayTimeInput = document.getElementById('display-time');
    const gameModeSelect = document.getElementById('game-mode');
    const saveButton = document.getElementById('save-settings');

    // Load current settings from localStorage, or use default values if not set
    const currentRounds = localStorage.getItem('gameRounds') || 5;
    const currentSequenceLength = localStorage.getItem('sequenceLength') || 5;
    const currentDisplayTime = localStorage.getItem('displayTime') || 1;
    const currentGameMode = localStorage.getItem('gameMode') || 'normal';
    
    // Set input values to current settings
    roundsInput.value = currentRounds;
    sequenceLengthInput.value = currentSequenceLength;
    displayTimeInput.value = currentDisplayTime;
    gameModeSelect.value = currentGameMode;

    /**
     * Event listener for the save button.
     * Validates and saves the user's settings to localStorage.
     */
    saveButton.addEventListener('click', () => {
        // Parse input values
        const rounds = parseInt(roundsInput.value);
        const sequenceLength = parseInt(sequenceLengthInput.value);
        const displayTime = parseFloat(displayTimeInput.value);
        const gameMode = gameModeSelect.value;

        // Validate input values
        if (rounds >= 1 && rounds <= 20 && 
            sequenceLength >= 3 && sequenceLength <= 10 && 
            displayTime >= 0.5 && displayTime <= 5) {
            // Save valid settings to localStorage
            localStorage.setItem('gameRounds', rounds);
            localStorage.setItem('sequenceLength', sequenceLength);
            localStorage.setItem('displayTime', displayTime);
            localStorage.setItem('gameMode', gameMode);
            alert('Settings saved!');
        } else {
            // Alert user if input is invalid
            alert('Please enter valid values. Rounds should be between 1 and 20, sequence length should be between 3 and 10, and display time should be between 0.5 and 5 seconds.');
        }
    });
});
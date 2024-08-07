/**
 * Manages the settings for the Serial 7s Test
 */
class SettingsManager {
    /**
     * Initializes the SettingsManager
     * Sets up DOM elements, binds events, and loads existing settings
     */
    constructor() {
        // DOM element references
        this.calculationCountInput = document.getElementById('calculationCount');
        this.saveButton = document.getElementById('saveSettings');

        this.bindEvents();
        this.loadSettings();
    }

    /**
     * Binds event listeners to the save button
     */
    bindEvents() {
        this.saveButton.addEventListener('click', () => this.saveSettings());
    }

    /**
     * Loads existing settings from localStorage and populates the input field
     */
    loadSettings() {
        const calculationCount = localStorage.getItem('calculationCount') || 5;
        this.calculationCountInput.value = calculationCount;
    }

    /**
     * Saves the user's settings to localStorage after validation
     */
    saveSettings() {
        const calculationCount = parseInt(this.calculationCountInput.value);
        if (calculationCount >= 1 && calculationCount <= 10) {
            localStorage.setItem('calculationCount', calculationCount);
            alert('Settings saved!');
        } else {
            alert('Please enter a number between 1 and 10.');
        }
    }
}

// Create an instance of the SettingsManager when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new SettingsManager();
});
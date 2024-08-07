document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('settings-form');
    const gridSizeSelect = document.getElementById('grid-size');
    const subjectTilesInput = document.getElementById('subject-tiles');

    // Load saved settings
    const savedGridSize = localStorage.getItem('gridSize') || '6';
    const savedSubjectTiles = localStorage.getItem('subjectTiles') || '10';
    
    gridSizeSelect.value = savedGridSize;
    subjectTilesInput.value = savedSubjectTiles;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const gridSize = gridSizeSelect.value;
        const subjectTiles = subjectTilesInput.value;
        
        // Validate subject tiles
        if (subjectTiles < 1 || subjectTiles > 10) {
            alert('Number of subject tiles must be between 1 and 10');
            return;
        }

        localStorage.setItem('gridSize', gridSize);
        localStorage.setItem('subjectTiles', subjectTiles);
        alert('Settings saved!');
    });
});
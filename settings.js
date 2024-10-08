// Get the modal
var modal = document.getElementById("settingsModal");

// Get the button that opens the modal
var gearIcon = document.getElementById("settings-gear");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the gear icon, open the modal
gearIcon.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Open and Close Export/Load Modals
function openExportModal() {
    document.getElementById('exportModal').style.display = 'block';
}
function closeExportModal() {
    document.getElementById('exportModal').style.display = 'none';
}
function openLoadModal() {
    document.getElementById('loadModal').style.display = 'block';
}
function closeLoadModal() {
    document.getElementById('loadModal').style.display = 'none';
}

// Handle Export Game
function exportGame() {
    const savedGameData = localStorage.getItem('medievalCivilizationsGameData');
    if (savedGameData) {
        const base64Data = btoa(savedGameData); // Base64 encode the game data
        document.getElementById('export-output').value = base64Data; // Show encoded data in output field
        document.getElementById('load-input').value = base64Data; // Automatically paste into load input
        openExportModal(); // Open export modal
    } else {
        console.warn('No game progress found to export');
    }
}

// Handle Load Game
function loadGame() {
    openLoadModal(); // Open load modal
}

// Load game data from Base64
function loadGameFromBase64() {
    const base64Data = document.getElementById('load-input').value.trim();
    if (base64Data) {
        try {
            const jsonData = atob(base64Data); // Decode Base64
            localStorage.setItem('medievalCivilizationsGameData', jsonData);
            loadGameFromLocalStorage(); // Load from localStorage
            console.log('Game progress loaded successfully from Base64');
            closeLoadModal(); // Close load modal
        } catch (error) {
            console.error('Failed to load game data:', error);
            alert('Invalid code. Please check the format.');
        }
    } else {
        alert('Please paste exported code in the text area to load.');
    }
}

// Copy to Clipboard Function
function copyToClipboard() {
    const output = document.getElementById('export-output');
    output.select();
    document.execCommand('copy'); // Copy the selected text
    alert('Exported game progress copied to clipboard!');

    // Optionally, focus on the load input field for immediate pasting
    document.getElementById('load-input').focus();
}

// Reset Game Progress
function resetGameProgress() {
    if (confirm('Are you sure you want to reset your entire game progress? This action cannot be undone!')) {
        // Clear all relevant game progress from localStorage
        localStorage.removeItem('medievalCivilizationsGameData'); // Clear game progress data
        localStorage.removeItem('gameStartTime'); // Clear gameStartTime
        // Add any additional localStorage keys that need to be cleared here

        // Reset game variables to their initial state
        coins = 0;
        woodcuttingLevel = 0;
        miningLevel = 0;
        passiveIncome = 0;
        knightCount = 0;
        archerCount = 0;
        wizardCount = 0;
        paladinCount = 0;
        pikemanCount = 0;
        crossbowmanCount = 0;
        catapultCount = 0;
        mongolHorsemanCount = 0;
        lastSaveTime = Date.now(); // Reset last save time

        // Reset the speedrun timer variable
        gameStartTime = Date.now(); // Reset game start time to now
        localStorage.setItem('gameStartTime', gameStartTime); // Update localStorage

        alert('Game progress has been reset.');
        location.reload(); // Reload the game to start fresh
    }
}


// Load game data on startup
loadGameFromLocalStorage();

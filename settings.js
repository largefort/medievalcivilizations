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

// Open Export Modal
function openExportModal() {
    document.getElementById('export-modal').style.display = 'block';
}

// Close Export Modal
function closeExportModal() {
    document.getElementById('export-modal').style.display = 'none';
}

// Open Load Modal
function openLoadModal() {
    document.getElementById('load-modal').style.display = 'block';
}

// Close Load Modal
function closeLoadModal() {
    document.getElementById('load-modal').style.display = 'none';
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

// Load game data on startup
loadGameFromLocalStorage();

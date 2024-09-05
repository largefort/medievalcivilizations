// Load game data from localStorage if available
function loadGameFromLocalStorage() {
    const savedGameData = localStorage.getItem('medievalCivilizationsGameData');
    if (savedGameData) {
        const gameData = JSON.parse(savedGameData);
        coins = gameData.coins || coins;
        knightCount = gameData.knightCount || knightCount;
        archerCount = gameData.archerCount || archerCount;
        wizardCount = gameData.wizardCount || wizardCount;
        woodcuttingLevel = gameData.woodcuttingLevel || woodcuttingLevel;
        miningLevel = gameData.miningLevel || miningLevel;
        paladinCount = gameData.paladinCount || paladinCount;
        pikemanCount = gameData.pikemanCount || pikemanCount;
        crossbowmanCount = gameData.crossbowmanCount || crossbowmanCount;
        catapultCount = gameData.catapultCount || catapultCount;
        mongolHorsemanCount = gameData.mongolHorsemanCount || mongolHorsemanCount;
        passiveIncome = gameData.passiveIncome || passiveIncome;
        lastSaveTime = gameData.lastSaveTime || lastSaveTime;
        baseCoinsPerClick = gameData.baseCoinsPerClick || baseCoinsPerClick;
    }
}

// Save game data to localStorage
function saveGameToLocalStorage() {
    const gameData = {
        coins: coins,
        knightCount: knightCount,
        archerCount: archerCount,
        wizardCount: wizardCount,
        woodcuttingLevel: woodcuttingLevel,
        miningLevel: miningLevel,
        paladinCount: paladinCount,
        pikemanCount: pikemanCount,
        crossbowmanCount: crossbowmanCount,
        catapultCount: catapultCount,
        mongolHorsemanCount: mongolHorsemanCount,
        passiveIncome: passiveIncome,
        lastSaveTime: lastSaveTime,
        baseCoinsPerClick: baseCoinsPerClick
    };
    localStorage.setItem('medievalCivilizationsGameData', JSON.stringify(gameData));
}

// Export game data as a .txt file using download.js
function exportGame() {
    const savedGameData = localStorage.getItem('medievalCivilizationsGameData');
    if (savedGameData) {
        // Download game data as a .txt file
        download(savedGameData, 'medievalCivilizationsGameData.txt', 'text/plain');
    } else {
        alert('No game data found to export.');
    }
}

// Show file input to load game data
function loadGame() {
    document.getElementById('file-input').click(); // Trigger file input click
}

// Handle file selection for importing game data
function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const importedData = e.target.result;
            try {
                // Parse the imported JSON data
                const gameData = JSON.parse(importedData);
                // Save imported data to localStorage
                localStorage.setItem('medievalCivilizationsGameData', JSON.stringify(gameData));
                // Reload game data to apply the imported data
                loadGameFromLocalStorage();
                alert('Game data imported successfully!');
            } catch (error) {
                alert('Invalid file format. Please import a valid game data file.');
            }
        };
        reader.readAsText(file);
    }
}

// Load game data on startup
loadGameFromLocalStorage();

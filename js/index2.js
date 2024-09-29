document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    console.log('Cordova is ready!');

    // Load game data on startup after Cordova is ready
    loadGameFromLocalStorage();
}

// Load game data using MediaStore (using readFile method)
function importGameProgress() {
    const folder = 'medieval_game_data';
    const filename = 'gameProgress.json';

    cordova.plugins.safMediastore.getUri({ folder, filename })
        .then(uri => {
            return cordova.plugins.safMediastore.readFile(uri);
        })
        .then(fileBuffer => {
            const loadedGameState = new TextDecoder().decode(fileBuffer);
            const gameData = JSON.parse(loadedGameState);
            localStorage.setItem('medievalCivilizationsGameData', loadedGameState);
            loadGameFromLocalStorage();
            console.log('Game progress loaded successfully from MediaStore');
        })
        .catch(err => {
            console.error('Failed to load game progress from MediaStore:', err);
        });
}

// Export game data using MediaStore (using writeFile method)
function exportGameProgress() {
    const savedGameData = localStorage.getItem('medievalCivilizationsGameData');
    const folder = 'medieval_game_data';
    const filename = 'gameProgress.json';

    if (savedGameData) {
        cordova.plugins.safMediastore.writeFile({
            data: savedGameData,
            filename: filename,
            folder: folder
        })
        .then(() => {
            console.log('Game progress exported successfully to MediaStore');
        })
        .catch(err => {
            console.error('Failed to export game progress to MediaStore:', err);
        });
    } else {
        console.warn('No game progress found to export');
    }
}

// Get file name from URI using MediaStore (getFileName method)
function getFileNameFromUri(uri) {
    cordova.plugins.safMediastore.getFileName(uri)
        .then(filename => {
            console.log('File name retrieved:', filename);
        })
        .catch(err => {
            console.error('Failed to get file name:', err);
        });
}

// Select a file using URI (using selectFile method)
function selectGameFile(uri) {
    cordova.plugins.safMediastore.selectFile(uri)
        .then(fileUri => {
            console.log('File selected:', fileUri);
            return cordova.plugins.safMediastore.readFile(fileUri);
        })
        .then(fileBuffer => {
            const fileContent = new TextDecoder().decode(fileBuffer);
            localStorage.setItem('medievalCivilizationsGameData', fileContent);
            loadGameFromLocalStorage();
            console.log('Game progress loaded successfully from selected file');
        })
        .catch(err => {
            console.error('Failed to select or read file:', err);
        });
}

// Open a file using URI (openFile method)
function openGameFile(uri) {
    cordova.plugins.safMediastore.openFile(uri)
        .then(() => {
            console.log('File opened successfully:', uri);
        })
        .catch(err => {
            console.error('Failed to open file:', err);
        });
}

// Read file content using URI (readFile method)
function readFileFromUri(uri) {
    cordova.plugins.safMediastore.readFile(uri)
        .then(fileBuffer => {
            const fileContent = new TextDecoder().decode(fileBuffer);
            console.log('File content:', fileContent);
        })
        .catch(err => {
            console.error('Failed to read file:', err);
        });
}

// Trigger file input for loading game progress (using selectFile)
function triggerFileInput() {
    cordova.plugins.safMediastore.getUri({ folder: 'medieval_game_data', filename: 'gameProgress.json' })
        .then(uri => {
            return cordova.plugins.safMediastore.selectFile(uri);
        })
        .then(fileUri => {
            return cordova.plugins.safMediastore.readFile(fileUri);
        })
        .then(fileBuffer => {
            const fileContent = new TextDecoder().decode(fileBuffer);
            localStorage.setItem('medievalCivilizationsGameData', fileContent);
            loadGameFromLocalStorage();
            console.log('Game progress loaded successfully from file');
        })
        .catch(err => {
            console.error('Failed to select or load file:', err);
        });
}

// Export game progress on button click
function exportGame() {
    exportGameProgress();
}

// Load game progress on button click
function loadGame() {
    importGameProgress();
}

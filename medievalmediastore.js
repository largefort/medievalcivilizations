// Utility function to convert data to base64
function toBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

// Utility function to convert base64 to data
function fromBase64(base64) {
  return decodeURIComponent(escape(atob(base64)));
}

// Function to select a file using SAF Mediastore plugin
async function selectFile() {
  try {
    const result = await cordova.plugins.safMediastore.selectFile();
    return result;
  } catch (error) {
    console.error('Error selecting file:', error);
    alert('Error selecting file: ' + error.message);
    throw error;
  }
}

// Function to read a file as ArrayBuffer using SAF Mediastore plugin
async function readFile(uri) {
  try {
    const result = await cordova.plugins.safMediastore.readFile(uri);
    return result;
  } catch (error) {
    console.error('Error reading file:', error);
    alert('Error reading file: ' + error.message);
    throw error;
  }
}

// Function to write data to a file using SAF Mediastore plugin
async function writeFile(params) {
  try {
    const result = await cordova.plugins.safMediastore.writeFile(params);
    return result;
  } catch (error) {
    console.error('Error writing file:', error);
    alert('Error writing file: ' + error.message);
    throw error;
  }
}

// Function to update game UI
function loadGameUI(gameData) {
  document.getElementById("counter").textContent = `Gold coins: ${compactNumberFormat(gameData.coins)}`;
  document.getElementById("knight-count").textContent = gameData.knightCount;
  document.getElementById("archer-count").textContent = gameData.archerCount;
  document.getElementById("wizard-count").textContent = gameData.wizardCount;
  document.getElementById("woodcutting-level").textContent = gameData.woodcuttingLevel;
  document.getElementById("mining-level").textContent = gameData.miningLevel;
  document.getElementById("paladin-count").textContent = gameData.paladinCount;
}

// Function to update upgrade costs
function loadUpgradeCosts(gameData) {
  document.getElementById("knight-cost").textContent = Math.floor(10 * Math.pow(1.15, gameData.knightCount));
  document.getElementById("archer-cost").textContent = Math.floor(25 * Math.pow(1.15, gameData.archerCount));
  document.getElementById("wizard-cost").textContent = Math.floor(50 * Math.pow(1.15, gameData.wizardCount));
  document.getElementById("paladin-cost").textContent = Math.floor(100 * Math.pow(1.15, gameData.paladinCount));
}

// Function to load passive income rates
function loadPassiveIncomeRates(gameData) {
  const knightIncomeRate = 1;        // Adjust the income rate for knights
  const archerIncomeRate = 2;        // Adjust the income rate for archers
  const wizardIncomeRate = 4;        // Adjust the income rate for wizards
  const paladinIncomeRate = 8;       // Adjust the income rate for paladins

  const totalIncomeRate = (
    (knightIncomeRate * gameData.knightCount) +
    (archerIncomeRate * gameData.archerCount) +
    (wizardIncomeRate * gameData.wizardCount) +
    (paladinIncomeRate * gameData.paladinCount)
  );

  document.getElementById("income-rate").textContent = `Passive Income Rate: ${totalIncomeRate} coins per second`;
}

// Function to earn passive income
function earnPassiveIncome() {
  const currentTime = Date.now();
  const timeDifference = currentTime - lastSaveTime;
  const offlinePassiveIncome = Math.floor(passiveIncome * (timeDifference / 1000));

  coins += offlinePassiveIncome;
  lastSaveTime = currentTime; // Update the last save time

  saveGameData();
  updateUI();
}

setInterval(earnPassiveIncome, 1000); // Call earnPassiveIncome every second

// Function to export game data
async function exportGame() {
  // Example game data variables (replace with your actual game data variables)
  var coins = 1000;
  var knightCount = 5;
  var archerCount = 3;
  var wizardCount = 2;
  var woodcuttingLevel = 2;
  var miningLevel = 1;
  var paladinCount = 1;
  var lastSaveTime = Date.now(); // Store the current time when exporting

  // Create an object with the game data
  var gameData = {
    coins: coins,
    knightCount: knightCount,
    archerCount: archerCount,
    wizardCount: wizardCount,
    woodcuttingLevel: woodcuttingLevel,
    miningLevel: miningLevel,
    paladinCount: paladinCount,
    lastSaveTime: lastSaveTime // Include last save time in the exported data
  };

  var fileName = "medievalcivilizations.txt"; // File name
  var jsonData = JSON.stringify(gameData);
  var base64Data = toBase64(jsonData); // Convert JSON data to base64

  try {
    // Write base64 game data to a file
    const params = {
      data: base64Data,
      filename: fileName
    };
    const result = await writeFile(params);
    console.log('Game exported successfully to:', result);
    alert('Game exported successfully!');
  } catch (error) {
    console.error('Error exporting game:', error);
    alert('Failed to export game data.');
  }
}

// Function to load game data
async function loadGame() {
  var fileName = "medievalcivilizations.txt"; // File name

  try {
    // Select a file
    const fileUri = await selectFile();
    if (!fileUri) {
      alert('File selection was cancelled.');
      return;
    }

    // Read the selected file
    const fileContent = await readFile(fileUri);
    const base64Data = new TextDecoder("utf-8").decode(fileContent);
    const jsonData = fromBase64(base64Data); // Convert base64 data back to JSON
    const gameData = JSON.parse(jsonData);

    // Example: Load game data into your game logic
    var coins = gameData.coins;
    var knightCount = gameData.knightCount;
    var archerCount = gameData.archerCount;
    var wizardCount = gameData.wizardCount;
    var woodcuttingLevel = gameData.woodcuttingLevel;
    var miningLevel = gameData.miningLevel;
    var paladinCount = gameData.paladinCount;
    var lastSaveTime = gameData.lastSaveTime; // Load the last save time

    console.log("Loaded game data:");
    console.log("Coins:", coins);
    console.log("Knight Count:", knightCount);
    console.log("Archer Count:", archerCount);
    console.log("Wizard Count:", wizardCount);
    console.log("Woodcutting Level:", woodcuttingLevel);
    console.log("Mining Level:", miningLevel);
    console.log("Paladin Count:", paladinCount);
    console.log("Last Save Time:", lastSaveTime);

    // Update the game UI
    loadGameUI(gameData);
    loadUpgradeCosts(gameData);
    loadPassiveIncomeRates(gameData);

    alert('Game loaded successfully!');
  } catch (error) {
    console.error('Error loading game:', error);
    alert('Failed to load game data.');
  }
}

// Event listeners for buttons
document.getElementById('export-btn').addEventListener('click', exportGame);
document.getElementById('load-btn').addEventListener('click', loadGame);

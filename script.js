let coins = 10;
let knightCount = 0;
let archerCount = 0;
let wizardCount = 0;
let woodcuttingLevel = 1;
let miningLevel = 1;
let paladinCount = 0;
let pikemanCount = 0;
let crossbowmanCount = 0;
let catapultCount = 0;
let mongolHorsemanCount = 0;
let passiveIncome = 0;
let lastSaveTime = Date.now(); // Initialize lastSaveTime with the current time
let baseCoinsPerClick = 0;

// Add an HTML audio element for the upgrade sound
document.write(`
<audio id="upgradeSound">
    <source src="upgradesound.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
</audio>
`);

// Preload the click sound
const clickSound = new Audio("click-sound.mp3");

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

// Load game data on startup
loadGameFromLocalStorage();

// Function to toggle music
function toggleMusic() {
    const medievalThemeAudio = document.getElementById("medievaltheme");
    if (medievalThemeAudio.paused) {
        medievalThemeAudio.play();
    } else {
        medievalThemeAudio.pause();
    }
}

// Function to toggle sound effects
function toggleSoundEffects() {
    const clickSoundAudio = document.getElementById("click-sound");
    const upgradeSoundAudio = document.getElementById("upgradeSound");
    const toggleSfxCheckbox = document.getElementById("toggle-sfx");

    // Check the state of the toggle-sfx checkbox
    if (toggleSfxCheckbox.checked) {
        // If the checkbox is checked, mute the sound effects
        clickSoundAudio.muted = true;
        upgradeSoundAudio.muted = true;
    } else {
        // If the checkbox is not checked, unmute the sound effects
        clickSoundAudio.muted = false;
        upgradeSoundAudio.muted = false;
    }
}

// Add event listeners to the checkboxes
document.getElementById("toggle-music").addEventListener("change", toggleMusic);
document.getElementById("toggle-sfx").addEventListener("change", toggleSoundEffects);

// Initialize gameStartTime, check localStorage first
let gameStartTime = localStorage.getItem('gameStartTime');

if (!gameStartTime) {
    // If no start time is found in localStorage, set it to the current time
    gameStartTime = Date.now();
    localStorage.setItem('gameStartTime', gameStartTime);
}

// Function to update stats and timer
function updateStatsUI() {
    const currentTime = Date.now();

    // Update stats
    document.getElementById("stat-coins").textContent = compactNumberFormat(coins);
    document.getElementById("stat-woodcutting").textContent = woodcuttingLevel;
    document.getElementById("stat-mining").textContent = miningLevel;
    document.getElementById("stat-passive-income").textContent = compactNumberFormat(passiveIncome);

    // Calculate total units purchased
    const totalUnits = knightCount + archerCount + wizardCount + paladinCount + pikemanCount + crossbowmanCount + catapultCount + mongolHorsemanCount;
    document.getElementById("stat-units").textContent = totalUnits;

    // Calculate offline earnings since last save
    const timeDifference = currentTime - lastSaveTime;
    const offlinePassiveIncome = Math.floor(passiveIncome * (timeDifference / 1000));
    document.getElementById("stat-offline-earnings").textContent = compactNumberFormat(offlinePassiveIncome);

    // Calculate and update the speed run timer
    const timePlayed = Math.floor((currentTime - gameStartTime) / 1000); // Time played in seconds
    const hours = Math.floor(timePlayed / 3600);
    const minutes = Math.floor((timePlayed % 3600) / 60);
    const seconds = timePlayed % 60;

    // Format the speed run timer
    const formattedTime = `${hours}h ${minutes}m ${seconds}s`;
    document.getElementById("stat-speedrun-timer").textContent = formattedTime;
}

// Save the current game state including start time whenever necessary
function saveGameState() {
    localStorage.setItem('gameStartTime', gameStartTime);
    // Save other game state data if needed
}

// Call saveGameState function periodically or when the game is about to close
window.addEventListener('beforeunload', saveGameState);

// Update stats every second
setInterval(updateStatsUI, 1000)

function updateUI() {
    document.getElementById("counter").textContent = `Gold coins: ${compactNumberFormat(coins)}`;
    document.getElementById("knight-count").textContent = knightCount;
    document.getElementById("archer-count").textContent = archerCount;
    document.getElementById("wizard-count").textContent = wizardCount;
    document.getElementById("woodcutting-level").textContent = woodcuttingLevel;
    document.getElementById("mining-level").textContent = miningLevel;
    document.getElementById("paladin-count").textContent = paladinCount;
    document.getElementById("pikeman-count").textContent = pikemanCount;
    document.getElementById("crossbowman-count").textContent = crossbowmanCount;
    document.getElementById("catapult-count").textContent = catapultCount;
    document.getElementById("mongol-horseman-count").textContent = mongolHorsemanCount;
    document.getElementById("knight-purchase-count").textContent = knightCount;
    document.getElementById("archer-purchase-count").textContent = archerCount;
    document.getElementById("wizard-purchase-count").textContent = wizardCount;
    document.getElementById("paladin-purchase-count").textContent = paladinCount;
    document.getElementById("pikeman-purchase-count").textContent = pikemanCount;
    document.getElementById("crossbowman-purchase-count").textContent = crossbowmanCount;
    document.getElementById("catapult-purchase-count").textContent = catapultCount;
    document.getElementById("mongol-horseman-purchase-count").textContent = mongolHorsemanCount;

    updatePassiveIncome();
    updateUpgradeCosts();
}

// Function to calculate total coins per click
function getCoinsPerClick() {
    return baseCoinsPerClick +
           knightCount * 1 +
           archerCount * 1 +
           wizardCount * 1 +
           paladinCount * 1 +
           pikemanCount * 1 +
           crossbowmanCount * 1 +
           catapultCount * 1 +
           mongolHorsemanCount * 1;
}

function clickCastle(event) {
    const coinsGained = getCoinsPerClick();
    coins += coinsGained;
    updateUI();

    // Play the preloaded click sound
    clickSound.play();

    // Create floating text
    const floatingText = document.createElement('div');
    floatingText.className = 'floating-text';
    floatingText.innerText = `+${coinsGained}`;

    // Position the floating text at the mouse cursor, adjusted for scroll
    floatingText.style.left = `${event.clientX}px`;
    floatingText.style.top = `${event.clientY}px`;

    // Add the floating text to the body
    document.body.appendChild(floatingText);

    // Remove the floating text after the animation completes
    setTimeout(() => {
        floatingText.remove();
    }, 1000); // Match this duration with the CSS animation duration
}

function buyUpgrade(type) {
    let cost = 0;

    switch (type) {
        case "knight":
            cost = Math.floor(10 * Math.pow(1.15, knightCount)); // Exponential cost increase
            if (coins >= cost) {
                coins -= cost;
                knightCount++;
            }
            break;
        case "archer":
            cost = Math.floor(25 * Math.pow(1.15, archerCount)); // Exponential cost increase
            if (coins >= cost) {
                coins -= cost;
                archerCount++;
            }
            break;
        case "wizard":
            cost = Math.floor(50 * Math.pow(1.15, wizardCount)); // Exponential cost increase
            if (coins >= cost) {
                coins -= cost;
                wizardCount++;
            }
            break;
        case "paladin":
            cost = Math.floor(100 * Math.pow(1.15, paladinCount)); // Exponential cost increase
            if (coins >= cost) {
                coins -= cost;
                paladinCount++;
            }
            break;
        case "pikeman":
            cost = Math.floor(15 * Math.pow(1.15, pikemanCount)); // Exponential cost increase
            if (coins >= cost) {
                coins -= cost;
                pikemanCount++;
            }
            break;
        case "crossbowman":
            cost = Math.floor(30 * Math.pow(1.15, crossbowmanCount)); // Exponential cost increase
            if (coins >= cost) {
                coins -= cost;
                crossbowmanCount++;
            }
            break;
        case "catapult":
            cost = Math.floor(75 * Math.pow(1.15, catapultCount)); // Exponential cost increase
            if (coins >= cost) {
                coins -= cost;
                catapultCount++;
            }
            break;
        case "mongolHorseman":
            cost = Math.floor(50 * Math.pow(1.15, mongolHorsemanCount)); // Exponential cost increase
            if (coins >= cost) {
                coins -= cost;
                mongolHorsemanCount++;
            }
            break;
    }

    if (cost > 0) {
        // Play the upgrade sound
        const upgradeSound = document.getElementById("upgradeSound");
        upgradeSound.play();
    }

    updateUI();
}

// Ensure the castle image has the correct event listener
document.getElementById('castle').addEventListener('click', clickCastle);

function updateUpgradeCosts() {
    document.getElementById("knight-cost").textContent = Math.floor(10 * Math.pow(1.15, knightCount));
    document.getElementById("archer-cost").textContent = Math.floor(25 * Math.pow(1.15, archerCount));
    document.getElementById("wizard-cost").textContent = Math.floor(50 * Math.pow(1.15, wizardCount));
    document.getElementById("paladin-cost").textContent = Math.floor(100 * Math.pow(1.15, paladinCount));
    document.getElementById("pikeman-cost").textContent = Math.floor(15 * Math.pow(1.15, pikemanCount));
    document.getElementById("crossbowman-cost").textContent = Math.floor(30 * Math.pow(1.15, crossbowmanCount));
    document.getElementById("catapult-cost").textContent = Math.floor(75 * Math.pow(1.15, catapultCount));
    document.getElementById("mongol-horseman-cost").textContent = Math.floor(50 * Math.pow(1.15, mongolHorsemanCount));
}

function compactNumberFormat(num) {
    if (num < 1e3) return num;
    if (num >= 1e3 && num < 1e6) return +(num / 1e3).toFixed(1) + "K";
    if (num >= 1e6 && num < 1e9) return +(num / 1e6).toFixed(1) + "M";
    if (num >= 1e9 && num < 1e12) return +(num / 1e9).toFixed(1) + "B";
    return +(num / 1e12).toFixed(1) + "T";
}

function handleSkillingClick(skill) {
    switch (skill) {
        case "woodcutting":
            woodcuttingLevel++;
            break;
        case "mining":
            miningLevel++;
            break;
    }
    updateUI();
}

function updatePassiveIncome() {
    // Calculate passive income based on knights, archers, wizards, paladins, pikemen, crossbowmen, catapults, and mongol horsemen
    const knightIncomeRate = 1;        // Adjust the income rate for knights
    const archerIncomeRate = 1.2;      // Adjust the income rate for archers
    const wizardIncomeRate = 1.5;      // Adjust the income rate for wizards
    const paladinIncomeRate = 2;       // Adjust the income rate for paladins
    const pikemanIncomeRate = 0.8;     // Adjust the income rate for pikemen
    const crossbowmanIncomeRate = 1.3; // Adjust the income rate for crossbowmen
    const catapultIncomeRate = 2.5;    // Adjust the income rate for catapults
    const mongolHorsemanIncomeRate = 3; // Adjust the income rate for mongol horsemen

    const totalPassiveIncome = (
        knightCount * knightIncomeRate +
        archerCount * archerIncomeRate +
        wizardCount * wizardIncomeRate +
        paladinCount * paladinIncomeRate +
        pikemanCount * pikemanIncomeRate +
        crossbowmanCount * crossbowmanIncomeRate +
        catapultCount * catapultIncomeRate +
        mongolHorsemanCount * mongolHorsemanIncomeRate
    );

    passiveIncome = totalPassiveIncome;
}

function earnPassiveIncome() {
    const currentTime = Date.now();
    const timeDifference = currentTime - lastSaveTime;
    const offlinePassiveIncome = Math.floor(passiveIncome * (timeDifference / 1000));

    coins += offlinePassiveIncome;
    lastSaveTime = currentTime; // Update the last save time

    updateUI();
}

// Earn passive income every second
setInterval(earnPassiveIncome, 1000);

// Automatically save game state every second
setInterval(saveGameToLocalStorage, 1000);

// Request fullscreen
function requestFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome and Safari
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // Internet Explorer
        element.msRequestFullscreen();
    }
}

// Update the document title with gold coin count
function updateDocumentTitle() {
    const coinCountElement = document.getElementById('counter');
    const coinCountText = coinCountElement.textContent || coinCountElement.innerText;
    const coinCount = coinCountText.replace(/[^0-9]/g, ''); // Extract only the number
    document.title = `Gold Coins: ${coinCount}`;
}

// Update the title every second
setInterval(updateDocumentTitle, 1000);

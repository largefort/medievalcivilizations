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

// Boost-related variables
let clickBoostActive = false;
let productionBoostActive = false;
let efficiencyBoostActive = false;
let clickBoostMultiplier = 1;
let productionBoostMultiplier = 1;
let efficiencyBoostMultiplier = 1;

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

    if (toggleSfxCheckbox.checked) {
        clickSoundAudio.muted = true;
        upgradeSoundAudio.muted = true;
    } else {
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
    gameStartTime = Date.now();
    localStorage.setItem('gameStartTime', gameStartTime);
}

// Function to update stats and timer
function updateStatsUI() {
    const currentTime = Date.now();

    document.getElementById("stat-coins").textContent = compactNumberFormat(coins);
    document.getElementById("stat-woodcutting").textContent = woodcuttingLevel;
    document.getElementById("stat-mining").textContent = miningLevel;
    document.getElementById("stat-passive-income").textContent = compactNumberFormat(passiveIncome);

    const totalUnits = knightCount + archerCount + wizardCount + paladinCount + pikemanCount + crossbowmanCount + catapultCount + mongolHorsemanCount;
    document.getElementById("stat-units").textContent = totalUnits;

    const timeDifference = currentTime - lastSaveTime;
    const offlinePassiveIncome = Math.floor(passiveIncome * (timeDifference / 1000));
    document.getElementById("stat-offline-earnings").textContent = compactNumberFormat(offlinePassiveIncome);

    const timePlayed = Math.floor((currentTime - gameStartTime) / 1000);
    const hours = Math.floor(timePlayed / 3600);
    const minutes = Math.floor((timePlayed % 3600) / 60);
    const seconds = timePlayed % 60;

    const formattedTime = `${hours}h ${minutes}m ${seconds}s`;
    document.getElementById("stat-speedrun-timer").textContent = formattedTime;
}

// Save the current game state including start time whenever necessary
function saveGameState() {
    localStorage.setItem('gameStartTime', gameStartTime);
}

// Call saveGameState function periodically or when the game is about to close
window.addEventListener('beforeunload', saveGameState);

// Update stats every second
setInterval(updateStatsUI, 1000);

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
    let clientX, clientY;

    if (event.type === 'touchstart' || event.type === 'touchend' || event.type === 'touchmove') {
        clientX = event.touches[0].clientX || event.changedTouches[0].clientX;
        clientY = event.touches[0].clientY || event.changedTouches[0].clientY;
    } else if (event.type === 'mousedown' || event.type === 'click' || event.type === 'mousemove') {
        clientX = event.clientX;
        clientY = event.clientY;
    }

    if (typeof clientX === 'number' && typeof clientY === 'number') {
        let coinsGained = getCoinsPerClick();

        // Apply click boost if active
        if (clickBoostActive) {
            coinsGained *= clickBoostMultiplier;
        }

        coins += coinsGained;
        updateUI();

        clickSound.play();

        const floatingText = document.createElement('div');
        floatingText.className = 'floating-text';
        floatingText.innerText = `+${coinsGained}`;

        document.body.appendChild(floatingText);

        const floatingTextRect = floatingText.getBoundingClientRect();
        const floatingTextWidth = floatingTextRect.width;
        const floatingTextHeight = floatingTextRect.height;

        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        floatingText.style.left = `${clientX + scrollLeft - floatingTextWidth / 2}px`;
        floatingText.style.top = `${clientY + scrollTop - floatingTextHeight / 2}px`;

        setTimeout(() => {
            floatingText.remove();
        }, 1000);
    } else {
        console.error('The event object does not contain valid clientX and clientY properties.');
    }
}

function buyUpgrade(type) {
    let cost = 0;

    switch (type) {
        case "knight":
            cost = Math.floor(10 * Math.pow(1.15, knightCount));
            if (coins >= cost) {
                coins -= cost;
                knightCount++;
            }
            break;
        case "archer":
            cost = Math.floor(25 * Math.pow(1.15, archerCount));
            if (coins >= cost) {
                coins -= cost;
                archerCount++;
            }
            break;
        case "wizard":
            cost = Math.floor(50 * Math.pow(1.15, wizardCount));
            if (coins >= cost) {
                coins -= cost;
                wizardCount++;
            }
            break;
        case "paladin":
            cost = Math.floor(100 * Math.pow(1.15, paladinCount));
            if (coins >= cost) {
                coins -= cost;
                paladinCount++;
            }
            break;
        case "pikeman":
            cost = Math.floor(15 * Math.pow(1.15, pikemanCount));
            if (coins >= cost) {
                coins -= cost;
                pikemanCount++;
            }
            break;
        case "crossbowman":
            cost = Math.floor(30 * Math.pow(1.15, crossbowmanCount));
            if (coins >= cost) {
                coins -= cost;
                crossbowmanCount++;
            }
            break;
        case "catapult":
            cost = Math.floor(75 * Math.pow(1.15, catapultCount));
            if (coins >= cost) {
                coins -= cost;
                catapultCount++;
            }
            break;
        case "mongolHorseman":
            cost = Math.floor(50 * Math.pow(1.15, mongolHorsemanCount));
            if (coins >= cost) {
                coins -= cost;
                mongolHorsemanCount++;
            }
            break;
    }

    if (cost > 0) {
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
    const knightIncomeRate = 1;
    const archerIncomeRate = 1.2;
    const wizardIncomeRate = 1.5;
    const paladinIncomeRate = 2;
    const pikemanIncomeRate = 0.8;
    const crossbowmanIncomeRate = 1.3;
    const catapultIncomeRate = 2.5;
    const mongolHorsemanIncomeRate = 3;

    let totalPassiveIncome = (
        knightCount * knightIncomeRate +
        archerCount * archerIncomeRate +
        wizardCount * wizardIncomeRate +
        paladinCount * paladinIncomeRate +
        pikemanCount * pikemanIncomeRate +
        crossbowmanCount * crossbowmanIncomeRate +
        catapultCount * catapultIncomeRate +
        mongolHorsemanCount * mongolHorsemanIncomeRate
    );

    // Apply efficiency boost if active
    if (efficiencyBoostActive) {
        totalPassiveIncome *= efficiencyBoostMultiplier;
    }

    passiveIncome = totalPassiveIncome;
}

function earnPassiveIncome() {
    const currentTime = Date.now();
    const timeDifference = currentTime - lastSaveTime;
    let earnedIncome = Math.floor(passiveIncome * (timeDifference / 1000));

    // Apply production boost if active
    if (productionBoostActive) {
        earnedIncome *= productionBoostMultiplier;
    }

    coins += earnedIncome;
    lastSaveTime = currentTime;

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

// Golden Denier System

// Timing and boost variables
let goldenDenierInterval = 840000; // 14 minutes in milliseconds
let boostDuration = 30000; // 30 seconds

// Function to show the Golden Denier
function showGoldenDenier() {
    const goldenDenier = document.getElementById('golden-denier-popup');
    goldenDenier.style.display = 'block';

    // Auto hide the Golden Denier after a few seconds
    setTimeout(() => {
        goldenDenier.style.display = 'none';
    }, 5000);
}

// Function to claim the Golden Denier
function claimGoldenDenier() {
    const goldenDenier = document.getElementById('golden-denier-popup');
    goldenDenier.style.display = 'none';

    // Randomly apply a boost
    applyRandomBoost();

    // Add a small amount of gold coins
    addGoldCoins(50); // Adjust the amount as needed
}

// Function to add gold coins
function addGoldCoins(amount) {
    coins += amount;
    updateUI();
}

// Function to apply a random boost
function applyRandomBoost() {
    const boosts = ['clickBoost', 'productionBoost', 'efficiencyBoost'];
    const chosenBoost = boosts[Math.floor(Math.random() * boosts.length)];

    // Add the boost icon to the boosts container
    addBoostIcon(chosenBoost);

    // Apply the boost effect
    if (chosenBoost === 'clickBoost') {
        applyClickBoost();
    } else if (chosenBoost === 'productionBoost') {
        applyProductionBoost();
    } else if (chosenBoost === 'efficiencyBoost') {
        applyEfficiencyBoost();
    }
}

// Functions to handle the specific boosts
function applyClickBoost() {
    clickBoostActive = true;
    clickBoostMultiplier = 2; // Double the coins per click
    setTimeout(() => {
        clickBoostActive = false;
        clickBoostMultiplier = 1;
    }, boostDuration);
}

function applyProductionBoost() {
    productionBoostActive = true;
    productionBoostMultiplier = 1.15; // Increase passive income by 15%
    setTimeout(() => {
        productionBoostActive = false;
        productionBoostMultiplier = 1;
    }, boostDuration);
}

function applyEfficiencyBoost() {
    efficiencyBoostActive = true;
    efficiencyBoostMultiplier = 1.14; // Increase unit efficiency by 14%
    setTimeout(() => {
        efficiencyBoostActive = false;
        efficiencyBoostMultiplier = 1;
    }, boostDuration);
}

// Function to add boost icon
function addBoostIcon(boostType) {
    const boostsContainer = document.getElementById('boosts-container');
    const boostIcon = document.createElement('div');
    boostIcon.classList.add('boost-icon');
    boostIcon.textContent = boostType.charAt(0).toUpperCase(); // Just an initial for now

    const timer = document.createElement('div');
    timer.classList.add('boost-timer');
    timer.textContent = boostDuration / 1000;
    boostIcon.appendChild(timer);

    boostsContainer.appendChild(boostIcon);

    let countdown = boostDuration / 1000;
    const interval = setInterval(() => {
        countdown--;
        timer.textContent = countdown;
        if (countdown <= 0) {
            clearInterval(interval);
            boostsContainer.removeChild(boostIcon);
        }
    }, 1000);
}

// Start the interval to show the Golden Denier every 14 minutes
setInterval(showGoldenDenier, goldenDenierInterval);

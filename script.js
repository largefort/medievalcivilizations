let coins = 0;
let knightCount = 0;
let archerCount = 0;
let wizardCount = 0;
let woodcuttingLevel = 1;
let miningLevel = 1;
let paladinCount = 0;
let passiveIncome = 0;
let db;
let lastSaveTime = Date.now(); // Initialize lastSaveTime with the current time

// Add an HTML audio element for the upgrade sound
document.write(`
<audio id="upgradeSound">
    <source src="upgradesound.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
</audio>
`);

// Preload the click sound
const clickSound = new Audio("click-sound.mp3");

function disableFingerZooming() {
    document.addEventListener('touchmove', function (event) {
        if (event.scale !== 1) { event.preventDefault(); }
    }, { passive: false });
}

disableFingerZooming();

function initializeDB() {
    const request = indexedDB.open("MedievalClickerDB", 1);

    request.onupgradeneeded = function (event) {
        db = event.target.result;
        if (!db.objectStoreNames.contains('gameState')) {
            db.createObjectStore('gameState');
        }
    };

    request.onsuccess = function (event) {
        db = event.target.result;
        loadGameData();
    };

    request.onerror = function (event) {
        console.log("Error opening DB", event);
    };
}

function saveGameData() {
    const gameState = {
        coins,
        knightCount,
        archerCount,
        wizardCount,
        woodcuttingLevel,
        miningLevel,
        paladinCount,
        lastSaveTime: Date.now(), // Update the last save time
    };

    const transaction = db.transaction(["gameState"], "readwrite");
    const store = transaction.objectStore("gameState");
    store.put(gameState, "currentGameState");
}

function loadGameData() {
    const transaction = db.transaction(["gameState"], "readonly");
    const store = transaction.objectStore("gameState");
    const request = store.get("currentGameState");
    request.onsuccess = function (event) {
        if (request.result) {
            const savedState = request.result;

            coins = savedState.coins;
            knightCount = savedState.knightCount;
            archerCount = savedState.archerCount;
            wizardCount = savedState.wizardCount;
            woodcuttingLevel = savedState.woodcuttingLevel;
            miningLevel = savedState.miningLevel;
            paladinCount = savedState.paladinCount;
            lastSaveTime = savedState.lastSaveTime; // Update the last save time

            calculateOfflineEarnings();
            updateUI();
        }
    };
}

initializeDB();

function calculateOfflineEarnings() {
    const currentTime = Date.now();
    const timeDifference = (currentTime - lastSaveTime) / 1000; // in seconds
    const offlineEarnings = timeDifference * passiveIncome;
    coins += offlineEarnings;

    document.getElementById('offline-earnings').innerText = offlineEarnings.toFixed(2);
    $('#offline-earnings-modal').modal('show');
}

function toggleMusic() {
    const medievalThemeAudio = document.getElementById("medievaltheme");
    if (medievalThemeAudio.paused) {
        medievalThemeAudio.play();
    } else {
        medievalThemeAudio.pause();
    }
}

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

document.getElementById("toggle-music").addEventListener("change", toggleMusic);
document.getElementById("toggle-sfx").addEventListener("change", toggleSoundEffects);

function updateUI() {
    document.getElementById("total-coins").textContent = compactNumberFormat(coins);
    document.getElementById("knight-production").textContent = knightCount * 1; // Adjust production rates as needed
    document.getElementById("archer-production").textContent = archerCount * 2;
    document.getElementById("wizard-production").textContent = wizardCount * 4;
    document.getElementById("paladin-production").textContent = paladinCount * 8;
    document.getElementById("knight-count").textContent = knightCount;
    document.getElementById("archer-count").textContent = archerCount;
    document.getElementById("wizard-count").textContent = wizardCount;
    document.getElementById("paladin-count").textContent = paladinCount;

    const startTimeFormatted = new Date(startTime).toLocaleString();
    document.getElementById("start-time").textContent = startTimeFormatted;

    const elapsedTimeFormatted = formatTimeDuration(Date.now() - startTime);
    document.getElementById("elapsed-time").textContent = elapsedTimeFormatted;

    updateUpgradeCosts();
}

function formatTimeDuration(duration) {
    // Format duration into hh:mm:ss
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    const hoursDisplay = (hours < 10) ? `0${hours}` : hours;
    const minutesDisplay = (minutes < 10) ? `0${minutes}` : minutes;
    const secondsDisplay = (seconds < 10) ? `0${seconds}` : seconds;

    return `${hoursDisplay}:${minutesDisplay}:${secondsDisplay}`;
}

// Adjust the existing updateUI function as needed to display all stats correctly.
    updatePassiveIncome();
    updateUpgradeCosts();
}

function clickCastle() {
    coins++;
    saveGameData();
    updateUI();

    clickSound.play();
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
    }

    if (cost > 0) {
        const upgradeSound = document.getElementById("upgradeSound");
        upgradeSound.play();
    }

    saveGameData();
    updateUI();
}

function updateUpgradeCosts() {
    document.getElementById("knight-cost").textContent = Math.floor(10 * Math.pow(1.15, knightCount));
    document.getElementById("archer-cost").textContent = Math.floor(25 * Math.pow(1.15, archerCount));
    document.getElementById("wizard-cost").textContent = Math.floor(50 * Math.pow(1.15, wizardCount));
    document.getElementById("paladin-cost").textContent = Math.floor(100 * Math.pow(1.15, paladinCount));
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
    saveGameData();
    updateUI();
}

function updatePassiveIncome() {
    // Calculate passive income based on knights, archers, wizards, and paladins
    const knightIncomeRate = 1;   // Adjust the income rate for knights
    const archerIncomeRate = 2;   // Adjust the income rate for archers
    const wizardIncomeRate = 4;   // Adjust the income rate for wizards
    const paladinIncomeRate = 8;  // Adjust the income rate for paladins

    const totalPassiveIncome = (knightCount * knightIncomeRate + archerCount * archerIncomeRate + wizardCount * wizardIncomeRate + paladinCount * paladinIncomeRate);
    passiveIncome = totalPassiveIncome;
}

function earnPassiveIncome() {
    const currentTime = Date.now();
    const timeDifference = currentTime - lastSaveTime;
    const offlinePassiveIncome = Math.floor(passiveIncome * (timeDifference / 1000));

    coins += offlinePassiveIncome;
    lastSaveTime = currentTime; // Update the last save time

    saveGameData();
    updateUI();
}

setInterval(earnPassiveIncome, 1000);

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

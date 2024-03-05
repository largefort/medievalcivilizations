let coins = 0;
let knightCount = 0;
let archerCount = 0;
let wizardCount = 0;
let woodcuttingLevel = 1;
let miningLevel = 1;
let paladinCount = 0;
let passiveIncome = 0; // Gold coins per second
let db;
let lastSaveTime = Date.now(); // Initialize lastSaveTime with the current time

document.write(`
<audio id="upgradeSound">
    <source src="upgradesound.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
</audio>
`);

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
        passiveIncome,
        lastSaveTime: Date.now(), // Save the last save time
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
            passiveIncome = savedState.passiveIncome; // Load passive income
            lastSaveTime = savedState.lastSaveTime; // Update the last save time

            updateUI();
        }
    };
}

initializeDB();

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

function requestFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
}

function updateUI() {
    document.getElementById("counter").textContent = `Gold coins: ${compactNumberFormat(coins)}`;
    document.getElementById("knight-count").textContent = knightCount;
    document.getElementById("archer-count").textContent = archerCount;
    document.getElementById("wizard-count").textContent = wizardCount;
    document.getElementById("woodcutting-level").textContent = woodcuttingLevel;
    document.getElementById("mining-level").textContent = miningLevel;
    document.getElementById("paladin-count").textContent = paladinCount;

    // Display the passive income as gold coins per second
    document.getElementById("gcps").textContent = `Gold coins per second: ${passiveIncome}`;
}

function clickCastle() {
    coins++;
    saveGameData();
    updateUI();
    clickSound.play();
}

function buyUpgrade(type) {
    let cost = 0;
    let incomeRate = 0;

    switch (type) {
        case "knight":
            cost = 10 * Math.pow(1.1, knightCount);
            incomeRate = 1;
            if (coins >= cost) {
                coins -= cost;
                knightCount++;
                passiveIncome += incomeRate;
            }
            break;
        case "archer":
            cost = 25 * Math.pow(1.1, archerCount);
            incomeRate = 2;
            if (coins >= cost) {
                coins -= cost;
                archerCount++;
                passiveIncome += incomeRate;
            }
            break;
        case "wizard":
            cost = 50 * Math.pow(1.1, wizardCount);
            incomeRate = 4;
            if (coins >= cost) {
                coins -= cost;
                wizardCount++;
                passiveIncome += incomeRate;
            }
            break;
        case "paladin":
            cost = 100 * Math.pow(1.1, paladinCount);
            incomeRate = 8;
            if (coins >= cost) {
                coins -= cost;
                paladinCount++;
                passiveIncome += incomeRate;
            }
            break;
    }

    if (coins >= cost) {
        document.getElementById("upgradeSound").play();
        saveGameData();
        updateUI();
    }
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


// Calculate passive income every second and update UI
setInterval(() => {
    const elapsedTimeInSeconds = (Date.now() - lastSaveTime) / 1000;
    coins += passiveIncome * elapsedTimeInSeconds;
    lastSaveTime = Date.now(); // Reset lastSaveTime to the current time
    saveGameData();
    updateUI();
}, 1000);

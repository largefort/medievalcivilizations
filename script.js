let coins = 0;
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
let lastSaveTime = Date.now();
let baseCoinsPerClick = 1;

// Add an HTML audio element for the upgrade sound
document.write(`
<audio id="upgradeSound">
    <source src="upgradesound.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
</audio>
`);

// Preload the click sound
const clickSound = new Audio("click-sound.mp3");

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
    saveGameData();
    updateUI();

    clickSound.play();

    const floatingText = document.createElement('div');
    floatingText.className = 'floating-text';
    floatingText.innerText = `+${coinsGained}`;

    floatingText.style.left = `${event.clientX}px`;
    floatingText.style.top = `${event.clientY}px`;

    document.body.appendChild(floatingText);

    setTimeout(() => {
        floatingText.remove();
    }, 1000);
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

    saveGameData();
    updateUI();
}

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
    saveGameData();
    updateUI();
}

function updatePassiveIncome() {
    const knightIncomeRate = 1;
    const archerIncomeRate = 2;
    const wizardIncomeRate = 4;
    const paladinIncomeRate = 8;
    const pikemanIncomeRate = 1.5;
    const crossbowmanIncomeRate = 3;
    const catapultIncomeRate = 5;
    const mongolHorsemanIncomeRate = 6;

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
    lastSaveTime = currentTime;

    saveGameData();
    updateUI();
}

setInterval(earnPassiveIncome, 1000);

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

function updateDocumentTitle() {
    const coinCountElement = document.getElementById('counter');
    const coinCountText = coinCountElement.textContent || coinCountElement.innerText;
    const coinCount = coinCountText.replace(/[^0-9]/g, '');
    document.title = `Gold Coins: ${coinCount}`;
}

setInterval(updateDocumentTitle, 1000);

// Save game data to localStorage
function saveGameData() {
    const gameData = {
        coins,
        knightCount,
        archerCount,
        wizardCount,
        woodcuttingLevel,
        miningLevel,
        paladinCount,
        pikemanCount,
        crossbowmanCount,
        catapultCount,
        mongolHorsemanCount,
        passiveIncome,
        lastSaveTime: Date.now()
    };
    localStorage.setItem('gameData', JSON.stringify(gameData));
}

// Load game data from localStorage
function loadGameData() {
    const savedGameData = localStorage.getItem('gameData');
    if (savedGameData) {
        const gameData = JSON.parse(savedGameData);
        coins = gameData.coins;
        knightCount = gameData.knightCount;
        archerCount = gameData.archerCount;
        wizardCount = gameData.wizardCount;
        woodcuttingLevel = gameData.woodcuttingLevel;
        miningLevel = gameData.miningLevel;
        paladinCount = gameData.paladinCount;
        pikemanCount = gameData.pikemanCount;
        crossbowmanCount = gameData.crossbowmanCount;
        catapultCount = gameData.catapultCount;
        mongolHorsemanCount = gameData.mongolHorsemanCount;
        passiveIncome = gameData.passiveIncome;
        lastSaveTime = gameData.lastSaveTime;

        // Calculate the offline earnings
        earnPassiveIncome();
    }
}

// Load game data when the page is loaded
window.addEventListener('load', loadGameData);

// Save game data before the page is unloaded
window.addEventListener('beforeunload', saveGameData);

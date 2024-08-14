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

function updateStatsUI() {
    document.getElementById("stat-coins").textContent = compactNumberFormat(coins);
    document.getElementById("stat-knights").textContent = knightCount;
    document.getElementById("stat-archers").textContent = archerCount;
    document.getElementById("stat-wizards").textContent = wizardCount;
    document.getElementById("stat-paladins").textContent = paladinCount;
    document.getElementById("stat-pikemen").textContent = pikemanCount;
    document.getElementById("stat-crossbowmen").textContent = crossbowmanCount;
    document.getElementById("stat-catapults").textContent = catapultCount;
    document.getElementById("stat-mongol-horsemen").textContent = mongolHorsemanCount;
    document.getElementById("stat-woodcutting").textContent = woodcuttingLevel;
    document.getElementById("stat-mining").textContent = miningLevel;
    document.getElementById("stat-passive-income").textContent = compactNumberFormat(passiveIncome);

    // Calculate offline earnings since last save
    const currentTime = Date.now();
    const timeDifference = currentTime - lastSaveTime;
    const offlinePassiveIncome = Math.floor(passiveIncome * (timeDifference / 1000));
    document.getElementById("stat-offline-earnings").textContent = compactNumberFormat(offlinePassiveIncome);

    // Update date and time
    const now = new Date();
    document.getElementById("stat-date").textContent = now.getDate();
    document.getElementById("stat-time").textContent = now.toLocaleTimeString();
    document.getElementById("stat-month").textContent = now.toLocaleString('default', { month: 'long' });
    document.getElementById("stat-year").textContent = now.getFullYear();
    document.getElementById("stat-seconds").textContent = now.getSeconds();
}

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
    updateStatsUI(); // Call the new function to update the stats tab
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

    // Play the preloaded click sound
    clickSound.play();

    // Create floating text
    const floatingText = document.createElement('div');
    floatingText.className = 'floating-text';
    floatingText.innerText = `+${coinsGained}`;

    // Position the floating text at the mouse cursor, adjusted for scroll
    const pageX = event.pageX;
    const pageY = event.pageY;
    floatingText.style.left = `${event.clientX}px`
    floatingText.style.top = `${event.clientY}px`

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

    saveGameData();
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

function updatePassiveIncome() {
    const knightIncomeRate = 1;
    const archerIncomeRate = 1.2;
    const wizardIncomeRate = 1.5;
    const paladinIncomeRate = 2;
    const pikemanIncomeRate = 0.8;
    const crossbowmanIncomeRate = 1.3;
    const catapultIncomeRate = 2.5;
    const mongolHorsemanIncomeRate = 3;

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

function saveGameData() {
    const gameData = {
        coins,
        knightCount,
        archerCount,
        wizardCount,
        paladinCount,
        pikemanCount,
        crossbowmanCount,
        catapultCount,
        mongolHorsemanCount,
        woodcuttingLevel,
        miningLevel,
        lastSaveTime: Date.now(),
        passiveIncome,
    };

    localStorage.setItem("gameData", JSON.stringify(gameData));
}

function loadGameData() {
    const savedData = localStorage.getItem("gameData");

    if (savedData) {
        const gameData = JSON.parse(savedData);

        coins = gameData.coins || 10;
        knightCount = gameData.knightCount || 0;
        archerCount = gameData.archerCount || 0;
        wizardCount = gameData.wizardCount || 0;
        paladinCount = gameData.paladinCount || 0;
        pikemanCount = gameData.pikemanCount || 0;
        crossbowmanCount = gameData.crossbowmanCount || 0;
        catapultCount = gameData.catapultCount || 0;
        mongolHorsemanCount = gameData.mongolHorsemanCount || 0;
        woodcuttingLevel = gameData.woodcuttingLevel || 1;
        miningLevel = gameData.miningLevel || 1;
        lastSaveTime = gameData.lastSaveTime || Date.now();
        passiveIncome = gameData.passiveIncome || 0;

        // Calculate offline earnings since last save
        const currentTime = Date.now();
        const timeDifference = currentTime - lastSaveTime;
        const offlinePassiveIncome = Math.floor(passiveIncome * (timeDifference / 1000));
        coins += offlinePassiveIncome;
    }

    updateUI();
}

function compactNumberFormat(num) {
    const scales = [
        { value: 1e3, symbol: "K" },        // Thousand
        { value: 1e6, symbol: "M" },        // Million
        { value: 1e9, symbol: "B" },        // Billion
        { value: 1e12, symbol: "T" },       // Trillion
        { value: 1e15, symbol: "Qa" },      // Quadrillion
        { value: 1e18, symbol: "Qi" },      // Quintillion
        { value: 1e21, symbol: "Sx" },      // Sextillion
        { value: 1e24, symbol: "Sp" },      // Septillion
        { value: 1e27, symbol: "Oc" },      // Octillion
        { value: 1e30, symbol: "No" },      // Nonillion
        { value: 1e33, symbol: "Dc" },      // Decillion
        { value: 1e36, symbol: "Ud" },      // Undecillion
        { value: 1e39, symbol: "Dd" },      // Duodecillion
        { value: 1e42, symbol: "Td" },      // Tredecillion
        { value: 1e45, symbol: "Qad" },     // Quattuordecillion
        { value: 1e48, symbol: "Qid" },     // Quindecillion
        { value: 1e51, symbol: "Sxd" },     // Sexdecillion
        { value: 1e54, symbol: "Spd" },     // Septendecillion
        { value: 1e57, symbol: "Ocd" },     // Octodecillion
        { value: 1e60, symbol: "Nod" },     // Novemdecillion
        { value: 1e63, symbol: "Vg" },      // Vigintillion
        { value: 1e66, symbol: "Uvg" },     // Unvigintillion
        { value: 1e69, symbol: "Dvg" },     // Duovigintillion
        { value: 1e72, symbol: "Tvg" },     // Trevigintillion
        { value: 1e75, symbol: "Qavg" },    // Quattuorvigintillion
        { value: 1e78, symbol: "Qivg" },    // Quinvigintillion
        { value: 1e81, symbol: "Sxvg" },    // Sexvigintillion
        { value: 1e84, symbol: "Spvg" },    // Septenvigintillion
        { value: 1e87, symbol: "Ocvg" },    // Octovigintillion
        { value: 1e90, symbol: "Novg" },    // Novemvigintillion
        { value: 1e93, symbol: "Tr" },      // Trigintillion
        { value: 1e96, symbol: "Utr" },     // Untrigintillion
        { value: 1e99, symbol: "Dtr" },     // Duotrigintillion
        { value: 1e102, symbol: "Ttr" },    // Tretrigintillion
        { value: 1e105, symbol: "Qatr" },   // Quattuortrigintillion
        { value: 1e108, symbol: "Qitr" },   // Quintrigintillion
        { value: 1e111, symbol: "Sxtr" },   // Sextrigintillion
        { value: 1e114, symbol: "Sptr" },   // Septentrigintillion
        { value: 1e117, symbol: "Octr" },   // Octotrigintillion
        { value: 1e120, symbol: "Notr" },   // Novemtrigintillion
        { value: 1e123, symbol: "Qtg" },    // Quattuordecillion
        { value: 1e126, symbol: "Uqtg" },   // Unquattuordecillion
        { value: 1e129, symbol: "Dqtg" },   // Duoquattuordecillion
        { value: 1e132, symbol: "Tqtg" },   // Trequattuordecillion
        { value: 1e135, symbol: "Qaqtg" },  // Quattuorquattuordecillion
        { value: 1e138, symbol: "Qiqtg" },  // Quinquaquattuordecillion
        { value: 1e141, symbol: "Sxqtg" },  // Sexquaquattuordecillion
        { value: 1e144, symbol: "Spqtg" },  // Septenquattuordecillion
        { value: 1e147, symbol: "Ocqtg" },  // Octoquattuordecillion
        { value: 1e150, symbol: "Noqtg" },  // Novemquattuordecillion
        { value: 1e153, symbol: "Qit" },    // Quinquadilllion
        { value: 1e156, symbol: "Uqit" },   // Unquinquadilllion
        { value: 1e159, symbol: "Dqit" },   // Duoquinquadilllion
        { value: 1e162, symbol: "Tqit" },   // Trequinquadilllion
        { value: 1e165, symbol: "Qaqit" },  // Quattuorquinquadilllion
        { value: 1e168, symbol: "Qiqit" },  // Quinquaquinquadilllion
        { value: 1e171, symbol: "Sxqit" },  // Sexquinquadilllion
        { value: 1e174, symbol: "Spqit" },  // Septenquinquadilllion
        { value: 1e177, symbol: "Ocqit" },  // Octoquinquadilllion
        { value: 1e180, symbol: "Noqit" },  // Novemquinquadilllion
        { value: 1e183, symbol: "Ct" },     // Centillion
        { value: 1e186, symbol: "Uct" },    // Uncentillion
        { value: 1e189, symbol: "Dct" },    // Duocentillion
        { value: 1e192, symbol: "Tct" },    // Trecentillion
        { value: 1e195, symbol: "Qact" },   // Quattuorcentillion
        { value: 1e198, symbol: "Qict" },   // Quinquacentillion
        { value: 1e201, symbol: "Sxct" },   // Sexcentillion
        { value: 1e204, symbol: "Spct" },   // Septencentillion
        { value: 1e207, symbol: "Occt" },   // Octocentillion
        { value: 1e210, symbol: "Noct" },   // Novemcentillion
        // You can continue to add more scales as needed
    ];

    for (let i = scales.length - 1; i >= 0; i--) {
        if (num >= scales[i].value) {
            return +(num / scales[i].value).toFixed(1) + scales[i].symbol;
        }
    }
    return num.toString(); // Return as string if no formatting is needed
}

// Load game data and start the game
window.onload = function() {
    loadGameData();
    setInterval(earnPassiveIncome, 1000);
};

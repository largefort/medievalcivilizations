function clickCastle() {
  if (!checkSubscription()) {
    return;
  }
  const goldEarned = 1 + knightCount * 0.1 + archerCount * 0.2 + wizardCount * 0.5;
  coins += goldEarned;
  document.getElementById("counter").textContent = `Gold coins: ${coins}`;
  document.getElementById("click-sound").play(); // Play sound on click
}

function handleSkillingClick(skill) {
  if (!checkSubscription()) {
    return;
  }
  if (skill === 'woodcutting') {
    woodcuttingLevel++;
    document.getElementById('woodcutting-level').textContent = woodcuttingLevel;
  } else if (skill === 'mining') {
    miningLevel++;
    document.getElementById('mining-level').textContent = miningLevel;
  }
  document.getElementById("click-sound").play(); // Play sound on click
}

function buyUpgrade(upgradeType) {
  if (!checkSubscription()) {
    return;
  }
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
function updateUI() {
  // Update the gold coins counter
  document.getElementById("counter").textContent = `Gold coins: ${coins}`;

  // Update the unit counts
  document.getElementById('knight-count').querySelector('span').textContent = knightCount;
  document.getElementById('archer-count').querySelector('span').textContent = archerCount;
  document.getElementById('wizard-count').querySelector('span').textContent = wizardCount;
  document.getElementById('paladin-count').querySelector('span').textContent = paladinCount;
  document.getElementById('pikeman-count').querySelector('span').textContent = pikemanCount;
  document.getElementById('crossbowman-count').querySelector('span').textContent = crossbowmanCount;
  document.getElementById('catapult-count').querySelector('span').textContent = catapultCount;
  document.getElementById('mongol-horseman-count').querySelector('span').textContent = mongolHorsemanCount;

  // Update the skill levels
  document.getElementById('woodcutting-level').textContent = woodcuttingLevel;
  document.getElementById('mining-level').textContent = miningLevel;

  // Update the costs of upgrades in the shop
  document.getElementById('knight-cost').textContent = 10 + knightCount * 5;
  document.getElementById('archer-cost').textContent = 25 + archerCount * 10;
  document.getElementById('wizard-cost').textContent = 50 + wizardCount * 20;
  document.getElementById('paladin-cost').textContent = 100 + paladinCount * 50;
  document.getElementById('pikeman-cost').textContent = 15 + pikemanCount * 5;
  document.getElementById('crossbowman-cost').textContent = 30 + crossbowmanCount * 10;
  document.getElementById('catapult-cost').textContent = 75 + catapultCount * 20;
  document.getElementById('mongol-horseman-cost').textContent = 50 + mongolHorsemanCount * 10;

  // Handle UI changes based on subscription status
  const subscribeButton = document.getElementById("subscribe-button");
  if (isSubscribed) {
    subscribeButton.textContent = "Subscribed to Medieval+";
    subscribeButton.disabled = true;

    // Unlock features if the user is subscribed
    enableFeatures();
  } else {
    subscribeButton.textContent = "Subscribe Now";
    subscribeButton.disabled = false;

    // Lock features if the user is not subscribed
    disableFeatures();
  }
}

// Enable all features (for subscribers)
function enableFeatures() {
  document.querySelectorAll('.upgrade').forEach(upgrade => {
    upgrade.classList.remove('locked');
    upgrade.classList.add('enabled');
  });

  document.getElementById('toggle-music').disabled = false;
  document.getElementById('toggle-sfx').disabled = false;
  document.getElementById('toggle-tts').disabled = false;
  document.getElementById('export-btn').disabled = false;
  document.getElementById('load-btn').disabled = false;
}

// Disable all features (for non-subscribers)
function disableFeatures() {
  document.querySelectorAll('.upgrade').forEach(upgrade => {
    upgrade.classList.remove('enabled');
    upgrade.classList.add('locked');
  });

  document.getElementById('toggle-music').disabled = true;
  document.getElementById('toggle-sfx').disabled = true;
  document.getElementById('toggle-tts').disabled = true;
  document.getElementById('export-btn').disabled = true;
  document.getElementById('load-btn').disabled = true;
}

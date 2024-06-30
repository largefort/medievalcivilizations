function updateStatsTab() {
    // Update total coins
    const totalCoinsElement = document.getElementById("total-coins");
    if (totalCoinsElement) {
        totalCoinsElement.textContent = compactNumberFormat(coins);
    }

    // Update production rates
    const knightProductionElement = document.getElementById("knight-production");
    if (knightProductionElement) {
        knightProductionElement.textContent = knightCount * 1; // Adjust production rates as needed
    }

    const archerProductionElement = document.getElementById("archer-production");
    if (archerProductionElement) {
        archerProductionElement.textContent = archerCount * 2; // Adjust production rates as needed
    }

    const wizardProductionElement = document.getElementById("wizard-production");
    if (wizardProductionElement) {
        wizardProductionElement.textContent = wizardCount * 4; // Adjust production rates as needed
    }

    const paladinProductionElement = document.getElementById("paladin-production");
    if (paladinProductionElement) {
        paladinProductionElement.textContent = paladinCount * 8; // Adjust production rates as needed
    }

    // Update game start time
    const startTimeElement = document.getElementById("start-time");
    if (startTimeElement) {
        startTimeElement.textContent = formatStartTime(startTime);
    }

    // Update elapsed time
    const elapsedTimeElement = document.getElementById("elapsed-time");
    if (elapsedTimeElement) {
        elapsedTimeElement.textContent = formatElapsedTime(startTime);
    }
}

function compactNumberFormat(num) {
    if (num < 1e3) return num;
    if (num >= 1e3 && num < 1e6) return +(num / 1e3).toFixed(1) + "K";
    if (num >= 1e6 && num < 1e9) return +(num / 1e6).toFixed(1) + "M";
    if (num >= 1e9 && num < 1e12) return +(num / 1e9).toFixed(1) + "B";
    return +(num / 1e12).toFixed(1) + "T";
}

function formatStartTime(startTime) {
    return new Date(startTime).toLocaleString();
}

function formatElapsedTime(startTime) {
    const elapsedMilliseconds = Date.now() - startTime;
    return formatTimeDuration(elapsedMilliseconds);
}

function formatTimeDuration(duration) {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    const hoursDisplay = (hours < 10) ? `0${hours}` : hours;
    const minutesDisplay = (minutes < 10) ? `0${minutes}` : minutes;
    const secondsDisplay = (seconds < 10) ? `0${seconds}` : seconds;

    return `${hoursDisplay}:${minutesDisplay}:${secondsDisplay}`;
}

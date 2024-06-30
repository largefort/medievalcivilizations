function updateStatsTab() {
    // Update total coins
    document.getElementById("total-coins").textContent = compactNumberFormat(coins);

    // Update production rates
    document.getElementById("knight-production").textContent = knightCount * 1;
    document.getElementById("archer-production").textContent = archerCount * 2;
    document.getElementById("wizard-production").textContent = wizardCount * 4;
    document.getElementById("paladin-production").textContent = paladinCount * 8;

    // Update game start time
    const startTimeFormatted = new Date(startTime).toLocaleString();
    document.getElementById("start-time").textContent = startTimeFormatted;

    // Update elapsed time
    const elapsedTimeFormatted = formatTimeDuration(Date.now() - startTime);
    document.getElementById("elapsed-time").textContent = elapsedTimeFormatted;
}

function compactNumberFormat(num) {
    if (num < 1e3) return num;
    if (num >= 1e3 && num < 1e6) return +(num / 1e3).toFixed(1) + "K";
    if (num >= 1e6 && num < 1e9) return +(num / 1e6).toFixed(1) + "M";
    if (num >= 1e9 && num < 1e12) return +(num / 1e9).toFixed(1) + "B";
    return +(num / 1e12).toFixed(1) + "T";
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

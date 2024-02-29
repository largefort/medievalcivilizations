class OfflineTracker {
    constructor() {
        this.earningsPerSecond = 0.1; // Adjust based on your game's economy
    }

    init() {
        this.updateOfflineProgress();
        this.setupEventListeners();
    }

    updateLastActiveTime() {
        localStorage.setItem('lastActiveTime', Date.now());
    }

    setupEventListeners() {
        window.addEventListener('beforeunload', () => this.updateLastActiveTime());
        document.addEventListener('DOMContentLoaded', () => this.updateOfflineProgress());
    }

    updateOfflineProgress() {
        const lastActiveTime = localStorage.getItem('lastActiveTime');
        if (lastActiveTime) {
            const currentTime = Date.now();
            const timePassed = currentTime - lastActiveTime; // Time passed in milliseconds
            const offlineEarnings = this.calculateOfflineEarnings(timePassed);
            this.showOfflineProgress(offlineEarnings);
        }
        // Update last active time for the next session
        this.updateLastActiveTime();
    }

    calculateOfflineEarnings(timePassed) {
        // Calculate earnings based on time passed
        const earnings = Math.floor((timePassed / 1000) * this.earningsPerSecond);
        return earnings;
    }

    showOfflineProgress(earnings) {
        // Update the modal content and display it
        const offlineEarningsElement = document.getElementById('offlineEarnings');
        if (offlineEarningsElement) {
            offlineEarningsElement.textContent = earnings.toString();
            $('#offlineProgressModal').modal('show');
        } else {
            console.error('Offline earnings element not found.');
        }
    }
}

// Create and initialize the OfflineTracker instance when the page is fully loaded
window.addEventListener('load', () => {
    const offlineTracker = new OfflineTracker();
    offlineTracker.init();
});

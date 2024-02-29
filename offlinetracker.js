class OfflineTracker {
    constructor() {
        // Adjust this based on how much you want players to earn per second while offline
        this.earningsPerSecond = 0.1;
    }

    init() {
        // Initialize the tracker by updating offline progress and setting up the last active time
        this.updateOfflineProgress();
        this.updateLastActiveTime();
    }

    updateLastActiveTime() {
        // Store the last active time in localStorage when the user leaves the page
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('lastActiveTime', Date.now());
        });
    }

    updateOfflineProgress() {
        // Calculate and show offline earnings if there's a stored last active time
        const lastActiveTime = localStorage.getItem('lastActiveTime');
        if (lastActiveTime) {
            const currentTime = Date.now();
            const timePassed = currentTime - lastActiveTime; // Time passed in milliseconds
            const offlineEarnings = this.calculateOfflineEarnings(timePassed);
            this.showOfflineProgress(offlineEarnings);
        } else {
            // First time playing or localStorage is cleared, no offline earnings to show
            console.log("Welcome to the game!");
        }
    }

    calculateOfflineEarnings(timePassed) {
        // Calculate offline earnings based on the time passed and the set earnings rate
        const earnings = Math.floor((timePassed / 1000) * this.earningsPerSecond);
        return earnings;
    }

    showOfflineProgress(earnings) {
        // Update the modal content and display it
        document.getElementById('offlineProgressText').innerText = `You earned ${earnings} coins while you were away!`;
        $('#offlineProgressModal').modal('show');
        
        // If you're not using Bootstrap, replace the above line with your modal display logic
        // Example for a simple custom modal:
        // document.getElementById('offlineProgressModal').style.display = 'block';
    }
}

// When the document is fully loaded, initialize and run the offline tracker
document.addEventListener('DOMContentLoaded', () => {
    const tracker = new OfflineTracker();
    tracker.init();
});

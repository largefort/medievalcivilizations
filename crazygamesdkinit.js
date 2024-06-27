// Define an async function to encapsulate your await calls
async function initializeGame() {
    // Initialize the CrazyGames SDK
    await window.CrazyGames.SDK.init();
    console.log(window.CrazyGames.SDK.environment);
    console.log(window.CrazyGames.SDK.isQaTool);

    const userAccountAvailable = window.CrazyGames.SDK.user.isUserAccountAvailable;
    console.log("User account system available", userAccountAvailable);

    const systemInfo = window.CrazyGames.SDK.user.systemInfo;
    console.log("System info", systemInfo);

    // Example of getting the user with await
    try {
        const user = await window.CrazyGames.SDK.user.getUser();
        console.log(user);
    } catch (e) {
        console.log("Get user error:", e);
    }

    // Example of getting the user with .then .catch
    window.CrazyGames.SDK.user
        .getUser()
        .then((user) => console.log(user))
        .catch((e) => console.log("Get user error:", e));

    // Example of showing auth prompt
    try {
        const authResult = await window.CrazyGames.SDK.user.showAuthPrompt();
        console.log("Auth prompt result", authResult);
    } catch (e) {
        console.log("Error:", e);
    }

    // Example of getting the user token
    try {
        const token = await window.CrazyGames.SDK.user.getUserToken();
        console.log("Get token result", token);
    } catch (e) {
        console.log("Error:", e);
    }

    // Example of showing account link prompt
    try {
        const linkResponse = await window.CrazyGames.SDK.user.showAccountLinkPrompt();
        console.log("Link account response", linkResponse);
    } catch (e) {
        console.log("Error:", e);
    }

    // Add event listeners
    window.addEventListener("wheel", (event) => event.preventDefault(), {
        passive: false,
    });

    window.addEventListener("keydown", (event) => {
        if (["ArrowUp", "ArrowDown", " "].includes(event.key)) {
            event.preventDefault();
        }
    });

    // Adding and removing auth listener
    const listener = (user) => console.log("User changed", user);

    // Add listener
    window.CrazyGames.SDK.user.addAuthListener(listener);

    // Remove listener
    window.CrazyGames.SDK.user.removeAuthListener(listener);
}

// Start the game initialization
initializeGame();

// Game control functions
function stopGameplay() {
    window.CrazyGames.SDK.game.gameplayStop();
}

function startGameplay() {
    window.CrazyGames.SDK.game.gameplayStart();
}

function startLoading() {
    window.CrazyGames.SDK.game.loadingStart();
}

function stopLoading() {
    window.CrazyGames.SDK.game.loadingStop();
}

// Use these functions as needed in your game logic
// E.g., when the game starts loading
startLoading();

// After loading is done
stopLoading();

// For next level's assets loading
startLoading();

// After assets are loaded
stopLoading();

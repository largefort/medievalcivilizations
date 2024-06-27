await window.CrazyGames.SDK.init();
window.CrazyGames.SDK.environment;
window.CrazyGames.SDK.isQaTool;
window.CrazyGames.SDK.user.isUserAccountAvailable
window.CrazyGames.SDK.user.systemInfo
window.CrazyGames.SDK.game;
// player pauses the game
window.CrazyGames.SDK.game.gameplayStop();
// player resumes the game
window.CrazyGames.SDK.game.gameplayStart();
// Your game starts loading
window.CrazyGames.SDK.game.loadingStart();
// Loading...
window.CrazyGames.SDK.game.loadingStop();
// Next level's assets are loading now
window.CrazyGames.SDK.game.loadingStart();
// Assets are loaded
window.CrazyGames.SDK.game.loadingStop();
window.CrazyGames.SDK.user;
// await example
try {
    const user = await window.CrazyGames.SDK.user.getUser();
    console.log(user);
} catch (e) {
    console.log("Get user error: ", e);
}

// .then .catch example
window.CrazyGames.SDK.user
    .getUser()
    .then((user) => console.log(user))
    .catch((e) => console.log("Get user error: ", e));

window.addEventListener("wheel", (event) => event.preventDefault(), {
    passive: false,
});

window.addEventListener("keydown", (event) => {
    if (["ArrowUp", "ArrowDown", " "].includes(event.key)) {
        event.preventDefault();
    }
});

const available = window.CrazyGames.SDK.user.isUserAccountAvailable;
console.log("User account system available", available);

{
    "username": "SingingCheese.TLNU",
    "profilePictureUrl": "https://images.crazygames.com/userportal/avatars/4.png"
}

const systemInfo = window.CrazyGames.SDK.user.systemInfo;
console.log("System info", systemInfo);

{
    "countryCode": "US",
    "device": {
        "type": "desktop" // possible values: "desktop", "tablet", "mobile"
    },
    "os": {
        "name": "Windows",
        "version": "10"
    },
    "browser": {
        "name": "Chrome",
        "version": "107.0.0.0"
    }
}

try {
    const user = await window.CrazyGames.SDK.user.showAuthPrompt();
    console.log("Auth prompt result", user);
} catch (e) {
    console.log("Error:", e);
}

try {
    const token = await window.CrazyGames.SDK.user.getUserToken();
    console.log("Get token result", token);
} catch (e) {
    console.log("Error:", e);
}

{
    "userId": "UOuZBKgjwpY9k4TSBB2NPugbsHD3",
    "gameId": "20267",
    "username": "RustyCake.ZU9H",
    "profilePictureUrl": "https://images.crazygames.com/userportal/avatars/16.png",
    "iat": 1670328680,
    "exp": 1670332280
}

const listener = (user) => console.log("User changed", user);

// add listener
window.CrazyGames.SDK.user.addAuthListener(listener);

// remove listener
window.CrazyGames.SDK.user.removeAuthListener(listener);

try {
    const response = await window.CrazyGames.SDK.user.showAccountLinkPrompt();
    console.log("Link account response", response);
} catch (e) {
    console.log("Error:", e);
}

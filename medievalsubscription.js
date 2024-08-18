let isSubscribed = false; // Variable to track subscription status

function initializeSubscription() {
  loadSubscriptionStatus();
  updateSubscriptionUI();
}

function loadSubscriptionStatus() {
  const transaction = db.transaction(["gameState"], "readonly");
  const store = transaction.objectStore("gameState");
  const request = store.get("currentGameState");

  request.onsuccess = function(event) {
    if (request.result) {
      isSubscribed = request.result.isSubscribed || false;
    }
  };
}

function saveSubscriptionStatus() {
  const transaction = db.transaction(["gameState"], "readwrite");
  const store = transaction.objectStore("gameState");

  const gameState = {
    id: "currentGameState",
    isSubscribed: isSubscribed
  };

  store.put(gameState);
}

function startSubscription() {
  if (isSubscribed) {
    alert("You are already subscribed to Medieval+!");
    return;
  }

  // Trigger the payment process
  startPaymentProcess();
}

function unlockFeatures() {
  isSubscribed = true;
  saveSubscriptionStatus();
  updateSubscriptionUI();
  alert("Subscription successful! All features are now unlocked.");
}

function updateSubscriptionUI() {
  const subscribeButton = document.getElementById("subscribe-button");
  if (isSubscribed) {
    subscribeButton.textContent = "Subscribed to Medieval+";
    subscribeButton.disabled = true;
  }
}

initializeSubscription();

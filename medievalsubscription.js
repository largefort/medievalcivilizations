let isSubscribed = false; // Variable to track subscription status

function initializeSubscription() {
  loadSubscriptionStatus();
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

function checkSubscription() {
  if (!isSubscribed) {
    openSubscriptionModal();
    return false;
  }
  return true;
}

function unlockFeatures() {
  isSubscribed = true;
  saveSubscriptionStatus();
  closeSubscriptionModal();
  alert("Subscription successful! All features are now unlocked.");
}

function openSubscriptionModal() {
  document.getElementById("subscriptionModal").style.display = "block";
}

function closeSubscriptionModal() {
  document.getElementById("subscriptionModal").style.display = "none";
}

initializeSubscription();

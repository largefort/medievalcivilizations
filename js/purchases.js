document.addEventListener('deviceready', initializeApp, false);

function initializeApp() {
    setupPurchasePlugin();
    checkAdsRemoved();
    setupRemoveAdsButton();
    setupRestorePurchasesButton();
}

function setupPurchasePlugin() {
    console.log("Setting up the in-app purchase plugin...");
    if (!window.store) {
        console.error("Store not available");
        return;
    }

    window.store.register({
        id: "removeads_001",
        type: window.store.NON_CONSUMABLE
    });

    window.store.when("removeads_001").approved(function(product) {
        console.log("Purchase approved, verifying...");
        showLoadingIndicator(true); // Show loading indicator during verification
        product.verify();
    });

    window.store.when("removeads_001").verified(function(product) {
        console.log("Purchase verified, finishing...");
        disableAds();
        product.finish();
        showLoadingIndicator(false); // Hide loading indicator
        showSuccessMessage("Ads have been successfully removed."); // Inform the user
    });

    window.store.when("removeads_001").unverified(function(product) {
        console.error("Purchase unverified");
        showLoadingIndicator(false); // Hide loading indicator
        showErrorMessage("Purchase verification failed. Please try again."); // Inform the user
    });

    window.store.when("removeads_001").error(function(error) {
        console.error("An error occurred: ", error);
        showLoadingIndicator(false); // Hide loading indicator
        showErrorMessage("An error occurred during the purchase. Please try again."); // Inform the user
    });

    window.store.error(function(error) {
        console.error("Store error: ", error);
        showErrorMessage("A store error occurred. Please try again."); // Inform the user
    });

    window.store.refresh();
}

function purchaseAdRemoval() {
    console.log("Attempting to purchase Ad Removal");
    if (window.store.get("removeads_001").canPurchase) {
        window.store.order("removeads_001");
    } else {
        console.error("Product is not available for purchase");
        showErrorMessage("This product is not available at the moment. Please try again later.");
    }
}

function disableAds() {
    document.getElementById('adBanner').style.display = 'none';
    localStorage.setItem('adsRemoved', 'true');
}

function checkAdsRemoved() {
    if (localStorage.getItem('adsRemoved') === 'true') {
        disableAds();
    }
}

function setupRemoveAdsButton() {
    document.getElementById('remove-ads-btn').addEventListener('click', purchaseAdRemoval);
}

function setupRestorePurchasesButton() {
    document.getElementById('restorePurchasesButton').addEventListener('click', function() {
        window.store.refresh(); // This will trigger the restore purchases process
    });
}

function showLoadingIndicator(show) {
    // Implement logic to show or hide a loading indicator on the UI
}

function showSuccessMessage(message) {
    // Show success message to the user
    alert(message);
}

function showErrorMessage(message) {
    // Show error message to the user
    alert(message);
}
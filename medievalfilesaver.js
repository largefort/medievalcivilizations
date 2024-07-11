  // IndexedDB setup and functions
    let db;
    function initializeDB() {
      const request = indexedDB.open("MedievalCivilizationsDB", 1);

      request.onerror = function(event) {
        console.error("Database error: " + event.target.errorCode);
      };

      request.onsuccess = function(event) {
        db = event.target.result;
      };

      request.onupgradeneeded = function(event) {
        db = event.target.result;
        db.createObjectStore("gameState", { keyPath: "id" });
      };
    }

    function saveGameData() {
      const gameState = {
        id: "currentGameState",
        coins,
        knightCount,
        archerCount,
        wizardCount,
        woodcuttingLevel,
        miningLevel,
        paladinCount,
        pikemanCount,
        crossbowmanCount,
        catapultCount,
        mongolHorsemanCount,
        lastSaveTime: Date.now(), // Update the last save time
      };

      const transaction = db.transaction(["gameState"], "readwrite");
      const store = transaction.objectStore("gameState");
      store.put(gameState);
    }

    function loadGameData(callback) {
      const transaction = db.transaction(["gameState"], "readonly");
      const store = transaction.objectStore("gameState");
      const request = store.get("currentGameState");
      request.onsuccess = function(event) {
        if (request.result) {
          const savedState = request.result;

          coins = savedState.coins;
          knightCount = savedState.knightCount;
          archerCount = savedState.archerCount;
          wizardCount = savedState.wizardCount;
          woodcuttingLevel = savedState.woodcuttingLevel;
          miningLevel = savedState.miningLevel;
          paladinCount = savedState.paladinCount;
          pikemanCount = savedState.pikemanCount;
          crossbowmanCount = savedState.crossbowmanCount;
          catapultCount = savedState.catapultCount;
          mongolHorsemanCount = savedState.mongolHorsemanCount;
          lastSaveTime = savedState.lastSaveTime; // Update the last save time

          updateUI();
          if (callback) callback(savedState);
        }
      };
    }

    // Function to export game state
    function exportGame() {
      loadGameData(function(gameState) {
        const gameStateString = JSON.stringify(gameState);
        const base64String = btoa(gameStateString);
        const blob = new Blob([base64String], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "medievalcivilizations.txt");
      });
    }

    // Function to load game state
    function loadGame() {
      document.getElementById('file-input').click();
    }

    // Handle file input change event
    function handleFileSelect(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const contents = e.target.result;
          const gameStateString = atob(contents);
          const gameState = JSON.parse(gameStateString);
          
          // Save the imported game state to IndexedDB
          const transaction = db.transaction(["gameState"], "readwrite");
          const store = transaction.objectStore("gameState");
          store.put(gameState);
          
          // Load the game state to update the UI
          loadGameData();
        };
        reader.readAsText(file);
      }
    }

    initializeDB();

// Import script.js to gain access to its functions and variables
// Replace 'script.js' with the actual path to your script file if necessary
import * as GameScript from 'https://raw.githubusercontent.com/largefort/medievalcivilizations/main/script.js';

// Function to initialize the debugger
function initDebugger() {
  // Add event listener for bug report form submission
  document.getElementById('bug-report-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    
    // Get bug description from form
    let bugDescription = document.getElementById('bug-description').value;
    
    // Log bug report to console
    logBug(bugDescription);
    
    // Clear the bug description field after submission (optional)
    document.getElementById('bug-description').value = '';
  });
}

// Function to log bugs/errors
function logBug(description) {
  // Example: Logging to console
  console.error(`Bug/Error: ${description}`);
  
  // Example: Logging to script.js for more detailed logging or error handling
  GameScript.logError(description);
}

// Function to log debug messages
function logDebug(message) {
  // Example: Logging to console
  console.log(`[DEBUG] ${message}`);
  
  // Example: Logging to script.js for detailed debug logging
  GameScript.logDebug(message);
}

// Initialize the debugger
initDebugger();

// Export functions if needed
export { logBug, logDebug };

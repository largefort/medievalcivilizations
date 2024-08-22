// JavaScript to manage the Screen Reader Mode using ResponsiveVoice
function toggleScreenReaderMode() {
    var isEnabled = document.getElementById('toggle-screen-reader').checked;
    
    if (isEnabled) {
        enableScreenReader();
    } else {
        disableScreenReader();
    }
}

function enableScreenReader() {
    document.body.addEventListener('focus', screenReaderSpeak, true);
    console.log('Screen Reader Mode Enabled');
}

function disableScreenReader() {
    document.body.removeEventListener('focus', screenReaderSpeak, true);
    console.log('Screen Reader Mode Disabled');
}

function screenReaderSpeak(event) {
    var textToSpeak = event.target.getAttribute('aria-label') || event.target.innerText;
    if (textToSpeak) {
        ResponsiveVoice.speak(textToSpeak);
    }
}

// Accessibility speech function, you can also replace this with a more sophisticated one if needed
function speakText(element) {
    var text = element.getAttribute('aria-label') || element.innerText;
    ResponsiveVoice.speak(text);
}

// Example usage of ResponsiveVoice.js for text-to-speech
function toggleTTS() {
    var ttsEnabled = document.getElementById('toggle-tts').checked;
    if (ttsEnabled) {
        // Code to enable text-to-speech globally
        console.log('Text-to-Speech Enabled');
    } else {
        // Code to disable text-to-speech globally
        console.log('Text-to-Speech Disabled');
    }
}

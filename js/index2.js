document.addEventListener('deviceready', onDeviceReady, false);

GameProgressManager.detectAutosaveMethod(function(result) {
    console.log('Detected Autosave Method:', result.method);
}, function(err) {
    console.error('Failed to detect autosave method:', err);
});

{
    "method": "LocalStorage"
}
function onDeviceReady() {
    document.getElementById('export-btn').addEventListener('click', exportGameProgress);
    document.getElementById('load-btn').addEventListener('click', loadGameProgress);
}

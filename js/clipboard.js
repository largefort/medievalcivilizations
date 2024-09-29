function copyToClipboard() {
    const output = document.getElementById('export-output');
    output.select();
    document.execCommand('copy');
    alert('Exported game progress copied to clipboard!');
}

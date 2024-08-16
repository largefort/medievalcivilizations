document.addEventListener("DOMContentLoaded", function() {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const isCorrectDomain = window.location.hostname === "medievalcivilizations.online";

    if (isMobile && isCorrectDomain) {
        document.getElementById('graph-btn').style.display = 'block';
    }
});

// Function to toggle graph visibility
function toggleGraphVisibility() {
    const graphContainer = document.getElementById('fpsChartContainer');
    const isVisible = graphContainer.style.display === 'block';
    graphContainer.style.display = isVisible ? 'none' : 'block';
}

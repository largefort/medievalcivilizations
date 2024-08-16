document.addEventListener("DOMContentLoaded", function() {
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const isCorrectDomain = window.location.hostname === "medievalcivilizations.online";

    if (isMobile && isCorrectDomain) {
        document.getElementById('graph-btn').style.display = 'block';
    }

    // Function to toggle graph visibility
    function toggleGraphVisibility() {
        const graphContainer = document.getElementById('fpsChartContainer');
        const isVisible = graphContainer.style.display === 'block';
        graphContainer.style.display = isVisible ? 'none' : 'block';
    }

    // Key binding to toggle FPS Graph visibility with lowercase 'g'
    document.addEventListener('keydown', function (e) {
        if (e.key === 'g') {
            toggleGraphVisibility();
        }
    });

    // Attach the toggle function to the button for mobile users
    document.getElementById('graph-btn').addEventListener('click', toggleGraphVisibility);
});

// Loading spinner
function loadGameFaster() {
    // Simple way to delay DOM rendering for better perceived performance
    window.addEventListener('load', function () {
        setTimeout(function () {
            document.body.classList.remove('loading-blur');
            document.querySelector('.loading-spinner').style.display = 'none';
        }, 1000); // Adjust the time delay as needed
    });
}

loadGameFaster();

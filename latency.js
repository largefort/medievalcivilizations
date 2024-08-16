document.addEventListener("DOMContentLoaded", function () {
    const spinner = document.createElement('div');
    spinner.classList.add('loading-spinner');
    spinner.innerHTML = `
        <i class="fas fa-spinner fa-spin"></i>
        <div class="loading-percentage">Loading: <span id="loading-progress">0%</span></div>
    `;
    document.body.appendChild(spinner);

    const vignette = document.createElement('div');
    vignette.classList.add('vignette-overlay');
    document.body.appendChild(vignette);

    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 10;
        document.getElementById('loading-progress').textContent = `${progress}%`;
        if (progress >= 100) {
            clearInterval(progressInterval);
            spinner.remove();
            vignette.style.display = 'none';
            document.body.classList.remove('loading-blur');
        }
    }, 300); // Simulates loading progress; adjust as needed

    document.body.classList.add('loading-blur');

    // Implement FPS and Latency Graphs using Chart.js
    const ctx = document.getElementById('fpsChart').getContext('2d');
    const fpsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 30 }, (_, i) => i + 1),
            datasets: [{
                label: 'FPS',
                borderColor: '#ffd700',
                data: []
            }, {
                label: 'Latency (ms)',
                borderColor: '#ff5733',
                data: []
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    let frameCount = 0;
    let lastTime = performance.now();

    function updateGraph() {
        const now = performance.now();
        const deltaTime = now - lastTime;

        // Simulate FPS and Latency data
        const fps = Math.round(1000 / deltaTime);
        const latency = Math.floor(Math.random() * 100); // Simulated latency

        fpsChart.data.datasets[0].data.push(fps);
        fpsChart.data.datasets[1].data.push(latency);

        if (fpsChart.data.datasets[0].data.length > 30) {
            fpsChart.data.datasets[0].data.shift();
            fpsChart.data.datasets[1].data.shift();
        }

        fpsChart.update();

        lastTime = now;
        requestAnimationFrame(updateGraph);
    }

    updateGraph();

    // Key binding to toggle FPS Graph visibility
    let graphVisible = false;
    document.addEventListener('keydown', function (e) {
        if (e.key === 'g') {
            graphVisible = !graphVisible;
            document.getElementById('fpsChartContainer').style.display = graphVisible ? 'block' : 'none';
        }
    });

    // For mobile, show button in settings tab
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile) {
        const fpsButton = document.createElement('button');
        fpsButton.textContent = 'Show FPS Graph';
        fpsButton.onclick = () => {
            graphVisible = !graphVisible;
            document.getElementById('fpsChartContainer').style.display = graphVisible ? 'block' : 'none';
        };
        document.getElementById('settings-tab').appendChild(fpsButton);
    }
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

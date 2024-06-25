// Canvas setup and medieval visuals
function initializeCanvas() {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    function drawCastle() {
        ctx.fillStyle = "#8B4513"; // Brown color for the castle
        ctx.fillRect(300, 200, 200, 200); // Draw the castle body
        ctx.fillStyle = "#A52A2A"; // Red color for the roof
        ctx.moveTo(250, 200);
        ctx.lineTo(400, 100);
        ctx.lineTo(550, 200);
        ctx.fill(); // Draw the roof
    }

    function drawSun() {
        ctx.beginPath();
        ctx.arc(700, 100, 50, 0, Math.PI * 2, true); // Draw the sun
        ctx.fillStyle = "#FFD700";
        ctx.fill();
    }

    function drawGround() {
        ctx.fillStyle = "#228B22"; // Green color for the ground
        ctx.fillRect(0, 400, 800, 200); // Draw the ground
    }

    function drawScene() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        drawGround();
        drawCastle();
        drawSun();
    }

    setInterval(drawScene, 1000 / 60); // Redraw the scene 60 times per second
}

initializeCanvas();

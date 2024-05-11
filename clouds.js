function createCloud() {
    const cloudContainer = document.getElementById('clouds-container');
    const cloud = document.createElement('img');
    cloud.src = 'clouds.jpg'; // Ensure the path to your cloud image is correct
    cloud.style.position = 'absolute';
    cloud.style.height = '50px'; // Adjust size as needed
    cloud.style.opacity = '0.6'; // Make clouds semi-transparent
    cloud.style.top = `${Math.random() * (window.innerHeight - 50)}px`; // Random vertical position within the window
    cloud.style.left = `${-200}px`; // Start position outside the window
    cloudContainer.appendChild(cloud);

    const speed = 20000 + Math.random() * 10000; // Clouds move at random speeds

    // Animate the cloud moving from left to right
    const keyframes = [
        { transform: 'translateX(0px)' },
        { transform: `translateX(${window.innerWidth + 200}px)` }
    ];
    const animation = cloud.animate(keyframes, {
        duration: speed,
        easing: 'linear'
    });
    animation.onfinish = () => cloud.remove(); // Remove cloud after animation to clean up
}

// Create a new cloud every 4 seconds
setInterval(createCloud, 4000);

window.onload = createCloud; // Create an initial cloud on load

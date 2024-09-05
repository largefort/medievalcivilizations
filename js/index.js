  // Create a div element for the floating text
    const floatingText = document.createElement('div');
    floatingText.className = 'floating-text';
    floatingText.innerText = `+${coinsGained}`;

    // Adjust position of the floating text considering scroll position
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    floatingText.style.left = `${event.clientX + scrollLeft}px`;
    floatingText.style.top = `${event.clientY + scrollTop}px`;

    // Add the floating text to the body
    document.body.appendChild(floatingText);

    // Remove the floating text after the animation completes
    setTimeout(() => {
        floatingText.remove();
    }, 1000); // Match this duration with the CSS animation duration
}

// Example usage of the function within a click event listener
document.addEventListener('click', function(event) {
    const coinsGained = 10; // Example value, replace with actual logic
    createFloatingText(coinsGained, event);
});
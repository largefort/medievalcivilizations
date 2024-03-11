document.addEventListener('DOMContentLoaded', function() {
    const modUploadInput = document.getElementById('modUpload');
    modUploadInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (!file) {
            alert('No file selected. Please select a file to upload.');
            return;
        }

        if (file.name !== 'ModConfiguration.json') {
            alert('The file must be named "modconfiguration.json". Please select the correct file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const mod = JSON.parse(e.target.result);
                applyMod(mod);
                alert('Mod uploaded and applied successfully.');
            } catch (error) {
                alert('Failed to read or apply the mod. Please ensure the file is a valid JSON format.');
                console.error('Error reading or applying mod:', error);
            }
        };
        reader.readAsText(file);
    });
});
function applyMod(mod) {
    // Apply unit costs from the mod
    if (mod.unitCosts) {
        Object.keys(mod.unitCosts).forEach(unit => {
            const unitCostElement = document.getElementById(`${unit}-cost`);
            if (unitCostElement) {
                unitCostElement.textContent = `Cost: ${mod.unitCosts[unit]}`;
            }
        });
    }

    // Apply new units from the mod
    if (mod.newUnits && Array.isArray(mod.newUnits)) {
        mod.newUnits.forEach(unit => {
            const unitsContainer = document.getElementById('units-container'); // Your game should have a container for units
            const unitElement = document.createElement('div');
            unitElement.innerHTML = `<h3>${unit.name}</h3><p>Cost: ${unit.cost}</p>`;
            unitsContainer.appendChild(unitElement);
        });
    }

    // Update gold multiplier
    if (mod.hasOwnProperty('goldMultiplier')) {
        // Update gold multiplier in the game
        // This example simply logs it; replace with your game's logic
        console.log(`Gold Multiplier updated to ${mod.goldMultiplier}`);
    }

    // Change background image
    if (mod.backgroundImage) {
        document.body.style.backgroundImage = `url('${mod.backgroundImage}')`;
    }
}
window.uploadMod = function() {
        // Programmatically trigger the file input click event
        document.getElementById('modUpload').click();
    };

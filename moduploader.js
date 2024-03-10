document.addEventListener('DOMContentLoaded', function() {
    const modUploadInput = document.getElementById('modUpload');
    modUploadInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const mod = JSON.parse(e.target.result);
                applyMod(mod);
            } catch (error) {
                alert('Error processing mod file.');
            }
        };
        reader.readAsText(file);
    });
});

function applyMod(mod) {
    if (mod.unitCosts) {
        Object.entries(mod.unitCosts).forEach(([unit, cost]) => {
            if (document.getElementById(`${unit}-cost`)) {
                document.getElementById(`${unit}-cost`).textContent = `Cost: ${cost}`;
            }
        });
    }

    if (mod.newUnits) {
        mod.newUnits.forEach(unit => {
            const unitsContainer = document.getElementById('units-container');
            const unitElement = document.createElement('div');
            unitElement.innerHTML = `<h3>${unit.name}</h3><p>Cost: ${unit.cost}</p>`;
            unitsContainer.appendChild(unitElement);
        });
    }

    if (mod.hasOwnProperty('goldMultiplier')) {
        console.log(`Gold Multiplier updated to ${mod.goldMultiplier}`);
    }

    if (mod.backgroundImage) {
        document.body.style.backgroundImage = `url('${mod.backgroundImage}')`;
    }
}

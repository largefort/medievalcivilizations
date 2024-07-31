document.addEventListener('DOMContentLoaded', (event) => {
  const versionHistory = [
    { version: "1.0.4", date: "July 6, 2024", description: "hi there i recently balanced the passive income function via script.js and i have balanced and a litle bit of nerfing with the unit income rates enjoy" },
   { version: "1.0.4", date: "July 6, 2024", description: "removed Medieval AI because it caused some issue that made players annoyed when playing medievalcivilizations.online because the chatbot always popsup during launch" },
    { version: "1.0.3", date: "July 6, 2024", description: "i have implemented cost increase on each every medieval militant units per purchase increases cost by 15%" },
    { version: "1.0.2", date: "July 6, 2024", description: "updated script.js to implement the four new medieval military units to be part of the game" },
    { version: "1.0.1", date: "July 6, 2024", description: "added four new military medieval units via shop." },
    { version: "1.0.0", date: "July 6, 2024", description: "Initial release of the game." },
    // Add more version history items here
  ];

  const versionHistoryBox = document.getElementById('version-history');
  versionHistory.forEach(entry => {
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('version-entry');
    entryDiv.innerHTML = `
      <h4>Version: ${entry.version}</h4>
      <p>Date: ${entry.date}</p>
      <p>Description: ${entry.description}</p>
    `;
    versionHistoryBox.appendChild(entryDiv);
  });
});

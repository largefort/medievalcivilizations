document.addEventListener('DOMContentLoaded', (event) => {
  const versionHistory = [
       { version: "1.0.0", date: "August 20, 2024", description: "hi i added back up progress mechanism using FileSaver.js library to help players backup their progress and loading them anytime and also added floating text and statistcs tab into the game and also the game now uses localstorage and the backup progress mechanism can be found via ingame settings tab and also play medievalcivilizations on my new website fjörðr games then navigate to https://fjordrgames.online and then navigate into our games and also i created a custom player called fjörðr player to allow players to play my embedded games on this site" },
    { version: "1.0.0", date: "July 6, 2024", description: "hi there i recently balanced the passive income function via script.js and i have balanced and a litle bit of nerfing with the unit income rates enjoy" },
   { version: "1.0.0", date: "July 6, 2024", description: "removed Medieval AI because it caused some issue that made players annoyed when playing medievalcivilizations.online because the chatbot always popsup during launch" },
    { version: "1.0.0", date: "July 6, 2024", description: "i have implemented cost increase on each every medieval militant units per purchase increases cost by 15%" },
    { version: "1.0.0", date: "July 6, 2024", description: "updated script.js to implement the four new medieval military units to be part of the game" },
    { version: "1.0.0", date: "July 6, 2024", description: "added four new military medieval units via shop." },
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

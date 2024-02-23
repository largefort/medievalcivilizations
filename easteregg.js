// easteregg.js

const customCode = 'thankyouforplayingmygame';

let customCodeIndex = 0;

document.addEventListener('keydown', function (event) {
  if (event.key === customCode[customCodeIndex]) {
    customCodeIndex++;

    if (customCodeIndex === customCode.length) {
      activateCustomCode();
      customCodeIndex = 0;
    }
  } else {
    customCodeIndex = 0;
  }
});

function activateCustomCode() {
  // Display the video message
  const videoElement = document.createElement('video');
  videoElement.src = 'your_video_file.mp4'; // Replace with the actual video file
  videoElement.controls = true;
  videoElement.autoplay = true;
  videoElement.loop = false;

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close" onclick="closeVideoModal()">&times;</span>
      <p>Thanks for playing my game!</p>
      ${videoElement.outerHTML}
    </div>
  `;

  document.body.appendChild(modal);

  // Pause any background audio
  document.getElementById('medievaltheme').pause();
}

function closeVideoModal() {
  const modal = document.querySelector('.modal');
  modal.parentNode.removeChild(modal);

  // Resume background audio
  document.getElementById('medievaltheme').play();
}

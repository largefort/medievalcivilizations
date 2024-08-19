  function getOrGenerateUUID() {
      let existingUUID = localStorage.getItem('deviceUUID');
      if (!existingUUID) {
          let newUUID = uuid.v4();
          localStorage.setItem('deviceUUID', newUUID);
          return newUUID;
      }
      return existingUUID;
  }

  const deviceUUID = getOrGenerateUUID();
  document.getElementById('uuid-display').innerText = `UUID: ${deviceUUID}`;

  let isTTSOn = true;

  function speakText(element) {
      if (!isTTSOn) return;

      const text = element.getAttribute('aria-label') || element.innerText;

      TTS.speak({
          text: text,
          locale: 'en-US',
          rate: 1.0
      }, function() {
          console.log('Success');
      }, function(reason) {
          console.log('Error:', reason);
      });
  }

  function toggleTTS() {
      isTTSOn = !isTTSOn;

      const status = isTTSOn ? 'enabled' : 'disabled';
      TTS.speak({
          text: `Text-to-speech has been ${status}`,
          locale: 'en-US',
          rate: 1.0
      }, function() {
          console.log('Success');
      }, function(reason) {
          console.log('Error:', reason);
      });
  }

  document.addEventListener('deviceready', function() {
      document.querySelectorAll('[aria-label], .upgrade').forEach(element => {
          element.addEventListener('click', () => speakText(element));
      });
  }, false);

  // Function to update the document title with gold coin count
  function updateDocumentTitle() {
      const coinCountElement = document.getElementById('counter');
      const coinCountText = coinCountElement.textContent || coinCountElement.innerText;
      const coinCount = coinCountText.replace(/[^0-9]/g, ''); // Extract only the number
      document.title = `Gold Coins: ${coinCount}`;
  }

  // Update the title every second
  setInterval(updateDocumentTitle, 1000);
/**
 * Toggles the sound state between muted and unmuted, and updates the sound icon.
 * @function handleSound
 */
function handleSound() {
    isMuted = JSON.parse(localStorage.getItem("isMuted"));
    isMuted = !isMuted;
    localStorage.setItem("isMuted", isMuted);
    isMuted ? muteAllSounds() : unmuteAllSounds();
    document.getElementById("sound").src = isMuted
      ? "./img/8.Controls/soundOff.webp"
      : "./img/8.Controls/soundOn.webp";
  }
  
  /**
   * Toggles the game between paused and playing states and updates the pause/play button and sound state.
   */
  function handlePlayAndPause() {
    isPaused = !isPaused;
    isPaused ? stopGame() : restartGame();
    document.getElementById("pauseButton").src = isPaused
      ? "./img/8.Controls/play.webp"
      : "./img/8.Controls/pause.webp";
    document.getElementById("handleSound").disabled = isPaused ? true : false;
    if ((!isMuted && isPaused) || (!isPaused && !isMuted)) {
      handleSound();
    }
  }

  /**
 * Plays the given audio file if it's not muted and hasn't been played already.
 */
function playSound(audio) {
    if (!isMuted && audio.paused) {
      audio.play().catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Audio-Fehler:", error);
        }
      });
      if (!soundData.some((sound) => sound.audio === audio)) {
        soundData.push({ audio });
      }
    }
  }
  
  /**
   * Mutes all audio elements that are stored in the `soundData` array.
   * It sets the `muted` property of each audio element to `true`.
   * @function muteAllSounds
   */
  function muteAllSounds() {
    soundData.forEach((sound) => {
      sound.audio.muted = true;
    });
  }
  
  /**
   * Unmutes all audio elements that are stored in the `soundData` array.
   * It sets the `muted` property of each audio element to `false`.
   * @function unmuteAllSounds
   */
  function unmuteAllSounds() {
    soundData.forEach((sound) => {
      sound.audio.muted = false;
    });
  }
  
  /**
   * Checks the current sound status and handles muting/unmuting based on the `isMuted` flag.
   * If `isMuted` is true, it triggers the `handleSound` function to mute the sounds.
   * @function checkSound
   */
  function checkSound() {
    if (isMuted) {
      muteAllSounds();
    } else {
      unmuteAllSounds();
    }
    document.getElementById("sound").src = isMuted
      ? "./img/8.Controls/soundOff.webp"
      : "./img/8.Controls/soundOn.webp";
  }
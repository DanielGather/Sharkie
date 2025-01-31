let canvas;
let world;
let keyboard = new Keyboard();
let intervalIDs = [];
let intervalData = [];
let intervalMovementIDs = [];
let intervalMovementData = [];
let soundData = [];
let sprites;
let sounds;
let soundIsOn = true;
let isMuted;
let isPaused = false;
let coinMultiplikator = 1.25;
let fishMultiplikator = 1.25;
let poisonBottleMultiplikator = 1.15;
let speedNormalFishMultiplikator = 1.35;
let speedDangerousFishMultiplikator = 1.75;
let nextLevelBoolean = false;
let levelCounter = 1;
let rageMode = false;
let check = false;

/**
 * Fetches the sprites data from the JSON file and stores it in the `sprites` variable.
 * This function sends an HTTP request to fetch the `sprites.json` file and parses the JSON content into
 * the `sprites` object, which can then be used for game rendering or animations.
 * @async
 * @function importSprites
 */
async function importSprites() {
  response = await fetch("./js/sprites.json");
  sprites = await response.json();
  getMuteStatus();
  checkSound();
}

/**
 * Initializes the game and handles the display of all containers.
 * This function starts the game by calling the `init` function to set up the necessary game parameters
 * and then triggers the `handleAllContainers` function to manage the visibility and state of various
 * UI elements in the game.
 * @function startGame
 */
function startGame() {
  init();
  handleAllCointainers();
}

function getMuteStatus(){
  isMuted = JSON.parse(localStorage.getItem("isMuted"));
}

/**
 * Initializes the game world by resetting parameters, checking sound settings,
 * and applying the provided new damage value.
 * This function first clears all previous parameters and checks the sound settings
 * if the `world` object exists. Then, it calls `newWorld` to set up the world with the given `newDamage` value.
 * @function init
 * @param {number} newDamage - The new damage value to apply to the world when initializing.
 */
function init(newDamage) {
  if (world) {
    clearAllParameters();
    checkSound();
  }
  newWorld(newDamage);
}

/**
 * Creates a new game world instance with the given damage value and initializes it with a canvas and keyboard input.
 * This function retrieves the canvas element from the DOM and creates a new `World` object with the provided
 * `newDamage` value, along with the canvas and keyboard inputs. It sets up the initial world state for the game.
 * @function newWorld
 * @param {number} newDamage - The damage value to initialize the world with.
 */
function newWorld(newDamage) {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, newDamage);
}

/**
 * Stops the game by clearing all active intervals.
 * This function iterates through two arrays of interval IDs (`intervalIDs` and `intervalMovementIDs`),
 * and clears all active intervals using `clearInterval`, effectively halting any scheduled repeated actions
 * in the game, such as movement or game updates.
 * @function stopGame
 */
function stopGame() {
  intervalIDs.forEach(clearInterval);
  intervalMovementIDs.forEach(clearInterval);
}

/**
 * Restarts the game by reinitializing all intervals.
 * This function iterates over the `intervalData` and `intervalMovementData` arrays, which contain objects
 * with `fn` (the function to be executed) and `time` (the interval time in milliseconds). It uses `setInterval`
 * to restart the functions and adds their interval IDs to `intervalIDs` and `intervalMovementIDs` respectively.
 * @function restartGame
 */
function restartGame() {
  intervalData.forEach(({ fn, time }) => {
    let id = setInterval(fn, time);
    intervalIDs.push(id);
  });
  intervalMovementData.forEach(({ fn, time }) => {
    let id = setInterval(fn, time);
    intervalMovementIDs.push(id);
  });
}

/**
 * Advances to the next level by incrementing the level counter and updating various game parameters.
 * This function increases the `levelCounter` by 1, sets `nextLevelBoolean` to true, and adjusts multiple game variables
 * for the next level. These include the number of coins, enemies, poison bottles, and the speed of both normal and
 * dangerous fish. It also adjusts the damage based on the current level's enemy data and recalculates the canvas'
 * position for the next level. Finally, it reinitializes the game with updated values.
 * @function nextLevel
 */
function nextLevel() {
  levelCounter++;
  nextLevelBoolean = true;
  coinsPerLevel = coinsPerLevel * coinMultiplikator;
  enemyPerLevel = enemyPerLevel * fishMultiplikator;
  PoisonBottleLevel = PoisonBottleLevel * poisonBottleMultiplikator;
  speedNormalFish = speedNormalFish * speedNormalFishMultiplikator;
  speedFromDangerousFish = speedFromDangerousFish * speedDangerousFishMultiplikator;
  newDamage = Level.enemyLevelArray[0].damage + 2;
  repeatCanvas++;
  first_level_end_x_ = repeatCanvas * canvasStep;
  init(newDamage);
  handleAllCointainers();
}

/**
 * Resets the game parameters to their initial values for the current level.
 * This function restores various game settings to their starting values at the beginning of a new level,
 * such as the number of coins, poison bottles, enemies, and the speed of normal and dangerous fish. It
 * also recalculates the canvas step size and the damage of the first enemy in the level.
 * @function resetLevelParameter
 */
function resetLevelParameter() {
  if (world) {
    repeatCanvas = 4;
    coinsPerLevel = 10;
    PoisonBottleLevel = 15;
    enemyPerLevel = 10;
    speedNormalFish = 0.5;
    speedFromDangerousFish = 0.1;
    canvasStep = 1024;
    first_level_end_x_ = repeatCanvas * canvasStep;
    dangerousEnemiesPerLevel = repeatCanvas;
    Level.enemyLevelArray[0].damage = 1;
  }
}

/**
 * Clears all game-related parameters and resets relevant variables.
 * This function resets or clears key variables used throughout the game, including the game world, level
 * data, sound data, and all interval-related data. It prepares the game for a restart or cleanup by
 * clearing these parameters.
 * @function clearAllParameters
 */
function clearAllParameters() {
  canvas = null;
  world = null;
  Level.enemyLevelArray = [];
  soundData = [];
  intervalIDs = [];
  intervalData = [];
  intervalMovementIDs = [];
  intervalMovementData = [];
}

/**
 * Hides all non-essential containers and adjusts the layout for gameplay.
 * This function hides various game containers such as the start screen, story container,
 * data privacy, imprint, win container, and info container. It also sets the z-index
 * for key UI elements (joystick, finSlap, and shoot buttons) and makes the top control
 * buttons visible. The function prepares the UI for when the game is in an active state.
 * @function handleAllCointainers
 */
function handleAllCointainers() {
  document.getElementById("startImage").classList.add("d-none");
  document.getElementById("startScreen").classList.add("d-none");
  document.getElementById("storyContainer").classList.add("d-none");
  document.getElementById("dataPrivacyContainer").classList.add("d-none");
  document.getElementById("imprintContainer").classList.add("d-none");
  document.getElementById("controlsContainer").classList.add("d-none");
  document.getElementById("winContainer").classList.add("d-none");
  document.getElementById("infoContainer").classList.add("d-none");
  document.getElementById("controlButtonsTop").classList.remove("d-none")
  document.getElementById("joystick").style.zIndex = "888";
  document.getElementById("finSlap").style.zIndex = "999";
  document.getElementById("shoot").style.zIndex = "999";
}

/**
 * Toggles the sound state between muted and unmuted, and updates the sound icon.
 * This function checks the current mute state, toggles it, and calls either the
 * `muteAllSounds` or `unmuteAllSounds` function based on the new mute state. It also
 * updates the sound icon on the UI to reflect the current sound status (mute or unmute).
 * @function handleSound
 */
function handleSound() {
  isMuted = JSON.parse(localStorage.getItem("isMuted"));
  isMuted = !isMuted;
  localStorage.setItem("isMuted", isMuted);
  isMuted ? muteAllSounds() : unmuteAllSounds();
  document.getElementById("sound").src = isMuted ? "./img/8.Controls/soundOff.webp" : "./img/8.Controls/soundOn.webp";
}

/**
 * Toggles the game between paused and playing states and updates the pause/play button and sound state.
 * This function checks if the game is currently paused and toggles its state. If the game is paused,
 * it calls `stopGame()` to halt the game, and if the game is unpaused, it calls `restartGame()` to
 * resume the game. It also updates the pause/play button icon, disables or enables the sound control button,
 * and manages the sound state by calling `handleSound` if either the game is unpaused or the sound is unmuted.
 * @function handlePlayAndPause
 */
function handlePlayAndPause() {
  isPaused = !isPaused;
  isPaused ? stopGame() : restartGame();
  document.getElementById("pauseButton").src = isPaused
    ? "./img/8.Controls/play.webp"
    : "./img/8.Controls/pause.webp";
  document.getElementById("handleSound").disabled = isPaused ? true : false;
  if ((!isMuted && isPaused) || (!isPaused && !isMuted) ) {
    handleSound();
  }
}

/**
 * Sets the THROW action for mobile controls.
 * This function is called when a mobile control (such as a button or touch event) is used to trigger
 * the throw action in the game. It sets `keyboard.THROW` to `true`, indicating that the throw action
 * should be executed. This could be used in a mobile environment where a button or gesture is mapped to
 * this action.
 *
 * @function shootMobile
 */
function shootMobile() {
  keyboard.THROW = true;
}

/**
 * Sets the SPACE action for mobile controls.
 * This function is triggered when a mobile control (such as a button or touch event) is used
 * to perform the "fin slap" action in the game. It sets `keyboard.SPACE` to `true`, which can
 * indicate the player's intent to perform a specific action, like slapping with a fin.
 * @function finSlapMobile
 */
function finSlapMobile() {
  keyboard.SPACE = true;
}

/**
 * Displays the story container and hides the start screen.
 * This function is called to transition the game from the start screen to the story screen.
 * It removes the "d-none" class from the story container to make it visible and hides
 * the start image and the start screen by adding the "d-none" class.
 * @function showStory
 */
function showStory() {
  document.getElementById("storyContainer").classList.remove("d-none");
  document.getElementById("startImage").classList.add("d-none");
  document.getElementById("startScreen").classList.add("d-none");
}

/**
 * Displays the win screen by making the win container visible.
 * This function is used to show the win screen by removing the "d-none" class
 * from the win container. It allows the user to see the win screen after winning the game.
 * @function showWinScreen
 */
function showWinScreen() {
  document.getElementById("winContainer").classList.remove("d-none");
}

/**
 * Displays the lose screen by making the lose container visible.
 * This function is used to show the lose screen by removing the "d-none" class
 * from the lose container. It allows the user to see the lose screen after losing the game.
 * @function showLoseScreen
 */
function showLoseScreen() {
  document.getElementById("loseContainer").classList.remove("d-none");
}

/**
 * Displays the info screen by making the info container visible.
 * This function removes the "d-none" class from the info container, making it visible
 * to the user. It also hides the start screen and start image by adding the "d-none" class.
 * @function showInfo
 */
function showInfo() {
  document.getElementById("infoContainer").classList.remove("d-none");
  document.getElementById("startImage").classList.add("d-none");
  document.getElementById("startScreen").classList.add("d-none");
}

/**
 * Displays the data privacy screen by making the data privacy container visible.
 * This function removes the "d-none" class from the data privacy container, making it visible
 * to the user. It also hides the start screen and start image by adding the "d-none" class.
 * @function showDataPrivacy
 */
function showDataPrivacy() {
  document.getElementById("dataPrivacyContainer").classList.remove("d-none");
  document.getElementById("startImage").classList.add("d-none");
  document.getElementById("startScreen").classList.add("d-none");
}

/**
 * Displays the imprint screen by making the imprint container visible.
 * This function removes the "d-none" class from the imprint container, making it visible
 * to the user. It also hides the start screen and start image by adding the "d-none" class.
 * @function showImprint
 */
function showImprint() {
  document.getElementById("imprintContainer").classList.remove("d-none");
  document.getElementById("startImage").classList.add("d-none");
  document.getElementById("startScreen").classList.add("d-none");
}

/**
 * Displays the controls screen by making the controls container visible.
 * This function removes the "d-none" class from the controls container, making it visible
 * to the user. It also hides the start screen and start image by adding the "d-none" class.
 * @function showControls
 */
function showControls() {
  document.getElementById("controlsContainer").classList.remove("d-none");
  document.getElementById("startImage").classList.add("d-none");
  document.getElementById("startScreen").classList.add("d-none");
}

/**
 * Resets the game to the home screen by hiding all other containers and displaying the start screen.
 * This function hides various containers such as the lose, info, story, and win screens by adding
 * the "d-none" class to them. It also removes the visibility of certain game elements such as the
 * joystick, pause button, and controls. Then, it displays the start image and start screen again.
 * Additionally, it resets certain game parameters such as level settings.
 * @function goToHomeScreen
 */
function goToHomeScreen() {
  document.getElementById("loseContainer").classList.add("d-none");
  document.getElementById("infoContainer").classList.add("d-none");
  document.getElementById("storyContainer").classList.add("d-none");
  document.getElementById("dataPrivacyContainer").classList.add("d-none");
  document.getElementById("imprintContainer").classList.add("d-none");
  document.getElementById("winContainer").classList.add("d-none");
  document.getElementById("joystick").classList.add("d-none");
  document.getElementById("controlButtonsTop").classList.add("d-none");
  document.getElementById("controlsContainer").classList.add("d-none");
  document.getElementById("startImage").classList.remove("d-none");
  document.getElementById("startScreen").classList.remove("d-none");
  document.getElementById("finSlap").style.zIndex = "-999";
  document.getElementById("shoot").style.zIndex = "-999";
  resetLevelParameter();
}

/**
 * Sets a stoppable interval that repeatedly executes a given function after a specified time interval.
 * The interval ID is stored in `intervalIDs`, and the function and time are stored in `intervalData` for later reference.
 * @function setStoppableInterval
 * @param {Function} fn - The function to be executed at each interval.
 * @param {number} time - The time interval (in milliseconds) between each execution of the function.
 */
function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIDs.push(id);
  intervalData.push({ fn, time });
}

/**
 * Sets a stoppable movement interval that repeatedly executes a given function after a specified time interval.
 * The interval ID is stored in `intervalMovementIDs`, and the function and time are stored in `intervalMovementData` for later reference.
 * @function setStoppableMovementInterval
 * @param {Function} fn - The function to be executed at each interval.
 * @param {number} time - The time interval (in milliseconds) between each execution of the function.
 */
function setStoppableMovementInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalMovementIDs.push(id);
  intervalMovementData.push({ fn, time });
}

/**
 * Stops all active movement intervals by clearing each interval ID stored in `intervalMovementIDs`.
 * This function is useful for halting ongoing movements in the game when needed.
 * @function stopMovement
 */
function stopMovement() {
  intervalMovementIDs.forEach(clearInterval);
}

/**
 * Plays the given audio file if it's not muted and hasn't been played already.
 * If the audio is paused, it attempts to play the audio. If an error occurs (other than 'AbortError'),
 * it logs the error to the console.
 * Additionally, the audio is added to the `soundData` array if it's not already in it.
 * @function playSound
 * @param {HTMLAudioElement} audio - The audio element to be played.
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
    muteAllSounds()
  } else {
    unmuteAllSounds();
  }
  document.getElementById("sound").src = isMuted ? "./img/8.Controls/soundOff.webp" : "./img/8.Controls/soundOn.webp";
}

/**
 * Event listener for the 'keydown' event, which updates the `keyboard` object
 * based on the pressed keys. The listener tracks the following keys:
 * - "D" for right movement (sets `keyboard.RIGHT` to true)
 * - "A" for left movement (sets `keyboard.LEFT` to true)
 * - "W" for up movement (sets `keyboard.UP` to true)
 * - "S" for down movement (sets `keyboard.DOWN` to true)
 * - "Space" for performing an action (sets `keyboard.SPACE` to true and prevents the default spacebar behavior)
 * - "F" for throwing (sets `keyboard.THROW` to true)
 * @listens keydown
 * @param {KeyboardEvent} event - The keyboard event triggered when a key is pressed.
 */
document.addEventListener("keydown", (event) => {
  if (event.code == "KeyD") {
    keyboard.RIGHT = true;
  }
  if (event.code == "KeyA") {
    keyboard.LEFT = true;
  }
  if (event.code == "KeyW") {
    keyboard.UP = true;
  }
  if (event.code == "KeyS") {
    keyboard.DOWN = true;
  }
  if (event.code == "Space") {
    event.preventDefault();
    keyboard.SPACE = true;
  }
  if (event.code == "KeyF") {
    keyboard.THROW = true;
  }
});

/**
 * Event listener for the 'keyup' event, which updates the `keyboard` object
 * based on the released keys. The listener tracks the following keys:
 * - "D" for right movement (sets `keyboard.RIGHT` to false)
 * - "A" for left movement (sets `keyboard.LEFT` to false)
 * - "W" for up movement (sets `keyboard.UP` to false)
 * - "S" for down movement (sets `keyboard.DOWN` to false)
 * - "Space" for performing an action (sets `keyboard.SPACE` to false and prevents the default spacebar behavior)
 * - "F" for throwing (sets `keyboard.THROW` to false)
 * @listens keyup
 * @param {KeyboardEvent} event - The keyboard event triggered when a key is released.
 */
document.addEventListener("keyup", (event) => {
  if (event.code == "KeyD") {
    keyboard.RIGHT = false;
  }
  if (event.code == "KeyA") {
    keyboard.LEFT = false;
  }
  if (event.code == "KeyW") {
    keyboard.UP = false;
  }
  if (event.code == "KeyS") {
    keyboard.DOWN = false;
  }
  if (event.code == "Space") {
    event.preventDefault();
    keyboard.SPACE = false;
  }
  if (event.code == "KeyF") {
    keyboard.THROW = false;
  }
});

/**
 * Request the browser to enter fullscreen mode for the canvas element.
 * The function checks for the appropriate fullscreen method depending on the browser:
 * - `requestFullscreen` for standard browsers
 * - `webkitRequestFullscreen` for WebKit-based browsers (e.g., Safari)
 * - `msRequestFullscreen` for Microsoft browsers (e.g., Internet Explorer, Edge)
 * This function allows the user to toggle fullscreen mode for the canvas element.
 */
function fullscreen() {
  const canvasContainer = document.getElementById("canvas");
  if (canvasContainer.requestFullscreen) {
    canvasContainer.requestFullscreen();
  } else if (canvasContainer.webkitRequestFullscreen) {
    canvasContainer.webkitRequestFullscreen();
  } else if (canvasContainer.msRequestFullscreen) {
    canvasContainer.msRequestFullscreen();
  }
}

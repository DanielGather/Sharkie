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
 */
async function importSprites() {
  response = await fetch("./js/sprites.json");
  sprites = await response.json();
  getMuteStatus();
  checkSound();
}

/**
 * Initializes the game and handles the display of all containers.
 */
function startGame() {
  init();
  handleAllCointainers();
  document.getElementById("restart").classList.add("disabled");
  document.getElementById("restart").disabled = true;
}

function getMuteStatus() {
  isMuted = JSON.parse(localStorage.getItem("isMuted"));
}

/**
 * Initializes the game world by resetting parameters, checking sound settings,
 * and applying the provided new damage value.
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
 * @param {number} newDamage - The damage value to initialize the world with.
 */
function newWorld(newDamage) {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, newDamage);
}

/**
 * Stops the game by clearing all active intervals.
 */
function stopGame() {
  intervalIDs.forEach(clearInterval);
  intervalMovementIDs.forEach(clearInterval);
}

/**
 * Restarts the game by reinitializing all intervals.
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
 * Sets the THROW action for mobile controls.
 */
function shootMobile() {
  keyboard.THROW = true;
}

/**
 * Sets the SPACE action for mobile controls.
 */
function finSlapMobile() {
  keyboard.SPACE = true;
}

/**
 * Sets a stoppable interval that repeatedly executes a given function after a specified time interval.
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
 */
function stopMovement() {
  intervalMovementIDs.forEach(clearInterval);
}

/**
 * Request the browser to enter fullscreen mode for the canvas element.
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

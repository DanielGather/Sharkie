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
// let spritesLoaded = false;
let soundIsOn = true;
let isMuted = false;
let isPaused = false;
let coinMultiplikator = 1.25;
let fishMultiplikator = 1.25;
let poisonBottleMultiplikator = 1.15;
let speedNormalFishMultiplikator = 1.35;
let speedDangerousFishMultiplikator = 1.75;
let nextLevelBoolean = false;
let levelCounter = 1;
let rageMode = false;

async function importSprites() {
  sprites = await fetch("./js/sprites.json").then((r) => r.json());
  // await preloadImagesAndContinue()
}

async function importSounds() {
  sounds = await fetch("./js/sounds.json").then((r) => r.json());
}

async function loadSprites() {
  await importSprites();
}

function init(newDamage) {
  if (world) {
    clearAllParameters();
    checkSound();
  }
  newWorld(newDamage);
}

function newWorld(newDamage) {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, newDamage);
}

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
  init(newDamage);
  handleAllCointainers();
}

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

function checkSound() {
  // unmuteAllSounds();
  if (isMuted) {
    handleSound();
  }
}

function startGame() {
  init();
  handleAllCointainers();
}

function handleAllCointainers() {
  document.getElementById("startImage").style.display = "none";
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("storyContainer").style.display = "none";
  document.getElementById("dataPrivacyContainer").style.display = "none";
  document.getElementById("imprintContainer").style.display = "none";
  document.getElementById("controlsContainer").style.display = "none";
  document.getElementById("winContainer").style.display = "none";
  document.getElementById("infoContainer").style.display = "none";
  document.getElementById("handleSound").style.display = "flex";
  document.getElementById("gamePause").style.display = "flex";
  document.getElementById("joystick").style.zIndex = "888";
  document.getElementById("finSlap").style.zIndex = "999";
  document.getElementById("shoot").style.zIndex = "999";
}

function handleSound() {
  isMuted = !isMuted;
  isMuted ? muteAllSounds() : unmuteAllSounds();
  document.getElementById("sound").src = isMuted ? "./img/12.Controls/soundOff.webp" : "./img/12.Controls/soundOn.webp";
}

function handlePlayAndPause() {
  isPaused = !isPaused;
  isPaused ? stopGame() : restartGame();
  document.getElementById("pauseButton").src = isPaused ? "./img/12.Controls/play.webp" : "./img/12.Controls/pause.webp";
  document.getElementById("handleSound").disabled = isPaused ? true : false;
  if (!isMuted || !isPaused) {
    handleSound();
  }
}

function shootMobile() {
  keyboard.THROW = true;
}

function finSlapMobile() {
  keyboard.SPACE = true;
}

function showStory() {
  document.getElementById("storyContainer").style.display = "flex";
  document.getElementById("startImage").style.display = "none";
  document.getElementById("startScreen").style.display = "none";
}

function showWinScreen() {
  document.getElementById("winContainer").style.display = "flex";
}

function showLoseScreen() {
  document.getElementById("loseContainer").style.display = "flex";
}

function showInfo(){
  document.getElementById("infoContainer").style.display = "flex";
  document.getElementById("startImage").style.display = "none";
  document.getElementById("startScreen").style.display = "none";
}

function goToHomeScreen() {
  document.getElementById("loseContainer").style.display = "none";
  document.getElementById("infoContainer").style.display = "none";
  document.getElementById("storyContainer").style.display = "none";
  document.getElementById("dataPrivacyContainer").style.display = "none";
  document.getElementById("imprintContainer").style.display = "none";
  document.getElementById("winContainer").style.display = "none";
  document.getElementById("joystick").style.display = "none";
  document.getElementById("gamePause").style.display = "none";
  document.getElementById("handleSound").style.display = "none";
  document.getElementById("startImage").style.display = "flex";
  document.getElementById("startScreen").style.display = "flex";
  document.getElementById("finSlap").style.zIndex = "-999";
  document.getElementById("shoot").style.zIndex = "-999";
  resetLevelParameter();
}

function resetLevelParameter() {
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

function showDataPrivacy() {
  document.getElementById("dataPrivacyContainer").style.display = "flex";
  document.getElementById("startImage").style.display = "none";
  document.getElementById("startScreen").style.display = "none";
}

function showImprint() {
  document.getElementById("imprintContainer").style.display = "flex";
  document.getElementById("startImage").style.display = "none";
  document.getElementById("startScreen").style.display = "none";
}

function showControls() {
  document.getElementById("controlsContainer").style.display = "flex";
  document.getElementById("startImage").style.display = "none";
  document.getElementById("startScreen").style.display = "none";
}

function setStoppableInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalIDs.push(id);
  intervalData.push({ fn, time });
}

function setStoppableMovementInterval(fn, time) {
  let id = setInterval(fn, time);
  intervalMovementIDs.push(id);
  intervalMovementData.push({ fn, time });
}

function stopMovement() {
  intervalMovementIDs.forEach(clearInterval);
}

function stopGame() {
  intervalIDs.forEach(clearInterval);
  intervalMovementIDs.forEach(clearInterval);
}

function restartGame() {
  intervalData.forEach(({ fn, time }) => {
    let id = setInterval(fn, time);
    intervalIDs.push(id); // Speichert die neuen Interval-IDs
  });
  intervalMovementData.forEach(({ fn, time }) => {
    let id = setInterval(fn, time);
    intervalMovementIDs.push(id); // Speichert die neuen Interval-IDs
  });
}

function playSound(audio) {
  if (!isMuted) {
      audio.play();
    if (!soundData.some((sound) => sound.audio === audio)) {
      soundData.push({ audio });
    }
  }
}

function muteAllSounds() {
  soundData.forEach((sound) => {
    sound.audio.muted = true; // Muten des Sounds
  });
}

function unmuteAllSounds() {
  soundData.forEach((sound) => {
    sound.audio.muted = false; // Entmuten des Sounds
  });
}

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

function goFullscreen() {
  const canvasContainer = document.getElementById("canvas");
  const joystick = document.getElementById("joystick");
  const Container = document.getElementById("canvasContainer"); // Dein Container-Element
  if (canvasContainer.requestFullscreen) {
    canvasContainer.requestFullscreen();
    // Container.requestFullscreen();
    // joystick.requestFullscreen();
  } else if (canvasContainer.webkitRequestFullscreen) {
    // Für Safari
    canvasContainer.webkitRequestFullscreen();
    // Container.webkitRequestFullscreen();
    // joystick.webkitRequestFullscreen();
  } else if (canvasContainer.msRequestFullscreen) {
    // Für ältere IE-Versionen
    canvasContainer.msRequestFullscreen();
    // Container.msRequestFullscreen();
    // joystick.msRequestFullscreen();
  }
}

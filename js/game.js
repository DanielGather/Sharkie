let canvas;
let world;
let keyboard = new Keyboard();
let intervalIDs = [];
let intervalData = [];
let intervalMovementIDs = [];
let intervalMovementData = [];
let soundData = [];
let gamePaused = false;
let sprites;
let spritesLoaded = false;
let soundIsOn = true;
let isMuted = false;
async function importSprites() {
  sprites = await fetch("./js/sprites.json").then((r) => r.json());
}

async function loadSprites() {
  await importSprites();
  spritesLoaded = true;
}

async function init() {
  if (world) {
    world = null;
    canvas = null;
    Level.enemyLevelArray = [];
    soundData = [];
    // stopGame();
    // stopMovement();
    // level1 = null;
    // intervalData = [];
    // intervalIDs = [];
    // intervalMovementIDs = [];
    // intervalMovementData = [];
  }
  await loadSprites();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  ctx = canvas.getContext("2d");
  console.log("My Character is,", world.character);
  console.log("My World is,", world);
}

function startGame() {
  init();
  document.getElementById("startImage").style.display = "none";
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("storyContainer").style.display = "none";
  document.getElementById("dataPrivacyContainer").style.display = "none";
  document.getElementById("imprintContainer").style.display = "none";  
  document.getElementById("controlsContainer").style.display = "none";
  document.getElementById("winContainer").style.display = "none";  
  document.getElementById("joystick").style.zIndex = "999";

}

function handleSound() {
  isMuted = !isMuted;
  isMuted ? muteAllSounds() : unmuteAllSounds();
  document.getElementById("sound").src = isMuted ? "./img/12.Controls/soundOff.webp" : "./img/12.Controls/soundOn.webp";
}

// function handleSound(){
//   isMuted = !isMuted;
//   soundData.forEach(sound =>{
//     sound.audio.muted = isMuted;
//   })
// }

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

function goToHomeScreen() {
  document.getElementById("startImage").style.display = "flex";
  document.getElementById("startScreen").style.display = "flex";
  document.getElementById("storyContainer").style.display = "none";
  document.getElementById("dataPrivacyContainer").style.display = "none";
  document.getElementById("imprintContainer").style.display = "none";
  document.getElementById("winContainer").style.display = "none";
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
  muteAllSounds();
  console.log(keyboard);
  gamePaused = true;
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
  unmuteAllSounds();
}

function playSound(audio) {
  if(!isMuted){
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

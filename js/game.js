let canvas;
let world;
let keyboard = new Keyboard();
let intervalIDs = [];
let intervalData = [];
let intervalMovementIDs = [];
let intervalMovementData = [];
let soundData = [];
let sprites;
let spritesLoaded = false;
let soundIsOn = true;
let isMuted = false;
let isPaused = false;
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
  document.getElementById("handleSound").style.display = "flex";  
  document.getElementById("gamePause").style.display = "flex";  
  document.getElementById("joystick").style.zIndex = "999";

}

function isTablet() {
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const screenWidth = window.innerWidth;

  // Prüfe auf typische Tablet-Bildschirmgrößen
  return isTouchDevice && screenWidth >= 768 && screenWidth <= 1367;
}

function checkHardware(){
  if (/iPad|iPhone|Android|/i.test(navigator.userAgent)) {
    return true;
  } else {
    return false;
  }
}

function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
      return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
      return "Android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "iOS";
  }

  return "unknown";
}

window.addEventListener("resize", ()=>{
  if(checkHardware()){
    console.log("Tablet");
    
  } else {
    console.log("Desktop");
    
  }
});

// window.addEventListener("resize", ()=>{
//   if(checkHardware()){
//     console.log("Mobile");
//   } else {
//     console.log("Desktop");
    
//   }
  
// }
// )

// function checkScreenWidth() {
//   const width = window.innerWidth;

//   if (width < 768) {
//     console.log("Mobiles Layout");
//   } else if (width < 1024) {
//     console.log("Tablet Layout");
//   } else {
//     console.log("Desktop Layout");
//   }
// }

function handleSound() {
  isMuted = !isMuted;
  isMuted ? muteAllSounds() : unmuteAllSounds();
  document.getElementById("sound").src = isMuted ? "./img/12.Controls/soundOff.webp" : "./img/12.Controls/soundOn.webp";
}

function handlePlayAndPause(){
  isPaused = !isPaused;
  isPaused ? stopGame() : restartGame();
  document.getElementById("pauseButton").src = isPaused ? "./img/12.Controls/play.webp" : "./img/12.Controls/pause.webp"
  if(!isMuted || !isPaused){
    handleSound();
  }
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
  // muteAllSounds();
  console.log(keyboard);
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
  // unmuteAllSounds();
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

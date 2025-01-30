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
let check = false;


async function importSprites() {
  sprites = await fetch("./js/sprites.json").then((r) => r.json());
  // await preloadImagesAndContinue()
}

async function loadSprites() {
  await importSprites();
  checkDevice();
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
  document.getElementById("controlButtonsTop").style.display = "flex";
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
  document.getElementById("controlButtonsTop").style.display = "none";
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

function fullscreen() {
  const canvasContainer = document.getElementById("canvas");
  // const joystick = document.getElementById("joystick");
  const Container = document.getElementById("canvasContainer"); // Dein Container-Element
  const body = document.getElementById("body"); // Dein Container-Element
  if (canvasContainer.requestFullscreen) {
    canvasContainer.requestFullscreen();
    // Container.requestFullscreen();
    // body.requestFullscreen();
    // joystick.requestFullscreen();
  } else if (canvasContainer.webkitRequestFullscreen) {
    // Für Safari
    canvasContainer.webkitRequestFullscreen();
    // Container.webkitRequestFullscreen();
    // body.webkitRequestFullscreen();
    // joystick.webkitRequestFullscreen();
  } else if (canvasContainer.msRequestFullscreen) {
    // Für ältere IE-Versionen
    canvasContainer.msRequestFullscreen();
    Container.msRequestFullscreen();
    // body.msRequestFullscreen();
    // joystick.msRequestFullscreen();
  }
}

function checkDevice(){
  if(check){
    console.log("Mobile");
    document.body.style.height = "90vh";
  } else {
    console.log("kein Mobile");
  }
}

 
window.mobileCheck = function () {
  (function (a) {
      if (
          /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
              a
          ) ||
          /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
              a.substr(0, 4)
          )
      ) {
          check = true;
      }
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
};

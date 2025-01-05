let canvas;
let world;
let keyboard = new Keyboard();
let intervalIDs = [];
let intervalData = [];
let intervalMovementIDs = [];
let intervalMovementData = [];
let soundData = [];
let gamePaused = false;


function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  ctx = canvas.getContext("2d");
  console.log("My Character is,", world.character);
  console.log("My World is,", world);
  
}

// window.setStoppableInterval = function (fn, time) {
//   console.log("Ich werde aufgerufen");
//   let id = setInterval(fn, time);
//   intervalIDs.push(id);
// };

function setStoppableInterval(fn, time){
  let id = setInterval(fn,time)
  intervalIDs.push(id);
  intervalData.push({fn, time});
}

function setStoppableMovementInterval(fn, time){
  let id = setInterval(fn,time)
  intervalMovementIDs.push(id);
  intervalMovementData.push({fn, time});
}

function stopMovement(){
  intervalMovementIDs.forEach(clearInterval);
}

function stopGame(){
  intervalIDs.forEach(clearInterval)
  muteAllSounds();
  console.log(keyboard);
  gamePaused = true;
  
}

function restartGame(){
  intervalData.forEach(({ fn, time }) => {
    let id = setInterval(fn, time);
    intervalIDs.push(id); // Speichert die neuen Interval-IDs
  });
  unmuteAllSounds();
}


function playSound(audio) {
  audio.play();
  if (!soundData.some(sound => sound.audio === audio)) {
    soundData.push({ audio });
  }
}

function muteAllSounds() {
  soundData.forEach(sound => {
    sound.audio.muted = true; // Muten des Sounds
  });
}

function unmuteAllSounds() {
  soundData.forEach(sound => {
    sound.audio.muted = false; // Entmuten des Sounds
  });
}


document.addEventListener('keydown', (event) =>{
  if(event.code == "KeyD"){
    keyboard.RIGHT = true;
  }
  if(event.code == "KeyA"){
    keyboard.LEFT = true;
  }
  if(event.code == "KeyW"){
    keyboard.UP = true;
  }
  if(event.code == "KeyS"){
    keyboard.DOWN = true;
  }
  if(event.code == "Space"){
    keyboard.SPACE = true;
  }
  if(event.code == "KeyF"){
    keyboard.THROW = true;
  }
})

document.addEventListener('keyup', (event) =>{
  if(event.code == "KeyD"){
    keyboard.RIGHT = false;
  }
  if(event.code == "KeyA"){
    keyboard.LEFT = false;
  }
  if(event.code == "KeyW"){
    keyboard.UP = false;
  }
  if(event.code == "KeyS"){
    keyboard.DOWN = false;
  }
  if(event.code == "Space"){
    keyboard.SPACE = false;
  }
  if(event.code == "KeyF"){
    keyboard.THROW = false;
  }
})
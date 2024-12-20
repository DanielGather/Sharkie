let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  ctx = canvas.getContext("2d");

  console.log("My Character is,", world.character);
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
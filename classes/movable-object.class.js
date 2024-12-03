class MovableObject {
  x = 80;
  y = 200;
  height = 100;
  width = 200;
  img;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moveRight() {
    console.log("Moving right");
  }

  moveLeft() {}
}

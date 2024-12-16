class MovableObject {
  x = 0;
  y = 200;
  img;
  imageCache = {};
  currentImage = 0;
  speed = 0.1;
  hz = 144;
  otherDirection = false;
  speedY = 0;
  acceleration = 0.000;


  applyGravity(){
    setInterval(()=>{
      if(this.isNotOnTheGround()){
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }

    },1000 / this.hz);
  }

  isNotOnTheGround(){
    return this.y < 445;
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let image = new Image();
      image.src = path;
      this.imageCache[path] = image;
    });
  }

  moveRight() {
    console.log("Moving right");
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / this.hz);
  }

  playAnimation(images) {
    let i = this.currentImage % this.IMAGES_SWIMING.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}

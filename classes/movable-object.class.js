class MovableObject {
  x = 80;
  y = 200;
  img;
  imageCache = {};
  currentImage = 0;
  speed = 0.1;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr){
    arr.forEach((path) => {
      let image = new Image();
      image.src = path;
      this.imageCache[path] = image;
    });
  }

  moveRight() {
    console.log("Moving right");
  }

  moveLeft(){
    setInterval(() =>{
        this.x -= this.speed;
    },1000/144)
  }

}

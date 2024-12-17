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
  acceleration = 0.005;
  lifebar = 100;
  animationDead = false;

  applyGravity() {
    setInterval(() => {
      if (this.isNotOnTheGround()) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / this.hz);
  }

  isNotOnTheGround() {
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
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  playAnimation(images) {
    let i = this.currentImage % this.IMAGES_SWIMING.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  swimUP() {
    this.speedY = 0;
    this.y -= this.speed;
  }

  swimDOWN() {
    this.y += this.speed;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Fish) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  isColliding(mo){
    return this.x + this.width > mo.x &&
    this.y + this.height > mo.y &&
    this.x < mo.x &&
    this.y < mo.y + mo.height
  }

  isCollidingNew (obj) {
    return  (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) && 
            (this.y + this.offsetY + this.height) >= obj.y &&
            (this.y + this.offsetY) <= (obj.y + obj.height) && 
            obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
  }

  hit(){
    this.lifebar -= 5;
    if(this.lifebar < 0){
      this.lifebar = 0;
    }
  }

  isDead(){
    return this.lifebar == 0;
  }

  // isDead(){
  //   setInterval(() => {
  //       if(this.lifebar < 0 && !this.animationDead){
  //       this.playAnimation(this.IMAGES_ELECTRO_DEAD);
  //       this.animationDead = true;
  //     }
  //     }, 300);
  // }


}

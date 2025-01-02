class MovableObject extends DrawableObject {
  speed = 0.1;
  hz = 144;
  otherDirection = false;
  speedY = 0;
  acceleration = 0.005;
  lifebar = 100;
  poisonStorage = 20;
  coins = 0;
  lastHit = 0;
  height = 100;
  width = 100;
  lastMovementCharacter;

  // offset = {
  //   top: 0,
  //   right: 0,
  //   left: 0,
  //   bottom: 0
  // }

  applyGravity() {
    setInterval(() => {
      if (this.isNotOnTheGround()) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / this.hz);
  }

  isNotOnTheGround() {
    return this.y < 415;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
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




  isColliding(mo){
    // console.log("MO OFFSET LEFT",mo.offset.left);    
    // console.log("MO X",mo.x);

    // console.log("Character X VORNE", this.x + this.width - this.offset.right, "MO X VORNE", mo.x + mo.offset.left);    
    // console.log("Character Y UNTEN", this.y + this.height - this.offset.bottom, "MO Y OBEN", mo.y + mo.offset.top);
    // console.log("Character X HINTEN", this.x + this.offset.left, "MO X HINTEN", mo.x + mo.width - mo.offset.right);
    // console.log("Character Y OBEN", this.y + this.offset.top, "MO Y UNTEN", mo.y + mo.height - mo.offset.bottom);

    return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
    this.y + this.height - this.offset.bottom  > mo.y + mo.offset.top &&
    this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
    this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
  }

  // isCollidingNew (obj) {
  //   return  (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) && 
  //           (this.y + this.offsetY + this.height) >= obj.y &&
  //           (this.y + this.offsetY) <= (obj.y + obj.height) && 
  //           obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
  // }

  hitEnemy(){
    this.lifebar -= 5;
    if(this.lifebar < 0){
      this.lifebar = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  hitCoin(){
    this.coins += 1;
  }

  

  isDead(){
    return this.lifebar == 0;
  }

  isHurt(){
    let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
    timepassed = timepassed / 1000; // Difference in s
    return timepassed < 0.2;
  }
}

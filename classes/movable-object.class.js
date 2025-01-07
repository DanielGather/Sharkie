class MovableObject extends DrawableObject {
  speed = 0.1;
  hz = 144;
  otherDirection = false;
  speedY = 0;
  acceleration = 0.005;
  lifebar = 100;
  poisonStorage = 5;
  coins = 0;
  lastHit = 0;
  height = 100;
  width = 100;
  lastMovementCharacter;
  isNearCharakter;
  enemiesArray = [];

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

  fishIsNearCharacter(){
    console.log("kommen wir hier rein",this.world.character.x + this.character.width - enemy.x < 50);
    
     this.isNearCharakter = this.enemiesArray.some((enemy) => {
      console.log("Hallo",this.character.x + this.character.width - enemy.x < 50);
      return this.character.x + this.character.width - enemy.x < 50;
    });
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

  hitPoisonBottle(){
    this.poisonStorage += 1;
  }

  reducePoisonStorage(){
    if(!this.poisonStorage == 0){
      this.poisonStorage -= 1;
    }
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

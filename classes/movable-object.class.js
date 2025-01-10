class MovableObject extends DrawableObject {
  speed = 0.1;
  hz = 144;
  otherDirection = false;
  speedY = 0;
  acceleration = 0.005;
  lifebar = 100;
  lastHit = 0;
  height = 100;
  width = 100;
  lastMovementCharacter;
  FishIsInRange = false;
  timerHasExpired = false;
  j;
  x;
  animationPlayed;

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

  isColliding(mo) {
    return this.x + this.width - this.offset.right > mo.x + mo.offset.left && this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && this.x + this.offset.left < mo.x + mo.width - mo.offset.right && this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
  }

  hitEnemy() {
    this.lifebar -= 5;
    if (this.lifebar < 0) {
      this.lifebar = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isDead() {
    return this.lifebar == 0;
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
    timepassed = timepassed / 1000; // Difference in s
    return timepassed < 0.2;
  }

  calculateY() {
    return Math.random() * 521;
  }

  calculateSpeed() {
    return this.speed + Math.random() * 0.25;
  }

  checkFishAndCharacterDistance(bubbleSwim, swim, transition) {
    if (this.FishIsInRange) {
      if (this.timerIsRunning()) {
        this.playAnimation(bubbleSwim);
      } else {
        this.playFishTransition(transition);
      }
    } else {
      if (this.timerIsStopped()) {
        this.playStandardFishAnimation(swim);
      } else {
        this.setTimer();
      }
    }
  }

  timerIsRunning() {
    return !this.timerHasExpired;
  }

  timerIsStopped() {
    return this.timerHasExpired;
  }

  setTimer() {
    setTimeout(() => {
      this.timerHasExpired = true;
    }, 2500);
  }

  playStandardFishAnimation(swim) {
    this.playAnimation(swim);
    this.offset.bottom = 25;
  }

  playFishTransition(transition) {
    if (this.j < 12) {
      this.playAnimation(transition);
      this.offset.bottom = 5;
      this.j++;
    } else {
      this.timerHasExpired = false;
      this.j = 0;
    }
  }

  fishSwimsTowardsCharacter() {
    if (world) {
      const targetXFish = world.character.x + world.character.width - world.character.offset.right;
      const targetYFish = world.character.y + world.character.height / 2;
      const diffX = targetXFish - this.x - 10;
      const diffY = targetYFish - this.y;
      this.x += (diffX * this.speed) / Math.sqrt(diffX * diffX + diffY * diffY);
      this.y += (diffY * this.speed) / Math.sqrt(diffX * diffX + diffY * diffY);
    }
  }

  checkOtherDirection() {
    if (world) {
      if (this.x - (world.character.x + world.character.offset.left) <= 0) {
        this.otherDirection = true;
      } else {
        this.otherDirection = false;
      }
    }
  }
}

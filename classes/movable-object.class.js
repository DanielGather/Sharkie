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
  damage = 1;
  fishIsDead = false;
  lastMovementCharacter;
  FishIsInRange = false;
  timerHasExpired = false;
  markedForRemoval = false;
  isHittetByBubble = false;
  deadAnimationIsPlayed = false;
  j;
  x;
  animationPlayed;
  changeDirection = false;


  /**
   * Applies gravity to the fish.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isNotOnTheGround()) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / this.hz);
  }

  /**
   * Checks if the fish is not on the ground.
   */
  isNotOnTheGround() {
    return this.y < 415;
  }

  /**
   * Moves the fish to the right.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the fish to the left.
   */
  moveLeft() {
    if (!this.fishIsDead && !this.changeDirection) {
      this.x -= this.speed;
    }
  }

  /**
   * Changes the direction of the fish based on its position relative to the canvas edges.
   */
  fishChangeDirection() {
    if (this.x < -1024) {
      this.changeDirection = true;
      this.otherDirection = true;
    } else if (this.x > first_level_end_x_) {
      this.changeDirection = false;
      this.otherDirection = false;
    }
    if (this.changeDirection) {
      this.x += this.speed;
    }
  }

  /**
   * Sets the damage value for the next level if the condition is met.
   * @param {number} damage - The damage value to set for the next level.
   */
  ifNextLevel(damage) {
    if (nextLevelBoolean) {
      this.damage = damage;
    }
  }

  /**
   * Plays the specified animation by cycling through a set of images.
   * @param {string[]} images - An array of image paths representing the animation frames.
   */
  playAnimation(images) {
    if (this.currentAnimation !== images) {
      this.currentAnimation = images; // Speichere den neuen Bildsatz
      this.currentImage = 0; // Setze die Animation zurück
    }
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the object upwards by its speed.
   */
  swimUP() {
    this.speedY = 0;
    this.y -= this.speed;
  }

  /**
   * Moves the object downwards by its speed.
   */
  swimDOWN() {
    this.y += this.speed;
  }

  /**
   * Checks if the current object is colliding with another object.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Handles the character taking damage from an enemy.
   */
  hitEnemy(damage) {
    this.lifebar -= damage;
    if (this.lifebar < 0) {
      this.lifebar = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the character is dead based on the lifebar value.
   */
  isDead() {
    return this.lifebar == 0;
  }

  /**
   * Checks if the character is currently hurt based on the time passed since the last hit.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
    timepassed = timepassed / 1000; // Difference in s
    return timepassed < 0.3;
  }

  /**
   * Calculates a random Y-position for the fish within a predefined range.
   */
  calculateY() {
    return Math.random() * 521;
  }

  /**
   * Calculates the speed of the fish by adding a random variation to the provided speed.
   */
  calculateSpeed(speed) {
    return speed + Math.random() * 0.25;
  }

  /**
   * Checks the distance between the fish and the character, and handles the appropriate animation
   * based on the timer and the fish's state.
   * @param {Array} bubbleSwim - The array of frames for the bubble swim animation to be played.
   * @param {Array} swim - The array of frames for the standard swim animation to be played.
   * @param {Array} transition - The array of frames for the fish transition animation to be played.
   */
  checkFishAndCharacterDistance(bubbleSwim, swim, transition) {
    if (this.FishIsInRange && !this.fishIsDead) {
      if (this.timerIsRunning()) {
        this.playAnimation(bubbleSwim);
      } else {
        this.playFishTransition(transition);
      }
    } else if (!this.fishIsDead) {
      if (this.timerIsStopped()) {
        this.playStandardFishAnimation(swim);
      } else {
        this.setTimer();
      }
    }
  }

  /**
   * Checks if the small fish is dead and handles its movement and animation.
   * @param {Array} dead - The array of frames for the dead animation to be played.
   */
  checkIfSmallFishIsDead(dead) {
    if (this.fishIsDead) {
      this.speed = 1.5;
      if (this.isHittetByBubble) {
        this.x += this.speed;
        this.y -= this.speed;
      } else {
        this.x -= this.speed;
        this.y -= this.speed;
      }
      this.playAnimation(dead);
    }
  }

  /**
   * Checks if the timer is still running.
   */
  timerIsRunning() {
    return !this.timerHasExpired;
  }

  /**
   * Checks if the timer has expired.
   */
  timerIsStopped() {
    return this.timerHasExpired;
  }

  /**
   * Sets a timer to mark when a certain time has expired.
   */
  setTimer() {
    setTimeout(() => {
      this.timerHasExpired = true;
    }, 2500);
  }

  /**
   * Plays the standard swimming animation for the fish and adjusts its vertical position.
   * @param {Array} swim - An array of frames for the swimming animation.
   */
  playStandardFishAnimation(swim) {
    this.playAnimation(swim);
    this.offset.bottom = 25;
  }

  /**
   * Plays the fish transition animation and manages the transition state.
   * @param {Array} transition - An array of frames for the transition animation.
   */
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

  /**
   * Makes the fish swim toward the character by calculating the direction and adjusting its position.
   * The fish will move in the direction of the character’s current position using the fish's speed.
   * The movement is normalized, ensuring the fish moves smoothly without overshooting.
   */
  fishSwimsTowardsCharacter() {
    if (world && !this.fishIsDead) {
      const targetXFish = world.character.x + world.character.width - world.character.offset.right;
      const targetYFish = world.character.y + world.character.height / 2;
      const diffX = targetXFish - this.x - 10;
      const diffY = targetYFish - this.y;
      this.x += (diffX * this.speed) / Math.sqrt(diffX * diffX + diffY * diffY);
      this.y += (diffY * this.speed) / Math.sqrt(diffX * diffX + diffY * diffY);
    }
  }

  /**
   * Checks if the fish (or enemy) has crossed the character's position in the game world and
   * updates the direction based on whether the fish is moving toward or away from the character.
   * If the fish is behind the character, it will set `otherDirection` to true, indicating that
   * the fish should move in the opposite direction.
   */
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

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
   * This method applies gravity to the fish by decreasing its `y` position (making it fall)
   * and gradually reducing its upward speed (`speedY`) by a specified acceleration.
   * The gravity effect is applied as long as the fish is not on the ground (i.e., its `y`
   * position is above the ground threshold).
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
   * This method checks whether the fish's `y` position is less than 415, indicating
   * that the fish is still above the ground or the bottom of the canvas.
   * @returns {boolean} - Returns `true` if the fish is not on the ground (i.e., its `y`
   * position is less than 415), and `false` if the fish's `y` position is 415 or greater.
   */
  isNotOnTheGround() {
    return this.y < 415;
  }

  /**
   * Moves the fish to the right.
   * This method updates the fish's position by moving it right on the canvas. The fish's
   * `x` position is increased by its speed.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the fish to the left if it is not dead and the direction is not changed.
   * This method updates the fish's position by moving it left on the canvas. The fish will only move
   * left if it is alive (`!this.fishIsDead`) and if the direction flag (`this.changeDirection`)
   * is not set to reverse its direction.
   */
  moveLeft() {
    if (!this.fishIsDead && !this.changeDirection) {
      this.x -= this.speed;
    }
  }

  /**
   * Changes the direction of the fish based on its position relative to the canvas edges.
   * This method updates the fish's movement direction when it reaches the boundaries of the level.
   * If the fish moves past the left or right edge, its direction is reversed.
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
   * This method updates the `damage` property only if `nextLevelBoolean` is `true`.
   * If the condition is not met, the method has no effect.
   * @param {number} damage - The damage value to set for the next level.
   */
  ifNextLevel(damage) {
    if (nextLevelBoolean) {
      this.damage = damage;
    }
  }

  /**
   * Plays the specified animation by cycling through a set of images.
   * This method updates the `currentImage` to cycle through the frames of the
   * given animation images array. If the animation has changed, it resets
   * the `currentImage` counter. The current image is then loaded and displayed.
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
   * This method updates the y-coordinate of the object, causing it to swim up
   * by the value of its speed. It also sets the `speedY` to 0.
   */
  swimUP() {
    this.speedY = 0;
    this.y -= this.speed;
  }

  /**
   * Moves the object downwards by its speed.
   * This method updates the y-coordinate of the object, causing it to swim down
   * based on its current speed.
   * @returns {void} - The method doesn't return anything; it simply updates the y-coordinate.
   */
  swimDOWN() {
    this.y += this.speed;
  }

  /**
   * Checks if the current object is colliding with another object.
   * This method compares the position and dimensions of the current object
   * and another object (`mo`) to determine if they are overlapping. It considers
   * any offsets applied to both objects to ensure accurate collision detection.
   * @param {Object} mo - The other object to check for collision with.
   * @param {number} mo.x - The x-coordinate of the other object.
   * @param {number} mo.y - The y-coordinate of the other object.
   * @param {number} mo.width - The width of the other object.
   * @param {number} mo.height - The height of the other object.
   * @param {Object} mo.offset - The offset applied to the other object.
   * @param {number} mo.offset.top - The top offset of the other object.
   * @param {number} mo.offset.right - The right offset of the other object.
   * @param {number} mo.offset.bottom - The bottom offset of the other object.
   * @param {number} mo.offset.left - The left offset of the other object.
   * @returns {boolean} - Returns `true` if the objects are colliding, `false` otherwise.
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
   * This method reduces the character's lifebar by the specified damage value.
   * If the resulting lifebar value is below 0, it is set to 0. Additionally,
   * the timestamp of the last hit is updated to track when the character was hit.
   * @param {number} damage - The amount of damage to be subtracted from the character's lifebar.
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
   * This method checks whether the character's lifebar has reached 0. If it has,
   * the character is considered dead and the method returns `true`. Otherwise,
   * it returns `false`.
   * @returns {boolean} - Returns `true` if the character's lifebar is 0, indicating that the character is dead,
   *                      otherwise returns `false`.
   */
  isDead() {
    return this.lifebar == 0;
  }

  /**
   * Checks if the character is currently hurt based on the time passed since the last hit.
   * This method calculates the time difference between the current time and the last recorded hit.
   * If the time passed since the last hit is less than 0.3 seconds, it returns `true`, indicating
   * that the character is still hurt. Otherwise, it returns `false`.
   * @returns {boolean} - Returns `true` if the character is still hurt (within 0.3 seconds since the last hit),
   *                      otherwise returns `false`.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
    timepassed = timepassed / 1000; // Difference in s
    return timepassed < 0.3;
  }

  /**
   * Calculates a random Y-position for the fish within a predefined range.
   * This method generates a random Y-coordinate between 0 and 521, ensuring that
   * the fish's vertical position is set within the specified bounds, making it
   * appear at different vertical locations on the screen.
   * @returns {number} - The randomly generated Y-position for the fish.
   */
  calculateY() {
    return Math.random() * 521;
  }

  /**
   * Calculates the speed of the fish by adding a random variation to the provided speed.
   * This method adds a small random value (between 0 and 0.25) to the base speed to make
   * the fish movement appear slightly varied, creating a more dynamic behavior for the fish.
   * @param {number} speed - The base speed value for the fish.
   * @returns {number} - The calculated speed, which is the base speed plus a random value between 0 and 0.25.
   */
  calculateSpeed(speed) {
    return speed + Math.random() * 0.25;
  }

  /**
   * Checks the distance between the fish and the character, and handles the appropriate animation
   * based on the timer and the fish's state.
   * If the fish is in range and not dead, the method plays either the bubble swim animation or the
   * fish transition animation depending on whether the timer is running. If the fish is not in range,
   * it plays the standard swim animation or starts the timer.
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
   * When the fish is dead, this method updates the fish's movement (either to the left or right and
   * upwards) depending on whether it was hit by a bubble. It also plays the dead animation for the fish.
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
   * This method returns the status of the `timerHasExpired` flag. It checks whether the timer, set by
   * the `setTimer` method, is still active (i.e., the timeout period has not yet expired).
   * @returns {boolean} `true` if the timer is still running, otherwise `false`.
   */
  timerIsRunning() {
    return !this.timerHasExpired;
  }

  /**
   * Checks if the timer has expired.
   * This method returns the status of the `timerHasExpired` flag. It indicates whether the timer, set by
   * the `setTimer` method, has finished (i.e., the timeout period has passed and `timerHasExpired` is `true`).
   * @returns {boolean} `true` if the timer has expired, otherwise `false`.
   */
  timerIsStopped() {
    return this.timerHasExpired;
  }

  /**
   * Sets a timer to mark when a certain time has expired.
   * This method sets a timeout that updates the `timerHasExpired` property to `true` after 2500 milliseconds
   * (2.5 seconds). The `timerHasExpired` flag can then be used to trigger other actions or checks in the game.
   */
  setTimer() {
    setTimeout(() => {
      this.timerHasExpired = true;
    }, 2500);
  }

  /**
   * Plays the standard swimming animation for the fish and adjusts its vertical position.
   * This method plays a predefined swimming animation for the fish and modifies the fish's vertical
   * position by adjusting its `bottom` offset to 25. It is commonly used when the fish is in a regular
   * swimming state, not transitioning or performing other actions.
   * @param {Array} swim - An array of frames for the swimming animation.
   */
  playStandardFishAnimation(swim) {
    this.playAnimation(swim);
    this.offset.bottom = 25;
  }

  /**
   * Plays the fish transition animation and manages the transition state.
   * The method plays a transition animation for the fish. It runs the animation until a certain
   * number of frames have passed, after which the transition ends, and the transition timer is reset.
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

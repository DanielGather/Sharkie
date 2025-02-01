class GreenSuperDangerousFish extends MovableObject {
  width = 100;
  height = 100;
  speed = 0.25;
  canvasHeight = 600;
  direction = "down";

  /**
  * Defines the offset values for the object, used for positioning or collision detection.
  * @typedef {Object} Offset
  * @property {number} top - The top offset value.
  * @property {number} right - The right offset value.
  * @property {number} left - The left offset value.
  * @property {number} bottom - The bottom offset value.
  * @type {Offset}
  */
  offset = {
    top: 5,
    right: 10,
    left: 5,
    bottom: 15,
  };

  /**
   * Represents a dangerous green jellyfish enemy.
   * This enemy has a swimming animation and an isDead state. It moves at a calculated speed.
   * @constructor
   * @param {number} middleOfCanvas - The x-coordinate to place the jellyfish in the middle of the canvas.
   * @param {number} speedFromDangerousFish - The speed at which the dangerous fish moves.
   */
  constructor(middleOfCanvas, speedFromDangerousFish) {
    super();
    this.loadImage("img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.webp");
    this.loadImages(sprites.greenSuperDangerousFish.swim);
    this.loadImages(sprites.greenSuperDangerousFish.isDead);
    this.x = middleOfCanvas;
    this.y = 0;
    this.speed = this.calculateSpeed(speedFromDangerousFish);
    this.animate();
  }

  /**
   * Initiates the animation for the dangerous fish.
   * It sets up intervals for checking if the fish is alive and for its movement.
   * @function animate
   */
  animate() {
    setStoppableInterval(this.isAlive.bind(this), 200);
    setStoppableMovementInterval(this.movementDangerousFish.bind(this), 1000 / this.hz);
  }

  /**
   * Handles the movement of the dangerous fish.
   * If the fish is not dead, it plays the movement animation.
   * If the fish is dead, its vertical position remains unchanged.
   * @function movementDangerousFish
   */
  movementDangerousFish() {
    if (!this.fishIsDead) {
      this.playMovementAnimation();
    } else {
      this.y += 0;
    }
  }

  /**
   * Controls the vertical movement of the fish based on its current direction.
   * @function playMovementAnimation
   */
  playMovementAnimation() {
    if (this.direction === "down") {
      this.y += this.speed;
      if (this.y + this.height + this.offset.bottom >= this.canvasHeight) {
        this.direction = "up";
      }
    } else if (this.direction === "up") {
      this.y -= this.speed;
      if (this.y <= 0) {
        this.direction = "down";
      }
    }
  }

  /**
   * Checks whether the fish is alive or dead and plays the corresponding animation.
   * @function isAlive
   */
  isAlive() {
    if (!this.fishIsDead) {
      this.playAnimation(sprites.greenSuperDangerousFish.swim);
    } else if (this.fishIsDead) {
      this.playAnimation(sprites.greenSuperDangerousFish.isDead);
    }
  }
}

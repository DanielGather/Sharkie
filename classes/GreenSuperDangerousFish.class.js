class GreenSuperDangerousFish extends MovableObject {
  width = 100;
  height = 100;
  speed = 0.25;
  canvasHeight = 600;
  direction = "down";

  /**
   * Represents the offset values used for positioning an element.
   * These values define the spacing around the object, typically used for hitboxes or positioning adjustments.
   * @typedef {Object} Offset
   * @property {number} top - The distance from the top edge of the element.
   * @property {number} right - The distance from the right edge of the element.
   * @property {number} left - The distance from the left edge of the element.
   * @property {number} bottom - The distance from the bottom edge of the element.
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
   * If the fish is moving down, it increases its vertical position.
   * If it reaches the bottom of the canvas, the direction changes to "up".
   * If the fish is moving up, it decreases its vertical position.
   * If it reaches the top of the canvas, the direction changes to "down".
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
   * If the fish is alive, it plays the swimming animation.
   * If the fish is dead, it plays the dead animation.
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

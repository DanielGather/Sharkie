class ThrowableObject extends MovableObject {
  speedX = 20;

  offset = {
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  };

 /**
 * Creates a new throwable bubble object.
 * This constructor initializes the bubble with an image, sets its position,
 * dimensions, and starts its movement.
 * @param {number} x - The initial x-coordinate of the bubble.
 * @param {number} y - The initial y-coordinate of the bubble.
 */
  constructor(x, y) {
    super().loadImage("img/1.Sharkie/4.Attack/Bubble trap/Bubble.webp");
    this.x = this.setX(x);
    this.y = y;
    this.height = 40;
    this.width = 40;
    this.throw();
  }

  /**
   * Sets the x position of an object based on the character's direction.
   * If the character is facing the other direction, the x position is adjusted by the character's width.
   * Otherwise, it is adjusted by the character's right offset.
   * @param {number} x - The x position to set.
   */
  setX(x) {
    if (world.character.otherDirection == true) {
      this.x = x - world.character.width;
      return this.x;
    } else {
      this.x = x - world.character.offset.right;
      return this.x;
    }
  }

  /**
   * Initiates a shot with a specified speed and direction based on the character's orientation.
   * The function sets the Y speed of the object and calculates the shot at a regular interval.
   * The shot is either fired in the negative or positive direction depending on whether the character
   * is facing the other direction or not.
   */
  throw() {
    this.speedY = 1;
    let currentX = this.x;
    const direction = world.character.otherDirection ? -1 : 1;
    setStoppableInterval(this.calculateShot.bind(this, currentX, direction), 1000 / this.hz);
  }

  /**
   * Calculates the movement of the shot based on the current position and direction.
   * The shot's horizontal position is updated based on the given direction, while the vertical
   * position is influenced by a sine wave for closer distances and a constant downward motion for farther distances.
   * @param {number} currentX - The initial horizontal position of the shot when it was fired.
   * @param {number} direction - The direction in which the shot is moving. It is either 1 (right) or -1 (left).
   */
  calculateShot(currentX, direction) {
    this.x += direction;
    let distance = this.x - currentX;
    if (distance * direction <= 500) {
      this.y += Math.sin(distance / 35) * 0.3;
    } else {
      this.y -= 1.25;
    }
  }
}

class PoisonBottle extends DrawableObject {
  POISON_BOTTLE_IMAGE = "img/4. Marcadores/Posión/Dark - Left.webp";

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
    top: 30,
    right: 0,
    left: 20,
    bottom: 5,
  };

  /**
   * Constructor for the PoisonBottle class that initializes the object with a position, size, and image.
   * @param {number} x - The x-coordinate where the poison bottle will be placed.
   * @param {number} y - The y-coordinate where the poison bottle will be placed.
   */
  constructor(x, y) {
    super().loadImage(this.POISON_BOTTLE_IMAGE);
    this.x = x;
    this.y = y;
    this.width = 75;
    this.height = 75;
  }
}

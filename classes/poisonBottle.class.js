class PoisonBottle extends DrawableObject {
  POISON_BOTTLE_IMAGE = "img/4. Marcadores/Posión/Dark - Left.webp";

  /**
   * The offset object defines the margin around an element, specifying how far it is from each edge.
   * @typedef {Object} Offset
   * @property {number} top - The top margin in pixels.
   * @property {number} right - The right margin in pixels.
   * @property {number} left - The left margin in pixels.
   * @property {number} bottom - The bottom margin in pixels.
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

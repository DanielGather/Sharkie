class Coins extends DrawableObject {
  COIN_IMAGE = "img/4. Marcadores/green/100_ copia 6.webp";

  /**
   * Defines the offset values for the object, used for positioning or collision detection.
   *
   * @typedef {Object} Offset
   * @property {number} top - The top offset value.
   * @property {number} right - The right offset value.
   * @property {number} left - The left offset value.
   * @property {number} bottom - The bottom offset value.
   *
   * @type {Offset}
   */
  offset = {
    top: 15,
    right: 15,
    left: 15,
    bottom: 15,
  };

  /**
   * Creates an instance of the class and loads an image at a specified position with fixed dimensions.
   * @param {number} x - The x-coordinate of the object's position.
   * @param {number} y - The y-coordinate of the object's position.
   */
  constructor(x, y) {
    super().loadImage("img/4. Marcadores/green/100_ copia 6.webp");
    this.x = x;
    this.y = y;
    this.width = 75;
    this.height = 75;
  }
}

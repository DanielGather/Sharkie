class BackgroundObject extends MovableObject {
  width = 1024;
  height = 600;

  /**
   * Creates an instance of the class and loads an image at a specified position.
   * @param {string} imagePath - The path to the image to be loaded.
   * @param {number} x - The x-coordinate of the object's position.
   * @param {number} y - The y-coordinate of the object's position.
   */
  constructor(imagePath, x, y) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = y;
  }
}

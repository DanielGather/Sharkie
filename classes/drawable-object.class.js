class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 0;
  y = 200;
  blur = 40;
  increasing = true;

  /**
   * Loads an image from the specified path and assigns it to the object.
   * This method creates a new `Image` object and sets its source (`src`) to the provided path.
   * The loaded image is then stored in the `img` property of the object.
   * @param {string} path - The file path or URL of the image to be loaded.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the image of the object onto the canvas at the specified position.
   * This method attempts to draw the object's image (`this.img`) at the position defined by its `x` and `y` properties.
   * If the image is not loaded or an error occurs during the drawing process, a warning is logged with the image source.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas on which to draw the image.
   */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
      console.warn(e.img.src);
    }
  }

  /**
   * Draws the rage frame for the end boss when rage mode is activated.
   * If the current object is an instance of `Endboss` and rage mode is active (`rageMode == true`),
   * the method draws the boss with a red shadow effect and applies a pulsating scaling effect.
   * The scaling effect is based on a sinusoidal function to create a pulsing animation. Additionally,
   * the blur effect is applied to the shadow to create a visual intensity during rage mode.
   * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
   */
  drawRageFrame(ctx) {
    if (this instanceof Endboss && rageMode == true) {
      ctx.save();
      ctx.shadowColor = "rgba(236, 17, 17, 1)";
      ctx.shadowBlur = this.blur;
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      let scale = 1 + Math.sin(Date.now() / 100) * 0.1;
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
      ctx.scale(scale, scale);
      ctx.translate(-this.width / 2, -this.height / 2);
      ctx.drawImage(this.img, 0, 0, this.width, this.height);
      this.pulsate();
      ctx.restore();
    }
  }

  /**
   * Pulsates the blur effect by gradually increasing and decreasing its value.
   * The method adjusts the `blur` property in steps of 5. If the blur is increasing, it adds 5 to the current value.
   * Once the blur reaches 200, the direction changes to decreasing. If the blur is decreasing, it subtracts 5.
   * Once the blur reaches 40, the direction changes to increasing.
   */
  pulsate() {
    if (this.increasing) {
      this.blur += 5;
      if (this.blur > 200) this.increasing = false;
    } else {
      this.blur -= 5;
      if (this.blur < 40) this.increasing = true;
    }
  }

  /**
   * Loads images from the provided array of paths and caches them.
   * Iterates over the array of image paths, creates an image for each path,
   * and stores the loaded image in the `imageCache` object with the path as the key.
   * @param {string[]} arr - An array of image paths to be loaded.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let image = new Image();
      image.src = path;
      this.imageCache[path] = image;
    });
  }
}

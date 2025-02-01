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
   * @param {string} path - The file path or URL of the image to be loaded.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the image of the object onto the canvas at the specified position.
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

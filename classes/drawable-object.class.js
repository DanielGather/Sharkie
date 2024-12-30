class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 0;
  y = 200;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }


  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Fish || this instanceof Endboss || this instanceof ThrowableObject || this instanceof Coins) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  drawFrameOffset(ctx) {
    if (this instanceof Character || this instanceof Fish || this instanceof Endboss || this instanceof ThrowableObject || this instanceof Coins) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "red";
      ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right - this.offset.left, this.height - this.offset.bottom - this.offset.top);
      ctx.stroke();
    }
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let image = new Image();
      image.src = path;
      this.imageCache[path] = image;
    });
  }
}

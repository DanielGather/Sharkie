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
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
      console.warn(e.img.src);
    }
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof GreenFish || this instanceof OrangeFish || this instanceof RedFish || this instanceof Endboss || this instanceof ThrowableObject || this instanceof Coins || this instanceof PoisonBottle || this instanceof GreenSuperDangerousFish) {
      ctx.beginPath();
      ctx.lineWidth = "3";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  blur = 40;
  increasing = true;
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
      if (this.increasing) {
        this.blur += 5;
        if (this.blur > 200) this.increasing = false;
      } else {
        this.blur -= 5;
        if (this.blur < 40) this.increasing = true;
      }
      ctx.restore(); // Stellt den ursprünglichen Zustand des Canvas-Kontexts wieder her
    }
  }

  drawFrameOffset(ctx) {
    if (this instanceof Character || this instanceof GreenFish || this instanceof OrangeFish || this instanceof RedFish || this instanceof Endboss || this instanceof ThrowableObject || this instanceof Coins || this instanceof PoisonBottle || this instanceof GreenSuperDangerousFish) {
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

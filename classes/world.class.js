class World {
  // static characterIsInRange = false;
  character = new Character();
  statusBar = new StatusBar();
  //   barrier = new Barrier();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    // this.createBackgroundObjects(2, 1024);
    this.draw();
    this.setWorld();
    this.run();
    this.setFontRules();
    // this.character.isDead();
  }

  setWorld() {
    this.character.world = this;
  }

  setFontRules() {
    this.ctx.font = "30px LuckiestGuy";
    this.ctx.fillStyle = "white";
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 100);
  }

  checkThrowObjects() {
    if (this.keyboard.THROW) {
      let bottle = new ThrowableObject(this.character.x + this.character.width, this.character.y + this.character.height / 2);
      this.throwableObjects.push(bottle);
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        // this.statusBar.setPercentage(this.character.lifebar)
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);

    // ------ Space for fixed  objects ------ //
    this.ctx.translate(-this.camera_x, 0);
    this.ctx.fillText(this.character.lifebar, 100, 100);
    // this.addToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);
    // ------ Space for fixed objects ------- //

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);

    // this.addToMap(this.barrier);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  // createBackgroundObjects(repeatCount, step) {
  //   const backgroundLayers = ["img/3.Background/Layers/5. Water/D", "img/3.Background/Layers/1. Light/", "img/3.Background/Layers/3.Fondo 1/D", "img/3.Background/Layers/4.Fondo 2/D", "img/3.Background/Layers/2.Floor/D"];
  //   let variableZahl = 1;
  //   let count = 0;
  //   this.level.level_end_x = repeatCount * step;
  //   for (let i = 0; i < repeatCount; i++) {
  //     let x = i * step;
  //     backgroundLayers.forEach((backgroundLayerBase) => {
  //       this.level.backgroundObjects.push(new BackgroundObject(`${backgroundLayerBase}${variableZahl}.png`, x, 0));
  //     });
  //     count++;
  //     if (count >= 1) {
  //       variableZahl = variableZahl === 1 ? 2 : 1;
  //       count = 0;
  //     }

  //   }
  // }

  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}

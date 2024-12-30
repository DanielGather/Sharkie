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
  characterIsInRange = false;
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
      this.checkCollisionsEnemy();
      this.checkCollisionsCoins();
      this.checkThrowObjects();
    }, 100);
  }

  checkThrowObjects() {
    if (this.keyboard.THROW) {
      let bottle = new ThrowableObject(this.character.x + this.character.width, this.character.y + this.character.height / 2);
      this.throwableObjects.push(bottle);
    }
  }

  checkCollisionsEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hitEnemy();
      }
    });
  }

  checkCollisionsCoins() {
    this.level.coinsArray = this.level.coinsArray.filter((coin) => {
      if (this.character.isColliding(coin)) {
        this.character.coins += 1;
        return false;
      }
      return true;
    });
  }

  deleteCoin(coin, index) {
    this.level.coinsArray.splice(coin[index], 1);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);

    // ------ Space for fixed  objects ------ //
    this.ctx.translate(-this.camera_x, 0);
    this.ctx.fillText(this.character.lifebar, 50, 40);
    this.ctx.fillText(this.character.poisonStorage, 50, 90);
    this.ctx.fillText(this.character.coins, 50, 135);
    this.addToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);
    // ------ Space for fixed objects ------- //

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.coinsArray);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);

    // this.addToMap(this.barrier);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

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
    mo.drawFrameOffset(this.ctx);

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

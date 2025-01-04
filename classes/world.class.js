class World {
  character = new Character();
  statusBar = new StatusBar();
  endbossLife = new EndbossLifebar();
  //   barrier = new Barrier();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  characterIsInRange = false;
  throwableObjects = [];
  bossIsTriggerd = false;
  lastThrow;
  // intervalIDs = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    // this.createBackgroundObjects(2, 1024);
    this.draw();
    this.setWorld();
    this.setFontRules();
    setStoppableInterval(this.run.bind(this), 100);
  }

  run() {
    this.checkCollisionsEnemy();
    this.checkCollisionsCoins();
    this.checkThrowObjects();
    this.checkCollisionThrowableObject();
    this.checkCollisionsPoisonBottle();
  }

  setWorld() {
    this.character.world = this;
    this.level.enemies.world = this;
  }

  setFontRules() {
    this.ctx.font = "30px LuckiestGuy";
    this.ctx.fillStyle = "white";
  }

  checkThrowObjects() {
    if (this.keyboard.THROW && !this.throwDelay() && !this.character.poisonStorage == 0 ) {
      this.shootingAnimation();
      setTimeout(()=>{
        this.lastThrow = new Date().getTime();
        let bottle = new ThrowableObject(
            this.character.x + this.character.width - this.character.offset.right + 25,
            this.character.y + this.character.height / 2
        );
          this.throwableObjects.push(bottle);
        }, 400)
        this.character.reducePoisonStorage();
    }
}

  shootingAnimation(){
    let i = 0
    let isPlayed = false;
    setInterval(()=>{
      if(i < 8){
        this.character.playAnimation(this.character.IMAGES_SHOOTING_BUBBLE)
      } else if(isPlayed == false) {
        this.character.loadImage("img/1.Sharkie/3.Swim/1.png")
        isPlayed = true;
      }
      i++
    },50)
    
  }

  throwDelay() {
    if (!this.lastThrow) {
        this.lastThrow = 0;
    }
    let currentTime = new Date().getTime();
    let timePassed = (currentTime - this.lastThrow) / 1000;
    return timePassed < 0.5;
}

  checkCollisionsEnemy() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hitEnemy();
      }
    });
  }

  checkCollisionThrowableObject() {
    this.throwableObjects = this.throwableObjects.filter((obj) => {
        let hitEnemy = false;
        this.level.enemies = this.level.enemies.filter((enemy) => {
            if (obj.isColliding(enemy)) {
                if (enemy instanceof Fish) {
                    hitEnemy = true; // Projektil trifft einen Fisch
                    return false;    // Entfernt den Fisch aus dem Array
                } else if (enemy instanceof Endboss) {
                    this.character.hitEndboss();
                    hitEnemy = true;
                }
            }
            return true; // Gegner bleibt im Array, wenn er nicht getroffen wurde
        });

        return !hitEnemy; // Entfernt das Projektil, wenn es einen Gegner (Fisch) trifft
    });
}

  checkCollisionsCoins() {
    this.level.coinsArray = this.level.coinsArray.filter((coin) => {
      if (this.character.isColliding(coin)) {
        this.character.hitCoin();
        return false;
      }
      return true;
    });
  }

  checkCollisionsPoisonBottle() {
    this.level.poisonBottleArray = this.level.poisonBottleArray.filter((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.character.hitPoisonBottle();
        return false;
      }
      return true;
    });
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
    this.addEndbossLifebar();
    this.addToMap(this.statusBar);
    this.ctx.translate(this.camera_x, 0);
    // ------ Space for fixed objects ------- //

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.coinsArray);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.poisonBottleArray);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);


    // this.addToMap(this.barrier);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addEndbossLifebar(){
    if(this.character.x >= Level.level_end_x - 2024 || this.bossIsTriggerd == true){
      this.ctx.fillText(this.character.endbossLife, 925, 40)
      this.addToMap(this.endbossLife)
      this.bossIsTriggerd = true;
    }
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

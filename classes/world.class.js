class World {
  character = new Character();
  endboss = new Endboss();
  statusBar = new StatusBar();
  LifeEndboss = new EndbossLifebar();
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
    this.pushEndbossInArray();
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
    this.endboss.world = this;
    this.level.world = this;
  }

  pushEndbossInArray(){
    Level.enemyLevelArray.push(this.endboss)
  }


  setFontRules() {
    this.ctx.font = "30px LuckiestGuy";
    this.ctx.fillStyle = "white";
  }

  checkThrowObjects() {
    if (this.keyboard.THROW && !this.throwDelay() && this.character.poisonStorage > 0) {
      this.lastThrow = new Date().getTime();
      this.shootingAnimation();
      setTimeout(() => {
        let bottle = new ThrowableObject(this.character.x + this.character.width - this.character.offset.right + 25, this.character.y + this.character.height / 2);
        this.throwableObjects.push(bottle);
      }, 400);
      this.character.reducePoisonStorage();
    }
  }

  shootingAnimation() {
    let i = 0;
    let isPlayed = false;
    setInterval(() => {
      if (i < 8) {
        this.character.playAnimation(this.character.IMAGES_SHOOTING_BUBBLE);
      } else if (isPlayed == false) {
        this.character.loadImage("img/1.Sharkie/3.Swim/1.webp");
        isPlayed = true;
      }
      i++;
    }, 50);
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
    Level.enemyLevelArray.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hitEnemy();
      }
    });
  }

  checkCollisionThrowableObject() {
    this.throwableObjects = this.throwableObjects.filter((poison) => {
      let hitEnemy = false;
      Level.enemyLevelArray = Level.enemyLevelArray.filter((enemy) => {
        if (poison.isColliding(enemy)) {
          if (enemy instanceof GreenFish || enemy instanceof PinkFish || enemy instanceof RedFish) {
            hitEnemy = true;
            return false;
          } else if (enemy instanceof Endboss) {
            // enemy.isHurt = true;
            this.character.hitEndboss();
            hitEnemy = true;
          }
        }
        return true;
      });
      return !hitEnemy;
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
    this.addObjectsToMap(Level.enemyLevelArray);
    this.addObjectsToMap(this.level.poisonBottleArray);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);

    // this.addToMap(this.barrier);
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addEndbossLifebar() {
    if (this.character.x >= Level.level_end_x - 2024 || this.bossIsTriggerd == true) {
      this.ctx.fillText(this.endboss.endbossLife, 925, 40);
      this.addToMap(this.LifeEndboss);
      this.bossIsTriggerd = true;
    }
  }

  addObjectsToMap(objects) {
    try{
      objects.forEach((o) => {
        this.addToMap(o);
      });

    } catch(e){
      // console.log("image", e);
      
    }
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

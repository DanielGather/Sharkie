class World {
  character = new Character();
  endboss;
  statusBar = new StatusBar();
  LifeEndboss = new EndbossLifebar();
  level;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  characterIsInRange = false;
  throwableObjects = [];
  bossIsTriggerd = false;
  lastDamage;

  constructor(canvas, keyboard,newDamage,newEndbossLife) {
    this.ctx = canvas.getContext("2d");
    this.level = createLevel(newDamage);
    this.endboss = new Endboss(newEndbossLife)
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.setFontRules();
    this.pushEndbossInArray();
    setStoppableInterval(this.run.bind(this), 100);
    this.draw();
  }

  run() {
    this.checkCollisionsEnemy();
    this.checkCollisionsCoins();
    this.checkThrowObjects();
    this.checkCollisionThrowableObject();
    this.checkCollisionsPoisonBottle();
    this.fishIsNearCharacter();
    this.speedBoostBoss();
  }

  setWorld() {
    this.character.world = this;
    this.level.world = this;
    this.endboss.world = this;
  }

  pushEndbossInArray() {
    Level.enemyLevelArray.push(this.endboss);
  }

  setFontRules() {
    this.ctx.font = "30px LuckiestGuy";
    this.ctx.fillStyle = "white";
  }

  checkThrowObjects() {
    if (this.keyboard.THROW && !this.damageDelay() && this.character.poisonStorage > 0) {
      this.lastDamage = new Date().getTime();
      this.shootingAnimation();
      setTimeout(() => {
        let bottle = new ThrowableObject(this.character.x + this.character.width - this.character.offset.right + 25, this.character.y + this.character.height / 2);
        this.throwableObjects.push(bottle);
        playSound(this.character.bubble_shot_SOUND)
      }, 400);
      this.character.reducePoisonStorage();
      this.keyboard.THROW = false;
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

  damageDelay() {
    if (!this.lastDamage) {
      this.lastDamage = 0;
    }
    let currentTime = new Date().getTime();
    let timePassed = (currentTime - this.lastDamage) / 1000;
    return timePassed < 0.5;
  }

  checkCollisionsEnemy() {
    Level.enemyLevelArray.forEach((enemy, index) => {
      if (this.character.isColliding(enemy)) {
        if (this.isCollidableEnemy(enemy)) {
          this.character.hitEnemy(enemy.damage);
        } else if (this.isCollidableEndboss(enemy)) {
          this.character.hitEnemy(this.endboss.damage);
        } else if (this.isRemovableBasicEnemy(enemy)) {
          this.removeBasicEnemy(enemy, index);
        } else if (enemy instanceof GreenSuperDangerousFish) {
          enemy.fishIsDead = true;
        } else if (this.isEndbossVulnerable(enemy)) {
          this.applyDamageToEndboss();
        }
      }
    });
    // Level.enemyLevelArray = Level.enemyLevelArray.filter(enemy => !enemy.markedForRemoval)
  }

  isCollidableEnemy(enemy) {
    return (enemy instanceof GreenFish || enemy instanceof OrangeFish || enemy instanceof RedFish || (enemy instanceof GreenSuperDangerousFish && !enemy.fishIsDead)) && !this.character.spaceBar && !enemy.fishIsDead;
  }

  isCollidableEndboss(enemy) {
    return enemy instanceof Endboss && !this.character.spaceBar;
  }

  isRemovableBasicEnemy(enemy) {
    return (enemy instanceof GreenFish || enemy instanceof OrangeFish || enemy instanceof RedFish) && !enemy.markedForRemoval;
  }

  removeBasicEnemy(enemy, index) {
    enemy.fishIsDead = true;
    enemy.markedForRemoval = true;
    setTimeout(() => {
      Level.enemyLevelArray = Level.enemyLevelArray.filter(enemy => !enemy.markedForRemoval)
    }, 1500);
  }

  isEndbossVulnerable(enemy) {
    return enemy instanceof Endboss && !this.damageDelay();
  }

  applyDamageToEndboss() {
    this.lastDamage = new Date().getTime();
    this.character.hitEndboss();
    this.endboss.isHurt = true;
  }

  speedBoostBoss() {
    let characterX = this.character.x + this.character.width - this.character.offset.right;
    let endbossX = this.endboss.x + this.endboss.offset.left;
    let distance = endbossX - characterX;
    if (distance > 400 && this.endboss.attackingCharacter) {
      this.endboss.speed = 2;
    } else if (distance < 50) {
      this.endboss.speed = 0.25;
    }
  }

  checkCollisionThrowableObject() {
    this.throwableObjects.forEach((poison, poisonIndex) => {
      let hitEnemy = false;
      Level.enemyLevelArray.forEach((enemy, enemyIndex) => {
        if (poison.isColliding(enemy)) {
          if ((enemy instanceof GreenFish || enemy instanceof OrangeFish || enemy instanceof RedFish) && !enemy.markedForRemoval) {
            hitEnemy = true;
            enemy.fishIsDead = true;
            enemy.markedForRemoval = true;
            enemy.isHittetByBubble = true;
            setTimeout(() => {
              Level.enemyLevelArray.splice(enemyIndex, 1);
            }, 1500);
          } else if (enemy instanceof GreenSuperDangerousFish && !enemy.fishIsDead) {
            hitEnemy = true;
            enemy.fishIsDead = true;
          } else if (enemy instanceof Endboss && !rageMode) {
            this.character.hitEndboss();
            this.endboss.moveLeftEndboss = true;
            this.endboss.isHurt = true;
            hitEnemy = true;
          }
        }
      });
      if (hitEnemy) {
        this.throwableObjects.splice(poisonIndex, 1); // Entferne das Giftobjekt, wenn es getroffen hat
      }
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

  fishIsNearCharacter() {
    Level.enemyLevelArray.forEach((enemy) => {
      const distanceX = Math.abs(this.character.x + this.character.width - this.character.offset.right - enemy.x);
      const distanceYTop = Math.abs(this.character.y + this.character.height - this.character.offset.bottom - enemy.y);
      const distanceYBottom = Math.abs(this.character.y + this.character.offset.top - (enemy.y + enemy.height - enemy.offset.bottom));
      if ((distanceX < 250 && distanceYTop < 100) || (distanceX < 250 && distanceYBottom < 100)) {
        enemy.FishIsInRange = true;
      } else if (distanceX > 300 || distanceYBottom > 150 || distanceYTop > 150 || (distanceX > 300 && distanceYTop > 150) || (distanceX > 300 && distanceYBottom > 150)) {
        enemy.FishIsInRange = false;
      }
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
    try {
      objects.forEach((o) => {
        this.addToMap(o);
      });
    } catch (e) {
      // console.log("image", e);
    }
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    mo.drawRageFrame(this.ctx);
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

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
  hitEnemy;

  /**
   * Initializes the game world.
   */
  constructor(canvas, keyboard, newDamage, newEndbossLife) {
    this.ctx = canvas.getContext("2d");
    this.level = createLevel(newDamage);
    this.endboss = new Endboss(newEndbossLife);
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    this.setFontRules();
    this.pushEndbossInArray();
    this.worldRun = new WorldRun();
    setStoppableInterval(this.run.bind(this), 100);
    this.draw();
  }

  /**
   * Runs the main game logic loop.
   */
  run() {
    this.worldRun.checkCollisionsEnemy.bind(this)();
    this.worldRun.checkCollisionsCoins.bind(this)();
    this.worldRun.checkThrowObjects.bind(this)();
    this.worldRun.checkCollisionThrowableObject.bind(this)();
    this.worldRun.checkCollisionsPoisonBottle.bind(this)();
    this.worldRun.fishIsNearCharacter.bind(this)();
    this.worldRun.speedBoostBoss.bind(this)();
  }

  /**
   * Sets the world reference for various game objects.
   */
  setWorld() {
    this.character.world = this;
    this.level.world = this;
    this.endboss.world = this;
  }

  /** Adds the endboss to the enemy level array. */
  pushEndbossInArray() {
    Level.enemyLevelArray.push(this.endboss);
  }

  /** Sets the font style and color for rendering text on the canvas. */
  setFontRules() {
    this.ctx.font = "30px LuckiestGuy";
    this.ctx.fillStyle = "white";
  }

  /**
   * Plays the shooting animation for the character when attacking with a bubble.
   */
  shootingAnimation() {
    let i = 0;
    let isPlayed = false;
    setInterval(() => {
      if (i < 8) {
        this.character.playAnimation(sprites.character.bubbleAttack);
      } else if (isPlayed == false) {
        this.character.loadImage("img/1.Sharkie/3.Swim/1.webp");
        isPlayed = true;
      }
      i++;
    }, 50);
  }

  /**
   * Checks if the character has recently taken damage and applies a delay before allowing further damage.
   */
  damageDelay() {
    if (!this.lastDamage) {
      this.lastDamage = 0;
    }
    let currentTime = new Date().getTime();
    let timePassed = (currentTime - this.lastDamage) / 1000;
    return timePassed < 0.5;
  }



  /**
   * Checks if an enemy is collidable with the character.
   */
  isCollidableEnemy(enemy) {
    return ((enemy instanceof GreenFish || enemy instanceof OrangeFish || enemy instanceof RedFish || (enemy instanceof GreenSuperDangerousFish && !enemy.fishIsDead)) && !this.character.spaceBar && !enemy.fishIsDead);
  }

  /**
   * Checks if an enemy is a collidable Endboss.
   */
  isCollidableEndboss(enemy) {
    return enemy instanceof Endboss && !this.character.spaceBar;
  }

  /**
   * Checks if a basic enemy can be removed.
   */
  isRemovableBasicEnemy(enemy) {
    return (
      (enemy instanceof GreenFish || enemy instanceof OrangeFish || enemy instanceof RedFish) && !enemy.markedForRemoval);
  }

  /**
  * Handles the hit detection and removal of basic enemies.
  */
  handleEnemyHit(enemy) {
    if (this.isRemovableBasicEnemy(enemy)) {
        enemy.isHittetByBubble = true;
        this.removeBasicEnemy(enemy);
        return true; // Hit war erfolgreich
    }
    return false; // Kein Treffer
  }

  /**
  * Checks if the given enemy is a GreenSuperDangerousFish and is still alive.
  */
  checkDangerousFish(enemy){
    return enemy instanceof GreenSuperDangerousFish && !enemy.fishIsDead
  }

  /**
   * Checks for collisions between throwable objects and enemies.
  */
  checkPoisonColliding(enemy){
    if (this.handleEnemyHit(enemy)) {
      this.hitEnemy = true;
  } else if (this.checkDangerousFish(enemy)) {
      this.hitEnemy = true;
      enemy.fishIsDead = true;
    } else if (enemy instanceof Endboss && !rageMode) {
      this.bossGetHittet();
      this.hitEnemy = true;
    }
  }
  
  /**
   * Removes a basic enemy from the level after it is marked for removal.
   */
  removeBasicEnemy(enemy) {
    enemy.fishIsDead = true;
    enemy.markedForRemoval = true;
    setTimeout(() => {
      Level.enemyLevelArray = Level.enemyLevelArray.filter((enemy) => !enemy.markedForRemoval);
    }, 1500);
  }

  /**
   * Checks if the endboss is vulnerable to damage.
   */
  isEndbossVulnerable(enemy) {
    return enemy instanceof Endboss && !this.damageDelay();
  }

  /**
   * Applies damage to the endboss and triggers the hurt state for the endboss.
   */
  applyDamageToEndboss() {
    this.lastDamage = new Date().getTime();
    this.character.hitEndboss();
    this.endboss.isHurt = true;
  }

  /**
   * Handles the behavior when the boss is hit by the character.
   */
  bossGetHittet() {
    this.character.hitEndboss();
    this.endboss.moveLeftEndboss = true;
    this.endboss.isHurt = true;
  }

  /**
   * Draws the current frame on the canvas, including all background objects,
   * the character's lifebar, poison storage, coins, and other objects.
   * This function clears the canvas, translates the context for camera movement,
   * and adds various objects to the map such as the background, character,
   * enemies, coins, and throwable objects. It also updates and displays the
   * character's stats like lifebar, poison storage, and coin count. Finally,
   * the function recursively calls itself to create an animation loop using
   * `requestAnimationFrame`.
   * @returns {void} This method does not return any value. It continuously
   * updates the canvas and redraws the game state.
   */
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
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Checks if the fish is within range based on its distance from the target.
   */
  fishIsInRange(distanceX, distanceYBottom, distanceYTop) {
    return (distanceX < 250 && distanceYTop < 100) || (distanceX < 250 && distanceYBottom < 100);
  }

  /**
   * Checks if the fish is not in range based on its distance from the target.
   */
  fishIsNotInRange(distanceX, distanceYBottom, distanceYTop) {
    return (distanceX > 300 || distanceYBottom > 150 || distanceYTop > 150 || (distanceX > 300 && distanceYTop > 150) || (distanceX > 300 && distanceYBottom > 150));
  }

  /**
   * Displays the endboss lifebar on the canvas when the character reaches the level's end or the boss is triggered.
   */
  addEndbossLifebar() {
    if (this.character.x >= Level.level_end_x - 2024 || this.bossIsTriggerd == true) {
      this.ctx.fillText(this.endboss.endbossLife, 925, 40);
      this.addToMap(this.LifeEndboss);
      this.bossIsTriggerd = true;
    }
  }

  /**
   * Adds multiple objects to the map (canvas) by iterating through them.
   * @param {Array<Object>} objects - An array of objects to be added to the map. Each object in the array
   * must have a `draw` method for rendering and a `drawRageFrame` method for additional rendering (e.g., for hitboxes).
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Draws an object on the canvas, flipping it horizontally if necessary.
   * @param {Object} mo - The object to be drawn on the canvas. This object must have a `draw`
   * method to render the object and a `drawRageFrame` method for additional rendering (e.g., for a hitbox or boundary).
   * @property {boolean} mo.otherDirection - Determines if the object should be flipped horizontally.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawRageFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips an image (or object) horizontally on the canvas.
   * @param {Object} mo - The object to be flipped. This object should have an `x` and `width` property.
   * The `x` property represents the object's horizontal position, and `width` is used for the translation.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Flips the image back.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}

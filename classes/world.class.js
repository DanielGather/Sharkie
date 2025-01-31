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

  /**
   * Initializes the game world.
   * This constructor sets up the canvas, creates the level and endboss,
   * assigns the keyboard controls, and starts the game loop.
   * @param {HTMLCanvasElement} canvas - The canvas element for rendering the game.
   * @param {Object} keyboard - The object tracking keyboard inputs.
   * @param {number} newDamage - The base damage value for enemies.
   * @param {number} newEndbossLife - The initial health of the endboss.
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
    setStoppableInterval(this.run.bind(this), 100);
    this.draw();
  }

  /**
   * Runs the main game logic loop.
   * This method checks for various collisions, handles throwable objects,
   * updates enemy behavior, and manages game mechanics such as speed boosts
   * for the boss and enemy proximity detection.
   */
  run() {
    this.checkCollisionsEnemy();
    this.checkCollisionsCoins();
    this.checkThrowObjects();
    this.checkCollisionThrowableObject();
    this.checkCollisionsPoisonBottle();
    this.fishIsNearCharacter();
    this.speedBoostBoss();
  }

  /**
   * Sets the world reference for various game objects.
   * This method assigns the current world instance to the character, level,
   * and endboss objects, ensuring they have access to the game world context.
   */
  setWorld() {
    this.character.world = this;
    this.level.world = this;
    this.endboss.world = this;
  }

  /**
   * Adds the endboss to the enemy level array.
   */
  pushEndbossInArray() {
    Level.enemyLevelArray.push(this.endboss);
  }

  /**
   * Sets the font style and color for rendering text on the canvas.
   */
  setFontRules() {
    this.ctx.font = "30px LuckiestGuy";
    this.ctx.fillStyle = "white";
  }

  /**
   * Handles the throwing of poison bottles by the character.
   * - Checks if the throw key (`THROW`) is pressed.
   * - Ensures the character has poison bottles available and the damage delay allows throwing.
   * - Triggers the shooting animation before throwing the bottle.
   * - Creates a new throwable object (poison bottle) at the character's position.
   * - Plays the bubble shot sound effect.
   * - Reduces the character's poison storage and prevents immediate re-throwing.
   */
  checkThrowObjects() {
    if (this.keyboard.THROW && !this.damageDelay() && this.character.poisonStorage > 0) {
      this.lastDamage = new Date().getTime();
      this.shootingAnimation();
      setTimeout(() => {
        let bottle = new ThrowableObject(this.character.x + this.character.width - this.character.offset.right + 25,this.character.y + this.character.height / 2);
        this.throwableObjects.push(bottle);
        playSound(this.character.bubble_shot_SOUND);
      }, 400);
      this.character.reducePoisonStorage();
      this.keyboard.THROW = false;
    }
  }

  /**
   * Plays the shooting animation for the character when attacking with a bubble.
   * The method iterates through the bubble attack animation frames and then resets the character
   * back to the default swimming image after the animation is completed.
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
   * This method ensures that damage cannot be applied continuously in rapid succession by implementing
   * a cooldown period of 0.5 seconds between damage instances.
   * @returns {boolean} Returns `true` if less than 0.5 seconds have passed since the last damage event, otherwise `false`.
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
   * Checks for collisions between the character and enemies in the level.
   * Iterates through all enemies in `Level.enemyLevelArray` and checks if the character is colliding with them.
   */
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
  }

  /**
   * Checks if an enemy is collidable with the character.
   * Additionally, it checks if the space bar is not pressed (`!this.character.spaceBar`) and if the enemy is not dead (`!enemy.fishIsDead`).
   * If all conditions are met, the enemy is considered collidable.
   * @param {Object} enemy - The enemy to check. This could be an instance of `GreenFish`, `OrangeFish`, `RedFish`, or `GreenSuperDangerousFish`.
   * @returns {boolean} `true` if the enemy is collidable, `false` otherwise.
   */
  isCollidableEnemy(enemy) {
    return ((enemy instanceof GreenFish || enemy instanceof OrangeFish || enemy instanceof RedFish || (enemy instanceof GreenSuperDangerousFish && !enemy.fishIsDead)) && !this.character.spaceBar && !enemy.fishIsDead);
  }

  /**
   * Checks if an enemy is a collidable Endboss.
   * This method checks if the given enemy is an instance of the `Endboss` class and if the
   * character is not pressing the space bar (using `this.character.spaceBar`). If both conditions
   * are true, the enemy is considered collidable, otherwise it is not.
   * @param {Object} enemy - The enemy to check. This should be an instance of the `Endboss` class.
   * @returns {boolean} `true` if the enemy is an Endboss and the space bar is not pressed, `false` otherwise.
   */
  isCollidableEndboss(enemy) {
    return enemy instanceof Endboss && !this.character.spaceBar;
  }

  /**
   * Checks if a basic enemy can be removed.
   * This method checks if the given enemy is an instance of a basic fish type (GreenFish,
   * OrangeFish, or RedFish) and if it is not already marked for removal.
   * Returns `true` if the enemy is a basic fish and is not marked for removal, otherwise `false`.
   * @param {Object} enemy - The enemy to check. This should be an instance of a fish class, such as GreenFish, OrangeFish, or RedFish.
   * @returns {boolean} `true` if the enemy is a basic fish and can be removed, `false` otherwise.
   */
  isRemovableBasicEnemy(enemy) {
    return (
      (enemy instanceof GreenFish || enemy instanceof OrangeFish || enemy instanceof RedFish) && !enemy.markedForRemoval);
  }

  /**
   * Removes a basic enemy from the level after it is marked for removal.
   * This method sets the `fishIsDead` property of the enemy to `true` and marks it for
   * removal. After a delay (1500ms), the enemy is removed from the `Level.enemyLevelArray`
   * array using the `markedForRemoval` property to filter out the dead enemy.
   * @param {Object} enemy - The enemy to remove. This should be an instance of a class that represents a fish enemy.
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
   * The `damageDelay` method is used to ensure that the endboss can only be damaged after a certain 
   * amount of time has passed since the last damage was dealt.
   * @param {Object} enemy - The object representing the enemy to check.
   * @returns {boolean} Returns `true` if the enemy is an instance of `Endboss` and the damage delay has expired; otherwise, returns `false`.
   */
  isEndbossVulnerable(enemy) {
    return enemy instanceof Endboss && !this.damageDelay();
  }

  /**
   * Applies damage to the endboss and triggers the hurt state for the endboss.
   * This method records the time when the damage is applied (`lastDamage`) and calls the
   * `hitEndboss` method on the character to apply damage to the endboss.
   * Additionally, it sets the `isHurt` property of the endboss to `true`, indicating that
   * the endboss has been hurt.
   */
  applyDamageToEndboss() {
    this.lastDamage = new Date().getTime();
    this.character.hitEndboss();
    this.endboss.isHurt = true;
  }

  /**
   * Adjusts the speed of the endboss based on its distance from the character.
   * This method calculates the distance between the character and the endboss.
   * Depending on this distance, the speed of the endboss is adjusted:
   * - If the distance between the endboss and the character is greater than 400 and the endboss is attacking the character,
   *   the endboss's speed is increased to 2.
   * - If the distance is less than 50, the endboss's speed is reduced to 0.25.
   * This method is typically used to simulate the boss's behavior during the game, allowing for dynamic speed changes based on proximity.
   */
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

  /**
   * Checks for collisions between throwable objects (e.g., poison) and enemies.
   * This method iterates through each throwable object in `this.throwableObjects` and checks if it collides with any enemy in `Level.enemyLevelArray`.
   * If a collision is detected, the throwable object is removed from the list of throwable objects.
   */
  checkCollisionThrowableObject() {
    this.throwableObjects.forEach((poison, poisonIndex) => {
      let hitEnemy = false;
      Level.enemyLevelArray.forEach((enemy, enemyIndex) => {
        if (poison.isColliding(enemy)) {
          if (this.isRemovableBasicEnemy(enemy)) {
            hitEnemy = true;
            enemy.isHittetByBubble = true;
            this.removeBasicEnemy(enemy);
          } else if (enemy instanceof GreenSuperDangerousFish && !enemy.fishIsDead) {
            hitEnemy = true;
            enemy.fishIsDead = true;
          } else if (enemy instanceof Endboss && !rageMode) {
            this.bossGetHittet();
            hitEnemy = true;
          }
        }
      });
      if (hitEnemy) {
        this.throwableObjects.splice(poisonIndex, 1);
      }
    });
  }

  /**
   * Handles the behavior when the boss is hit by the character.
   * This method is called when the character collides with the endboss or causes damage to the endboss.
   * It calls the `hitEndboss` method on the character to process the damage and updates the endboss' state.
   * Specifically, it sets the `moveLeftEndboss` flag to `true` to make the endboss move left and marks the endboss as hurt.
   * @returns {void} This method does not return any value. It modifies the state of the character and the endboss.
   */
  bossGetHittet() {
    this.character.hitEndboss();
    this.endboss.moveLeftEndboss = true;
    this.endboss.isHurt = true;
  }

  /**
   * Checks for collisions between the character and coins.
   * This method iterates over the `coinsArray` and checks if the character
   * is colliding with any of the coins.
   */
  checkCollisionsCoins() {
    this.level.coinsArray = this.level.coinsArray.filter((coin) => {
      if (this.character.isColliding(coin)) {
        this.character.hitCoin();
        return false;
      }
      return true;
    });
  }

  /**
   * Checks for collisions between the character and poison bottles.
   * This method iterates over the `poisonBottleArray` and checks if the
   * character is colliding with any of the bottles.
   */
  checkCollisionsPoisonBottle() {
    this.level.poisonBottleArray = this.level.poisonBottleArray.filter((bottle) => {
      if (this.character.isColliding(bottle)) {
        this.character.hitPoisonBottle();
        return false;
      }
      return true;
    });
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
   * Checks if any fish in the enemy array is near the character.
   */
  fishIsNearCharacter() {
    Level.enemyLevelArray.forEach((enemy) => {
      let distanceX = Math.abs(this.character.x + this.character.width - this.character.offset.right - enemy.x);
      let distanceYTop = Math.abs(this.character.y + this.character.height - this.character.offset.bottom - enemy.y);
      let distanceYBottom = Math.abs(this.character.y + this.character.offset.top - (enemy.y + enemy.height - enemy.offset.bottom));
      if (this.fishIsInRange(distanceX, distanceYBottom, distanceYTop)) {
        enemy.FishIsInRange = true;
      } else if (this.fishIsNotInRange(distanceX, distanceYBottom, distanceYTop)) {
        enemy.FishIsInRange = false;
      }
    });
  }

  /**
   * Checks if the fish is within range based on its distance from the target.
   * This function evaluates the distances between the fish and a target in both the horizontal
   * (distanceX) and vertical (distanceYBottom, distanceYTop) directions. It returns `true` if the fish
   * is within a specified range based on the provided conditions.
   * @param {number} distanceX - The horizontal distance between the fish and the target.
   * @param {number} distanceYBottom - The vertical distance from the bottom of the fish to the target.
   * @param {number} distanceYTop - The vertical distance from the top of the fish to the target.
   * @returns {boolean} Returns `true` if the fish is in range, otherwise `false`.
   */
  fishIsInRange(distanceX, distanceYBottom, distanceYTop) {
    return (distanceX < 250 && distanceYTop < 100) || (distanceX < 250 && distanceYBottom < 100);
  }

  /**
   * Checks if the fish is not in range based on its distance from the target.
   * This function evaluates the distances between the fish and a target in both the horizontal
   * (distanceX) and vertical (distanceYBottom, distanceYTop) directions. It returns `true` if any
   * of the distances exceed predefined limits, indicating that the fish is not in range of the target.
   * @param {number} distanceX - The horizontal distance between the fish and the target.
   * @param {number} distanceYBottom - The vertical distance from the bottom of the fish to the target.
   * @param {number} distanceYTop - The vertical distance from the top of the fish to the target.
   * @returns {boolean} Returns `true` if the fish is not in range, otherwise `false`.
   */
  fishIsNotInRange(distanceX, distanceYBottom, distanceYTop) {
    return (
      distanceX > 300 ||
      distanceYBottom > 150 ||
      distanceYTop > 150 ||
      (distanceX > 300 && distanceYTop > 150) ||
      (distanceX > 300 && distanceYBottom > 150)
    );
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
   * This function takes an array of objects and adds each object to the map (canvas)
   * by calling the `addToMap` method for each object.
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
   * This function checks if the object should be flipped based on its `otherDirection` property,
   * then draws it on the canvas. After drawing, it flips the object back if it was flipped earlier.
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
   * This function uses the canvas context's transformation methods to flip an image or object
   * horizontally. It saves the current context state, applies a horizontal flip using `translate`
   * and `scale`, and then updates the object's `x` position to reflect the flip.
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
   * Flips an image (or object) horizontally by modifying its x position.
   * This function changes the x position of the provided object `mo` by multiplying its x coordinate
   * by -1. It assumes the image or object is drawn on the canvas and the transformation is based
   * on its current position.
   * @param {Object} mo - The object to be flipped. This object should have an `x` property representing
   * the horizontal position of the image on the canvas.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}

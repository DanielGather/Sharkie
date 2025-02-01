class WorldRun {
  /**
   * Handles the throwing of poison bottles by the character.
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
   * Checks for collisions between the character and enemies in the level.

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
   * Checks for collisions between the character and coins.
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
   * Checks for collisions between throwable objects (e.g., poison) and enemies.
   */
  checkCollisionThrowableObject() {
    this.throwableObjects.forEach((poison, poisonIndex) => {
      this.hitEnemy = false;
      Level.enemyLevelArray.forEach((enemy) => {
        if (poison.isColliding(enemy)) {
         this.checkPoisonColliding(enemy);
        }
      });
      if (this.hitEnemy) {
        this.throwableObjects.splice(poisonIndex, 1);
      }
    });
  }

  /**
   * Checks for collisions between the character and poison bottles.
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
   * Adjusts the speed of the endboss based on its distance from the character.
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
}

class Endboss extends MovableObject {
  animationCounterDead;
  animationCounterIntroduce;
  animationPlayed;
  animationCounterIsHurt;
  y = 0;
  x;
  width = 500;
  height = 500;
  lastHitEndboss = 0;
  endbossLife = 1000;
  maxHealth;
  speed = 0.25;
  initialLife = this.endbossLife;
  isNotDead = true;
  attackingCharacter = false;
  isHurt = false;
  moveLeftEndboss = false;
  rageModeActivated = false;
  oneRageModePerLevel = false;

  /**
  * Defines the offset values for the object, used for positioning or collision detection.
  *
  * @typedef {Object} Offset
  * @property {number} top - The top offset value.
  * @property {number} right - The right offset value.
  * @property {number} left - The left offset value.
  * @property {number} bottom - The bottom offset value.
  *
  * @type {Offset}
  */
  offset = {
    top: 160,
    right: 30,
    left: 30,
    bottom: 85,
  };

  hurt_SOUND = new Audio("audio/hurtSoundBoss.mp3");
  attacking_SOUND = new Audio("audio/monsterBite.mp3");

  /**
   * Initializes a new instance of the Endboss class.
   * @constructor
   */
  constructor() {
    super().loadImage(sprites.endboss.introduce[0]);
    this.damage = 10;
    this.loadImages(sprites.endboss.introduce);
    this.loadImages(sprites.endboss.swim);
    this.loadImages(sprites.endboss.isDead);
    this.loadImages(sprites.endboss.isHurt);
    this.loadImages(sprites.endboss.isAttacking);
    this.waitForEndbossVariable();
    this.changeLifeOnNextLevel();
    this.animate();
  }

  /**
   * Starts the animation process for the endboss, triggering various behaviors at specific intervals.
   */
  animate() {
    this.animationCounterIntroduce = 0;
    this.animationCounterDead = 0;
    this.animationCounterIsHurt = 0;
    setStoppableInterval(this.characterIsNearEndboss.bind(this), 125);
    setStoppableInterval(this.endbossIsDead.bind(this), 500);
    setStoppableInterval(this.endbossIsHittet.bind(this), 100);
    setStoppableInterval(this.endbossTakesDamage.bind(this), 100);
    setStoppableInterval(this.attackCharacter.bind(this), 150);
    setStoppableInterval(this.moveLeft.bind(this), 1000 / this.hz);
    setStoppableInterval(this.rageMode.bind(this), 100);
    this.attacking_SOUND.volume = 0.1;
  }

  /**
   * Updates the endboss's life points when advancing to the next level.
   */
  changeLifeOnNextLevel() {
    if (nextLevelBoolean) {
      this.endbossLife = this.endbossLife + 100 * levelCounter;
    } else {
      this.endbossLife = 1000;
    }
    this.maxHealth = this.endbossLife;
  }

  /**
   * Handles the endboss taking damage and playing the corresponding animation and sound.
   */
  endbossTakesDamage() {
    if (this.world && this.isHurt) {
      if (this.animationCounterIsHurt < 5) {
        this.playAnimation(sprites.endboss.isHurt);
        playSound(this.hurt_SOUND);
      } else {
        this.isHurt = false;
        this.animationCounterIsHurt = 0;
      }
      this.animationCounterIsHurt++;
    }
  }

  /**
   * Activates rage mode for the endboss when certain conditions are met.
   */
  rageMode() {
    if (repeatCanvas >= 2 && !this.oneRageModePerLevel) {
      if (this.endbossLife <= this.maxHealth / 2) {
        rageMode = true;
        this.speed = 1.5;
        setTimeout(() => {
          this.speed = 0.25;
          rageMode = false;
          this.oneRageModePerLevel = true;
        }, 5000);
      }
    }
  }

  /**
   * Moves the endboss to the left if certain conditions are met and initiates the attack animation.
   */
  moveLeft() {
    if (this.moveLeftEndboss == true && !this.isHurt) {
      super.moveLeft();
      this.attackingCharacter = true;
    }
  }

  /**
   * Handles the endboss's attack behavior towards the character, including animation and sound effects.
   */
  attackCharacter() {
    if (this.attackingCharacter && !this.isHurt && this.isNotDead) {
      this.playAnimation(sprites.endboss.isAttacking);
      let currentImageIndex = this.currentImage % sprites.endboss.isAttacking.length;
      if (currentImageIndex === 3 || currentImageIndex === 4) {
        playSound(this.attacking_SOUND);
      }
      this.offset.left = 10;
      this.moveLeftEndboss = true;
    } else if (!this.isNotDead && !this.isHurt) {
      this.moveLeftEndboss = false;
    }
  }

  /**
   * Handles the logic when the endboss is hit, updating the endboss's life and the timestamp of the last hit.
   */
  endbossIsHittet() {
    if (this.endbossLife < 0) {
      this.endbossLife = 0;
    } else if (this.endbossLife !== this.initialLife) {
      this.lastHitEndboss = new Date().getTime();
      this.initialLife = this.endbossLife;
    }
  }

  /**
   * Checks if the endboss is currently hurt based on the time since the last hit.
   * @returns {boolean} - Returns `true` if the endboss is hurt (i.e., less than 0.5 seconds have passed since
   * the last hit), otherwise returns `false`.
   */
  endbossIsHurt() {
    let timepassedEndboss = new Date().getTime() - this.lastHitEndboss; // Difference in ms
    timepassedEndboss = timepassedEndboss / 1000; // Difference in s
    return timepassedEndboss < 0.5;
  }

  /**
   * Handles the animation and behavior when the character is near the endboss.
   */
  characterIsNearEndboss() {
    if (this.world && this.world.characterIsInRange && this.isNotDead) {
      if (this.animationCounterIntroduce < 10) {
        this.playAnimation(sprites.endboss.introduce);
      } else if (!this.attackingCharacter && !this.isHurt) {
        this.playAnimation(sprites.endboss.swim);
      }
      this.animationCounterIntroduce++;
    }
  }

  /**
   * Handles the animation and state changes when the endboss is dead.
   */
  endbossIsDead() {
    if (this.world && this.endbossLife == 0) {
      this.isNotDead = false;
      if (this.animationCounterDead < 3) {
        this.playAnimation(sprites.endboss.isDead);
      } else if (this.animationCounterDead < 4 && !this.animationPlayed) {
        this.loadImage(sprites.endboss.isDead[4]);
        this.animationPlayed = true;
      }
      this.animationCounterDead++;
    }
  }

  /**
   * Waits for the `Level.level_end_x` variable to be defined and updates the object's `x` position accordingly.
   */
  waitForEndbossVariable() {
    const interval = setInterval(() => {
      if (Level.level_end_x !== undefined) {
        clearInterval(interval);
        this.x = Level.level_end_x - 1024;
      }
    }, 100);
  }
}

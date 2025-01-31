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
   * The constructor loads the initial image for the endboss, sets the damage value, and loads all necessary images
   * for the endboss's animations (introduce, swimming, dead, hurt, and attacking).
   * It also waits for the endboss's level variable to be set, changes the endboss's life on the next level,
   * and starts the animation cycle.
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
   * This method sets up several intervals to handle different aspects of the endboss's animations and behaviors:
   * - Character interaction with the endboss (`characterIsNearEndboss`).
   * - Endboss death and damage animations (`endbossIsDead`, `endbossTakesDamage`).
   * - Endboss attack animations and movement (`attackCharacter`, `moveLeft`).
   * - Rage mode activation (`rageMode`).
   * It also controls the volume of the attacking sound to a specific level.
   * Intervals are set for various actions with specified timeouts to manage the timing and sequence of the animations.
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
   * This method adjusts the endboss's life based on whether the player has reached the next level or not.
   * If the `nextLevelBoolean` flag is `true`, the endboss's life is increased by 100 times the current level count.
   * If the flag is `false`, the endboss's life is reset to 1000. The method also updates the `maxHealth` to match the new `endbossLife`.
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
   * This method is called when the endboss is hurt. If the endboss is in the "hurt" state (`isHurt`),
   * the method plays a hurt animation and sound. The animation is played for a specified number of frames
   * (up to 5 frames). After the animation frames are completed, the hurt state is reset, and the
   * animation counter is set back to 0.
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
   * This method checks if the endboss is eligible to enter rage mode based on its current health and
   * the number of times the canvas has been repeated (`repeatCanvas`). If the conditions are satisfied,
   * it increases the endboss's speed and activates rage mode for a limited duration (5 seconds). After
   * the timer expires, the speed is reduced, and the rage mode is deactivated. Additionally, the method
   * ensures that rage mode is only triggered once per level.
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
   * This method checks if the endboss is allowed to move left by evaluating the `moveLeftEndboss` flag
   * and ensuring the endboss is not hurt. If these conditions are true, it calls the `moveLeft` method
   * from the superclass (presumably to move the endboss), and sets the `attackingCharacter` flag to `true`
   * to indicate that the endboss is currently attacking the character.
   */
  moveLeft() {
    if (this.moveLeftEndboss == true && !this.isHurt) {
      super.moveLeft();
      this.attackingCharacter = true;
    }
  }

  /**
   * Handles the endboss's attack behavior towards the character, including animation and sound effects.
   * This method checks if the endboss is attacking, not hurt, and not dead. If these conditions are met,
   * it plays the attack animation using `IMAGES_ENDBOSS_IS_ATTACKING`, triggers the attack sound at specific
   * animation frames, and adjusts the endboss's horizontal offset to move towards the character.
   * If the endboss is dead or hurt, it stops the movement.
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
   * This method checks if the endboss's life is below 0, in which case it sets the life to 0. If the life is
   * not equal to the initial life (meaning the endboss has been hit), it updates the `lastHitEndboss` timestamp
   * to the current time and updates the `initialLife` to reflect the current `endbossLife`.
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
   * This method calculates the time that has passed since the endboss was last hit. If less than 0.5 seconds
   * have passed since the last hit, the endboss is considered to be hurt. The time difference is calculated in
   * seconds by subtracting the timestamp of the last hit from the current time.
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
   * This method is called when the character is in range of the endboss. If the endboss is not dead,
   * it will either play the introduction animation or the swimming animation. The introduction animation
   * plays for a limited number of frames (controlled by `animationCounterIntroduce`). After that,
   * the swimming animation is played unless the endboss is in the middle of an attack or is hurt.
   * The method tracks the animation state using `animationCounterIntroduce` to control the timing of the animations.
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
   * This method checks if the endboss's life is 0 and if the endboss is still alive. Once the endboss is dead,
   * it updates the state to indicate the endboss is not dead (`isNotDead = false`) and triggers the death animation.
   * It plays the death animation frames, and when the animation counter reaches a certain threshold, it loads
   * the final image of the dead endboss.
   * The method tracks the animation state using `animationCounterDead` and `animationPlayed` to avoid replaying
   * the final image.
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
   * This method repeatedly checks if `Level.level_end_x` has been assigned a value. Once the variable
   * is defined, it clears the interval and sets the object's `x` position to `Level.level_end_x - 1024`.
   * The method uses `setInterval` to check every 100 milliseconds until the condition is met.
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

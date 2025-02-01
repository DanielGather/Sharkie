class Character extends MovableObject {
  world;
  idleAnimationInterval;
  movementAnimation;
  idleAnimation;
  swimAnimation;
  scarySound = false;
  clickedSpacebar = 0;
  width = 200;
  height = 200;
  speed = 1;
  coins = 0;
  poisonStorage = 5;
  bubbleDamage = 100;
  finSlapDamage = 10;
  idle = false;
  animationPlayed = false;
  imageIsLoaded = false;
  spaceBar = false;
  hasWon = false;
  i;
  j;

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
    top: 90,
    right: 40,
    left: 40,
    bottom: 50,
  };

  walking_SOUND = new Audio("audio/fishSwiming.mp3");
  background_SOUND = new Audio("audio/backgroundSound.mp3");
  finSlap_SOUND = new Audio("audio/finSlap.mp3");
  hurt_SOUND = new Audio("audio/electroHurt.mp3");
  sleep_SOUND = new Audio("audio/sleepSound.mp3");
  scary_SOUND = new Audio("audio/whaleSound.mp3");
  bubble_shot_SOUND = new Audio("audio/bubbleShot.mp3");
  coin_collected_SOUND = new Audio("audio/coinCollection.mp3");
  lose_SOUND = new Audio("audio/loseSound.mp3");
  win_SOUND = new Audio("audio/winSound.mp3");
  bottle_collected_SOUND = new Audio("audio/bottlePickUp.mp3");

  /**
   * Creates a new character instance and initializes its properties.
   * Loads various character animations, applies gravity, and sets the initial position.
   */

  constructor() {
    super().loadImage("img/1.Sharkie/3.Swim/1.webp");
    this.loadImages(sprites.character.swim);
    this.loadImages(sprites.character.idle);
    this.loadImages(sprites.character.longIdle);
    this.loadImages(sprites.character.electroDead);
    this.loadImages(sprites.character.hurtElectro);
    this.loadImages(sprites.character.bubbleAttack);
    this.loadImages(sprites.character.finSlap);
    this.animateCharacter = new CharacterAnimate()
    this.animate();
    this.applyGravity();
    this.handleVolume();
    this.x = 80;
  }

  /**
   * Initializes the character's animations and movements by setting up multiple intervals.
   * These intervals handle character movement, interactions, and sound effects.
   */
  animate() {
    this.j = 0;
    this.i = 0;
    setStoppableInterval(this.checkstatus.bind(this), 100);
    setStoppableMovementInterval(this.animateCharacter.characterSwimRight.bind(this), 1000 / this.hz);
    setStoppableMovementInterval(this.animateCharacter.characterSwimLeft.bind(this), 1000 / this.hz);
    setStoppableMovementInterval(this.animateCharacter.characterSwimUp.bind(this), 1000 / this.hz);
    setStoppableMovementInterval(this.animateCharacter.characterSwimDown.bind(this), 1000 / this.hz);
    setStoppableMovementInterval(this.animateCharacter.playWalkingSound.bind(this), 1000 / this.hz);
    setStoppableMovementInterval(this.animateCharacter.checkIfCharacterIsCloseToEndboss.bind(this), 1000 / this.hz);
    setStoppableMovementInterval(this.animateCharacter.bossFollowsCharacter.bind(this), 1000 / this.hz);
    setStoppableMovementInterval(this.animateCharacter.lastMovement.bind(this), 1000 / this.hz);
    setStoppableMovementInterval(this.animateCharacter.changeCameraX.bind(this), 1000 / this.hz);
    setStoppableMovementInterval(this.animateCharacter.checkSpaceBar.bind(this), 1000 / this.hz);
    setStoppableMovementInterval(this.animateCharacter.finSlapAttack.bind(this), 50);
    setStoppableMovementInterval(this.animateCharacter.startScaryMusic.bind(this), 100);
    setStoppableInterval(this.animateCharacter.checkWin.bind(this), 50);
  }

  /**
 * Checks the character's status and plays the appropriate animation or sound.
 * This method evaluates the current status of the character, including whether the character is dead,
 * hurt, idle, moving, or inactive.
 */
  checkstatus() {
    if (this.isDead()) {
      this.handleDeath();
    } else if (this.isHurt()) {
      this.handleHurt();
    } else if (this.checkShortIdle()) {
      this.playIdleAnimation();
    } else if (this.checkLongIdle()) {
      this.playLongIdleAnimation();
    } else if (this.isMoving()) {
      this.playMovementAnimation();
    } else {
      this.pauseAudio();
    }
    playSound(this.background_SOUND);
  }

  /**
   * Pauses the walking and hurt sound effects and resets the walking sound's current time.
   */
  pauseAudio() {
    this.walking_SOUND.pause();
    this.hurt_SOUND.pause();
    this.walking_SOUND.currentTime = 0;
  }

  /**
   * Checks if the character is currently moving.
   * @returns {boolean} `true` if the character is moving, `false` otherwise.
   */
  isMoving() {
    return (this.world && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) && !this.spaceBar);
  }

  /**
   * Plays the movement animation for the character.
   */
  playMovementAnimation() {
    this.playAnimation(sprites.character.swim);
    this.sleep_SOUND.pause();
  }

  /**
   * Checks if the character is in a short idle state. 
   * @returns {boolean} `true` if the character is idle for a duration between 3 and 7 seconds and the space bar is not pressed, otherwise `false`.
   */
  checkShortIdle() {
    return this.isIdle() >= 3 && this.isIdle() <= 7 && !this.spaceBar;
  }

  /**
   * Checks if the character is in a long idle state.
   * @returns {boolean} `true` if the character is idle for 7 seconds or more and the space bar is not pressed, otherwise `false`.
   */
  checkLongIdle() {
    return this.isIdle() >= 7 && !this.spaceBar;
  }

  /**
   * Plays the idle animation for the character.
   */
  playIdleAnimation() {
    this.playAnimation(sprites.character.idle);
  }

  /**
   * Plays the long idle animation and the sleep sound effect.
   */
  playLongIdleAnimation() {
    this.playAnimation(sprites.character.longIdle);
    playSound(this.sleep_SOUND);
  }

  /**
   * Handles the character's death sequence.
   * Finally, it sets the `nextLevelBoolean` to `false` to prevent moving to the next level.
   */
  handleDeath() {
    this.walking_SOUND.pause();
    this.characterIsDead();
    showLoseScreen();
    playSound(this.lose_SOUND);
    stopGame();
    nextLevelBoolean = false;
    setTimeout(() => {
      muteAllSounds();
      document.getElementById("restart").classList.remove("disabled");
      document.getElementById("restart").disabled = false;
    }, 1500);
  }

  /**
   * Handles the character's hurt animation and sound.
   * This method plays the hurt animation for the character and triggers the hurt sound effect.
   * It is intended to be called whenever the character takes damage.
   */
  handleHurt() {
    this.playAnimation(sprites.character.hurtElectro);
    playSound(this.hurt_SOUND);
  }

  /**
   * Handles the character's death animation and stops movement.
   * When the character dies, this method triggers the death animation by playing frames from the `electroDead` sprite array.
   * The movement is stopped during the death animation, and the `j` counter is used to manage the number of frames shown.
   * After 10 frames, the last frame of the death animation is displayed.
   */
  characterIsDead() {
    if (this.j < 10) {
      this.playAnimation(sprites.character.electroDead);
      stopMovement();
      this.j++;
    } else {
      this.loadImage(sprites.character.electroDead[9]);
    }
  }

  /**
   * Increases the coin count and plays the coin collection sound.
   * When the character hits a coin, this method increments the coin count (`coins`) by 1.
   * It checks if the `coin_collected_SOUND` is already playing, pauses it, resets its playback time to the beginning,
   * and then plays the sound to indicate the coin collection.
   */
  hitCoin() {
    this.coins += 1;
    if (this.coin_collected_SOUND) {
      this.coin_collected_SOUND.pause();
      this.coin_collected_SOUND.currentTime = 0;
    }
    playSound(this.coin_collected_SOUND);
  }



  /**
   * Calculates the time passed since the spacebar was last clicked.
   * The method retrieves the current time, calculates the difference in seconds between the current time and the last
   * recorded time when the spacebar was clicked, and returns this time difference.
   * @returns {number} The time (in seconds) that has passed since the spacebar was last clicked.
   */
  timePassedClickSpacebar() {
    let currentTime = new Date().getTime();
    let timepassed = (currentTime - this.clickedSpacebar) / 1000;
    return timepassed;
  }

  /**
   * Decreases the endboss's life based on the type of attack.
   * If the space bar is not pressed, the method decreases the endboss's life by the value of `bubbleDamage`.
   * If the space bar is pressed, the method decreases the endboss's life by the value of `finSlapDamage`.
   * This method is typically called when the player character attacks the endboss.
   */
  hitEndboss() {
    if (!this.spaceBar) {
      this.world.endboss.endbossLife -= this.bubbleDamage;
    } else {
      this.world.endboss.endbossLife -= this.finSlapDamage;
    }
  }

  /**
   * Increases the poison storage by 1 and plays a sound when a poison bottle is hit.
   * This method increments the `poisonStorage` by 1 and plays a collection sound.
   */
  hitPoisonBottle() {
    this.poisonStorage += 1;
    playSound(this.bottle_collected_SOUND);
  }

  /**
   * Reduces the poison storage by 1, if it is not already at 0.
   * This method checks if the `poisonStorage` is greater than 0 before reducing it by 1.
   * If the `poisonStorage` is 0, no reduction happens.
   */
  reducePoisonStorage() {
    if (!this.poisonStorage == 0) {
      this.poisonStorage -= 1;
    }
  }

  /**
   * Calculates the amount of time the character has been idle.
   * @returns {number} The time (in seconds) that has passed since the last movement of the character.
   */
  isIdle() {
    let currentTime = new Date().getTime();
    let timepassed = (currentTime - this.lastMovementCharacter) / 1000;
    return timepassed;
  }


  /**
   * Introduces the boss when the character reaches a specific position in the level.
   */
  introduceBoss() {
    if (this.world && this.x + this.width == Level.level_end_x - 1548) {
      world.characterIsInRange = true;
    }
  }

  /**
   * Sets the volume levels for various sound effects and plays the background sound.
   * The method adjusts the volume for different sounds used in the game, ensuring that each sound is set to a specific level.
   * It also ensures the background sound is played when this method is called.
   */
  handleVolume() {
    playSound(this.background_SOUND);
    this.walking_SOUND.volume = 0.25;
    this.background_SOUND.volume = 0.35;
    this.finSlap_SOUND.volume = 0.2;
    this.hurt_SOUND.volume = 0.3;
    this.sleep_SOUND.volume = 0.3;
    this.scary_SOUND.volume = 0.7;
    this.lose_SOUND.volume = 0.05;
    this.win_SOUND.volume = 0.05;
  }
}

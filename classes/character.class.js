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
    setStoppableMovementInterval(this.characterSwimRight.bind(this), 1000 / this.hz);
    setStoppableMovementInterval(this.characterSwimLeft.bind(this), 1000 / this.hz);
    setStoppableMovementInterval(this.characterSwimUp.bind(this), 1000 / this.hz);
    setStoppableMovementInterval(this.characterSwimDown.bind(this), 1000 / this.hz);
    setStoppableMovementInterval(this.playWalkingSound.bind(this), 1000 / this.hz);
    setStoppableMovementInterval(this.checkIfCharacterIsCloseToEndboss.bind(this), 1000 / this.hz);
    setStoppableMovementInterval(this.bossFollowsCharacter.bind(this), 1000 / this.hz);
    setStoppableMovementInterval(this.lastMovement.bind(this), 1000 / this.hz);
    setStoppableMovementInterval(this.changeCameraX.bind(this), 1000 / this.hz);
    setStoppableMovementInterval(this.checkSpaceBar.bind(this), 1000 / this.hz);
    setStoppableMovementInterval(this.finSlapAttack.bind(this), 50);
    setStoppableMovementInterval(this.startScaryMusic.bind(this), 100);
    setStoppableInterval(this.checkWin.bind(this), 50);
  }

  /**
 * Checks the character's status and plays the appropriate animation or sound.
 * This method evaluates the current status of the character, including whether the character is dead,
 * hurt, idle, moving, or inactive. Depending on the result, it calls the corresponding animation or 
 * sound method:
 * - If the character is dead, it triggers the death handling.
 * - If the character is hurt, it plays the hurt animation and sound.
 * - If the character is in a short idle state, it plays the idle animation.
 * - If the character is in a long idle state, it plays the long idle animation.
 * - If the character is moving, it plays the movement animation.
 * - If none of the above conditions are met, it pauses the audio and stops movement sounds.
 * Additionally, the background sound is always played, regardless of the character's state.
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
   * This method pauses the `walking_SOUND` and `hurt_SOUND` audio tracks, ensuring they stop playing.
   * Additionally, it resets the `walking_SOUND` to the start (currentTime = 0) so that it can be played again from the beginning if needed.
   */
  pauseAudio() {
    this.walking_SOUND.pause();
    this.hurt_SOUND.pause();
    this.walking_SOUND.currentTime = 0;
  }

  /**
   * Checks if the character is currently moving.
   * This method returns `true` if the character is pressing one of the movement keys (RIGHT, LEFT, UP, DOWN)
   * and is not pressing the space bar. It returns `false` otherwise.
   * @returns {boolean} `true` if the character is moving, `false` otherwise.
   */
  isMoving() {
    return (this.world && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) && !this.spaceBar);
  }

  /**
   * Plays the movement animation for the character.
   * This method triggers the swimming animation and pauses the sleep sound to ensure
   * that the character's movement is visually represented and any background sleep sound is halted.
   */
  playMovementAnimation() {
    this.playAnimation(sprites.character.swim);
    this.sleep_SOUND.pause();
  }

  /**
   * Checks if the character is in a short idle state. The method determines if the character has been idle for a duration
   * between 3 and 7 seconds and is not pressing the space bar. If both conditions are met,
   * the character is considered to be in a short idle state.
   * @returns {boolean} `true` if the character is idle for a duration between 3 and 7 seconds and the space bar is not pressed, otherwise `false`.
   */
  checkShortIdle() {
    return this.isIdle() >= 3 && this.isIdle() <= 7 && !this.spaceBar;
  }

  /**
   * Checks if the character is in a long idle state.
   * The method determines if the character has been idle for a sufficient amount of time
   * (greater than or equal to 7 seconds) and is not pressing the space bar. If both conditions
   * are met, the character is considered to be in a long idle state.
   * @returns {boolean} `true` if the character is idle for 7 seconds or more and the space bar is not pressed, otherwise `false`.
   */
  checkLongIdle() {
    return this.isIdle() >= 7 && !this.spaceBar;
  }

  /**
   * Plays the idle animation for the character.
   * This method triggers the character's idle animation, typically used when the character
   * is not moving or performing any other actions. It helps represent a state of inactivity or
   * resting position.
   */
  playIdleAnimation() {
    this.playAnimation(sprites.character.idle);
  }

  /**
   * Plays the long idle animation and the sleep sound effect.
   * This method triggers the character's long idle animation and plays the corresponding
   * sleep sound effect. It is typically used when the character is idle for a prolonged
   * period, and the animation and sound indicate the character's rest or inactivity.
   */
  playLongIdleAnimation() {
    this.playAnimation(sprites.character.longIdle);
    playSound(this.sleep_SOUND);
  }

  /**
   * Handles the character's death sequence.
   * This method pauses the walking sound, triggers the character's death animation,
   * displays the lose screen, and stops the game after a brief delay.
   * It also mutes all sounds and plays the lose sound effect.
   * Finally, it sets the `nextLevelBoolean` to `false` to prevent moving to the next level.
   */
  handleDeath() {
    this.walking_SOUND.pause();
    this.characterIsDead();
    showLoseScreen();
    setTimeout(() => {
      stopGame();
      muteAllSounds();
      document.getElementById("restart").classList.remove("disabled");
      document.getElementById("restart").disabled = false;
    }, 1500);
    playSound(this.lose_SOUND);
    nextLevelBoolean = false;
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
   * Plays the scary background music when the endboss is close to the player.
   * This method checks if the distance between the player and the endboss is less than 1500 pixels.
   * If the condition is met and the scary music hasn't already been played, it starts the scary music.
   */
  startScaryMusic() {
    if (this.world.endboss.x - this.x - this.width < 1500) {
      if (!this.scarySound) {
        playSound(this.scary_SOUND);
        this.scarySound = true;
      }
    }
  }

  /**
   * Checks if the player has won the game by defeating the endboss.
   * If the endboss's life reaches 0 and the player hasn't already won, this method sets the `hasWon` flag to true,
   * displays the win screen, stops the game, mutes all sounds, and plays the win sound.
   */
  checkWin() {
    if (this.world.endboss.endbossLife == 0 && !this.hasWon) {
      this.hasWon = true;
      showWinScreen();
      stopGame();
      muteAllSounds();
      playSound(this.win_SOUND);
    }
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
   * Executes the fin slap attack when the spacebar is pressed.
   * The method checks if the spacebar has been pressed and, if so, plays a series of fin slap animations.
   * It increments a counter (`i`) and modifies the character's offset position depending on the direction.
   * After completing the animation, it plays the fin slap sound and resets the spacebar state and animation counter.
   * This method ensures the fin slap attack only happens once per press and provides the appropriate animation and sound.
   */
  finSlapAttack() {
    if (this.spaceBar) {
      if (this.i <= 9) {
        this.otherDirection ? (this.offset.left = 15) : (this.offset.right = 15);
        this.playAnimation(sprites.character.finSlap);
      } else {
        playSound(this.finSlap_SOUND);
        this.spaceBar = false;
        this.i = 0;
        this.otherDirection ? (this.offset.left = 40) : (this.offset.right = 40);
        this.world.keyboard.SPACE = false;
      }
      this.i++;
    }
  }

  /**
   * Checks if the spacebar has been pressed and handles its state.
   * The method checks if the spacebar is pressed, if it hasn’t been pressed already (based on the `spaceBar` flag),
   * and if sufficient time has passed (at least 1.5 seconds) since the last spacebar press. If these conditions are met,
   * it updates the `spaceBar` flag to `true` and records the time when the spacebar was pressed.
   * This prevents multiple spacebar presses from being registered in quick succession.
   */
  checkSpaceBar() {
    if (this.world && this.world.keyboard.SPACE && !this.spaceBar && this.timePassedClickSpacebar() >= 1.5) {
      this.spaceBar = true;
      this.clickedSpacebar = new Date().getTime();
    }
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
   * Checks if the character is close enough to the endboss to trigger the attack.
   * If the character's position is close enough to the endboss (determined by the character's `x` position and the level's
   * end boundary), the method sets the `attackingCharacter` flag of the endboss to `true`, indicating that the endboss
   * should start attacking the character.
   */
  checkIfCharacterIsCloseToEndboss() {
    if (this.world && this.x + this.width == Level.level_end_x - 1248) {
      this.world.endboss.attackingCharacter = true;
    }
  }

  /**
   * Makes the endboss follow the character vertically.
   * If the endboss is attacking the character and is not dead, the method calculates the vertical offset between the
   * character's center and the endboss's center. The endboss's vertical position (`y`) is then adjusted to match
   * the character's vertical position, ensuring the endboss follows the character's movements vertically.
   */
  bossFollowsCharacter() {
    if (this.world.endboss.attackingCharacter && this.world.endboss.isNotDead) {
      let characterCenterY = this.y + this.offset.top + this.height / 2;
      let endbossCurrentCenterY = this.world.endboss.y + this.world.endboss.offset.top + this.world.endboss.height / 2;
      let offsetToCenter = characterCenterY - endbossCurrentCenterY;
      this.world.endboss.y += offsetToCenter;
    }
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
   * This method compares the current time with the time of the last recorded movement (`lastMovementCharacter`),
   * and returns the time passed in seconds. If no movement has occurred, it will return a larger value.
   * @returns {number} The time (in seconds) that has passed since the last movement of the character.
   */
  isIdle() {
    let currentTime = new Date().getTime();
    let timepassed = (currentTime - this.lastMovementCharacter) / 1000;
    return timepassed;
  }

  /**
   * Records the timestamp of the last movement or action performed by the character.
   * This method checks if any movement key (down, up, left, right) or the spacebar is pressed,
   * and if so, it updates the `lastMovementCharacter` variable with the current time (in milliseconds).
   */
  lastMovement() {
    if (this.world && (this.world.keyboard.DOWN || this.world.keyboard.UP || this.world.keyboard.LEFT || this.world.keyboard.RIGHT || this.world.keyboard.SPACE)) {
      this.lastMovementCharacter = new Date().getTime();
    }
  }

  /**
   * Plays the walking sound when any movement key (up, down, left, or right) is pressed,
   * unless the spacebar is active. The method checks if any of the movement keys (down, up, left, or right) are pressed,
   * and ensures that the spacebar is not active. If these conditions are met, it plays the walking sound effect.
   */
  playWalkingSound() {
    if (this.world && (this.world.keyboard.DOWN || this.world.keyboard.UP || this.world.keyboard.LEFT || this.world.keyboard.RIGHT) && !this.spaceBar) {
      playSound(this.walking_SOUND);
    }
  }

  /**
   * Moves the character downwards if the down arrow key is pressed and the character is
   * not at the bottom boundary of the level. The method checks if the down key is pressed and ensures that the character does not
   * move below the bottom of the level. Once the condition is met, the character swims down.
   */
  characterSwimDown() {
    if (this.world && this.world.keyboard.DOWN && this.y + this.height - this.offset.bottom < 600) {
      this.swimDOWN();
    }
  }

  /**
   * Moves the character upwards if the up arrow key is pressed and the character is
   * not at the top boundary of the level. The method checks if the up key is pressed and ensures that the character does not
   * move above the top of the level. Once the condition is met, the character swims up.
   */
  characterSwimUp() {
    if (this.world && this.world.keyboard.UP && this.y + this.offset.top > 0) {
      this.swimUP();
    }
  }

  /**
   * Moves the character to the left if the left arrow key is pressed and the character
   * has not crossed the left boundary of the level. The method checks if the left key is pressed
   * and ensures that the character does not move beyond the left edge of the level. Once the conditions are met,
   * the character moves to the left and changes the direction indicator.
   */
  characterSwimLeft() {
    if (this.world && this.world.keyboard.LEFT && this.x > -944) {
      this.moveLeft();
      this.otherDirection = true;
    }
  }

  /**
   * Moves the character to the right if the right arrow key is pressed and the character
   * is not at the end of the level. It also introduces the boss when the character reaches
   * a certain position.
   *
   * The method checks if the right key is pressed and ensures that the character does
   * not move beyond the level's boundaries. Once the conditions are met, the character
   * is moved to the right, and the boss is introduced.
   */
  characterSwimRight() {
    if (this.world && this.world.keyboard.RIGHT && this.x + this.width + this.offset.left < Level.level_end_x) {
      this.moveRight();
      this.introduceBoss();
      this.otherDirection = false;
    }
  }

  /**
   * Adjusts the camera's X position based on the character's position.
   * When the character reaches the end of the level or a specified position,
   * the camera is adjusted to follow the character smoothly.
   * If the character is at the end of the level, the camera shifts to the appropriate final position.
   */
  changeCameraX() {
    if (this.world && this.x >= Level.level_end_x - 1024) {
      this.world.camera_x = -Level.level_end_x + 1104;
    } else {
      this.world.camera_x = -this.x + 80;
    }
  }

  /**
   * Introduces the boss when the character reaches a specific position in the level.
   * When the character's position reaches the specified point near the end of the level,
   * this method sets the flag `characterIsInRange` in the world object to true, signaling
   * that the character is in range of the boss.
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
    this.background_SOUND.volume = 0.2;
    this.finSlap_SOUND.volume = 0.2;
    this.hurt_SOUND.volume = 0.3;
    this.sleep_SOUND.volume = 0.3;
    this.scary_SOUND.volume = 0.7;
    this.lose_SOUND.volume = 0.05;
    this.win_SOUND.volume = 0.05;
  }
}

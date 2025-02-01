class CharacterAnimate {
  /**
   * Records the timestamp of the last movement or action performed by the character.
   * This method checks if any movement key (down, up, left, right) or the spacebar is pressed,
   * and if so, it updates the `lastMovementCharacter` variable with the current time (in milliseconds).
   */
  lastMovement() {
    if (
      this.world &&
      (this.world.keyboard.DOWN ||
        this.world.keyboard.UP ||
        this.world.keyboard.LEFT ||
        this.world.keyboard.RIGHT ||
        this.world.keyboard.SPACE)
    ) {
      this.lastMovementCharacter = new Date().getTime();
    }
  }

  /**
   * Plays the walking sound when any movement key (up, down, left, or right) is pressed,
   * unless the spacebar is active. The method checks if any of the movement keys (down, up, left, or right) are pressed,
   * and ensures that the spacebar is not active. If these conditions are met, it plays the walking sound effect.
   */
  playWalkingSound() {
    if (
      this.world &&
      (this.world.keyboard.DOWN ||
        this.world.keyboard.UP ||
        this.world.keyboard.LEFT ||
        this.world.keyboard.RIGHT) &&
      !this.spaceBar
    ) {
      playSound(this.walking_SOUND);
    }
  }

  /**
   * Moves the character downwards if the down arrow key is pressed and the character is
   * not at the bottom boundary of the level.
   */
  characterSwimDown() {
    if (this.world && this.world.keyboard.DOWN && this.y + this.height - this.offset.bottom < 600) {
      this.swimDOWN();
    }
  }

  /**
   * Moves the character upwards if the up arrow key is pressed and the character is
   * not at the top boundary of the level.
   */
  characterSwimUp() {
    if (this.world && this.world.keyboard.UP && this.y + this.offset.top > 0) {
      this.swimUP();
    }
  }

  /**
   * Moves the character to the left if the left arrow key is pressed and the character
   * has not crossed the left boundary of the level.
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
   */
  characterSwimRight() {
    if (
      this.world &&
      this.world.keyboard.RIGHT &&
      this.x + this.width + this.offset.left < Level.level_end_x
    ) {
      this.moveRight();
      this.introduceBoss();
      this.otherDirection = false;
    }
  }

  /**
   * Checks if the character is close enough to the endboss to trigger the attack.
   */
  checkIfCharacterIsCloseToEndboss() {
    if (this.world && this.x + this.width == Level.level_end_x - 1248) {
      this.world.endboss.attackingCharacter = true;
    }
  }

  /**
   * Makes the endboss follow the character vertically.
   */
  bossFollowsCharacter() {
    if (this.world.endboss.attackingCharacter && this.world.endboss.isNotDead) {
      let characterCenterY = this.y + this.offset.top + this.height / 2;
      let endbossCurrentCenterY =
        this.world.endboss.y + this.world.endboss.offset.top + this.world.endboss.height / 2;
      let offsetToCenter = characterCenterY - endbossCurrentCenterY;
      this.world.endboss.y += offsetToCenter;
    }
  }

  /**
   * Adjusts the camera's X position based on the character's position.
   */
  changeCameraX() {
    if (this.world && this.x >= Level.level_end_x - 1024) {
      this.world.camera_x = -Level.level_end_x + 1104;
    } else {
      this.world.camera_x = -this.x + 80;
    }
  }

  /**
   * Checks if the spacebar has been pressed and handles its state.
   */
  checkSpaceBar() {
    if (
      this.world &&
      this.world.keyboard.SPACE &&
      !this.spaceBar &&
      this.timePassedClickSpacebar() >= 1.5
    ) {
      this.spaceBar = true;
      this.clickedSpacebar = new Date().getTime();
    }
  }

  /**
   * Executes the fin slap attack when the spacebar is pressed.
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
   * Plays the scary background music when the endboss is close to the player.
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
}

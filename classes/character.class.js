class Character extends MovableObject {
  world;
  idleAnimationInterval;
  movementAnimation;
  idleAnimation;
  swimAnimation;
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
  i;
  j;

  offset = {
    top: 90,
    right: 40,
    left: 40,
    bottom: 50,
  };

  IMAGES_SWIMING = ["img/1.Sharkie/3.Swim/1.webp", "img/1.Sharkie/3.Swim/2.webp", "img/1.Sharkie/3.Swim/3.webp", "img/1.Sharkie/3.Swim/4.webp", "img/1.Sharkie/3.Swim/5.webp", "img/1.Sharkie/3.Swim/6.webp"];

  IMAGES_IDLE = ["img/1.Sharkie/1.IDLE/1.webp", "img/1.Sharkie/1.IDLE/2.webp", "img/1.Sharkie/1.IDLE/3.webp", "img/1.Sharkie/1.IDLE/4.webp", "img/1.Sharkie/1.IDLE/5.webp", "img/1.Sharkie/1.IDLE/6.webp", "img/1.Sharkie/1.IDLE/7.webp", "img/1.Sharkie/1.IDLE/8.webp", "img/1.Sharkie/1.IDLE/9.webp", "img/1.Sharkie/1.IDLE/10.webp", "img/1.Sharkie/1.IDLE/11.webp", "img/1.Sharkie/1.IDLE/12.webp", "img/1.Sharkie/1.IDLE/13.webp", "img/1.Sharkie/1.IDLE/14.webp", "img/1.Sharkie/1.IDLE/15.webp", "img/1.Sharkie/1.IDLE/16.webp", "img/1.Sharkie/1.IDLE/17.webp", "img/1.Sharkie/1.IDLE/18.webp"];

  IMAGES_LONG_IDLE = ["img/1.Sharkie/2.Long_IDLE/i1.webp", "img/1.Sharkie/2.Long_IDLE/i2.webp", "img/1.Sharkie/2.Long_IDLE/i3.webp", "img/1.Sharkie/2.Long_IDLE/i4.webp", "img/1.Sharkie/2.Long_IDLE/i5.webp", "img/1.Sharkie/2.Long_IDLE/i6.webp", "img/1.Sharkie/2.Long_IDLE/i7.webp", "img/1.Sharkie/2.Long_IDLE/i8.webp", "img/1.Sharkie/2.Long_IDLE/i9.webp", "img/1.Sharkie/2.Long_IDLE/i10.webp", "img/1.Sharkie/2.Long_IDLE/i11.webp", "img/1.Sharkie/2.Long_IDLE/i12.webp", "img/1.Sharkie/2.Long_IDLE/i13.webp", "img/1.Sharkie/2.Long_IDLE/i14.webp"];

  IMAGES_POISON_DEAD = ["img/1.Sharkie/6.dead/1.Poisoned/1.webp", "img/1.Sharkie/6.dead/1.Poisoned/2.webp", "img/1.Sharkie/6.dead/1.Poisoned/3.webp", "img/1.Sharkie/6.dead/1.Poisoned/4.webp", "img/1.Sharkie/6.dead/1.Poisoned/5.webp", "img/1.Sharkie/6.dead/1.Poisoned/6.webp", "img/1.Sharkie/6.dead/1.Poisoned/7.webp", "img/1.Sharkie/6.dead/1.Poisoned/8.webp", "img/1.Sharkie/6.dead/1.Poisoned/9.webp", "img/1.Sharkie/6.dead/1.Poisoned/10.webp", "img/1.Sharkie/6.dead/1.Poisoned/11.webp", "img/1.Sharkie/6.dead/1.Poisoned/12.webp"];

  IMAGES_ELECTRO_DEAD = ["img/1.Sharkie/6.dead/2.Electro_shock/1.webp", "img/1.Sharkie/6.dead/2.Electro_shock/2.webp", "img/1.Sharkie/6.dead/2.Electro_shock/3.webp", "img/1.Sharkie/6.dead/2.Electro_shock/4.webp", "img/1.Sharkie/6.dead/2.Electro_shock/5.webp", "img/1.Sharkie/6.dead/2.Electro_shock/6.webp", "img/1.Sharkie/6.dead/2.Electro_shock/7.webp", "img/1.Sharkie/6.dead/2.Electro_shock/8.webp", "img/1.Sharkie/6.dead/2.Electro_shock/9.webp", "img/1.Sharkie/6.dead/2.Electro_shock/10.webp"];

  IMAGES_HURT_POISON = ["img/1.Sharkie/5.Hurt/1.Poisoned/1.webp", "img/1.Sharkie/5.Hurt/1.Poisoned/2.webp", "img/1.Sharkie/5.Hurt/1.Poisoned/3.webp", "img/1.Sharkie/5.Hurt/1.Poisoned/4.webp"];

  IMAGES_HURT_ELECTRO = ["img/1.Sharkie/5.Hurt/2.Electric shock/1.webp", "img/1.Sharkie/5.Hurt/2.Electric shock/2.webp", "img/1.Sharkie/5.Hurt/2.Electric shock/3.webp"];

  IMAGES_SHOOTING_BUBBLE = ["img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.webp", "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.webp", "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.webp", "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.webp", "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.webp", "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.webp", "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.webp", "img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.webp"];

  IMAGES_FIN_SLAP = ["img/1.Sharkie/4.Attack/Fin slap/1.webp", "img/1.Sharkie/4.Attack/Fin slap/2.webp", "img/1.Sharkie/4.Attack/Fin slap/3.webp", "img/1.Sharkie/4.Attack/Fin slap/4.webp", "img/1.Sharkie/4.Attack/Fin slap/5.webp", "img/1.Sharkie/4.Attack/Fin slap/6.webp", "img/1.Sharkie/4.Attack/Fin slap/7.webp", "img/1.Sharkie/4.Attack/Fin slap/8.webp", "img/1.Sharkie/3.Swim/1.webp"];

  walking_SOUND = new Audio("audio/fishSwiming.mp3");
  ambience_SOUND = new Audio("audio/underWaterNoise.mp3");

  constructor() {
    super().loadImage("img/1.Sharkie/3.Swim/1.webp");
    this.loadImages(this.IMAGES_SWIMING);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_POISON_DEAD);
    this.loadImages(this.IMAGES_ELECTRO_DEAD);
    this.loadImages(this.IMAGES_HURT_POISON);
    this.loadImages(this.IMAGES_HURT_ELECTRO);
    this.loadImages(this.IMAGES_SHOOTING_BUBBLE);
    this.loadImages(this.IMAGES_FIN_SLAP);
    this.animate();
    this.applyGravity();
    this.x = 80;

    // this.saveAllSoundsInArray();
    // this.isDead();
  }

  animate() {
    this.j = 0;
    setInterval(() => {
      if (this.isDead()) {
        console.log("welchen wert hat hier J", this.j);

        this.characterIsDead();
        this.walking_SOUND.pause();
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT_ELECTRO);
      } else if (this.isIdle() >= 3 && this.isIdle() <= 7 && !this.spaceBar) {
        this.playAnimation(this.IMAGES_IDLE);
      } else if (this.isIdle() >= 7 && !this.spaceBar) {
        this.playAnimation(this.IMAGES_LONG_IDLE);
      } else {
        if (this.world && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) && !this.spaceBar) {
          this.playAnimation(this.IMAGES_SWIMING);
        }
      }
      playSound(this.ambience_SOUND);
      this.walking_SOUND.pause();
    }, 150);

    this.i = 0;
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

    // setInterval(() => {
    //   this.lastMovement();
    //   this.changeCameraX();
    // }, 1000 / this.hz);
  }

  characterIsDead() {
    if (this.j < 10) {
      this.playAnimation(this.IMAGES_ELECTRO_DEAD);
      stopMovement();
      this.j++;
    } else {
      this.loadImage(this.IMAGES_ELECTRO_DEAD[9]);
    }
  }

  hitCoin() {
    this.coins += 1;
  }

  finSlapAttack() {
    if (this.spaceBar) {
      if (this.i <= 9) {
        this.offset.right = 15;
        this.playAnimation(this.IMAGES_FIN_SLAP);
      } else {
        this.spaceBar = false;
        this.i = 0;
        this.offset.right = 40;
      }
      this.i++;
    }
  }

  checkSpaceBar() {
    if (this.world && this.world.keyboard.SPACE && !this.spaceBar && this.timePassedClickSpacebar() >= 1.5) {
      this.spaceBar = true;
      this.clickedSpacebar = new Date().getTime();
    }
  }

  timePassedClickSpacebar() {
    let currentTime = new Date().getTime();
    let timepassed = (currentTime - this.clickedSpacebar) / 1000;
    return timepassed;
  }

  checkIfCharacterIsCloseToEndboss() {
    if (this.world && this.x + this.width == Level.level_end_x - 1248) {
      this.world.endboss.attackingCharacter = true;
    }
  }

  bossFollowsCharacter() {
    if (this.world.endboss.attackingCharacter && this.world.endboss.isNotDead) {
      let characterCenterY = this.y + this.offset.top + this.height / 2;
      let endbossCurrentCenterY = this.world.endboss.y + this.world.endboss.offset.top + this.world.endboss.height / 2;
      let offsetToCenter = characterCenterY - endbossCurrentCenterY;
      this.world.endboss.y += offsetToCenter;
    }
  }

  hitEndboss() {
    if (!this.spaceBar) {
      this.world.endboss.endbossLife -= this.bubbleDamage;
    } else {
      this.world.endboss.endbossLife -= this.finSlapDamage;
    }
  }

  hitPoisonBottle() {
    this.poisonStorage += 1;
  }

  reducePoisonStorage() {
    if (!this.poisonStorage == 0) {
      this.poisonStorage -= 1;
    }
  }

  isIdle() {
    let currentTime = new Date().getTime();
    let timepassed = (currentTime - this.lastMovementCharacter) / 1000;
    return timepassed;
  }

  lastMovement() {
    if (this.world && (this.world.keyboard.DOWN || this.world.keyboard.UP || this.world.keyboard.LEFT || this.world.keyboard.RIGHT || this.world.keyboard.SPACE)) {
      this.lastMovementCharacter = new Date().getTime();
    }
  }

  playWalkingSound() {
    if (this.world && (this.world.keyboard.DOWN || this.world.keyboard.UP || this.world.keyboard.LEFT || this.world.keyboard.RIGHT)) {
      playSound(this.walking_SOUND);
    }
  }

  characterSwimDown() {
    if (this.world && this.world.keyboard.DOWN && this.y + this.height - this.offset.bottom < 600) {
      this.swimDOWN();
    }
  }

  characterSwimUp() {
    if (this.world && this.world.keyboard.UP && this.y + this.offset.top > 0) {
      this.swimUP();
    }
  }

  characterSwimLeft() {
    if (this.world && this.world.keyboard.LEFT && this.x > -944) {
      this.moveLeft();
      this.otherDirection = true;
    }
  }

  characterSwimRight() {
    if (this.world && this.world.keyboard.RIGHT && this.x + this.width + this.offset.left < Level.level_end_x) {
      this.moveRight();
      this.introduceBoss();
      this.otherDirection = false;
    }
  }

  changeCameraX() {
    if (this.world && this.x >= Level.level_end_x - 1024) {
      this.world.camera_x = -Level.level_end_x + 1104;
    } else {
      this.world.camera_x = -this.x + 80;
    }
  }

  introduceBoss() {
    if (this.world && this.x + this.width == Level.level_end_x - 1548) {
      world.characterIsInRange = true;
    }
  }

  //   saveAllSoundsInArray(){
  //     if (soundData.some(sound => sound.audio === audio)) {
  //       playSound(this.ambience_SOUND);
  //       playSound(this.walking_SOUND);
  //     }
  //   }
}

// Für später nochmal
// if(!this.animationPlayed){
//   clearInterval(this.movementAnimation)
//   this.playAnimation(this.IMAGES_ELECTRO_DEAD);
//   setTimeout(()=>{
//     this.animationPlayed = true;
//   }, 500)
// } else if (!this.imageIsLoaded) {
//   this.loadImage('img/1.Sharkie/6.dead/2.Electro_shock/10.png')
//   this.imageIsLoaded = true;
// }

// MovementAnimation alt.

// if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
//   this.moveRight();
//   this.introduceBoss();
//   this.otherDirection = false;
//   this.walking_SOUND.play();
// }
// if (this.world.keyboard.LEFT && this.x > -944) {
//   this.moveLeft();
//   this.otherDirection = true;
//   this.walking_SOUND.play();
// }

// if (this.world.keyboard.UP) {
//   this.swimUP();
//   this.walking_SOUND.play();
// }

// if (this.world.keyboard.DOWN) {
//   this.swimDOWN();
//   this.walking_SOUND.play();
// }

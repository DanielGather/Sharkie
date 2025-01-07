class Character extends MovableObject {
  width = 200;
  height = 200;
  speed = 1;
  idle = false;
  idleAnimationInterval;
  movementAnimation;
  idleAnimation;
  swimAnimation;
  animationPlayed = false;
  imageIsLoaded = false;

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

  world;
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
    this.animate();
    this.applyGravity();

    // this.saveAllSoundsInArray();
    // this.isDead();
  }

  animate() {
    setInterval(() => {
      if (this.isDead()) {
        if (!this.animationPlayed) {
          stopMovement();
          this.playAnimation(this.IMAGES_ELECTRO_DEAD);
          setTimeout(() => {
            this.loadImage("img/1.Sharkie/6.dead/2.Electro_shock/10.webp");
            this.animationPlayed = true;
          }, 1000);
        }
        this.walking_SOUND.pause();
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT_ELECTRO);
      } else if (this.isIdle() >= 3 && this.isIdle() <= 7) {
        this.playAnimation(this.IMAGES_IDLE);
      } else if (this.isIdle() >= 7) {
        this.playAnimation(this.IMAGES_LONG_IDLE);
      } else {
        if (this.world && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN)) {
          clearInterval(this.idleAnimationInterval);
          this.playAnimation(this.IMAGES_SWIMING);
          this.idle = false;
        }
      }
      playSound(this.ambience_SOUND);
      this.walking_SOUND.pause();
      // console.log(this.world);
    }, 150);
    setStoppableMovementInterval(this.characterSwimRight.bind(this), 1000 / this.hz);
    setStoppableMovementInterval(this.characterSwimLeft.bind(this), 1000 / this.hz);
    setStoppableMovementInterval(this.characterSwimUp.bind(this), 1000 / this.hz);
    setStoppableMovementInterval(this.characterSwimDown.bind(this), 1000 / this.hz);
    setStoppableMovementInterval(this.playWalkingSound.bind(this), 1000 / this.hz);
    setStoppableMovementInterval(this.fishIsNearCharacter.bind(this), 100);

    setInterval(() => {
      this.lastMovement();
      this.changeCameraX();
    }, 1000 / this.hz);
  }

  isIdle() {
    let currentTime = new Date().getTime();
    let timepassed = (currentTime - this.lastMovementCharacter) / 1000;
    return timepassed;
  }

  lastMovement() {
    if (this.world && (this.world.keyboard.DOWN || this.world.keyboard.UP || this.world.keyboard.LEFT || this.world.keyboard.RIGHT)) {
      this.lastMovementCharacter = new Date().getTime();
    }
  }

  playWalkingSound() {
    if (this.world && (this.world.keyboard.DOWN || this.world.keyboard.UP || this.world.keyboard.LEFT || this.world.keyboard.RIGHT)) {
      this.walking_SOUND.play();
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
    if (this.world && this.world.keyboard.RIGHT && this.x + this.width + this.offset.right < Level.level_end_x) {
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

  playIdleAnimation() {
    this.idleAnimationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_IDLE);
      this.idle = true;
    }, 150);
  }

  jump() {}

  introduceBoss() {
    if (this.world && this.x + this.width == Level.level_end_x - 1548) {
      world.characterIsInRange = true;
    }
  }

  fishIsNearCharacter() {
    // console.log("Test1", world.character.x, world.character.width);
    // console.log("Test2", this.world.character.x, this.world.character.width);
    // console.log("Test3", this.character.x, this.character.width);
    // console.log("Test4", this.x, this.width);
    // console.log("Wir werden aufgerufen");
    // this.FishIsInRange = false;
    Level.enemyLevelArray.forEach((enemy) => {
      const distance = Math.abs(this.x + this.width - enemy.x);
      if (distance < 150) {
        enemy.updateFishIsInRangeTrue(true);
      }
    });
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

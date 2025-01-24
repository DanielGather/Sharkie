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
  endbossLife = 100;
  speed = 0.25;
  initialLife = this.endbossLife;
  isNotDead = true;
  attackingCharacter = false;
  isHurt = false;
  moveLeftEndboss = false;

  offset = {
    top: 160,
    right: 30,
    left: 30,
    bottom: 85,
  };

  // IMAGES_INTRODUCE = ["img/2.Enemy/3 Final Enemy/1.Introduce/1.webp", "img/2.Enemy/3 Final Enemy/1.Introduce/2.webp", "img/2.Enemy/3 Final Enemy/1.Introduce/3.webp", "img/2.Enemy/3 Final Enemy/1.Introduce/4.webp", "img/2.Enemy/3 Final Enemy/1.Introduce/5.webp", "img/2.Enemy/3 Final Enemy/1.Introduce/6.webp", "img/2.Enemy/3 Final Enemy/1.Introduce/7.webp", "img/2.Enemy/3 Final Enemy/1.Introduce/8.webp", "img/2.Enemy/3 Final Enemy/1.Introduce/9.webp", "img/2.Enemy/3 Final Enemy/1.Introduce/10.webp"];
  IMAGES_INTRODUCE = sprites.endboss.introduce

  // IMAGES_SWIMING = ["img/2.Enemy/3 Final Enemy/2.floating/1.webp", "img/2.Enemy/3 Final Enemy/2.floating/2.webp", "img/2.Enemy/3 Final Enemy/2.floating/3.webp", "img/2.Enemy/3 Final Enemy/2.floating/4.webp", "img/2.Enemy/3 Final Enemy/2.floating/5.webp", "img/2.Enemy/3 Final Enemy/2.floating/6.webp", "img/2.Enemy/3 Final Enemy/2.floating/7.webp", "img/2.Enemy/3 Final Enemy/2.floating/8.webp", "img/2.Enemy/3 Final Enemy/2.floating/9.webp", "img/2.Enemy/3 Final Enemy/2.floating/10.webp", "img/2.Enemy/3 Final Enemy/2.floating/11.webp", "img/2.Enemy/3 Final Enemy/2.floating/12.webp", "img/2.Enemy/3 Final Enemy/2.floating/13.webp"];
  IMAGES_SWIMING = sprites.endboss.swim

  // IMAGES_IS_HURT = ["img/2.Enemy/3 Final Enemy/Hurt/1.webp", "img/2.Enemy/3 Final Enemy/Hurt/2.webp", "img/2.Enemy/3 Final Enemy/Hurt/3.webp", "img/2.Enemy/3 Final Enemy/Hurt/4.webp"];
  IMAGES_IS_HURT = sprites.endboss.isHurt

  // IMAGES_ENDBOSS_DEAD = ["img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.webp", "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.webp", "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.webp", "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.webp", "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.webp"];
  IMAGES_ENDBOSS_DEAD = sprites.endboss.isDead

  // IMAGES_ENDBOSS_IS_ATTACKING = ["img/2.Enemy/3 Final Enemy/Attack/1.webp", "img/2.Enemy/3 Final Enemy/Attack/2.webp", "img/2.Enemy/3 Final Enemy/Attack/3.webp", "img/2.Enemy/3 Final Enemy/Attack/4.webp", "img/2.Enemy/3 Final Enemy/Attack/5.webp", "img/2.Enemy/3 Final Enemy/Attack/6.webp"];
  IMAGES_ENDBOSS_IS_ATTACKING = sprites.endboss.isAttacking

  hurt_SOUND = new Audio("audio/hurtSoundBoss.wav");
  attacking_SOUND = new Audio("audio/monsterBite.wav");

  constructor() {
    super().loadImage(this.IMAGES_INTRODUCE[0]);
    this.damage = 10;
    this.loadImages(this.IMAGES_INTRODUCE);
    this.loadImages(this.IMAGES_SWIMING);
    this.loadImages(this.IMAGES_ENDBOSS_DEAD);
    this.loadImages(this.IMAGES_IS_HURT);
    this.loadImages(this.IMAGES_ENDBOSS_IS_ATTACKING);
    this.waitForEndbossVariable();
    this.animate();
  }

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
  }

  endbossTakesDamage() {
    if (this.world && this.isHurt) {
      if (this.animationCounterIsHurt < 5) {
        this.playAnimation(this.IMAGES_IS_HURT);
        playSound(this.hurt_SOUND)
      } else {
        this.isHurt = false;
        this.animationCounterIsHurt = 0;
      }
      this.animationCounterIsHurt++;
    }
  }

  moveLeft() {
    if (this.moveLeftEndboss == true && !this.isHurt) {
      super.moveLeft();
      this.attackingCharacter = true;
    }
  }

  attackCharacter() {
    if (this.attackingCharacter && !this.isHurt && this.isNotDead) {
      this.playAnimation(this.IMAGES_ENDBOSS_IS_ATTACKING);
      let currentImageIndex = this.currentImage % this.IMAGES_ENDBOSS_IS_ATTACKING.length; // Aktuelles Bild ermitteln
      if (currentImageIndex === 3 || currentImageIndex === 4) {
        playSound(this.attacking_SOUND)
      }
      this.offset.left = 10;
      this.moveLeftEndboss = true;
    } else if (!this.isNotDead && !this.isHurt) {
      this.moveLeftEndboss = false;
    }
  }

  endbossIsHittet() {
    if (this.endbossLife < 0) {
      this.endbossLife = 0;
    } else if (this.endbossLife !== this.initialLife) {
      this.lastHitEndboss = new Date().getTime();
      this.initialLife = this.endbossLife;
    }
  }

  endbossIsHurt() {
    let timepassedEndboss = new Date().getTime() - this.lastHitEndboss; // Difference in ms
    timepassedEndboss = timepassedEndboss / 1000; // Difference in s
    return timepassedEndboss < 0.5;
  }

  characterIsNearEndboss() {
    if (this.world && this.world.characterIsInRange && this.isNotDead) {
      if (this.animationCounterIntroduce < 10) {
        this.playAnimation(this.IMAGES_INTRODUCE);
      } else if (!this.attackingCharacter && !this.isHurt) {
        this.playAnimation(this.IMAGES_SWIMING);
      }
      this.animationCounterIntroduce++;
    }
  }

  endbossIsDead() {
    if (this.world && this.endbossLife == 0) {
      this.isNotDead = false;
      if (this.animationCounterDead < 3) {
        this.playAnimation(this.IMAGES_ENDBOSS_DEAD);
      } else if (this.animationCounterDead < 4 && !this.animationPlayed) {
        this.loadImage(this.IMAGES_ENDBOSS_DEAD[4]);
        this.animationPlayed = true;
      }
      this.animationCounterDead++;
    }
  }

  waitForEndbossVariable() {
    const interval = setInterval(() => {
      if (Level.level_end_x !== undefined) {
        clearInterval(interval);
        this.x = Level.level_end_x - 1024;
      }
    }, 100);
  }
}

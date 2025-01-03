class Endboss extends MovableObject {
  width = 500;
  height = 500;
  y = 0;
  i;
  j;
  isNotDead = true;
  animationPlayed;

  offset = {
    top: 160,
    right: 30,
    left: 30,
    bottom: 85,
  };

  IMAGES_INTRODUCE = ["img/2.Enemy/3 Final Enemy/1.Introduce/1.png", "img/2.Enemy/3 Final Enemy/1.Introduce/2.png", "img/2.Enemy/3 Final Enemy/1.Introduce/3.png", "img/2.Enemy/3 Final Enemy/1.Introduce/4.png", "img/2.Enemy/3 Final Enemy/1.Introduce/5.png", "img/2.Enemy/3 Final Enemy/1.Introduce/6.png", "img/2.Enemy/3 Final Enemy/1.Introduce/7.png", "img/2.Enemy/3 Final Enemy/1.Introduce/8.png", "img/2.Enemy/3 Final Enemy/1.Introduce/9.png", "img/2.Enemy/3 Final Enemy/1.Introduce/10.png"];

  IMAGES_SWIMING = ["img/2.Enemy/3 Final Enemy/2.floating/1.png", "img/2.Enemy/3 Final Enemy/2.floating/2.png", "img/2.Enemy/3 Final Enemy/2.floating/3.png", "img/2.Enemy/3 Final Enemy/2.floating/4.png", "img/2.Enemy/3 Final Enemy/2.floating/5.png", "img/2.Enemy/3 Final Enemy/2.floating/6.png", "img/2.Enemy/3 Final Enemy/2.floating/7.png", "img/2.Enemy/3 Final Enemy/2.floating/8.png", "img/2.Enemy/3 Final Enemy/2.floating/9.png", "img/2.Enemy/3 Final Enemy/2.floating/10.png", "img/2.Enemy/3 Final Enemy/2.floating/11.png", "img/2.Enemy/3 Final Enemy/2.floating/12.png", "img/2.Enemy/3 Final Enemy/2.floating/13.png"];

  IMAGES_ENDBOSS_DEAD = ["img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png", "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png", "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png", "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png", "img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png"];

  constructor() {
    super().loadImage(this.IMAGES_INTRODUCE[0]);
    this.loadImages(this.IMAGES_INTRODUCE);
    this.loadImages(this.IMAGES_SWIMING);
    this.loadImages(this.IMAGES_ENDBOSS_DEAD);
    this.waitForEndbossVariable();
    this.animate();
  }

  animate() {
    this.i = 0;
    this.j = 0;
    setStoppableInterval(this.characterIsNearEndboss.bind(this), 200);
    setStoppableInterval(this.endbossIsDead.bind(this), 500);
  }

  characterIsNearEndboss() {
    if (world.characterIsInRange && this.isNotDead) {
      if (this.i < 10) {
        this.playAnimation(this.IMAGES_INTRODUCE);
      } else {
        this.playAnimation(this.IMAGES_SWIMING);
      }
      this.i++;
    }
  }

  endbossIsDead() {
    if (world.character.endbossLife == 0) {
      this.isNotDead = false;
      if (this.j < 3) {
        this.playAnimation(this.IMAGES_ENDBOSS_DEAD);
      } else if (this.j < 4 && !this.animationPlayed) {
        this.loadImage(this.IMAGES_ENDBOSS_DEAD[4]);
        this.animationPlayed = true;
      }
      this.j++;
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

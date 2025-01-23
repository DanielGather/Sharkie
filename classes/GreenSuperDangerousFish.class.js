class GreenSuperDangerousFish extends MovableObject {
  width = 100;
  height = 100;
  speed = 0.25;
  canvasHeight = 600;
  direction = "down";

  offset = {
    top: 5,
    right: 10,
    left: 5,
    bottom: 15,
  };

  // IMAGES_GREEN_SUPER_DANGEROUS = ["img/2.Enemy/2 Jelly fish/Súper dangerous/Green 1.webp", "img/2.Enemy/2 Jelly fish/Súper dangerous/Green 2.webp", "img/2.Enemy/2 Jelly fish/Súper dangerous/Green 3.webp", "img/2.Enemy/2 Jelly fish/Súper dangerous/Green 4.webp"];
  IMAGES_GREEN_SUPER_DANGEROUS = sprites.greenSuperDangerousFish.swim

  // IMAGES_GREEN_SUPER_DEAD = ["img/2.Enemy/2 Jelly fish/Dead/green/g1.webp", "img/2.Enemy/2 Jelly fish/Dead/green/g2.webp", "img/2.Enemy/2 Jelly fish/Dead/green/g3.webp", "img/2.Enemy/2 Jelly fish/Dead/green/g4.webp"];
  IMAGES_GREEN_SUPER_DEAD = sprites.greenSuperDangerousFish.isDead

  constructor(middleOfCanvas, speedFromDangerousFish) {
    super();
    this.loadImages(this.IMAGES_GREEN_SUPER_DANGEROUS);
    this.loadImages(this.IMAGES_GREEN_SUPER_DEAD);
    this.x = middleOfCanvas;
    this.y = 0;
    this.speed = this.calculateSpeed(speedFromDangerousFish);
    this.animate();
  }

  animate() {
    setStoppableInterval(this.isAlive.bind(this), 200);
    setStoppableMovementInterval(this.movementDangerousFish.bind(this), 1000 / this.hz);
  }

  movementDangerousFish() {
    if (!this.fishIsDead) {
      this.playMovementAnimation();
    } else {
      this.y += 0;
    }
  }

  playMovementAnimation() {
    if (this.direction === "down") {
      this.y += this.speed;
      if (this.y + this.height + this.offset.bottom >= this.canvasHeight) {
        this.direction = "up";
      }
    } else if (this.direction === "up") {
      this.y -= this.speed;
      if (this.y <= 0) {
        this.direction = "down";
      }
    }
  }

  isAlive() {
    if (!this.fishIsDead) {
      this.playAnimation(this.IMAGES_GREEN_SUPER_DANGEROUS);
    } else if (this.fishIsDead) {
      this.playAnimation(this.IMAGES_GREEN_SUPER_DEAD);
    }
  }
}

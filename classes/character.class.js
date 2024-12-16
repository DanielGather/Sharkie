class Character extends MovableObject {
  width = 200;
  height = 200;
  speed = 1;
  idle = false;
  idleAnimationInterval;

  IMAGES_SWIMING = ["img/1.Sharkie/3.Swim/1.png", "img/1.Sharkie/3.Swim/2.png", "img/1.Sharkie/3.Swim/3.png", "img/1.Sharkie/3.Swim/4.png", "img/1.Sharkie/3.Swim/5.png", "img/1.Sharkie/3.Swim/6.png"];

  IMAGES_IDLE = ["img/1.Sharkie/1.IDLE/1.png", "img/1.Sharkie/1.IDLE/2.png", "img/1.Sharkie/1.IDLE/3.png", "img/1.Sharkie/1.IDLE/4.png", "img/1.Sharkie/1.IDLE/5.png", "img/1.Sharkie/1.IDLE/6.png", "img/1.Sharkie/1.IDLE/7.png", "img/1.Sharkie/1.IDLE/8.png", "img/1.Sharkie/1.IDLE/9.png", "img/1.Sharkie/1.IDLE/10.png", "img/1.Sharkie/1.IDLE/11.png", "img/1.Sharkie/1.IDLE/12.png", "img/1.Sharkie/1.IDLE/13.png", "img/1.Sharkie/1.IDLE/14.png", "img/1.Sharkie/1.IDLE/15.png", "img/1.Sharkie/1.IDLE/16.png", "img/1.Sharkie/1.IDLE/17.png", "img/1.Sharkie/1.IDLE/18.png"];

  IMAGES_LONG_IDLE = ["img/1.Sharkie/2.Long_IDLE/i1.png", "img/1.Sharkie/2.Long_IDLE/i2.png", "img/1.Sharkie/2.Long_IDLE/i3.png", "img/1.Sharkie/2.Long_IDLE/i4.png", "img/1.Sharkie/2.Long_IDLE/i5.png", "img/1.Sharkie/2.Long_IDLE/i6.png", "img/1.Sharkie/2.Long_IDLE/i7.png", "img/1.Sharkie/2.Long_IDLE/i8.png", "img/1.Sharkie/2.Long_IDLE/i9.png", "img/1.Sharkie/2.Long_IDLE/i10.png", "img/1.Sharkie/2.Long_IDLE/i11.png", "img/1.Sharkie/2.Long_IDLE/i12.png", "img/1.Sharkie/2.Long_IDLE/i13.png", "img/1.Sharkie/2.Long_IDLE/i14.png"];

  world;
  walking_SOUND = new Audio("audio/fishSwiming.mp3");
  ambience_SOUND = new Audio("audio/underWaterNoise.mp3");

  constructor() {
    super().loadImage("img/1.Sharkie/3.Swim/1.png");
    this.loadImages(this.IMAGES_SWIMING);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.animate();
    this.applyGravity();
  }

  animate() {
    setInterval(() => {
      this.walking_SOUND.pause();
      this.ambience_SOUND.play();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x - 944) {
        this.x += this.speed;
        this.otherDirection = false;
        this.walking_SOUND.play();
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.x -= this.speed;
        this.otherDirection = true;
        this.walking_SOUND.play();
      }
      if (this.world.keyboard.UP) {
        this.y -= this.speed;
        this.walking_SOUND.play();
      }
      if (this.world.keyboard.DOWN) {
        this.y += this.speed;
        this.walking_SOUND.play();
      }
      this.world.camera_x = -this.x + 80;
    }, 1000 / this.hz);

    setInterval(() => {
      if (this.world.keyboard.RIGHT == false && this.world.keyboard.LEFT == false && this.world.keyboard.UP == false && this.world.keyboard.DOWN == false && this.idle == false) {
          this.playIdleAnimation();
      } 
  }, 2000);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
        clearInterval(this.idleAnimationInterval);
        this.playAnimation(this.IMAGES_SWIMING);
        this.idle = false;
      }
    }, 150);
  }

  jump() {}

  playIdleAnimation(){
    this.idleAnimationInterval = setInterval(()=>{
      this.playAnimation(this.IMAGES_IDLE);
      this.idle = true;
    }, 150)
  }
}

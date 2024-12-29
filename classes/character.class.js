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
  

  IMAGES_SWIMING = ["img/1.Sharkie/3.Swim/1.png", "img/1.Sharkie/3.Swim/2.png", "img/1.Sharkie/3.Swim/3.png", "img/1.Sharkie/3.Swim/4.png", "img/1.Sharkie/3.Swim/5.png", "img/1.Sharkie/3.Swim/6.png"];

  IMAGES_IDLE = ["img/1.Sharkie/1.IDLE/1.png", "img/1.Sharkie/1.IDLE/2.png", "img/1.Sharkie/1.IDLE/3.png", "img/1.Sharkie/1.IDLE/4.png", "img/1.Sharkie/1.IDLE/5.png", "img/1.Sharkie/1.IDLE/6.png", "img/1.Sharkie/1.IDLE/7.png", "img/1.Sharkie/1.IDLE/8.png", "img/1.Sharkie/1.IDLE/9.png", "img/1.Sharkie/1.IDLE/10.png", "img/1.Sharkie/1.IDLE/11.png", "img/1.Sharkie/1.IDLE/12.png", "img/1.Sharkie/1.IDLE/13.png", "img/1.Sharkie/1.IDLE/14.png", "img/1.Sharkie/1.IDLE/15.png", "img/1.Sharkie/1.IDLE/16.png", "img/1.Sharkie/1.IDLE/17.png", "img/1.Sharkie/1.IDLE/18.png"];

  IMAGES_LONG_IDLE = [
    "img/1.Sharkie/2.Long_IDLE/i1.png",
    "img/1.Sharkie/2.Long_IDLE/i2.png",
    "img/1.Sharkie/2.Long_IDLE/i3.png",
    "img/1.Sharkie/2.Long_IDLE/i4.png",
    "img/1.Sharkie/2.Long_IDLE/i5.png",
    "img/1.Sharkie/2.Long_IDLE/i6.png",
    "img/1.Sharkie/2.Long_IDLE/i7.png",
    "img/1.Sharkie/2.Long_IDLE/i8.png",
    "img/1.Sharkie/2.Long_IDLE/i9.png",
    "img/1.Sharkie/2.Long_IDLE/i10.png",
    "img/1.Sharkie/2.Long_IDLE/i11.png",
    "img/1.Sharkie/2.Long_IDLE/i12.png",
    "img/1.Sharkie/2.Long_IDLE/i13.png",
    "img/1.Sharkie/2.Long_IDLE/i14.png"
  ];

  IMAGES_POISON_DEAD = [
    'img/1.Sharkie/6.dead/1.Poisoned/1.png',
    'img/1.Sharkie/6.dead/1.Poisoned/2.png',
    'img/1.Sharkie/6.dead/1.Poisoned/3.png',
    'img/1.Sharkie/6.dead/1.Poisoned/4.png',
    'img/1.Sharkie/6.dead/1.Poisoned/5.png',
    'img/1.Sharkie/6.dead/1.Poisoned/6.png',
    'img/1.Sharkie/6.dead/1.Poisoned/7.png',
    'img/1.Sharkie/6.dead/1.Poisoned/8.png',
    'img/1.Sharkie/6.dead/1.Poisoned/9.png',
    'img/1.Sharkie/6.dead/1.Poisoned/10.png',
    'img/1.Sharkie/6.dead/1.Poisoned/11.png',
    'img/1.Sharkie/6.dead/1.Poisoned/12.png'
  ]

  IMAGES_ELECTRO_DEAD = [
    'img/1.Sharkie/6.dead/2.Electro_shock/1.png',
    'img/1.Sharkie/6.dead/2.Electro_shock/2.png',
    'img/1.Sharkie/6.dead/2.Electro_shock/3.png',
    'img/1.Sharkie/6.dead/2.Electro_shock/4.png',
    'img/1.Sharkie/6.dead/2.Electro_shock/5.png',
    'img/1.Sharkie/6.dead/2.Electro_shock/6.png',
    'img/1.Sharkie/6.dead/2.Electro_shock/7.png',
    'img/1.Sharkie/6.dead/2.Electro_shock/8.png',
    'img/1.Sharkie/6.dead/2.Electro_shock/9.png',
    'img/1.Sharkie/6.dead/2.Electro_shock/10.png'
  ]

  IMAGES_HURT_POISON = [
    'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
    'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
    'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
    'img/1.Sharkie/5.Hurt/1.Poisoned/4.png'
  ]

  IMAGES_HURT_ELECTRO = [
    'img/1.Sharkie/5.Hurt/2.Electric shock/1.png',
    'img/1.Sharkie/5.Hurt/2.Electric shock/2.png',
    'img/1.Sharkie/5.Hurt/2.Electric shock/3.png',
  ]

  world;
  walking_SOUND = new Audio("audio/fishSwiming.mp3");
  ambience_SOUND = new Audio("audio/underWaterNoise.mp3");

  constructor() {
    super().loadImage("img/1.Sharkie/3.Swim/1.png");
    this.loadImages(this.IMAGES_SWIMING);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_POISON_DEAD);
    this.loadImages(this.IMAGES_ELECTRO_DEAD);
    this.loadImages(this.IMAGES_HURT_POISON);
    this.loadImages(this.IMAGES_HURT_ELECTRO);
    this.animate();
    this.applyGravity();
    // this.isDead();
  }

  animate() {

    setInterval(() => {
      if(this.isDead()){
        if(!this.animationPlayed){
          clearInterval(this.movementAnimation)
          this.playAnimation(this.IMAGES_ELECTRO_DEAD);
          setTimeout(()=>{
            this.loadImage('img/1.Sharkie/6.dead/2.Electro_shock/10.png')
            this.animationPlayed = true;
          }, 1000)
        }
        this.walking_SOUND.pause();
      } else if (this.isHurt()){
          this.playAnimation(this.IMAGES_HURT_ELECTRO);
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN) {
            clearInterval(this.idleAnimationInterval);
            this.playAnimation(this.IMAGES_SWIMING);
            this.idle = false;
          }
        }
      }, 150);

        this.movementAnimation = 
        setInterval(() => {
          this.walking_SOUND.pause();
          this.ambience_SOUND.play();
          if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.introduceBoss();
            this.otherDirection = false;
            this.walking_SOUND.play();
          }
          if (this.world.keyboard.LEFT && this.x > -944) {
            this.moveLeft();
            this.otherDirection = true;
            this.walking_SOUND.play();
          }
      
          if (this.world.keyboard.UP) {
            this.swimUP();
            this.walking_SOUND.play();
          }
      
          if (this.world.keyboard.DOWN) {
            this.swimDOWN();
            this.walking_SOUND.play();
          }
          this.world.camera_x = -this.x + 80;
          
        }, 1000 / this.hz);
  }

  playIdleAnimation() {
    this.idleAnimationInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_IDLE);
      this.idle = true;
    }, 150);
  }


  jump() {}

  introduceBoss(){
      if(this.x + this.width == Level.level_end_x - 1024){
        console.log("Kommen wir in die Funktion Introduce Boss rein?");
        // World.characterIsInRange = true;
        this.characterIsInRange = true;
      }
  }


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
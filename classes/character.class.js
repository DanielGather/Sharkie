class Character extends MovableObject {
  width = 200;
  height = 200;
  speed = 1;
  IMAGES_SWIMING = [
    "img/1.Sharkie/3.Swim/1.png",
    "img/1.Sharkie/3.Swim/2.png", 
    "img/1.Sharkie/3.Swim/3.png", 
    "img/1.Sharkie/3.Swim/4.png", 
    "img/1.Sharkie/3.Swim/5.png", 
    "img/1.Sharkie/3.Swim/6.png"
];

world;
walking_SOUND = new Audio('audio/fishSwiming.mp3')
ambience_SOUND = new Audio('audio/underWaterNoise.mp3')

  constructor() {
    super().loadImage("img/1.Sharkie/3.Swim/1.png");
    this.loadImages(this.IMAGES_SWIMING);
    this.animate();
  }

  animate() {

      setInterval(()=>{
        this.walking_SOUND.pause();
        this.ambience_SOUND.play();
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x - 944){
          this.x += this.speed;
          this.otherDirection = false;
          this.walking_SOUND.play();
        }
        if (this.world.keyboard.LEFT && this.x > 0){
          this.x -= this.speed;
          this.otherDirection = true;
          this.walking_SOUND.play();

        }
        if (this.world.keyboard.UP){
          this.y -= this.speed;
          this.walking_SOUND.play();

        }
        if (this.world.keyboard.DOWN){
          this.y += this.speed;
          this.walking_SOUND.play();

        }
        this.world.camera_x = -this.x + 80;
      }, 1000 / this.hz)
      

      setInterval(()=>{
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.UP || this.world.keyboard.DOWN){
          // Walk animation
          let i = this.currentImage % this.IMAGES_SWIMING.length;
          let path = this.IMAGES_SWIMING[i];
          this.img = this.imageCache[path];
          this.currentImage++;
        }
      }, 150)
  }


  jump() {

  }
}
